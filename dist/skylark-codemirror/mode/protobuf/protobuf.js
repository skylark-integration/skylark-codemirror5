/**
 * skylark-codemirror - A version of codemirror 5.45  that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror/
 * @license MIT
 */
define(["../../CodeMirror"],function(e){"use strict";var t=["package","message","import","syntax","required","optional","repeated","reserved","default","extensions","packed","bool","bytes","double","enum","float","string","int32","int64","uint32","uint64","sint32","sint64","fixed32","fixed64","sfixed32","sfixed64","option","service","rpc","returns"],r=new RegExp("^(("+t.join(")|(")+"))\\b","i");e.registerHelper("hintWords","protobuf",t);var n=new RegExp("^[_A-Za-z¡-￿][_A-Za-z0-9¡-￿]*");function i(e){if(e.eatSpace())return null;if(e.match("//"))return e.skipToEnd(),"comment";if(e.match(/^[0-9\.+-]/,!1)){if(e.match(/^[+-]?0x[0-9a-fA-F]+/))return"number";if(e.match(/^[+-]?\d*\.\d+([EeDd][+-]?\d+)?/))return"number";if(e.match(/^[+-]?\d+([EeDd][+-]?\d+)?/))return"number"}return e.match(/^"([^"]|(""))*"/)?"string":e.match(/^'([^']|(''))*'/)?"string":e.match(r)?"keyword":e.match(n)?"variable":(e.next(),null)}e.defineMode("protobuf",function(){return{token:i}}),e.defineMIME("text/x-protobuf","protobuf")});
//# sourceMappingURL=../../sourcemaps/mode/protobuf/protobuf.js.map
