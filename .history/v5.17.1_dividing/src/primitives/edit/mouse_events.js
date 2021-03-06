define([
  "../CoderCtor"
],function(CoderCtor) {
  // CONTEXT MENU HANDLING

  var lastClick, lastDoubleClick;

  CoderCtor.partial({
    // To make the context menu work, we need to briefly unhide the
    // textarea (making it as unobtrusive as possible) to let the
    // right-click take effect on it.
    onContextMenu : function (e) {
      var cm = this;

      if (cm.display.eventInWidget( e) || cm.contextMenuInGutter(e)) return;
      if (cm.signalDOMEvent(e, "contextmenu")) return;
      cm.display.input.onContextMenu(e);
    },

    contextMenuInGutter : function (e) {
      var cm = this;

      if (!cm.hasHandler("gutterContextMenu")) return false;
      return cm.gutterEvent(e, "gutterContextMenu", false);
    },

   // MOUSE EVENTS
   
    // A mouse down can be a single click, double click, triple click,
    // start of selection drag, start of text drag, new cursor
    // (ctrl-click), rectangle drag (alt-drag), or xwin
    // middle-click-paste. Or it might be a click on something we should
    // not interfere with, such as a scrollbar or widget.
    onMouseDown : function (e) {
      var cm = this, display = cm.display;
      if (cm.signalDOMEvent(e) || display.activeTouch && display.input.supportsTouch()) return;
      display.shift = e.shiftKey;

      if (display.eventInWidget(e)) {
        if (!webkit) {
          // Briefly turn off draggability, to allow widgets to do
          // normal dragging things.
          display.scroller.draggable = false;
          setTimeout(function(){display.scroller.draggable = true;}, 100);
        }
        return;
      }
      if (cm.clickInGutter(e)) return;
      var start = cm.posFromMouse(e);
      window.focus();

      switch (e_button(e)) {
      case 1:
        // #3261: make sure, that we're not starting a second selection
        if (cm.state.selectingText)
          cm.state.selectingText(e);
        else if (start)
          cm.leftButtonDown(e, start);
        else if (e_target(e) == display.scroller)
          e_preventDefault(e);
        break;
      case 2:
        if (webkit) cm.state.lastMiddleDown = +new Date;
        if (start) extendSelection(cm.doc, start);
        setTimeout(function() {display.input.focus();}, 20);
        e_preventDefault(e);
        break;
      case 3:
        if (captureRightClick) cm.onContextMenu(e);
        else cm.delayBlurEvent(cm);
        break;
      }
    },

    leftButtonDown : function (e, start) {
      var cm = this;

      if (ie) setTimeout(bind(ensureFocus, cm), 0);
      else cm.curOp.focus = activeElt();

      var now = +new Date, type;
      if (lastDoubleClick && lastDoubleClick.time > now - 400 && cmp(lastDoubleClick.pos, start) == 0) {
        type = "triple";
      } else if (lastClick && lastClick.time > now - 400 && cmp(lastClick.pos, start) == 0) {
        type = "double";
        lastDoubleClick = {time: now, pos: start};
      } else {
        type = "single";
        lastClick = {time: now, pos: start};
      }

      var sel = cm.doc.sel, modifier = mac ? e.metaKey : e.ctrlKey, contained;
      if (cm.options.dragDrop && dragAndDrop && !cm.isReadOnly() &&
          type == "single" && (contained = sel.contains(start)) > -1 &&
          (cmp((contained = sel.ranges[contained]).from(), start) < 0 || start.xRel > 0) &&
          (cmp(contained.to(), start) > 0 || start.xRel < 0))
        cm.leftButtonStartDrag(e, start, modifier);
      else
        cm.leftButtonSelect(e, start, type, modifier);
    },

    // Start a text drag. When it ends, see if any dragging actually
    // happen, and treat as a click if it didn't.
    leftButtonStartDrag : function (e, start, modifier) {
      var cm = this;

      var display = cm.display, startTime = +new Date;
      var dragEnd = cm.operation(function(e2) {
        if (webkit) display.scroller.draggable = false;
        cm.state.draggingText = false;
        off(document, "mouseup", dragEnd);
        off(display.scroller, "drop", dragEnd);
        if (Math.abs(e.clientX - e2.clientX) + Math.abs(e.clientY - e2.clientY) < 10) {
          e_preventDefault(e2);
          if (!modifier && +new Date - 200 < startTime)
            cm.extendSelection(cm.doc, start);
          // Work around unexplainable focus problem in IE9 (#2127) and Chrome (#3081)
          if (webkit || ie && ie_version == 9)
            setTimeout(function() {document.body.focus(); display.input.focus();}, 20);
          else
            display.input.focus();
        }
      });
      // Let the drag handler handle this.
      if (webkit) display.scroller.draggable = true;
      cm.state.draggingText = dragEnd;
      dragEnd.copy = mac ? e.altKey : e.ctrlKey
      // IE's approach to draggable
      if (display.scroller.dragDrop) display.scroller.dragDrop();
      on(document, "mouseup", dragEnd);
      on(display.scroller, "drop", dragEnd);
    },

    // Normal selection, as opposed to text dragging.
    leftButtonSelect : function (e, start, type, addNew) {
      var cm = this;

      var display = cm.display, doc = cm.doc;
      e_preventDefault(e);

      var ourRange, ourIndex, startSel = doc.sel, ranges = startSel.ranges;
      if (addNew && !e.shiftKey) {
        ourIndex = doc.sel.contains(start);
        if (ourIndex > -1)
          ourRange = ranges[ourIndex];
        else
          ourRange = new Range(start, start);
      } else {
        ourRange = doc.sel.primary();
        ourIndex = doc.sel.primIndex;
      }

      if (chromeOS ? e.shiftKey && e.metaKey : e.altKey) {
        type = "rect";
        if (!addNew) ourRange = new Range(start, start);
        start = cm.posFromMouse(e, true, true);
        ourIndex = -1;
      } else if (type == "double") {
        var word = cm.findWordAt(start);
        if (cm.display.shift || doc.extend)
          ourRange = extendRange(doc, ourRange, word.anchor, word.head);
        else
          ourRange = word;
      } else if (type == "triple") {
        var line = new Range(Pos(start.line, 0), clipPos(doc, Pos(start.line + 1, 0)));
        if (cm.display.shift || doc.extend)
          ourRange = extendRange(doc, ourRange, line.anchor, line.head);
        else
          ourRange = line;
      } else {
        ourRange = extendRange(doc, ourRange, start);
      }

      if (!addNew) {
        ourIndex = 0;
        setSelection(doc, new Selection([ourRange], 0), sel_mouse);
        startSel = doc.sel;
      } else if (ourIndex == -1) {
        ourIndex = ranges.length;
        setSelection(doc, normalizeSelection(ranges.concat([ourRange]), ourIndex),
                     {scroll: false, origin: "*mouse"});
      } else if (ranges.length > 1 && ranges[ourIndex].empty() && type == "single" && !e.shiftKey) {
        setSelection(doc, normalizeSelection(ranges.slice(0, ourIndex).concat(ranges.slice(ourIndex + 1)), 0),
                     {scroll: false, origin: "*mouse"});
        startSel = doc.sel;
      } else {
        replaceOneSelection(doc, ourIndex, ourRange, sel_mouse);
      }

      var lastPos = start;
      function extendTo(pos) {
        if (cmp(lastPos, pos) == 0) return;
        lastPos = pos;

        if (type == "rect") {
          var ranges = [], tabSize = cm.options.tabSize;
          var startCol = countColumn(getLine(doc, start.line).text, start.ch, tabSize);
          var posCol = countColumn(getLine(doc, pos.line).text, pos.ch, tabSize);
          var left = Math.min(startCol, posCol), right = Math.max(startCol, posCol);
          for (var line = Math.min(start.line, pos.line), end = Math.min(cm.lastLine(), Math.max(start.line, pos.line));
               line <= end; line++) {
            var text = getLine(doc, line).text, leftPos = findColumn(text, left, tabSize);
            if (left == right)
              ranges.push(new Range(Pos(line, leftPos), Pos(line, leftPos)));
            else if (text.length > leftPos)
              ranges.push(new Range(Pos(line, leftPos), Pos(line, findColumn(text, right, tabSize))));
          }
          if (!ranges.length) ranges.push(new Range(start, start));
          setSelection(doc, normalizeSelection(startSel.ranges.slice(0, ourIndex).concat(ranges), ourIndex),
                       {origin: "*mouse", scroll: false});
          cm.scrollIntoView(pos);
        } else {
          var oldRange = ourRange;
          var anchor = oldRange.anchor, head = pos;
          if (type != "single") {
            if (type == "double")
              var range = cm.findWordAt(pos);
            else
              var range = new Range(Pos(pos.line, 0), clipPos(doc, Pos(pos.line + 1, 0)));
            if (cmp(range.anchor, anchor) > 0) {
              head = range.head;
              anchor = minPos(oldRange.from(), range.anchor);
            } else {
              head = range.anchor;
              anchor = maxPos(oldRange.to(), range.head);
            }
          }
          var ranges = startSel.ranges.slice(0);
          ranges[ourIndex] = new Range(clipPos(doc, anchor), head);
          setSelection(doc, normalizeSelection(ranges, ourIndex), sel_mouse);
        }
      }

      var editorSize = display.wrapper.getBoundingClientRect();
      // Used to ensure timeout re-tries don't fire when another extend
      // happened in the meantime (clearTimeout isn't reliable -- at
      // least on Chrome, the timeouts still happen even when cleared,
      // if the clear happens after their scheduled firing time).
      var counter = 0;

      function extend(e) {
        var curCount = ++counter;
        var cur = cm.posFromMouse(e, true, type == "rect");
        if (!cur) return;
        if (cmp(cur, lastPos) != 0) {
          cm.curOp.focus = activeElt();
          extendTo(cur);
          var visible = visibleLines(display, doc);
          if (cur.line >= visible.to || cur.line < visible.from)
            setTimeout(cm.operation(function(){if (counter == curCount) extend(e);}), 150);
        } else {
          var outside = e.clientY < editorSize.top ? -20 : e.clientY > editorSize.bottom ? 20 : 0;
          if (outside) setTimeout(cm.operation(function() {
            if (counter != curCount) return;
            display.scroller.scrollTop += outside;
            extend(e);
          }), 50);
        }
      }

      function done(e) {
        cm.state.selectingText = false;
        counter = Infinity;
        e_preventDefault(e);
        display.input.focus();
        off(document, "mousemove", move);
        off(document, "mouseup", up);
        doc.history.lastSelOrigin = null;
      }

      var move = cm.operation(function(e) {
        if (!e_button(e)) done(e);
        else extend(e);
      });
      var up = cm.operation(done);
      cm.state.selectingText = up;
      on(document, "mousemove", move);
      on(document, "mouseup", up);
    },

    // Determines whether an event happened in the gutter, and fires the
    // handlers for the corresponding event.
    gutterEvent : function (e, type, prevent) {
      var cm = this;

      try { var mX = e.clientX, mY = e.clientY; }
      catch(e) { return false; }
      if (mX >= Math.floor(cm.display.gutters.getBoundingClientRect().right)) return false;
      if (prevent) e_preventDefault(e);

      var display = cm.display;
      var lineBox = display.lineDiv.getBoundingClientRect();

      if (mY > lineBox.bottom || !hasHandler(type)) return e_defaultPrevented(e);
      mY -= lineBox.top - display.viewOffset;

      for (var i = 0; i < cm.options.gutters.length; ++i) {
        var g = display.gutters.childNodes[i];
        if (g && g.getBoundingClientRect().right >= mX) {
          var line = lineAtHeight(cm.doc, mY);
          var gutter = cm.options.gutters[i];
          cm.signal(type, cm, line, gutter, e);
          return e_defaultPrevented(e);
        }
      }
    },

    clickInGutter : function (e) {
      var cm = this;

      return cm.gutterEvent(e, "gutterClick", true);
    }
  });
  
});
