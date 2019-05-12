/**
 * skylark-ui-coder - The skylark coder widget
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-ui-coder/
 * @license MIT
 */
define(["../../Coder"],function(e){"use strict";e.multiplexingMode=function(n){function t(e,n,t,i){if("string"==typeof n){var r=e.indexOf(n,t);return i&&r>-1?r+n.length:r}var o=n.exec(t?e.slice(t):e);return o?o.index+t+(i?o[0].length:0):-1}var i=Array.prototype.slice.call(arguments,1);return{startState:function(){return{outer:e.startState(n),innerActive:null,inner:null}},copyState:function(t){return{outer:e.copyState(n,t.outer),innerActive:t.innerActive,inner:t.innerActive&&e.copyState(t.innerActive.mode,t.inner)}},token:function(r,o){if(o.innerActive){var l=o.innerActive,c=r.string;if(!l.close&&r.sol())return o.innerActive=o.inner=null,this.token(r,o);var s=l.close?t(c,l.close,r.pos,l.parseDelimiters):-1;if(s==r.pos&&!l.parseDelimiters)return r.match(l.close),o.innerActive=o.inner=null,l.delimStyle&&l.delimStyle+" "+l.delimStyle+"-close";s>-1&&(r.string=c.slice(0,s));var a=l.mode.token(r,o.inner);return s>-1&&(r.string=c),s==r.pos&&l.parseDelimiters&&(o.innerActive=o.inner=null),l.innerStyle&&(a=a?a+" "+l.innerStyle:l.innerStyle),a}for(var u=1/0,c=r.string,v=0;v<i.length;++v){var d=i[v],s=t(c,d.open,r.pos);if(s==r.pos)return d.parseDelimiters||r.match(d.open),o.innerActive=d,o.inner=e.startState(d.mode,n.indent?n.indent(o.outer,""):0),d.delimStyle&&d.delimStyle+" "+d.delimStyle+"-open";s!=-1&&s<u&&(u=s)}u!=1/0&&(r.string=c.slice(0,u));var A=n.token(r,o.outer);return u!=1/0&&(r.string=c),A},indent:function(t,i){var r=t.innerActive?t.innerActive.mode:n;return r.indent?r.indent(t.innerActive?t.inner:t.outer,i):e.Pass},blankLine:function(t){var r=t.innerActive?t.innerActive.mode:n;if(r.blankLine&&r.blankLine(t.innerActive?t.inner:t.outer),t.innerActive)"\n"===t.innerActive.close&&(t.innerActive=t.inner=null);else for(var o=0;o<i.length;++o){var l=i[o];"\n"===l.open&&(t.innerActive=l,t.inner=e.startState(l.mode,r.indent?r.indent(t.outer,""):0))}},electricChars:n.electricChars,innerMode:function(e){return e.inner?{state:e.inner,mode:e.innerActive.mode}:{state:e.outer,mode:n}}}}});
//# sourceMappingURL=../../sourcemaps/addon/mode/multiplex.js.map