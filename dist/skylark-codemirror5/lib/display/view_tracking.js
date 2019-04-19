/**
 * skylark-codemirror5 - A version of codemirror 5.17.1  that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror5/
 * @license MIT
 */
define(["../line/line_data","../line/saw_special_spans","../line/spans","../measurement/position_measurement","../util/misc"],function(e,i,n,l,s){"use strict";function w(e){e.display.viewFrom=e.display.viewTo=e.doc.first,e.display.view=[],e.display.viewOffset=0}function r(e,s,w,r){let o,t=l.findViewIndex(e,s),d=e.display.view;if(!i.sawCollapsedSpans||w==e.doc.first+e.doc.size)return{index:t,lineN:w};let a=e.display.viewFrom;for(let e=0;e<t;e++)a+=d[e].size;if(a!=s){if(r>0){if(t==d.length-1)return null;o=a+d[t].size-s,t++}else o=a-s;s+=o,w+=o}for(;n.visualLineNo(e.doc,w)!=w;){if(t==(r<0?0:d.length-1))return null;w+=r*d[t-(r<0?1:0)].size,t+=r}return{index:t,lineN:w}}return{regChange:function(l,s,o,t){null==s&&(s=l.doc.first),null==o&&(o=l.doc.first+l.doc.size),t||(t=0);let d=l.display;if(t&&o<d.viewTo&&(null==d.updateLineNumbers||d.updateLineNumbers>s)&&(d.updateLineNumbers=s),l.curOp.viewChanged=!0,s>=d.viewTo)i.sawCollapsedSpans&&n.visualLineNo(l.doc,s)<d.viewTo&&w(l);else if(o<=d.viewFrom)i.sawCollapsedSpans&&n.visualLineEndNo(l.doc,o+t)>d.viewFrom?w(l):(d.viewFrom+=t,d.viewTo+=t);else if(s<=d.viewFrom&&o>=d.viewTo)w(l);else if(s<=d.viewFrom){let e=r(l,o,o+t,1);e?(d.view=d.view.slice(e.index),d.viewFrom=e.lineN,d.viewTo+=t):w(l)}else if(o>=d.viewTo){let e=r(l,s,s,-1);e?(d.view=d.view.slice(0,e.index),d.viewTo=e.lineN):w(l)}else{let i=r(l,s,s,-1),n=r(l,o,o+t,1);i&&n?(d.view=d.view.slice(0,i.index).concat(e.buildViewArray(l,i.lineN,n.lineN)).concat(d.view.slice(n.index)),d.viewTo+=t):w(l)}let a=d.externalMeasured;a&&(o<a.lineN?a.lineN+=t:s<a.lineN+a.size&&(d.externalMeasured=null))},regLineChange:function(e,i,n){e.curOp.viewChanged=!0;let w=e.display,r=e.display.externalMeasured;if(r&&i>=r.lineN&&i<r.lineN+r.size&&(w.externalMeasured=null),i<w.viewFrom||i>=w.viewTo)return;let o=w.view[l.findViewIndex(e,i)];if(null==o.node)return;let t=o.changes||(o.changes=[]);-1==s.indexOf(t,n)&&t.push(n)},resetView:w,adjustView:function(i,n,s){let w=i.display;0==w.view.length||n>=w.viewTo||s<=w.viewFrom?(w.view=e.buildViewArray(i,n,s),w.viewFrom=n):(w.viewFrom>n?w.view=e.buildViewArray(i,n,w.viewFrom).concat(w.view):w.viewFrom<n&&(w.view=w.view.slice(l.findViewIndex(i,n))),w.viewFrom=n,w.viewTo<s?w.view=w.view.concat(e.buildViewArray(i,w.viewTo,s)):w.viewTo>s&&(w.view=w.view.slice(0,l.findViewIndex(i,s)))),w.viewTo=s},countDirtyView:function(e){let i=e.display.view,n=0;for(let e=0;e<i.length;e++){let l=i[e];l.hidden||l.node&&!l.changes||++n}return n}}});
//# sourceMappingURL=../../sourcemaps/lib/display/view_tracking.js.map
