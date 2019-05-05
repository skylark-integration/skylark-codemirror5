/**
 * skylark-codemirror - A version of codemirror 5.45  that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror/
 * @license MIT
 */
define(["../line/pos","../measurement/position_measurement","../util/bidi","../util/misc"],function(e,t,r,n){"use strict";function l(e,t,r){let l=n.skipExtendingChars(e.text,t+r,r);return l<0||l>e.text.length?null:l}function i(t,r,n){let i=l(t,r.ch,n);return null==i?null:new e.Pos(r.line,i,n<0?"after":"before")}return{moveLogically:i,endOfLine:function(i,o,f,c,u){if(i){let i=r.getOrder(f,o.doc.direction);if(i){let r,s=u<0?n.lst(i):i[0],a=u<0==(1==s.level)?"after":"before";if(s.level>0||"rtl"==o.doc.direction){let e=t.prepareMeasureForLine(o,f);r=u<0?f.text.length-1:0;let i=t.measureCharPrepared(o,e,r).top;r=n.findFirst(r=>t.measureCharPrepared(o,e,r).top==i,u<0==(1==s.level)?s.from:s.to-1,r),"before"==a&&(r=l(f,r,1))}else r=u<0?s.to:s.from;return new e.Pos(c,r,a)}}return new e.Pos(c,u<0?f.text.length:0,u<0?"before":"after")},moveVisually:function(n,o,f,c){let u=r.getOrder(o,n.doc.direction);if(!u)return i(o,f,c);f.ch>=o.text.length?(f.ch=o.text.length,f.sticky="before"):f.ch<=0&&(f.ch=0,f.sticky="after");let s=r.getBidiPartAt(u,f.ch,f.sticky),a=u[s];if("ltr"==n.doc.direction&&a.level%2==0&&(c>0?a.to>f.ch:a.from<f.ch))return i(o,f,c);let d,h=(t,r)=>l(o,t instanceof e.Pos?t.ch:t,r),g=e=>n.options.lineWrapping?(d=d||t.prepareMeasureForLine(n,o),t.wrappedLineExtentChar(n,o,d,e)):{begin:0,end:o.text.length},p=g("before"==f.sticky?h(f,-1):f.ch);if("rtl"==n.doc.direction||1==a.level){let t=1==a.level==c<0,r=h(f,t?1:-1);if(null!=r&&(t?r<=a.to&&r<=p.end:r>=a.from&&r>=p.begin)){let n=t?"before":"after";return new e.Pos(f.line,r,n)}}let m=(t,r,n)=>{let l=(t,r)=>r?new e.Pos(f.line,h(t,1),"before"):new e.Pos(f.line,t,"after");for(;t>=0&&t<u.length;t+=r){let e=u[t],i=r>0==(1!=e.level),o=i?n.begin:h(n.end,-1);if(e.from<=o&&o<e.to)return l(o,i);if(o=i?e.from:h(e.to,-1),n.begin<=o&&o<n.end)return l(o,i)}},b=m(s+c,c,p);if(b)return b;let x=c>0?p.end:h(p.begin,-1);return null==x||c>0&&x==o.text.length||!(b=m(c>0?0:u.length-1,c,g(x)))?null:b}}});
//# sourceMappingURL=../../sourcemaps/primitives/input/movement.js.map