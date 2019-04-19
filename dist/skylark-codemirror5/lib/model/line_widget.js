/**
 * skylark-codemirror5 - A version of codemirror 5.17.1  that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror5/
 * @license MIT
 */
define(["../display/operations","../display/scrolling","../display/view_tracking","../line/spans","../line/utils_line","../measurement/widgets","./changes","../util/event","../util/operation_group"],function(e,i,t,n,l,s,h,d,g){"use strict";class r{constructor(e,i,t){if(t)for(let e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);this.doc=e,this.node=i}clear(){let i=this.doc.cm,n=this.line.widgets,h=this.line,d=l.lineNo(h);if(null==d||!n)return;for(let e=0;e<n.length;++e)n[e]==this&&n.splice(e--,1);n.length||(h.widgets=null);let r=s.widgetHeight(this);l.updateLineHeight(h,Math.max(0,h.height-r)),i&&(e.runInOp(i,()=>{o(i,h,-r),t.regLineChange(i,d,"widget")}),g.signalLater(i,"lineWidgetCleared",i,this,d))}changed(){let i=this.height,t=this.doc.cm,h=this.line;this.height=null;let d=s.widgetHeight(this)-i;d&&(n.lineIsHidden(this.doc,h)||l.updateLineHeight(h,h.height+d),t&&e.runInOp(t,()=>{t.curOp.forceUpdate=!0,o(t,h,d),g.signalLater(t,"lineWidgetChanged",t,this,l.lineNo(h))}))}}function o(e,t,l){n.heightAtLine(t)<(e.curOp&&e.curOp.scrollTop||e.doc.scrollTop)&&i.addToScrollTop(e,l)}return d.eventMixin(r),{LineWidget:r,addLineWidget:function(e,t,d,o){let a=new r(e,d,o),c=e.cm;return c&&a.noHScroll&&(c.display.alignWidgets=!0),h.changeLine(e,t,"widget",t=>{let h=t.widgets||(t.widgets=[]);if(null==a.insertAt?h.push(a):h.splice(Math.min(h.length-1,Math.max(0,a.insertAt)),0,a),a.line=t,c&&!n.lineIsHidden(e,t)){let h=n.heightAtLine(t)<e.scrollTop;l.updateLineHeight(t,t.height+s.widgetHeight(a)),h&&i.addToScrollTop(c,a.height),c.curOp.forceUpdate=!0}return!0}),c&&g.signalLater(c,"lineWidgetAdded",c,a,"number"==typeof t?t:l.lineNo(t)),a}}});
//# sourceMappingURL=../../sourcemaps/lib/model/line_widget.js.map
