/**
 * skylark-codemirror5 - A version of codemirror 5.17.1  that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror5/
 * @license MIT
 */
define(["../line/saw_special_spans","../line/spans","../line/utils_line","../measurement/position_measurement","../util/browser","../util/dom","../util/event","../util/misc","./update_line","./highlight_worker","./line_numbers","./scrollbars","./selection","./update_lines","./view_tracking"],function(e,i,t,s,r,l,n,o,d,a,p,u,c,h,f){"use strict";class v{constructor(e,i,t){let r=e.display;this.viewport=i,this.visible=h.visibleLines(r,e.doc,i),this.editorIsHidden=!r.wrapper.offsetWidth,this.wrapperHeight=r.wrapper.clientHeight,this.wrapperWidth=r.wrapper.clientWidth,this.oldDisplayWidth=s.displayWidth(e),this.force=t,this.dims=s.getDimensions(e),this.events=[]}signal(e,i){n.hasHandler(e,i)&&this.events.push(arguments)}finish(){for(let e=0;e<this.events.length;e++)n.signal.apply(null,this.events[e])}}function w(n,d){let u=n.display,c=n.doc;if(d.editorIsHidden)return f.resetView(n),!1;if(!d.force&&d.visible.from>=u.viewFrom&&d.visible.to<=u.viewTo&&(null==u.updateLineNumbers||u.updateLineNumbers>=u.viewTo)&&u.renderedView==u.view&&0==f.countDirtyView(n))return!1;p.maybeUpdateLineNumberWidth(n)&&(f.resetView(n),d.dims=s.getDimensions(n));let h=c.first+c.size,v=Math.max(d.visible.from-n.options.viewportMargin,c.first),w=Math.min(h,d.visible.to+n.options.viewportMargin);u.viewFrom<v&&v-u.viewFrom<20&&(v=Math.max(c.first,u.viewFrom)),u.viewTo>w&&u.viewTo-w<20&&(w=Math.min(h,u.viewTo)),e.sawCollapsedSpans&&(v=i.visualLineNo(n.doc,v),w=i.visualLineEndNo(n.doc,w));let m=v!=u.viewFrom||w!=u.viewTo||u.lastWrapHeight!=d.wrapperHeight||u.lastWrapWidth!=d.wrapperWidth;f.adjustView(n,v,w),u.viewOffset=i.heightAtLine(t.getLine(n.doc,u.viewFrom)),n.display.mover.style.top=u.viewOffset+"px";let y=f.countDirtyView(n);if(!m&&0==y&&!d.force&&u.renderedView==u.view&&(null==u.updateLineNumbers||u.updateLineNumbers>=u.viewTo))return!1;let g=function(e){if(e.hasFocus())return null;let i=l.activeElt();if(!i||!l.contains(e.display.lineDiv,i))return null;let t={activeElt:i};if(window.getSelection){let i=window.getSelection();i.anchorNode&&i.extend&&l.contains(e.display.lineDiv,i.anchorNode)&&(t.anchorNode=i.anchorNode,t.anchorOffset=i.anchorOffset,t.focusNode=i.focusNode,t.focusOffset=i.focusOffset)}return t}(n);return y>4&&(u.lineDiv.style.display="none"),function(e,i,s){let n=e.display,d=e.options.lineNumbers,a=n.lineDiv,p=a.firstChild;function u(i){let t=i.nextSibling;return r.webkit&&r.mac&&e.display.currentWheelTarget==i?i.style.display="none":i.parentNode.removeChild(i),t}let c=n.view,h=n.viewFrom;for(let r=0;r<c.length;r++){let n=c[r];if(n.hidden);else if(n.node&&n.node.parentNode==a){for(;p!=n.node;)p=u(p);let a=d&&null!=i&&i<=h&&n.lineNumber;n.changes&&(o.indexOf(n.changes,"gutter")>-1&&(a=!1),r.updateLineForChanges(e,n,h,s)),a&&(l.removeChildren(n.lineNumber),n.lineNumber.appendChild(document.createTextNode(t.lineNumberFor(e.options,h)))),p=n.node.nextSibling}else{let i=r.buildLineElement(e,n,h,s);a.insertBefore(i,p)}h+=n.size}for(;p;)p=u(p)}(n,u.updateLineNumbers,d.dims),y>4&&(u.lineDiv.style.display=""),u.renderedView=u.view,function(e){if(e&&e.undefined&&e.undefined!=l.activeElt()&&(e.undefined.focus(),e.anchorNode&&l.contains(document.body,e.anchorNode)&&l.contains(document.body,e.focusNode))){let i=window.getSelection(),t=document.createRange();t.setEnd(e.anchorNode,e.anchorOffset),t.collapse(!1),i.removeAllRanges(),i.addRange(t),i.extend(e.focusNode,e.focusOffset)}}(g),l.removeChildren(u.cursorDiv),l.removeChildren(u.selectionDiv),u.gutters.style.height=u.sizer.style.minHeight=0,m&&(u.lastWrapHeight=d.wrapperHeight,u.lastWrapWidth=d.wrapperWidth,a.startWorker(n,400)),u.updateLineNumbers=null,!0}function m(e,i){let t=i.viewport;for(let r=!0;(r&&e.options.lineWrapping&&i.oldDisplayWidth!=s.displayWidth(e)||(t&&null!=t.top&&(t={top:Math.min(e.doc.height+s.paddingVert(e.display)-s.displayHeight(e),t.top)}),i.visible=h.visibleLines(e.display,e.doc,t),!(i.visible.from>=e.display.viewFrom&&i.visible.to<=e.display.viewTo)))&&w(e,i);r=!1){h.updateHeightsInViewport(e);let t=u.measureForScrollbars(e);c.updateSelection(e),u.updateScrollbars(e,t),y(e,t),i.force=!1}i.undefined(e,"update",e),e.display.viewFrom==e.display.reportedViewFrom&&e.display.viewTo==e.display.reportedViewTo||(i.undefined(e,"viewportChange",e,e.display.viewFrom,e.display.viewTo),e.display.reportedViewFrom=e.display.viewFrom,e.display.reportedViewTo=e.display.viewTo)}function y(e,i){e.display.sizer.style.minHeight=i.docHeight+"px",e.display.heightForcer.style.top=i.docHeight+"px",e.display.gutters.style.height=i.docHeight+e.display.barHeight+s.scrollGap(e)+"px"}return{DisplayUpdate:v,maybeClipScrollbars:function(e){let i=e.display;!i.scrollbarsClipped&&i.scroller.offsetWidth&&(i.nativeBarWidth=i.scroller.offsetWidth-i.scroller.clientWidth,i.heightForcer.style.height=s.scrollGap(e)+"px",i.sizer.style.marginBottom=-i.nativeBarWidth+"px",i.sizer.style.borderRightWidth=s.scrollGap(e)+"px",i.scrollbarsClipped=!0)},updateDisplayIfNeeded:w,postUpdateDisplay:m,updateDisplaySimple:function(e,i){let t=new v(e,i);if(w(e,t)){h.updateHeightsInViewport(e),m(e,t);let i=u.measureForScrollbars(e);c.updateSelection(e),u.updateScrollbars(e,i),y(e,i),t.finish()}},updateGutterSpace:function(e){let i=e.display.gutters.offsetWidth;e.display.sizer.style.marginLeft=i+"px"},setDocumentHeight:y}});
//# sourceMappingURL=../../sourcemaps/lib/display/update_display.js.map
