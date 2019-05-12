/**
 * skylark-ui-coder - The skylark coder widget
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-ui-coder/
 * @license MIT
 */
!function(e,t){function r(e,t){if("."!==e[0])return e;var r=t.split("/"),i=e.split("/");r.pop();for(var o=0;o<i.length;o++)"."!=i[o]&&(".."==i[o]?r.pop():r.push(i[o]));return r.join("/")}var i=t.define,o=t.require,n="function"==typeof i&&i.amd,s=!n&&"undefined"!=typeof exports;if(!n&&!i){var l={};i=t.define=function(e,t,i){"function"==typeof i?(l[e]={factory:i,deps:t.map(function(t){return r(t,e)}),exports:null},o(e)):l[e]=i},o=t.require=function(e){if(!l.hasOwnProperty(e))throw new Error("Module "+e+" has not been defined");var t=l[e];if(!t.exports){var r=[];t.deps.forEach(function(e){r.push(o(e))}),t.exports=t.factory.apply(window,r)}return t.exports}}if(!i)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(e(i,o),!n){var a=o("skylark-langx/skylark");s?exports=a:t.skylarkjs=a}}(function(e,t){e("skylark-ui-coder/primitives/CoderCtor",["skylark-langx/Evented"],function(e){return e.inherit({CoderCtorName:"Coder"})}),e("skylark-ui-coder/primitives/util/dom",[],function(){function e(e,t,r,i){var o=document.createElement(e);if(r&&(o.className=r),i&&(o.style.cssText=i),"string"==typeof t)o.appendChild(document.createTextNode(t));else if(t)for(var n=0;n<t.length;++n)o.appendChild(t[n]);return o}function t(e){for(var t=e.childNodes.length;t>0;--t)e.removeChild(e.firstChild);return e}function r(e,r){return t(e).appendChild(r)}function i(e,t){if(3==t.nodeType&&(t=t.parentNode),e.contains)return e.contains(t);do if(11==t.nodeType&&(t=t.host),t==e)return!0;while(t=t.parentNode)}function o(){for(var e=document.activeElement;e&&e.root&&e.root.activeElement;)e=e.root.activeElement;return e}function n(e){return new RegExp("(^|\\s)"+e+"(?:$|\\s)\\s*")}function s(e,t){var r=e.className,i=n(t).exec(r);if(i){var o=r.slice(i.index+i[0].length);e.className=r.slice(0,i.index)+(o?i[1]+o:"")}}function l(e,t){var r=e.className;n(t).test(r)||(e.className+=(r?" ":"")+t)}function a(e,t){for(var r=e.split(" "),i=0;i<r.length;i++)r[i]&&!n(r[i]).test(t)&&(t+=" "+r[i]);return t}var c;return c=document.createRange?function(e,t,r,i){var o=document.createRange();return o.setEnd(i||e,r),o.setStart(e,t),o}:function(e,t,r){var i=document.body.createTextRange();try{i.moveToElementText(e.parentNode)}catch(o){return i}return i.collapse(!0),i.moveEnd("character",r),i.moveStart("character",t),i},ie&&ie_version<11&&(o=function(){try{return document.activeElement}catch(e){return document.body}}),{elt:e,range:c,removeChildren:t,removeChildrenAndAdd:r,contains:i,activeElt:o,rmClass:s,addClass:l,joinClasses:a}}),e("skylark-ui-coder/primitives/display/focus",["../util/dom","../CoderCtor"],function(e,t){t.partial({ensureFocus:function(){var e=this;e.state.focused||(e.display.input.focus(),e.onFocus())},delayBlurEvent:function(){var e=this;e.state.delayingBlurEvent=!0,setTimeout(function(){e.state.delayingBlurEvent&&(e.state.delayingBlurEvent=!1,e.onBlur())},100)},onFocus:function(){var t=this;t.state.delayingBlurEvent&&(t.state.delayingBlurEvent=!1),"nocursor"!=t.options.readOnly&&(t.state.focused||(t.signal("focus",t),t.state.focused=!0,e.addClass(t.display.wrapper,"CodeMirror-focused"),t.curOp||t.display.selForContextMenu==t.doc.sel||(t.display.input.reset(),webkit&&setTimeout(function(){t.display.input.reset(!0)},20)),t.display.input.receivedFocus()),t.restartBlink())},onBlur:function(){var t=this;t.state.delayingBlurEvent||(t.state.focused&&(signal(t,"blur",t),t.state.focused=!1,e.rmClass(t.display.wrapper,"CodeMirror-focused")),clearInterval(t.display.blinker),setTimeout(function(){t.state.focused||(t.display.shift=!1)},150))}})}),e("skylark-ui-coder/Coder",["./primitives/CoderCtor","./primitives/display/focus"],function(e){"use strict";function t(e,t,r){var i=e.doc,o=e.display;if(!i.mode.startState)return!0;var n=findStartLine(e,t,r),s=n>i.first&&getLine(i,n-1).stateAfter;return s=s?copyState(i.mode,s):startState(i.mode),i.iter(n,t,function(r){processLine(e,r.text,s);var l=n==t-1||n%5==0||n>=o.viewFrom&&n<o.viewTo;r.stateAfter=l?copyState(i.mode,s):null,++n}),r&&(i.frontier=n),s}function r(e){function t(){o.activeTouch&&(n=setTimeout(function(){o.activeTouch=null},1e3),s=o.activeTouch,s.end=+new Date)}function r(e){if(1!=e.touches.length)return!1;var t=e.touches[0];return t.radiusX<=1&&t.radiusY<=1}function i(e,t){if(null==t.left)return!0;var r=t.left-e.left,i=t.top-e.top;return r*r+i*i>400}var o=e.display;on(o.scroller,"mousedown",operation(e,onMouseDown)),ie&&ie_version<11?on(o.scroller,"dblclick",operation(e,function(t){if(!signalDOMEvent(e,t)){var r=posFromMouse(e,t);if(r&&!clickInGutter(e,t)&&!eventInWidget(e.display,t)){e_preventDefault(t);var i=e.findWordAt(r);extendSelection(e.doc,i.anchor,i.head)}}})):on(o.scroller,"dblclick",function(t){signalDOMEvent(e,t)||e_preventDefault(t)}),captureRightClick||on(o.scroller,"contextmenu",function(t){onContextMenu(e,t)});var n,s={end:0};on(o.scroller,"touchstart",function(t){if(!signalDOMEvent(e,t)&&!r(t)){clearTimeout(n);var i=+new Date;o.activeTouch={start:i,moved:!1,prev:i-s.end<=300?s:null},1==t.touches.length&&(o.activeTouch.left=t.touches[0].pageX,o.activeTouch.top=t.touches[0].pageY)}}),on(o.scroller,"touchmove",function(){o.activeTouch&&(o.activeTouch.moved=!0)}),on(o.scroller,"touchend",function(r){var n=o.activeTouch;if(n&&!eventInWidget(o,r)&&null!=n.left&&!n.moved&&new Date-n.start<300){var s,l=e.coordsChar(o.activeTouch,"page");s=!n.prev||i(n,n.prev)?new Range(l,l):!n.prev.prev||i(n,n.prev.prev)?e.findWordAt(l):new Range(Pos(l.line,0),clipPos(e.doc,Pos(l.line+1,0))),e.setSelection(s.anchor,s.head),e.focus(),e_preventDefault(r)}t()}),on(o.scroller,"touchcancel",t),on(o.scroller,"scroll",function(){o.scroller.clientHeight&&(setScrollTop(e,o.scroller.scrollTop),setScrollLeft(e,o.scroller.scrollLeft,!0),signal(e,"scroll",e))}),on(o.scroller,"mousewheel",function(t){onScrollWheel(e,t)}),on(o.scroller,"DOMMouseScroll",function(t){onScrollWheel(e,t)}),on(o.wrapper,"scroll",function(){o.wrapper.scrollTop=o.wrapper.scrollLeft=0}),o.dragFunctions={enter:function(t){signalDOMEvent(e,t)||e_stop(t)},over:function(t){signalDOMEvent(e,t)||(onDragOver(e,t),e_stop(t))},start:function(t){onDragStart(e,t)},drop:operation(e,onDrop),leave:function(t){signalDOMEvent(e,t)||clearDragCursor(e)}};var l=o.input.getField();on(l,"keyup",function(t){onKeyUp.call(e,t)}),on(l,"keydown",operation(e,onKeyDown)),on(l,"keypress",operation(e,onKeyPress)),on(l,"focus",bind(onFocus,e)),on(l,"blur",bind(onBlur,e))}function i(e,t,r,i,o){function n(){var t=l+r;return!(t<e.first||t>=e.first+e.size)&&(l=t,u=getLine(e,t))}function s(e){var t=(o?moveVisually:moveLogically)(u,a,r,!0);if(null==t){if(e||!n())return!1;a=o?(r<0?lineRight:lineLeft)(u):r<0?u.text.length:0}else a=t;return!0}var l=t.line,a=t.ch,c=r,u=getLine(e,l);if("char"==i)s();else if("column"==i)s(!0);else if("word"==i||"group"==i)for(var h=null,d="group"==i,p=e.cm&&e.cm.getHelper(t,"wordChars"),f=!0;!(r<0)||s(!f);f=!1){var g=u.text.charAt(a)||"\n",v=isWordChar(g,p)?"w":d&&"\n"==g?"n":!d||/\s/.test(g)?null:"p";if(!d||f||v||(v="s"),h&&h!=v){r<0&&(r=1,s());break}if(v&&(h=v),r>0&&!s(!f))break}var m=skipAtomic(e,Pos(l,a),t,c,!0);return cmp(t,m)||(m.hitSide=!0),m}function o(e,t,r,i){var o,n=e.doc,s=t.left;if("page"==i){var l=Math.min(e.display.wrapper.clientHeight,window.innerHeight||document.documentElement.clientHeight);o=t.top+r*(l-(r<0?1.5:.5)*textHeight(e.display))}else"line"==i&&(o=r>0?t.bottom+3:t.top-3);for(;;){var a=coordsChar(e,s,o);if(!a.outside)break;if(r<0?o<=0:o>=n.height){a.hitSide=!0;break}o+=5*r}return a}return e.partial({_construct:function(e,t){if(!(this instanceof CodeMirror))return new CodeMirror(e,t);this.options=t=t?copyObj(t):{},copyObj(defaults,t,!1),setGuttersForLineNumbers(t);var i=t.value;"string"==typeof i&&(i=new Doc(i,t.mode,null,t.lineSeparator)),this.doc=i;var o=new CodeMirror.inputStyles[t.inputStyle](this),n=this.display=new Display(e,i,o);n.wrapper.CodeMirror=this,updateGutters(this),themeChanged(this),t.lineWrapping&&(this.display.wrapper.className+=" CodeMirror-wrap"),t.autofocus&&!mobile&&n.input.focus(),initScrollbars(this),this.state={keyMaps:[],overlays:[],modeGen:0,overwrite:!1,delayingBlurEvent:!1,focused:!1,suppressEdits:!1,pasteIncoming:!1,cutIncoming:!1,selectingText:!1,draggingText:!1,highlight:new Delayed,keySeq:null,specialChars:null};var s=this;ie&&ie_version<11&&setTimeout(function(){s.display.input.reset(!0)},20),r(this),ensureGlobalHandlers(),startOperation(this),this.curOp.forceUpdate=!0,attachDoc(this,i),t.autofocus&&!mobile||s.hasFocus()?setTimeout(bind(onFocus,this),20):onBlur(this);for(var l in optionHandlers)optionHandlers.hasOwnProperty(l)&&optionHandlers[l](this,t[l],Init);maybeUpdateLineNumberWidth(this),t.finishInit&&t.finishInit(this);for(var a=0;a<initHooks.length;++a)initHooks[a](this);endOperation(this),webkit&&t.lineWrapping&&"optimizelegibility"==getComputedStyle(n.lineDiv).textRendering&&(n.lineDiv.style.textRendering="auto")}}),CodeMirror.inputStyles={textarea:TextareaInput,contenteditable:ContentEditableInput},CodeMirror.prototype={constructor:CodeMirror,focus:function(){window.focus(),this.display.input.focus()},setOption:function(e,t){var r=this.options,i=r[e];r[e]==t&&"mode"!=e||(r[e]=t,optionHandlers.hasOwnProperty(e)&&operation(this,optionHandlers[e])(this,t,i))},getOption:function(e){return this.options[e]},getDoc:function(){return this.doc},addKeyMap:function(e,t){this.state.keyMaps[t?"push":"unshift"](getKeyMap(e))},removeKeyMap:function(e){for(var t=this.state.keyMaps,r=0;r<t.length;++r)if(t[r]==e||t[r].name==e)return t.splice(r,1),!0},addOverlay:methodOp(function(e,t){var r=e.token?e:CodeMirror.getMode(this.options,e);if(r.startState)throw new Error("Overlays may not be stateful.");this.state.overlays.push({mode:r,modeSpec:e,opaque:t&&t.opaque}),this.state.modeGen++,regChange(this)}),removeOverlay:methodOp(function(e){for(var t=this.state.overlays,r=0;r<t.length;++r){var i=t[r].modeSpec;if(i==e||"string"==typeof e&&i.name==e)return t.splice(r,1),this.state.modeGen++,void regChange(this)}}),indentLine:methodOp(function(e,t,r){"string"!=typeof t&&"number"!=typeof t&&(t=null==t?this.options.smartIndent?"smart":"prev":t?"add":"subtract"),isLine(this.doc,e)&&indentLine(this,e,t,r)}),indentSelection:methodOp(function(e){for(var t=this.doc.sel.ranges,r=-1,i=0;i<t.length;i++){var o=t[i];if(o.empty())o.head.line>r&&(indentLine(this,o.head.line,e,!0),r=o.head.line,i==this.doc.sel.primIndex&&ensureCursorVisible(this));else{var n=o.from(),s=o.to(),l=Math.max(r,n.line);r=Math.min(this.lastLine(),s.line-(s.ch?0:1))+1;for(var a=l;a<r;++a)indentLine(this,a,e);var c=this.doc.sel.ranges;0==n.ch&&t.length==c.length&&c[i].from().ch>0&&replaceOneSelection(this.doc,i,new Range(n,c[i].to()),sel_dontScroll)}}}),getTokenAt:function(e,t){return takeToken(this,e,t)},getLineTokens:function(e,t){return takeToken(this,Pos(e),t,!0)},getTokenTypeAt:function(e){e=clipPos(this.doc,e);var t,r=getLineStyles(this,getLine(this.doc,e.line)),i=0,o=(r.length-1)/2,n=e.ch;if(0==n)t=r[2];else for(;;){var s=i+o>>1;if((s?r[2*s-1]:0)>=n)o=s;else{if(!(r[2*s+1]<n)){t=r[2*s+2];break}i=s+1}}var l=t?t.indexOf("cm-overlay "):-1;return l<0?t:0==l?null:t.slice(0,l-1)},getModeAt:function(e){var t=this.doc.mode;return t.innerMode?CodeMirror.innerMode(t,this.getTokenAt(e).state).mode:t},getHelper:function(e,t){return this.getHelpers(e,t)[0]},getHelpers:function(e,t){var r=[];if(!helpers.hasOwnProperty(t))return r;var i=helpers[t],o=this.getModeAt(e);if("string"==typeof o[t])i[o[t]]&&r.push(i[o[t]]);else if(o[t])for(var n=0;n<o[t].length;n++){var s=i[o[t][n]];s&&r.push(s)}else o.helperType&&i[o.helperType]?r.push(i[o.helperType]):i[o.name]&&r.push(i[o.name]);for(var n=0;n<i._global.length;n++){var l=i._global[n];l.pred(o,this)&&indexOf(r,l.val)==-1&&r.push(l.val)}return r},getStateAfter:function(e,r){var i=this.doc;return e=clipLine(i,null==e?i.first+i.size-1:e),t(this,e+1,r)},cursorCoords:function(e,t){var r,i=this.doc.sel.primary();return r=null==e?i.head:"object"==typeof e?clipPos(this.doc,e):e?i.from():i.to(),cursorCoords(this,r,t||"page")},charCoords:function(e,t){return charCoords(this,clipPos(this.doc,e),t||"page")},coordsChar:function(e,t){return e=fromCoordSystem(this,e,t||"page"),coordsChar(this,e.left,e.top)},lineAtHeight:function(e,t){return e=fromCoordSystem(this,{top:e,left:0},t||"page").top,lineAtHeight(this.doc,e+this.display.viewOffset)},heightAtLine:function(e,t){var r,i=!1;if("number"==typeof e){var o=this.doc.first+this.doc.size-1;e<this.doc.first?e=this.doc.first:e>o&&(e=o,i=!0),r=getLine(this.doc,e)}else r=e;return intoCoordSystem(this,r,{top:0,left:0},t||"page").top+(i?this.doc.height-heightAtLine(r):0)},defaultTextHeight:function(){return textHeight(this.display)},defaultCharWidth:function(){return charWidth(this.display)},setGutterMarker:methodOp(function(e,t,r){return this.doc.changeLine(e,"gutter",function(e){var i=e.gutterMarkers||(e.gutterMarkers={});return i[t]=r,!r&&isEmpty(i)&&(e.gutterMarkers=null),!0})}),clearGutter:methodOp(function(e){var t=this,r=t.doc,i=r.first;r.iter(function(r){r.gutterMarkers&&r.gutterMarkers[e]&&(r.gutterMarkers[e]=null,regLineChange(t,i,"gutter"),isEmpty(r.gutterMarkers)&&(r.gutterMarkers=null)),++i})}),lineInfo:function(e){if("number"==typeof e){if(!isLine(this.doc,e))return null;var t=e;if(e=getLine(this.doc,e),!e)return null}else{var t=lineNo(e);if(null==t)return null}return{line:t,handle:e,text:e.text,gutterMarkers:e.gutterMarkers,textClass:e.textClass,bgClass:e.bgClass,wrapClass:e.wrapClass,widgets:e.widgets}},getViewport:function(){return{from:this.display.viewFrom,to:this.display.viewTo}},addWidget:function(e,t,r,i,o){var n=this.display;e=cursorCoords(this,clipPos(this.doc,e));var s=e.bottom,l=e.left;if(t.style.position="absolute",t.setAttribute("cm-ignore-events","true"),this.display.input.setUneditable(t),n.sizer.appendChild(t),"over"==i)s=e.top;else if("above"==i||"near"==i){var a=Math.max(n.wrapper.clientHeight,this.doc.height),c=Math.max(n.sizer.clientWidth,n.lineSpace.clientWidth);("above"==i||e.bottom+t.offsetHeight>a)&&e.top>t.offsetHeight?s=e.top-t.offsetHeight:e.bottom+t.offsetHeight<=a&&(s=e.bottom),l+t.offsetWidth>c&&(l=c-t.offsetWidth)}t.style.top=s+"px",t.style.left=t.style.right="","right"==o?(l=n.sizer.clientWidth-t.offsetWidth,t.style.right="0px"):("left"==o?l=0:"middle"==o&&(l=(n.sizer.clientWidth-t.offsetWidth)/2),t.style.left=l+"px"),r&&scrollIntoView(this,l,s,l+t.offsetWidth,s+t.offsetHeight)},triggerOnKeyDown:methodOp(onKeyDown),triggerOnKeyPress:methodOp(onKeyPress),triggerOnKeyUp:onKeyUp,execCommand:function(e){if(commands.hasOwnProperty(e))return commands[e].call(null,this)},triggerElectric:methodOp(function(e){triggerElectric(this,e)}),findPosH:function(e,t,r,o){var n=1;t<0&&(n=-1,t=-t);for(var s=0,l=clipPos(this.doc,e);s<t&&(l=i(this.doc,l,n,r,o),!l.hitSide);++s);return l},moveH:methodOp(function(e,t){var r=this;r.extendSelectionsBy(function(o){return r.display.shift||r.doc.extend||o.empty()?i(r.doc,o.head,e,t,r.options.rtlMoveVisually):e<0?o.from():o.to()},sel_move)}),deleteH:methodOp(function(e,t){var r=this.doc.sel,o=this.doc;r.somethingSelected()?o.replaceSelection("",null,"+delete"):deleteNearSelection(this,function(r){var n=i(o,r.head,e,t,!1);return e<0?{from:n,to:r.head}:{from:r.head,to:n}})}),findPosV:function(e,t,r,i){var n=1,s=i;t<0&&(n=-1,t=-t);for(var l=0,a=clipPos(this.doc,e);l<t;++l){var c=cursorCoords(this,a,"div");if(null==s?s=c.left:c.left=s,a=o(this,c,n,r),a.hitSide)break}return a},moveV:methodOp(function(e,t){var r=this,i=this.doc,n=[],s=!r.display.shift&&!i.extend&&i.sel.somethingSelected();if(i.extendSelectionsBy(function(l){if(s)return e<0?l.from():l.to();var a=cursorCoords(r,l.head,"div");null!=l.goalColumn&&(a.left=l.goalColumn),n.push(a.left);var c=o(r,a,e,t);return"page"==t&&l==i.sel.primary()&&addToScrollPos(r,null,charCoords(r,c,"div").top-a.top),c},sel_move),n.length)for(var l=0;l<i.sel.ranges.length;l++)i.sel.ranges[l].goalColumn=n[l]}),findWordAt:function(e){var t=this.doc,r=getLine(t,e.line).text,i=e.ch,o=e.ch;if(r){var n=this.getHelper(e,"wordChars");(e.xRel<0||o==r.length)&&i?--i:++o;for(var s=r.charAt(i),l=isWordChar(s,n)?function(e){return isWordChar(e,n)}:/\s/.test(s)?function(e){return/\s/.test(e)}:function(e){return!/\s/.test(e)&&!isWordChar(e)};i>0&&l(r.charAt(i-1));)--i;for(;o<r.length&&l(r.charAt(o));)++o}return new Range(Pos(e.line,i),Pos(e.line,o))},toggleOverwrite:function(e){null!=e&&e==this.state.overwrite||((this.state.overwrite=!this.state.overwrite)?addClass(this.display.cursorDiv,"CodeMirror-overwrite"):rmClass(this.display.cursorDiv,"CodeMirror-overwrite"),signal(this,"overwriteToggle",this,this.state.overwrite))},hasFocus:function(){return this.display.input.getField()==activeElt()},isReadOnly:function(){return!(!this.options.readOnly&&!this.doc.cantEdit)},scrollTo:methodOp(function(e,t){null==e&&null==t||resolveScrollToPos(this),null!=e&&(this.curOp.scrollLeft=e),null!=t&&(this.curOp.scrollTop=t)}),getScrollInfo:function(){var e=this.display.scroller;return{left:e.scrollLeft,top:e.scrollTop,height:e.scrollHeight-scrollGap(this)-this.display.barHeight,width:e.scrollWidth-scrollGap(this)-this.display.barWidth,clientHeight:displayHeight(this),clientWidth:displayWidth(this)}},scrollIntoView:methodOp(function(e,t){if(null==e?(e={from:this.doc.sel.primary().head,to:null},null==t&&(t=this.options.cursorScrollMargin)):"number"==typeof e?e={from:Pos(e,0),to:null}:null==e.from&&(e={from:e,to:null}),e.to||(e.to=e.from),e.margin=t||0,null!=e.from.line)resolveScrollToPos(this),this.curOp.scrollToPos=e;else{var r=calculateScrollPos(this,Math.min(e.from.left,e.to.left),Math.min(e.from.top,e.to.top)-e.margin,Math.max(e.from.right,e.to.right),Math.max(e.from.bottom,e.to.bottom)+e.margin);this.scrollTo(r.scrollLeft,r.scrollTop)}}),setSize:methodOp(function(e,t){function r(e){return"number"==typeof e||/^\d+$/.test(String(e))?e+"px":e}var i=this;null!=e&&(i.display.wrapper.style.width=r(e)),null!=t&&(i.display.wrapper.style.height=r(t)),i.options.lineWrapping&&clearLineMeasurementCache(this);var o=i.display.viewFrom;i.doc.iter(o,i.display.viewTo,function(e){if(e.widgets)for(var t=0;t<e.widgets.length;t++)if(e.widgets[t].noHScroll){regLineChange(i,o,"widget");break}++o}),i.curOp.forceUpdate=!0,signal(i,"refresh",this)}),operation:function(e){return runInOp(this,e)},refresh:methodOp(function(){var e=this.display.cachedTextHeight;regChange(this),this.curOp.forceUpdate=!0,clearCaches(this),this.scrollTo(this.doc.scrollLeft,this.doc.scrollTop),updateGutterSpace(this),(null==e||Math.abs(e-textHeight(this.display))>.5)&&estimateLineHeights(this),signal(this,"refresh",this)}),swapDoc:methodOp(function(e){var t=this.doc;return t.cm=null,attachDoc(this,e),clearCaches(this),this.display.input.reset(),this.scrollTo(e.scrollLeft,e.scrollTop),this.curOp.forceScroll=!0,signalLater(this,"swapDoc",this,t),t}),getInputField:function(){return this.display.input.getField()},getWrapperElement:function(){return this.display.wrapper},getScrollerElement:function(){return this.display.scroller},getGutterElement:function(){return this.display.gutters}},eventMixin(CodeMirror),CodeMirror.version="5.17.1",CodeMirror}),e("skylark-ui-coder/main",["skylark-utils/query","./Coder"],function(e){return e}),e("skylark-ui-coder",["skylark-ui-coder/main"],function(e){return e})},this);
//# sourceMappingURL=sourcemaps/skylark-ui-coder.js.map