/**
 * skylark-ui-coder - The skylark coder widget
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-ui-coder/
 * @license MIT
 */
define(["../util/dom","../CoderCtor"],function(e,t){function r(e){var t=indexOf(e.gutters,"CodeMirror-linenumbers");t==-1&&e.lineNumbers?e.gutters=e.gutters.concat(["CodeMirror-linenumbers"]):t>-1&&!e.lineNumbers&&(e.gutters=e.gutters.slice(0),e.gutters.splice(t,1))}function n(e,t,r){var n=r&&r!=CodeMirror.Init;if(!t!=!n){var o=e.display.dragFunctions,i=t?on:off;i(e.display.scroller,"dragstart",o.start),i(e.display.scroller,"dragenter",o.enter),i(e.display.scroller,"dragover",o.over),i(e.display.scroller,"dragleave",o.leave),i(e.display.scroller,"drop",o.drop)}}function o(t){t.options.lineWrapping?(e.addClass(t.display.wrapper,"CodeMirror-wrap"),t.display.sizer.style.minWidth="",t.display.sizerWidth=null):(e.rmClass(t.display.wrapper,"CodeMirror-wrap"),t.findMaxLine()),t.estimateLineHeights(),t.regChange(t),t.clearCaches(),setTimeout(function(){t.updateScrollbars()},100)}function i(e){e.updateGutters(),e.regChange(),setTimeout(function(){e.alignHorizontally()},20)}function l(e,t,r,n){CodeMirror.defaults[e]=t,r&&(n?a[e]=function(e,t,n){n!=s&&r(e,t,n)}:a[e]=r)}var a=(CodeMirror.defaults={},CodeMirror.optionHandlers={}),s=CodeMirror.Init={toString:function(){return"CodeMirror.Init"}};l("value","",function(e,t){e.setValue(t)},!0),l("mode",null,function(e,t){e.doc.modeOption=t,e.loadMode()},!0),l("indentUnit",2,function(e){e.loadMode()},!0),l("indentWithTabs",!1),l("smartIndent",!0),l("tabSize",4,function(e){e.resetModeState(),e.clearCaches(),e.regChange()},!0),l("lineSeparator",null,function(e,t){if(e.doc.lineSep=t,t){var r=[],n=e.doc.first;e.doc.iter(function(e){for(var o=0;;){var i=e.text.indexOf(t,o);if(i==-1)break;o=i+t.length,r.push(Pos(n,i))}n++});for(var o=r.length-1;o>=0;o--)replaceRange(e.doc,t,r[o],Pos(r[o].line,r[o].ch+t.length))}}),l("specialChars",/[\u0000-\u001f\u007f\u00ad\u200b-\u200f\u2028\u2029\ufeff]/g,function(e,t,r){e.state.specialChars=new RegExp(t.source+(t.test("\t")?"":"|\t"),"g"),r!=CodeMirror.Init&&e.refresh()}),l("specialCharPlaceholder",defaultSpecialCharPlaceholder,function(e){e.refresh()},!0),l("electricChars",!0),l("inputStyle",mobile?"contenteditable":"textarea",function(){throw new Error("inputStyle can not (yet) be changed in a running editor")},!0),l("rtlMoveVisually",!windows),l("wholeLineUpdateBefore",!0),l("theme","default",function(e){themeChanged(e),i(e)},!0),l("keyMap","default",function(e,t,r){var n=getKeyMap(t),o=r!=CodeMirror.Init&&getKeyMap(r);o&&o.detach&&o.detach(e,n),n.attach&&n.attach(e,o||null)}),l("extraKeys",null),l("lineWrapping",!1,o,!0),l("gutters",[],function(e){r(e.options),i(e)},!0),l("fixedGutter",!0,function(e,t){e.display.gutters.style.left=t?compensateForHScroll(e.display)+"px":"0",e.refresh()},!0),l("coverGutterNextToScrollbar",!1,function(e){e.updateScrollbars()},!0),l("scrollbarStyle","native",function(e){initScrollbars(e),updateScrollbars(e),e.display.scrollbars.setScrollTop(e.doc.scrollTop),e.display.scrollbars.setScrollLeft(e.doc.scrollLeft)},!0),l("lineNumbers",!1,function(e){r(e.options),i(e)},!0),l("firstLineNumber",1,i,!0),l("lineNumberFormatter",function(e){return e},i,!0),l("showCursorWhenSelecting",!1,updateSelection,!0),l("resetSelectionOnContextMenu",!0),l("lineWiseCopyCut",!0),l("readOnly",!1,function(e,t){"nocursor"==t?(onBlur(e),e.display.input.blur(),e.display.disabled=!0):e.display.disabled=!1,e.display.input.readOnlyChanged(t)}),l("disableInput",!1,function(e,t){t||e.display.input.reset()},!0),l("dragDrop",!0,n),l("allowDropFileTypes",null),l("cursorBlinkRate",530),l("cursorScrollMargin",0),l("cursorHeight",1,function(e){e.updateSelection()},!0),l("singleCursorHeightPerLine",!0,function(e){e.updateSelection()},!0),l("workTime",100),l("workDelay",100),l("flattenSpans",!0,function(e){e.resetModeState()},!0),l("addModeClass",!1,function(e){e.resetModeState()},!0),l("pollInterval",100),l("undoDepth",200,function(e,t){e.doc.history.undoDepth=t}),l("historyEventDelay",1250),l("viewportMargin",10,function(e){e.refresh()},!0),l("maxHighlightLength",1e4,function(e){e.resetModeState()},!0),l("moveInputWithCursor",!0,function(e,t){t||e.display.input.resetPosition()}),l("tabindex",null,function(e,t){e.display.input.getField().tabIndex=t||""}),l("autofocus",null)});
//# sourceMappingURL=../../sourcemaps/primitives/edit/options.js.map