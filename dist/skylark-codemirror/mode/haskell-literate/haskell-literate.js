/**
 * skylark-codemirror - A version of codemirror 5.45  that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror/
 * @license MIT
 */
!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../CodeMirror"),require("../haskell/haskell")):"function"==typeof define&&define.amd?define(["../../CodeMirror","../haskell/haskell"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("haskell-literate",function(t,n){var o=e.getMode(t,n&&n.base||"haskell");return{startState:function(){return{inCode:!1,baseState:e.startState(o)}},token:function(e,t){return e.sol()&&(t.inCode=e.eat(">"))?"meta":t.inCode?o.token(e,t.baseState):(e.skipToEnd(),"comment")},innerMode:function(e){return e.inCode?{state:e.baseState,mode:o}:null}}},"haskell"),e.defineMIME("text/x-literate-haskell","haskell-literate")});
//# sourceMappingURL=../../sourcemaps/mode/haskell-literate/haskell-literate.js.map
