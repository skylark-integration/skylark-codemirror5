/**
 * skylark-codemirror5 - A version of codemirror 5.17.1  that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror5/
 * @license MIT
 */
define(["../util/misc","../modes","../util/StringStream","./utils_line","./pos"],function(e,t,s,o,n){"use strict";class i{constructor(e,t){this.state=e,this.lookAhead=t}}class a{constructor(e,t,s,o){this.state=t,this.doc=e,this.line=s,this.maxLookAhead=o||0,this.baseTokens=null,this.baseTokenPos=1}lookAhead(e){let t=this.doc.undefined(this.line+e);return null!=t&&e>this.maxLookAhead&&(this.maxLookAhead=e),t}baseToken(e){if(!this.baseTokens)return null;for(;this.baseTokens[this.baseTokenPos]<=e;)this.baseTokenPos+=2;let t=this.baseTokens[this.baseTokenPos+1];return{type:t&&t.replace(/( |^)overlay .*/,""),size:this.baseTokens[this.baseTokenPos]-e}}nextLine(){this.line++,this.maxLookAhead>0&&this.maxLookAhead--}static fromSaved(e,s,o){return s instanceof i?new a(e,t.copyState(e.mode,s.state),o,s.lookAhead):new a(e,t.copyState(e.mode,s),o)}save(e){let s=!1!==e?t.copyState(this.doc.mode,this.state):this.state;return this.maxLookAhead>0?new i(s,this.maxLookAhead):s}}function l(e,t,s,o){let n=[e.state.modeGen],i={};m(e,t.text,e.doc.mode,s,(e,t)=>n.push(e,t),i,o);let a=s.state;for(let o=0;o<e.state.overlays.length;++o){s.baseTokens=n;let l=e.state.overlays[o],r=1,h=0;s.state=!0,m(e,t.text,l.mode,s,(e,t)=>{let s=r;for(;h<e;){let t=n[r];t>e&&n.splice(r,1,e,n[r+1],t),r+=2,h=Math.min(e,t)}if(t)if(l.opaque)n.splice(s,r-s,e,"overlay "+t),r=s+2;else for(;s<r;s+=2){let e=n[s+1];n[s+1]=(e?e+" ":"")+"overlay "+t}},i),s.state=a,s.baseTokens=null,s.baseTokenPos=1}return{styles:n,classes:i.bgClass||i.textClass?i:null}}function r(s,n,l){let r=s.doc,d=s.display;if(!r.mode.undefined)return new a(r,!0,n);let u=function(t,s,n){let a,l,r=t.doc,h=n?-1:s-(t.doc.mode.undefined?1e3:100);for(let d=s;d>h;--d){if(d<=r.first)return r.first;let s=o.getLine(r,d-1),h=s.stateAfter;if(h&&(!n||d+(h instanceof i?h.lookAhead:0)<=r.modeFrontier))return d;let u=e.countColumn(s.text,null,t.options.tabSize);(null==l||a>u)&&(l=d-1,a=u)}return l}(s,n,l),f=u>r.first&&o.getLine(r,u-1).stateAfter,c=f?a.fromSaved(r,f,u):new a(r,t.startState(r.mode),u);return r.iter(u,n,e=>{h(s,e.text,c);let t=c.line;e.stateAfter=t==n-1||t%5==0||t>=d.viewFrom&&t<d.viewTo?c.save():null,c.nextLine()}),l&&(r.modeFrontier=c.line),c}function h(e,t,o,n){let i=e.doc.mode,a=new s(t,e.options.tabSize,o);for(a.start=a.pos=n||0,""==t&&d(i,o.state);!a.eol();)u(i,a,o.state),a.start=a.pos}function d(e,s){if(e.blankLine)return e.blankLine(s);if(!e.undefined)return;let o=t.innerMode(e,s);return o.mode.blankLine?o.mode.blankLine(o.state):void 0}function u(e,s,o,n){for(let i=0;i<10;i++){n&&(n[0]=t.innerMode(e,o).mode);let i=e.token(s,o);if(s.pos>s.start)return i}throw new Error("Mode "+e.name+" failed to advance stream.")}class f{constructor(e,t,s){this.start=e.start,this.end=e.pos,this.string=e.current(),this.type=t||null,this.state=s}}function c(e,t){if(e)for(;;){let s=e.match(/(?:^|\s+)line-(background-)?(\S+)/);if(!s)break;e=e.slice(0,s.index)+e.slice(s.index+s[0].length);let o=s[1]?"bgClass":"textClass";null==t[o]?t[o]=s[2]:new RegExp("(?:^|s)"+s[2]+"(?:$|s)").test(t[o])||(t[o]+=" "+s[2])}return e}function m(e,t,o,n,i,a,l){let r=o.flattenSpans;null==r&&(r=e.options.flattenSpans);let f,m=0,p=null,k=new s(t,e.options.tabSize,n),g=e.options.addModeClass&&[null];for(""==t&&c(d(o,n.state),a);!k.eol();){if(k.pos>e.options.maxHighlightLength?(r=!1,l&&h(e,t,n,k.pos),k.pos=t.length,f=null):f=c(u(o,k,n.state,g),a),g){let e=g[0].name;e&&(f="m-"+(f?e+" "+f:e))}if(!r||p!=f){for(;m<k.start;)i(m=Math.min(k.start,m+5e3),p);p=f}k.start=k.pos}for(;m<k.pos;){let e=Math.min(k.pos,m+5e3);i(e,p),m=e}}return{highlightLine:l,getLineStyles:function(e,s,n){if(!s.styles||s.styles[0]!=e.state.modeGen){let i=r(e,o.lineNo(s)),a=s.text.length>e.options.maxHighlightLength&&t.copyState(e.doc.mode,i.state),h=l(e,s,i);a&&(i.state=a),s.stateAfter=i.save(!a),s.styles=h.styles,h.classes?s.styleClasses=h.classes:s.styleClasses&&(s.styleClasses=null),n===e.doc.highlightFrontier&&(e.doc.modeFrontier=Math.max(e.doc.modeFrontier,++e.doc.highlightFrontier))}return s.styles},getContextBefore:r,processLine:h,takeToken:function(e,i,a,l){let h,d=e.doc,c=d.mode;i=n.clipPos(d,i);let m,p=o.getLine(d,i.line),k=r(e,i.line,a),g=new s(p.text,e.options.tabSize,k);for(l&&(m=[]);(l||g.pos<i.ch)&&!g.eol();)g.start=g.pos,h=u(c,g,k.state),l&&m.push(new f(g,h,t.copyState(d.mode,k.state)));return l?m:new f(g,h,k.state)},retreatFrontier:function(e,t){if(e.modeFrontier=Math.min(e.modeFrontier,t),e.highlightFrontier<t-10)return;let s=e.first;for(let n=t-1;n>s;n--){let a=o.getLine(e,n).stateAfter;if(a&&(!(a instanceof i)||n+a.lookAhead<t)){s=n+1;break}}e.highlightFrontier=Math.min(e.highlightFrontier,s)}}});
//# sourceMappingURL=../../sourcemaps/lib/line/highlight.js.map
