/**
 * skylark-codemirror5 - A version of codemirror 5.17.1  that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror5/
 * @license MIT
 */
define(["../line/pos","../line/spans","../line/utils_line","../util/event","../util/misc","./change_measurement","./document_data","./selection"],function(e,t,n,l,i,o,s,r){"use strict";function a(t,l){let i={from:e.copyPos(l.from),to:o.changeEnd(l),text:n.getBetween(t,l.from,l.to)};return d(t,i,l.from.line,l.to.line+1),s.linkedDocs(t,e=>d(e,i,l.from.line,l.to.line+1),!0),i}function h(e){for(;e.length;){if(!i.lst(e).ranges)break;e.pop()}}function g(e,t){let n=i.lst(t);n&&n.ranges&&n.equals(e)||t.push(e)}function d(e,t,n,l){let i=t["spans_"+e.id],o=0;e.iter(Math.max(e.first,n),Math.min(e.first+e.size,l),n=>{n.markedSpans&&((i||(i=t["spans_"+e.id]={}))[o]=n.markedSpans),++o})}function u(e){if(!e)return null;let t;for(let n=0;n<e.length;++n)e[n].marker.explicitlyCleared?t||(t=e.slice(0,n)):t&&t.push(e[n]);return t?t.length?t:null:e}return{History:function(e){this.done=[],this.undone=[],this.undoDepth=1/0,this.lastModTime=this.lastSelTime=0,this.lastOp=this.lastSelOp=null,this.lastOrigin=this.lastSelOrigin=null,this.generation=this.maxGeneration=e||1},historyChangeFromChange:a,addChangeToHistory:function(t,n,s,r){let d=t.history;d.undone.length=0;let u,c,f=+new Date;if((d.lastOp==r||d.lastOrigin==n.origin&&n.origin&&("+"==n.origin.charAt(0)&&d.lastModTime>f-(t.cm?t.cm.options.historyEventDelay:500)||"*"==n.origin.charAt(0)))&&(u=function(e,t){return t?(h(e.done),i.lst(e.done)):e.done.length&&!i.lst(e.done).ranges?i.lst(e.done):e.done.length>1&&!e.done[e.done.length-2].ranges?(e.done.pop(),i.lst(e.done)):void 0}(d,d.lastOp==r)))c=i.lst(u.changes),0==e.cmp(n.from,n.to)&&0==e.cmp(n.from,c.to)?c.to=o.changeEnd(n):u.changes.push(a(t,n));else{let e=i.lst(d.done);for(e&&e.ranges||g(t.sel,d.done),u={changes:[a(t,n)],generation:d.generation},d.done.push(u);d.done.length>d.undoDepth;)d.done.shift(),d.done[0].ranges||d.done.shift()}d.done.push(s),d.generation=++d.maxGeneration,d.lastModTime=d.lastSelTime=f,d.lastOp=d.lastSelOp=r,d.lastOrigin=d.lastSelOrigin=n.origin,c||l.signal(t,"historyAdded")},addSelectionToHistory:function(e,t,n,l){let o=e.history,s=l&&l.origin;n==o.lastSelOp||s&&o.lastSelOrigin==s&&(o.lastModTime==o.lastSelTime&&o.lastOrigin==s||function(e,t,n,l){let i=t.charAt(0);return"*"==i||"+"==i&&n.ranges.length==l.ranges.length&&n.somethingSelected()==l.somethingSelected()&&new Date-e.history.lastSelTime<=(e.cm?e.cm.options.historyEventDelay:500)}(e,s,i.lst(o.done),t))?o.done[o.done.length-1]=t:g(t,o.done),o.lastSelTime=+new Date,o.lastSelOrigin=s,o.lastSelOp=n,l&&!1!==l.clearRedo&&h(o.undone)},pushSelectionToHistory:g,mergeOldSpans:function(e,n){let l=function(e,t){let n=t["spans_"+e.id];if(!n)return null;let l=[];for(let e=0;e<t.text.length;++e)l.push(u(n[e]));return l}(e,n),i=t.stretchSpansOverChange(e,n);if(!l)return i;if(!i)return l;for(let e=0;e<l.length;++e){let t=l[e],n=i[e];if(t&&n)e:for(let e=0;e<n.length;++e){let l=n[e];for(let e=0;e<t.length;++e)if(t[e].marker==l.marker)continue e;t.push(l)}else n&&(l[e]=n)}return l},copyHistoryArray:function(e,t,n){let l=[];for(let s=0;s<e.length;++s){let a=e[s];if(a.ranges){l.push(n?r.Selection.prototype.deepCopy.call(a):a);continue}let h=a.changes,g=[];l.push({changes:g});for(let e=0;e<h.length;++e){let n,l=h[e];if(g.push({from:l.from,to:l.to,text:l.text}),t)for(var o in l)(n=o.match(/^spans_(\d+)$/))&&i.indexOf(t,Number(n[1]))>-1&&(i.lst(g)[o]=l[o],delete l[o])}}return l}}});
//# sourceMappingURL=../../sourcemaps/lib/model/history.js.map
