/**
 * skylark-codemirror - A version of codemirror 5.45  that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror/
 * @license MIT
 */
define(["../util/misc","./pos","./saw_special_spans","./utils_line"],function(e,n,t,r){"use strict";function l(e,n,t){this.marker=e,this.from=n,this.to=t}function i(e,n){if(e)for(let t=0;t<e.length;++t){let r=e[t];if(r.marker==n)return r}}function o(e){for(let n=0;n<e.length;++n){let t=e[n];null!=t.from&&t.from==t.to&&!1!==t.marker.clearWhenEmpty&&e.splice(n--,1)}return e.length?e:null}function f(e){return e.inclusiveLeft?-1:0}function a(e){return e.inclusiveRight?1:0}function u(e,t){let r=e.lines.length-t.lines.length;if(0!=r)return r;let l=e.find(),i=t.find(),o=n.cmp(l.from,i.from)||f(e)-f(t);if(o)return-o;let u=n.cmp(l.to,i.to)||a(e)-a(t);return u||t.id-e.id}function m(e,n){let r,l=t.sawCollapsedSpans&&e.markedSpans;if(l)for(let e,t=0;t<l.length;++t)(e=l[t]).marker.collapsed&&null==(n?e.from:e.to)&&(!r||u(r,e.marker)<0)&&(r=e.marker);return r}function s(e){return m(e,!0)}function c(e){return m(e,!1)}function p(e){let n;for(;n=s(e);)e=n.find(-1,!0).line;return e}function h(e,n){let r=t.sawCollapsedSpans&&n.markedSpans;if(r)for(let t,l=0;l<r.length;++l)if((t=r[l]).marker.collapsed){if(null==t.from)return!0;if(!t.marker.widgetNode&&0==t.from&&t.marker.inclusiveLeft&&d(e,n,t))return!0}}function d(e,n,t){if(null==t.to){let n=t.marker.find(1,!0);return d(e,n.line,i(n.line.markedSpans,t.marker))}if(t.marker.inclusiveRight&&t.to==n.text.length)return!0;for(let r,l=0;l<n.markedSpans.length;++l)if((r=n.markedSpans[l]).marker.collapsed&&!r.marker.widgetNode&&r.from==t.to&&(null==r.to||r.to!=t.from)&&(r.marker.inclusiveLeft||t.marker.inclusiveRight)&&d(e,n,r))return!0}function k(e){if(0==e.height)return 0;let n,t=e.text.length,r=e;for(;n=s(r);){let e=n.find(0,!0);r=e.from.line,t+=e.from.ch-e.to.ch}for(r=e;n=c(r);){let e=n.find(0,!0);t-=r.text.length-e.from.ch,t+=(r=e.to.line).text.length-e.to.ch}return t}return{MarkedSpan:l,getMarkedSpanFor:i,removeMarkedSpan:function(e,n){let t;for(let r=0;r<e.length;++r)e[r]!=n&&(t||(t=[])).push(e[r]);return t},addMarkedSpan:function(e,n){e.markedSpans=e.markedSpans?e.markedSpans.concat([n]):[n],n.marker.attachLine(e)},stretchSpansOverChange:function(t,f){if(f.full)return null;let a=r.isLine(t,f.from.line)&&r.getLine(t,f.from.line).markedSpans,u=r.isLine(t,f.to.line)&&r.getLine(t,f.to.line).markedSpans;if(!a&&!u)return null;let m=f.from.ch,s=f.to.ch,c=0==n.cmp(f.from,f.to),p=function(e,n,t){let r;if(e)for(let i=0;i<e.length;++i){let o=e[i],f=o.marker;if(null==o.from||(f.inclusiveLeft?o.from<=n:o.from<n)||o.from==n&&"bookmark"==f.type&&(!t||!o.marker.insertLeft)){let e=null==o.to||(f.inclusiveRight?o.to>=n:o.to>n);(r||(r=[])).push(new l(f,o.from,e?null:o.to))}}return r}(a,m,c),h=function(e,n,t){let r;if(e)for(let i=0;i<e.length;++i){let o=e[i],f=o.marker;if(null==o.to||(f.inclusiveRight?o.to>=n:o.to>n)||o.from==n&&"bookmark"==f.type&&(!t||o.marker.insertLeft)){let e=null==o.from||(f.inclusiveLeft?o.from<=n:o.from<n);(r||(r=[])).push(new l(f,e?null:o.from-n,null==o.to?null:o.to-n))}}return r}(u,s,c),d=1==f.text.length,k=e.lst(f.text).length+(d?m:0);if(p)for(let e=0;e<p.length;++e){let n=p[e];if(null==n.to){let e=i(h,n.marker);e?d&&(n.to=null==e.to?null:e.to+k):n.to=m}}if(h)for(let e=0;e<h.length;++e){let n=h[e];null!=n.to&&(n.to+=k),null==n.from?i(p,n.marker)||(n.from=k,d&&(p||(p=[])).push(n)):(n.from+=k,d&&(p||(p=[])).push(n))}p&&(p=o(p)),h&&h!=p&&(h=o(h));let g=[p];if(!d){let e,n=f.text.length-2;if(n>0&&p)for(let n=0;n<p.length;++n)null==p[n].to&&(e||(e=[])).push(new l(p[n].marker,null,null));for(let t=0;t<n;++t)g.push(e);g.push(h)}return g},removeReadOnlyRanges:function(t,r,l){let i=null;if(t.iter(r.line,l.line+1,n=>{if(n.markedSpans)for(let t=0;t<n.markedSpans.length;++t){let r=n.markedSpans[t].marker;!r.readOnly||i&&-1!=e.indexOf(i,r)||(i||(i=[])).push(r)}}),!i)return null;let o=[{from:r,to:l}];for(let e=0;e<i.length;++e){let t=i[e],r=t.find(0);for(let e=0;e<o.length;++e){let l=o[e];if(n.cmp(l.to,r.from)<0||n.cmp(l.from,r.to)>0)continue;let i=[e,1],f=n.cmp(l.from,r.from),a=n.cmp(l.to,r.to);(f<0||!t.inclusiveLeft&&!f)&&i.push({from:l.from,to:r.from}),(a>0||!t.inclusiveRight&&!a)&&i.push({from:r.to,to:l.to}),o.splice.apply(o,i),e+=i.length-3}}return o},detachMarkedSpans:function(e){let n=e.markedSpans;if(n){for(let t=0;t<n.length;++t)n[t].marker.detachLine(e);e.markedSpans=null}},attachMarkedSpans:function(e,n){if(n){for(let t=0;t<n.length;++t)n[t].marker.attachLine(e);e.markedSpans=n}},compareCollapsedMarkers:u,collapsedSpanAtStart:s,collapsedSpanAtEnd:c,collapsedSpanAround:function(e,n){let r,l=t.sawCollapsedSpans&&e.markedSpans;if(l)for(let e=0;e<l.length;++e){let t=l[e];t.marker.collapsed&&(null==t.from||t.from<n)&&(null==t.to||t.to>n)&&(!r||u(r,t.marker)<0)&&(r=t.marker)}return r},conflictingCollapsedRange:function(e,l,i,o,u){let m=r.getLine(e,r.lineNo),s=t.sawCollapsedSpans&&m.markedSpans;if(s)for(let e=0;e<s.length;++e){let t=s[e];if(!t.marker.collapsed)continue;let r=t.marker.find(0),l=n.cmp(r.from,i)||f(t.marker)-f(u),m=n.cmp(r.to,o)||a(t.marker)-a(u);if(!(l>=0&&m<=0||l<=0&&m>=0)&&(l<=0&&(t.marker.inclusiveRight&&u.inclusiveLeft?n.cmp(r.to,i)>=0:n.cmp(r.to,i)>0)||l>=0&&(t.marker.inclusiveRight&&u.inclusiveLeft?n.cmp(r.from,o)<=0:n.cmp(r.from,o)<0)))return!0}},visualLine:p,visualLineEnd:function(e){let n;for(;n=c(e);)e=n.find(1,!0).line;return e},visualLineContinued:function(e){let n,t;for(;n=c(e);)e=n.find(1,!0).line,(t||(t=[])).push(e);return t},visualLineNo:function(e,n){let t=r.getLine(e,n),l=p(t);return t==l?n:r.lineNo(l)},visualLineEndNo:function(e,n){if(n>e.lastLine())return n;let t,l=r.getLine(e,n);if(!h(e,l))return n;for(;t=c(l);)l=t.find(1,!0).line;return r.lineNo(l)+1},lineIsHidden:h,heightAtLine:function(e){let n=0,t=(e=p(e)).parent;for(let r=0;r<t.lines.length;++r){let l=t.lines[r];if(l==e)break;n+=l.height}for(let e=t.parent;e;e=(t=e).parent)for(let r=0;r<e.children.length;++r){let l=e.children[r];if(l==t)break;n+=l.height}return n},lineLength:k,findMaxLine:function(e){let n=e.display,t=e.doc;n.maxLine=r.getLine(t,t.first),n.maxLineLength=k(n.maxLine),n.maxLineChanged=!0,t.iter(e=>{let t=k(e);t>n.maxLineLength&&(n.maxLineLength=t,n.maxLine=e)})}}});
//# sourceMappingURL=../../sourcemaps/primitives/line/spans.js.map
