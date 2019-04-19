/**
 * skylark-codemirror5 - A version of codemirror 5.17.1  that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror5/
 * @license MIT
 */
define(["../../CodeMirror"],function(e){"use strict";e.defineMode("oz",function(e){function t(e){return new RegExp("^(("+e.join(")|(")+"))\\b")}var n,r=/[\^@!\|<>#~\.\*\-\+\\/,=]/,a=/(<-)|(:=)|(=<)|(>=)|(<=)|(<:)|(>:)|(=:)|(\\=)|(\\=:)|(!!)|(==)|(::)/,i=/(:::)|(\.\.\.)|(=<:)|(>=:)/,o=["in","then","else","of","elseof","elsecase","elseif","catch","finally","with","require","prepare","import","export","define","do"],c=["end"],u=t(["true","false","nil","unit"]),f=t(["andthen","at","attr","declare","feat","from","lex","mod","div","mode","orelse","parser","prod","prop","scanner","self","syn","token"]),s=t(["local","proc","fun","case","class","if","cond","or","dis","choice","not","thread","try","raise","lock","for","suchthat","meth","functor"]),d=t(o),l=t(c);function m(e,t){if(e.eatSpace())return null;if(e.match(/[{}]/))return"bracket";if(e.match(/(\[])/))return"keyword";if(e.match(i)||e.match(a))return"operator";if(e.match(u))return"atom";var n=e.match(s);if(n)return t.doInCurrentLine?t.doInCurrentLine=!1:t.currentIndent++,"proc"==n[0]||"fun"==n[0]?t.tokenize=p:"class"==n[0]?t.tokenize=h:"meth"==n[0]&&(t.tokenize=k),"keyword";if(e.match(d)||e.match(f))return"keyword";if(e.match(l))return t.currentIndent--,"keyword";var o,c=e.next();if('"'==c||"'"==c)return t.tokenize=(o=c,function(e,t){for(var n,r=!1,a=!1;null!=(n=e.next());){if(n==o&&!r){a=!0;break}r=!r&&"\\"==n}return!a&&r||(t.tokenize=m),"string"}),t.tokenize(e,t);if(/[~\d]/.test(c)){if("~"==c){if(!/^[0-9]/.test(e.peek()))return null;if("0"==e.next()&&e.match(/^[xX][0-9a-fA-F]+/)||e.match(/^[0-9]*(\.[0-9]+)?([eE][~+]?[0-9]+)?/))return"number"}return"0"==c&&e.match(/^[xX][0-9a-fA-F]+/)||e.match(/^[0-9]*(\.[0-9]+)?([eE][~+]?[0-9]+)?/)?"number":null}return"%"==c?(e.skipToEnd(),"comment"):"/"==c&&e.eat("*")?(t.tokenize=z,z(e,t)):r.test(c)?"operator":(e.eatWhile(/\w/),"variable")}function h(e,t){return e.eatSpace()?null:(e.match(/([A-Z][A-Za-z0-9_]*)|(`.+`)/),t.tokenize=m,"variable-3")}function k(e,t){return e.eatSpace()?null:(e.match(/([a-zA-Z][A-Za-z0-9_]*)|(`.+`)/),t.tokenize=m,"def")}function p(e,t){return e.eatSpace()?null:!t.hasPassedFirstStage&&e.eat("{")?(t.hasPassedFirstStage=!0,"bracket"):t.hasPassedFirstStage?(e.match(/([A-Z][A-Za-z0-9_]*)|(`.+`)|\$/),t.hasPassedFirstStage=!1,t.tokenize=m,"def"):(t.tokenize=m,null)}function z(e,t){for(var n,r=!1;n=e.next();){if("/"==n&&r){t.tokenize=m;break}r="*"==n}return"comment"}return{startState:function(){return{tokenize:m,currentIndent:0,doInCurrentLine:!1,hasPassedFirstStage:!1}},token:function(e,t){return e.sol()&&(t.doInCurrentLine=0),t.tokenize(e,t)},indent:function(t,n){var r=n.replace(/^\s+|\s+$/g,"");return r.match(l)||r.match(d)||r.match(/(\[])/)?e.indentUnit*(t.currentIndent-1):t.currentIndent<0?0:t.currentIndent*e.indentUnit},fold:"indent",electricInput:(n=o.concat(c),new RegExp("[\\[\\]]|("+n.join("|")+")$")),lineComment:"%",blockCommentStart:"/*",blockCommentEnd:"*/"}}),e.defineMIME("text/x-oz","oz")});
//# sourceMappingURL=../../sourcemaps/mode/oz/oz.js.map