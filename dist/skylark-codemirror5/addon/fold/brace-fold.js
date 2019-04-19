/**
 * skylark-codemirror5 - A version of codemirror 5.17.1  that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror5/
 * @license MIT
 */
define(["../../CodeMirror"],function(e){"use strict";e.registerHelper("fold","brace",function(n,r){var t,i=r.line,l=n.getLine(i);function o(o){for(var f=r.ch,s=0;;){var a=f<=0?-1:l.lastIndexOf(o,f-1);if(-1!=a){if(1==s&&a<r.ch)break;if(t=n.getTokenTypeAt(e.Pos(i,a+1)),!/^(comment|string)/.test(t))return a+1;f=a-1}else{if(1==s)break;s=1,f=l.length}}}var f="{",s="}",a=o("{");if(null==a&&(f="[",s="]",a=o("[")),null!=a){var u,g,d=1,v=n.lastLine();e:for(var c=i;c<=v;++c)for(var P=n.getLine(c),k=c==i?a:0;;){var p=P.indexOf(f,k),h=P.indexOf(s,k);if(p<0&&(p=P.length),h<0&&(h=P.length),(k=Math.min(p,h))==P.length)break;if(n.getTokenTypeAt(e.Pos(c,k+1))==t)if(k==p)++d;else if(!--d){u=c,g=k;break e}++k}if(null!=u&&i!=u)return{from:e.Pos(i,a),to:e.Pos(u,g)}}}),e.registerHelper("fold","import",function(n,r){function t(r){if(r<n.firstLine()||r>n.lastLine())return null;var t=n.getTokenAt(e.Pos(r,1));if(/\S/.test(t.string)||(t=n.getTokenAt(e.Pos(r,t.end+1))),"keyword"!=t.type||"import"!=t.string)return null;for(var i=r,l=Math.min(n.lastLine(),r+10);i<=l;++i){var o=n.getLine(i).indexOf(";");if(-1!=o)return{startCh:t.end,end:e.Pos(i,o)}}}var i,l=r.line,o=t(l);if(!o||t(l-1)||(i=t(l-2))&&i.end.line==l-1)return null;for(var f=o.end;;){var s=t(f.line+1);if(null==s)break;f=s.end}return{from:n.clipPos(e.Pos(l,o.startCh+1)),to:f}}),e.registerHelper("fold","include",function(n,r){function t(r){if(r<n.firstLine()||r>n.lastLine())return null;var t=n.getTokenAt(e.Pos(r,1));return/\S/.test(t.string)||(t=n.getTokenAt(e.Pos(r,t.end+1))),"meta"==t.type&&"#include"==t.string.slice(0,8)?t.start+8:void 0}var i=r.line,l=t(i);if(null==l||null!=t(i-1))return null;for(var o=i;;){if(null==t(o+1))break;++o}return{from:e.Pos(i,l+1),to:n.clipPos(e.Pos(o))}})});
//# sourceMappingURL=../../sourcemaps/addon/fold/brace-fold.js.map