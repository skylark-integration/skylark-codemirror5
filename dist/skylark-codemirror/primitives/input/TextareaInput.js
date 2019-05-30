/**
 * skylark-codemirror - A version of codemirror 5.45  that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror/
 * @license MIT
 */
define(["../display/operations","../display/selection","./input","../measurement/position_measurement","../measurement/widgets","../model/selection","../model/selection_updates","../util/browser","../util/dom","../util/event","../util/feature_detection","../util/misc"],function(e,t,i,s,n,o,l,r,a,p,c,u){"use strict";class h{constructor(e){this.cm=e,this.prevInput="",this.pollingFast=!1,this.polling=new u.Delayed,this.hasSelection=!1,this.composing=null}init(e){let t=this,s=this.cm;this.createField(e);const o=this.textarea;function l(e){if(!p.signalDOMEvent(s,e)){if(s.somethingSelected())i.setLastCopied({lineWise:!1,text:s.getSelections()});else{if(!s.options.lineWiseCopyCut)return;{let n=i.copyableRanges(s);i.setLastCopied({lineWise:!0,text:n.text}),"cut"==e.type?s.setSelections(n.ranges,null,u.sel_dontScroll):(t.prevInput="",o.value=n.text.join("\n"),a.selectInput(o))}}"cut"==e.type&&(s.state.cutIncoming=+new Date)}}e.wrapper.insertBefore(this.wrapper,e.wrapper.firstChild),r.ios&&(o.style.width="0px"),p.on(o,"input",()=>{r.ie&&r.ie_version>=9&&this.hasSelection&&(this.hasSelection=null),t.poll()}),p.on(o,"paste",e=>{p.signalDOMEvent(s,e)||i.handlePaste(e,s)||(s.state.pasteIncoming=+new Date,t.fastPoll())}),p.on(o,"cut",l),p.on(o,"copy",l),p.on(e.scroller,"paste",i=>{if(n.eventInWidget(e,i)||l.signalDOMEvent(s,i))return;if(!o.dispatchEvent)return s.state.pasteIncoming=+new Date,void t.focus();const l=new Event("paste");l.clipboardData=i.clipboardData,o.dispatchEvent(l)}),p.on(e.lineSpace,"selectstart",t=>{n.eventInWidget(e,t)||p.e_preventDefault(t)}),p.on(o,"compositionstart",()=>{let e=s.getCursor("from");t.composing&&t.composing.range.clear(),t.composing={start:e,range:s.markText(e,s.getCursor("to"),{className:"CodeMirror-composing"})}}),p.on(o,"compositionend",()=>{t.composing&&(t.poll(),t.composing.range.clear(),t.composing=null)})}createField(e){this.wrapper=i.hiddenTextarea(),this.textarea=this.wrapper.firstChild}prepareSelection(){let e=this.cm,i=e.display,n=e.doc,o=t.prepareSelection(e);if(e.options.moveInputWithCursor){let t=s.cursorCoords(e,n.sel.primary().head,"div"),l=i.wrapper.getBoundingClientRect(),r=i.lineDiv.getBoundingClientRect();o.teTop=Math.max(0,Math.min(i.wrapper.clientHeight-10,t.top+r.top-l.top)),o.teLeft=Math.max(0,Math.min(i.wrapper.clientWidth-10,t.left+r.left-l.left))}return o}showSelection(e){let t=this.cm.display;a.removeChildrenAndAdd(t.cursorDiv,e.cursors),a.removeChildrenAndAdd(t.selectionDiv,e.selection),null!=e.teTop&&(this.wrapper.style.top=e.teTop+"px",this.wrapper.style.left=e.teLeft+"px")}reset(e){if(this.contextMenuPending||this.composing)return;let t=this.cm;if(t.somethingSelected()){this.prevInput="";let e=t.getSelection();this.textarea.value=e,t.state.focused&&a.selectInput(this.textarea),r.ie&&r.ie_version>=9&&(this.hasSelection=e)}else e||(this.prevInput=this.textarea.value="",r.ie&&r.ie_version>=9&&(this.hasSelection=null))}getField(){return this.textarea}supportsTouch(){return!1}focus(){if("nocursor"!=this.cm.options.readOnly&&(!r.mobile||a.activeElt()!=this.textarea))try{this.textarea.focus()}catch(e){}}blur(){this.textarea.blur()}resetPosition(){this.wrapper.style.top=this.wrapper.style.left=0}receivedFocus(){this.slowPoll()}slowPoll(){this.pollingFast||this.polling.set(this.cm.options.pollInterval,()=>{this.poll(),this.cm.state.focused&&this.slowPoll()})}fastPoll(){let e=!1,t=this;t.pollingFast=!0,t.polling.set(20,function i(){t.poll()||e?(t.pollingFast=!1,t.slowPoll()):(e=!0,t.polling.set(60,i))})}poll(){let t=this.cm,s=this.textarea,n=this.prevInput;if(this.contextMenuPending||!t.state.focused||c.hasSelection(s)&&!n&&!this.composing||t.isReadOnly()||t.options.disableInput||t.state.keySeq)return!1;let o=s.value;if(o==n&&!t.somethingSelected())return!1;if(r.ie&&r.ie_version>=9&&this.hasSelection===o||r.mac&&/[\uf700-\uf7ff]/.test(o))return t.display.input.reset(),!1;if(t.doc.sel==t.display.selForContextMenu){let e=o.charCodeAt(0);if(8203!=e||n||(n="​"),8666==e)return this.reset(),this.cm.execCommand("undo")}let l=0,a=Math.min(n.length,o.length);for(;l<a&&n.charCodeAt(l)==o.charCodeAt(l);)++l;return e.runInOp(t,()=>{i.applyTextInput(t,o.slice(l),n.length-l,null,this.composing?"*compose":null),o.length>1e3||o.indexOf("\n")>-1?s.value=this.prevInput="":this.prevInput=o,this.composing&&(this.composing.range.clear(),this.composing.range=t.markText(this.composing.start,t.getCursor("to"),{className:"CodeMirror-composing"}))}),!0}ensurePolled(){this.pollingFast&&this.poll()&&(this.pollingFast=!1)}onKeyPress(){r.ie&&r.ie_version>=9&&(this.hasSelection=null),this.fastPoll()}onContextMenu(t){let i=this,n=i.cm,a=n.display,c=i.textarea;i.contextMenuPending&&i.contextMenuPending();let h=s.posFromMouse(n,t),d=a.scroller.scrollTop;if(!h||r.presto)return;n.options.resetSelectionOnContextMenu&&-1==n.doc.sel.contains(h)&&e.operation(n,l.setSelection)(n.doc,o.simpleSelection(h),u.sel_dontScroll);let g,m=c.style.cssText,f=i.wrapper.style.cssText,x=i.wrapper.offsetParent.getBoundingClientRect();function v(){if(null!=c.selectionStart){let e=n.somethingSelected(),t="​"+(e?c.value:"");c.value="⇚",c.value=t,i.prevInput=e?"":"​",c.selectionStart=1,c.selectionEnd=t.length,a.selForContextMenu=n.doc.sel}}function w(){if(i.contextMenuPending==w&&(i.contextMenuPending=!1,i.wrapper.style.cssText=f,c.style.cssText=m,r.ie&&r.ie_version<9&&a.scrollbars.setScrollTop(a.scroller.scrollTop=d),null!=c.selectionStart)){(!r.ie||r.ie&&r.ie_version<9)&&v();let t=0,s=()=>{a.selForContextMenu==n.doc.sel&&0==c.selectionStart&&c.selectionEnd>0&&"​"==i.prevInput?e.operation(n,l.selectAll)(n):t++<10?a.detectingSelectAll=setTimeout(s,500):(a.selForContextMenu=null,a.input.reset())};a.detectingSelectAll=setTimeout(s,200)}}if(i.wrapper.style.cssText="position: static",c.style.cssText=`position: absolute; width: 30px; height: 30px;\n      top: ${t.clientY-x.top-5}px; left: ${t.clientX-x.left-5}px;\n      z-index: 1000; background: ${r.ie?"rgba(255, 255, 255, .05)":"transparent"};\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);`,r.webkit&&(g=window.scrollY),a.input.focus(),r.webkit&&window.scrollTo(null,g),a.input.reset(),n.somethingSelected()||(c.value=i.prevInput=" "),i.contextMenuPending=w,a.selForContextMenu=n.doc.sel,clearTimeout(a.detectingSelectAll),r.ie&&r.ie_version>=9&&v(),r.captureRightClick){p.e_stop(t);let e=()=>{p.off(window,"mouseup",e),setTimeout(w,20)};p.on(window,"mouseup",e)}else setTimeout(w,50)}readOnlyChanged(e){e||this.reset(),this.textarea.disabled="nocursor"==e}setUneditable(){}}return h.prototype.needsContentAttribute=!1,h});
//# sourceMappingURL=../../sourcemaps/primitives/input/TextareaInput.js.map
