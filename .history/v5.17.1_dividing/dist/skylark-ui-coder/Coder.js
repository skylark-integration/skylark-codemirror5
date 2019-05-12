/**
 * skylark-ui-coder - The skylark coder widget
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-ui-coder/
 * @license MIT
 */
define(["./primitives/CoderCtor","./primitives/display/focus"],function(t){"use strict";function e(t,e,r){var i=t.doc,o=t.display;if(!i.mode.startState)return!0;var n=findStartLine(t,e,r),s=n>i.first&&getLine(i,n-1).stateAfter;return s=s?copyState(i.mode,s):startState(i.mode),i.iter(n,e,function(r){processLine(t,r.text,s);var l=n==e-1||n%5==0||n>=o.viewFrom&&n<o.viewTo;r.stateAfter=l?copyState(i.mode,s):null,++n}),r&&(i.frontier=n),s}function r(t){function e(){o.activeTouch&&(n=setTimeout(function(){o.activeTouch=null},1e3),s=o.activeTouch,s.end=+new Date)}function r(t){if(1!=t.touches.length)return!1;var e=t.touches[0];return e.radiusX<=1&&e.radiusY<=1}function i(t,e){if(null==e.left)return!0;var r=e.left-t.left,i=e.top-t.top;return r*r+i*i>400}var o=t.display;on(o.scroller,"mousedown",operation(t,onMouseDown)),ie&&ie_version<11?on(o.scroller,"dblclick",operation(t,function(e){if(!signalDOMEvent(t,e)){var r=posFromMouse(t,e);if(r&&!clickInGutter(t,e)&&!eventInWidget(t.display,e)){e_preventDefault(e);var i=t.findWordAt(r);extendSelection(t.doc,i.anchor,i.head)}}})):on(o.scroller,"dblclick",function(e){signalDOMEvent(t,e)||e_preventDefault(e)}),captureRightClick||on(o.scroller,"contextmenu",function(e){onContextMenu(t,e)});var n,s={end:0};on(o.scroller,"touchstart",function(e){if(!signalDOMEvent(t,e)&&!r(e)){clearTimeout(n);var i=+new Date;o.activeTouch={start:i,moved:!1,prev:i-s.end<=300?s:null},1==e.touches.length&&(o.activeTouch.left=e.touches[0].pageX,o.activeTouch.top=e.touches[0].pageY)}}),on(o.scroller,"touchmove",function(){o.activeTouch&&(o.activeTouch.moved=!0)}),on(o.scroller,"touchend",function(r){var n=o.activeTouch;if(n&&!eventInWidget(o,r)&&null!=n.left&&!n.moved&&new Date-n.start<300){var s,l=t.coordsChar(o.activeTouch,"page");s=!n.prev||i(n,n.prev)?new Range(l,l):!n.prev.prev||i(n,n.prev.prev)?t.findWordAt(l):new Range(Pos(l.line,0),clipPos(t.doc,Pos(l.line+1,0))),t.setSelection(s.anchor,s.head),t.focus(),e_preventDefault(r)}e()}),on(o.scroller,"touchcancel",e),on(o.scroller,"scroll",function(){o.scroller.clientHeight&&(setScrollTop(t,o.scroller.scrollTop),setScrollLeft(t,o.scroller.scrollLeft,!0),signal(t,"scroll",t))}),on(o.scroller,"mousewheel",function(e){onScrollWheel(t,e)}),on(o.scroller,"DOMMouseScroll",function(e){onScrollWheel(t,e)}),on(o.wrapper,"scroll",function(){o.wrapper.scrollTop=o.wrapper.scrollLeft=0}),o.dragFunctions={enter:function(e){signalDOMEvent(t,e)||e_stop(e)},over:function(e){signalDOMEvent(t,e)||(onDragOver(t,e),e_stop(e))},start:function(e){onDragStart(t,e)},drop:operation(t,onDrop),leave:function(e){signalDOMEvent(t,e)||clearDragCursor(t)}};var l=o.input.getField();on(l,"keyup",function(e){onKeyUp.call(t,e)}),on(l,"keydown",operation(t,onKeyDown)),on(l,"keypress",operation(t,onKeyPress)),on(l,"focus",bind(onFocus,t)),on(l,"blur",bind(onBlur,t))}function i(t,e,r,i,o){function n(){var e=l+r;return!(e<t.first||e>=t.first+t.size)&&(l=e,h=getLine(t,e))}function s(t){var e=(o?moveVisually:moveLogically)(h,a,r,!0);if(null==e){if(t||!n())return!1;a=o?(r<0?lineRight:lineLeft)(h):r<0?h.text.length:0}else a=e;return!0}var l=e.line,a=e.ch,c=r,h=getLine(t,l);if("char"==i)s();else if("column"==i)s(!0);else if("word"==i||"group"==i)for(var u=null,d="group"==i,p=t.cm&&t.cm.getHelper(e,"wordChars"),f=!0;!(r<0)||s(!f);f=!1){var g=h.text.charAt(a)||"\n",v=isWordChar(g,p)?"w":d&&"\n"==g?"n":!d||/\s/.test(g)?null:"p";if(!d||f||v||(v="s"),u&&u!=v){r<0&&(r=1,s());break}if(v&&(u=v),r>0&&!s(!f))break}var m=skipAtomic(t,Pos(l,a),e,c,!0);return cmp(e,m)||(m.hitSide=!0),m}function o(t,e,r,i){var o,n=t.doc,s=e.left;if("page"==i){var l=Math.min(t.display.wrapper.clientHeight,window.innerHeight||document.documentElement.clientHeight);o=e.top+r*(l-(r<0?1.5:.5)*textHeight(t.display))}else"line"==i&&(o=r>0?e.bottom+3:e.top-3);for(;;){var a=coordsChar(t,s,o);if(!a.outside)break;if(r<0?o<=0:o>=n.height){a.hitSide=!0;break}o+=5*r}return a}return t.partial({_construct:function(t,e){if(!(this instanceof CodeMirror))return new CodeMirror(t,e);this.options=e=e?copyObj(e):{},copyObj(defaults,e,!1),setGuttersForLineNumbers(e);var i=e.value;"string"==typeof i&&(i=new Doc(i,e.mode,null,e.lineSeparator)),this.doc=i;var o=new CodeMirror.inputStyles[e.inputStyle](this),n=this.display=new Display(t,i,o);n.wrapper.CodeMirror=this,updateGutters(this),themeChanged(this),e.lineWrapping&&(this.display.wrapper.className+=" CodeMirror-wrap"),e.autofocus&&!mobile&&n.input.focus(),initScrollbars(this),this.state={keyMaps:[],overlays:[],modeGen:0,overwrite:!1,delayingBlurEvent:!1,focused:!1,suppressEdits:!1,pasteIncoming:!1,cutIncoming:!1,selectingText:!1,draggingText:!1,highlight:new Delayed,keySeq:null,specialChars:null};var s=this;ie&&ie_version<11&&setTimeout(function(){s.display.input.reset(!0)},20),r(this),ensureGlobalHandlers(),startOperation(this),this.curOp.forceUpdate=!0,attachDoc(this,i),e.autofocus&&!mobile||s.hasFocus()?setTimeout(bind(onFocus,this),20):onBlur(this);for(var l in optionHandlers)optionHandlers.hasOwnProperty(l)&&optionHandlers[l](this,e[l],Init);maybeUpdateLineNumberWidth(this),e.finishInit&&e.finishInit(this);for(var a=0;a<initHooks.length;++a)initHooks[a](this);endOperation(this),webkit&&e.lineWrapping&&"optimizelegibility"==getComputedStyle(n.lineDiv).textRendering&&(n.lineDiv.style.textRendering="auto")}}),CodeMirror.inputStyles={textarea:TextareaInput,contenteditable:ContentEditableInput},CodeMirror.prototype={constructor:CodeMirror,focus:function(){window.focus(),this.display.input.focus()},setOption:function(t,e){var r=this.options,i=r[t];r[t]==e&&"mode"!=t||(r[t]=e,optionHandlers.hasOwnProperty(t)&&operation(this,optionHandlers[t])(this,e,i))},getOption:function(t){return this.options[t]},getDoc:function(){return this.doc},addKeyMap:function(t,e){this.state.keyMaps[e?"push":"unshift"](getKeyMap(t))},removeKeyMap:function(t){for(var e=this.state.keyMaps,r=0;r<e.length;++r)if(e[r]==t||e[r].name==t)return e.splice(r,1),!0},addOverlay:methodOp(function(t,e){var r=t.token?t:CodeMirror.getMode(this.options,t);if(r.startState)throw new Error("Overlays may not be stateful.");this.state.overlays.push({mode:r,modeSpec:t,opaque:e&&e.opaque}),this.state.modeGen++,regChange(this)}),removeOverlay:methodOp(function(t){for(var e=this.state.overlays,r=0;r<e.length;++r){var i=e[r].modeSpec;if(i==t||"string"==typeof t&&i.name==t)return e.splice(r,1),this.state.modeGen++,void regChange(this)}}),indentLine:methodOp(function(t,e,r){"string"!=typeof e&&"number"!=typeof e&&(e=null==e?this.options.smartIndent?"smart":"prev":e?"add":"subtract"),isLine(this.doc,t)&&indentLine(this,t,e,r)}),indentSelection:methodOp(function(t){for(var e=this.doc.sel.ranges,r=-1,i=0;i<e.length;i++){var o=e[i];if(o.empty())o.head.line>r&&(indentLine(this,o.head.line,t,!0),r=o.head.line,i==this.doc.sel.primIndex&&ensureCursorVisible(this));else{var n=o.from(),s=o.to(),l=Math.max(r,n.line);r=Math.min(this.lastLine(),s.line-(s.ch?0:1))+1;for(var a=l;a<r;++a)indentLine(this,a,t);var c=this.doc.sel.ranges;0==n.ch&&e.length==c.length&&c[i].from().ch>0&&replaceOneSelection(this.doc,i,new Range(n,c[i].to()),sel_dontScroll)}}}),getTokenAt:function(t,e){return takeToken(this,t,e)},getLineTokens:function(t,e){return takeToken(this,Pos(t),e,!0)},getTokenTypeAt:function(t){t=clipPos(this.doc,t);var e,r=getLineStyles(this,getLine(this.doc,t.line)),i=0,o=(r.length-1)/2,n=t.ch;if(0==n)e=r[2];else for(;;){var s=i+o>>1;if((s?r[2*s-1]:0)>=n)o=s;else{if(!(r[2*s+1]<n)){e=r[2*s+2];break}i=s+1}}var l=e?e.indexOf("cm-overlay "):-1;return l<0?e:0==l?null:e.slice(0,l-1)},getModeAt:function(t){var e=this.doc.mode;return e.innerMode?CodeMirror.innerMode(e,this.getTokenAt(t).state).mode:e},getHelper:function(t,e){return this.getHelpers(t,e)[0]},getHelpers:function(t,e){var r=[];if(!helpers.hasOwnProperty(e))return r;var i=helpers[e],o=this.getModeAt(t);if("string"==typeof o[e])i[o[e]]&&r.push(i[o[e]]);else if(o[e])for(var n=0;n<o[e].length;n++){var s=i[o[e][n]];s&&r.push(s)}else o.helperType&&i[o.helperType]?r.push(i[o.helperType]):i[o.name]&&r.push(i[o.name]);for(var n=0;n<i._global.length;n++){var l=i._global[n];l.pred(o,this)&&indexOf(r,l.val)==-1&&r.push(l.val)}return r},getStateAfter:function(t,r){var i=this.doc;return t=clipLine(i,null==t?i.first+i.size-1:t),e(this,t+1,r)},cursorCoords:function(t,e){var r,i=this.doc.sel.primary();return r=null==t?i.head:"object"==typeof t?clipPos(this.doc,t):t?i.from():i.to(),cursorCoords(this,r,e||"page")},charCoords:function(t,e){return charCoords(this,clipPos(this.doc,t),e||"page")},coordsChar:function(t,e){return t=fromCoordSystem(this,t,e||"page"),coordsChar(this,t.left,t.top)},lineAtHeight:function(t,e){return t=fromCoordSystem(this,{top:t,left:0},e||"page").top,lineAtHeight(this.doc,t+this.display.viewOffset)},heightAtLine:function(t,e){var r,i=!1;if("number"==typeof t){var o=this.doc.first+this.doc.size-1;t<this.doc.first?t=this.doc.first:t>o&&(t=o,i=!0),r=getLine(this.doc,t)}else r=t;return intoCoordSystem(this,r,{top:0,left:0},e||"page").top+(i?this.doc.height-heightAtLine(r):0)},defaultTextHeight:function(){return textHeight(this.display)},defaultCharWidth:function(){return charWidth(this.display)},setGutterMarker:methodOp(function(t,e,r){return this.doc.changeLine(t,"gutter",function(t){var i=t.gutterMarkers||(t.gutterMarkers={});return i[e]=r,!r&&isEmpty(i)&&(t.gutterMarkers=null),!0})}),clearGutter:methodOp(function(t){var e=this,r=e.doc,i=r.first;r.iter(function(r){r.gutterMarkers&&r.gutterMarkers[t]&&(r.gutterMarkers[t]=null,regLineChange(e,i,"gutter"),isEmpty(r.gutterMarkers)&&(r.gutterMarkers=null)),++i})}),lineInfo:function(t){if("number"==typeof t){if(!isLine(this.doc,t))return null;var e=t;if(t=getLine(this.doc,t),!t)return null}else{var e=lineNo(t);if(null==e)return null}return{line:e,handle:t,text:t.text,gutterMarkers:t.gutterMarkers,textClass:t.textClass,bgClass:t.bgClass,wrapClass:t.wrapClass,widgets:t.widgets}},getViewport:function(){return{from:this.display.viewFrom,to:this.display.viewTo}},addWidget:function(t,e,r,i,o){var n=this.display;t=cursorCoords(this,clipPos(this.doc,t));var s=t.bottom,l=t.left;if(e.style.position="absolute",e.setAttribute("cm-ignore-events","true"),this.display.input.setUneditable(e),n.sizer.appendChild(e),"over"==i)s=t.top;else if("above"==i||"near"==i){var a=Math.max(n.wrapper.clientHeight,this.doc.height),c=Math.max(n.sizer.clientWidth,n.lineSpace.clientWidth);("above"==i||t.bottom+e.offsetHeight>a)&&t.top>e.offsetHeight?s=t.top-e.offsetHeight:t.bottom+e.offsetHeight<=a&&(s=t.bottom),l+e.offsetWidth>c&&(l=c-e.offsetWidth)}e.style.top=s+"px",e.style.left=e.style.right="","right"==o?(l=n.sizer.clientWidth-e.offsetWidth,e.style.right="0px"):("left"==o?l=0:"middle"==o&&(l=(n.sizer.clientWidth-e.offsetWidth)/2),e.style.left=l+"px"),r&&scrollIntoView(this,l,s,l+e.offsetWidth,s+e.offsetHeight)},triggerOnKeyDown:methodOp(onKeyDown),triggerOnKeyPress:methodOp(onKeyPress),triggerOnKeyUp:onKeyUp,execCommand:function(t){if(commands.hasOwnProperty(t))return commands[t].call(null,this)},triggerElectric:methodOp(function(t){triggerElectric(this,t)}),findPosH:function(t,e,r,o){var n=1;e<0&&(n=-1,e=-e);for(var s=0,l=clipPos(this.doc,t);s<e&&(l=i(this.doc,l,n,r,o),!l.hitSide);++s);return l},moveH:methodOp(function(t,e){var r=this;r.extendSelectionsBy(function(o){return r.display.shift||r.doc.extend||o.empty()?i(r.doc,o.head,t,e,r.options.rtlMoveVisually):t<0?o.from():o.to()},sel_move)}),deleteH:methodOp(function(t,e){var r=this.doc.sel,o=this.doc;r.somethingSelected()?o.replaceSelection("",null,"+delete"):deleteNearSelection(this,function(r){var n=i(o,r.head,t,e,!1);return t<0?{from:n,to:r.head}:{from:r.head,to:n}})}),findPosV:function(t,e,r,i){var n=1,s=i;e<0&&(n=-1,e=-e);for(var l=0,a=clipPos(this.doc,t);l<e;++l){var c=cursorCoords(this,a,"div");if(null==s?s=c.left:c.left=s,a=o(this,c,n,r),a.hitSide)break}return a},moveV:methodOp(function(t,e){var r=this,i=this.doc,n=[],s=!r.display.shift&&!i.extend&&i.sel.somethingSelected();if(i.extendSelectionsBy(function(l){if(s)return t<0?l.from():l.to();var a=cursorCoords(r,l.head,"div");null!=l.goalColumn&&(a.left=l.goalColumn),n.push(a.left);var c=o(r,a,t,e);return"page"==e&&l==i.sel.primary()&&addToScrollPos(r,null,charCoords(r,c,"div").top-a.top),c},sel_move),n.length)for(var l=0;l<i.sel.ranges.length;l++)i.sel.ranges[l].goalColumn=n[l]}),findWordAt:function(t){var e=this.doc,r=getLine(e,t.line).text,i=t.ch,o=t.ch;if(r){var n=this.getHelper(t,"wordChars");(t.xRel<0||o==r.length)&&i?--i:++o;for(var s=r.charAt(i),l=isWordChar(s,n)?function(t){return isWordChar(t,n)}:/\s/.test(s)?function(t){return/\s/.test(t)}:function(t){return!/\s/.test(t)&&!isWordChar(t)};i>0&&l(r.charAt(i-1));)--i;for(;o<r.length&&l(r.charAt(o));)++o}return new Range(Pos(t.line,i),Pos(t.line,o))},toggleOverwrite:function(t){null!=t&&t==this.state.overwrite||((this.state.overwrite=!this.state.overwrite)?addClass(this.display.cursorDiv,"CodeMirror-overwrite"):rmClass(this.display.cursorDiv,"CodeMirror-overwrite"),signal(this,"overwriteToggle",this,this.state.overwrite))},hasFocus:function(){return this.display.input.getField()==activeElt()},isReadOnly:function(){return!(!this.options.readOnly&&!this.doc.cantEdit)},scrollTo:methodOp(function(t,e){null==t&&null==e||resolveScrollToPos(this),null!=t&&(this.curOp.scrollLeft=t),null!=e&&(this.curOp.scrollTop=e)}),getScrollInfo:function(){var t=this.display.scroller;return{left:t.scrollLeft,top:t.scrollTop,height:t.scrollHeight-scrollGap(this)-this.display.barHeight,width:t.scrollWidth-scrollGap(this)-this.display.barWidth,clientHeight:displayHeight(this),clientWidth:displayWidth(this)}},scrollIntoView:methodOp(function(t,e){if(null==t?(t={from:this.doc.sel.primary().head,to:null},null==e&&(e=this.options.cursorScrollMargin)):"number"==typeof t?t={from:Pos(t,0),to:null}:null==t.from&&(t={from:t,to:null}),t.to||(t.to=t.from),t.margin=e||0,null!=t.from.line)resolveScrollToPos(this),this.curOp.scrollToPos=t;else{var r=calculateScrollPos(this,Math.min(t.from.left,t.to.left),Math.min(t.from.top,t.to.top)-t.margin,Math.max(t.from.right,t.to.right),Math.max(t.from.bottom,t.to.bottom)+t.margin);this.scrollTo(r.scrollLeft,r.scrollTop)}}),setSize:methodOp(function(t,e){function r(t){return"number"==typeof t||/^\d+$/.test(String(t))?t+"px":t}var i=this;null!=t&&(i.display.wrapper.style.width=r(t)),null!=e&&(i.display.wrapper.style.height=r(e)),i.options.lineWrapping&&clearLineMeasurementCache(this);var o=i.display.viewFrom;i.doc.iter(o,i.display.viewTo,function(t){if(t.widgets)for(var e=0;e<t.widgets.length;e++)if(t.widgets[e].noHScroll){regLineChange(i,o,"widget");break}++o}),i.curOp.forceUpdate=!0,signal(i,"refresh",this)}),operation:function(t){return runInOp(this,t)},refresh:methodOp(function(){var t=this.display.cachedTextHeight;regChange(this),this.curOp.forceUpdate=!0,clearCaches(this),this.scrollTo(this.doc.scrollLeft,this.doc.scrollTop),updateGutterSpace(this),(null==t||Math.abs(t-textHeight(this.display))>.5)&&estimateLineHeights(this),signal(this,"refresh",this)}),swapDoc:methodOp(function(t){var e=this.doc;return e.cm=null,attachDoc(this,t),clearCaches(this),this.display.input.reset(),this.scrollTo(t.scrollLeft,t.scrollTop),this.curOp.forceScroll=!0,signalLater(this,"swapDoc",this,e),e}),getInputField:function(){return this.display.input.getField()},getWrapperElement:function(){return this.display.wrapper},getScrollerElement:function(){return this.display.scroller},getGutterElement:function(){return this.display.gutters}},eventMixin(CodeMirror),CodeMirror.version="5.17.1",CodeMirror});
//# sourceMappingURL=sourcemaps/Coder.js.map