/**
 * skylark-codemirror - A version of codemirror 5.45  that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror/
 * @license MIT
 */
define(["../../CodeMirror","../htmlmixed/htmlmixed","../../addon/mode/overlay"],function(e){"use strict";e.defineMode("django:inner",function(){var e=["block","endblock","for","endfor","true","false","filter","endfilter","loop","none","self","super","if","elif","endif","as","else","import","with","endwith","without","context","ifequal","endifequal","ifnotequal","endifnotequal","extends","include","load","comment","endcomment","empty","url","static","trans","blocktrans","endblocktrans","now","regroup","lorem","ifchanged","endifchanged","firstof","debug","cycle","csrf_token","autoescape","endautoescape","spaceless","endspaceless","ssi","templatetag","verbatim","endverbatim","widthratio"],t=["add","addslashes","capfirst","center","cut","date","default","default_if_none","dictsort","dictsortreversed","divisibleby","escape","escapejs","filesizeformat","first","floatformat","force_escape","get_digit","iriencode","join","last","length","length_is","linebreaks","linebreaksbr","linenumbers","ljust","lower","make_list","phone2numeric","pluralize","pprint","random","removetags","rjust","safe","safeseq","slice","slugify","stringformat","striptags","time","timesince","timeuntil","title","truncatechars","truncatechars_html","truncatewords","truncatewords_html","unordered_list","upper","urlencode","urlize","urlizetrunc","wordcount","wordwrap","yesno"],r=["==","!=","<",">","<=",">="],n=["in","not","or","and"];function i(e,t){if(e.match("{{"))return t.tokenize=o,"tag";if(e.match("{%"))return t.tokenize=l,"tag";if(e.match("{#"))return t.tokenize=u,"comment";for(;null!=e.next()&&!e.match(/\{[{%#]/,!1););return null}function a(e,t){return function(r,n){!n.escapeNext&&r.eat(e)?n.tokenize=t:(n.escapeNext&&(n.escapeNext=!1),"\\"==r.next()&&(n.escapeNext=!0));return"string"}}function o(e,r){if(r.waitDot){if(r.waitDot=!1,"."!=e.peek())return"null";if(e.match(/\.\W+/))return"error";if(e.eat("."))return r.waitProperty=!0,"null";throw Error("Unexpected error while waiting for property.")}if(r.waitPipe){if(r.waitPipe=!1,"|"!=e.peek())return"null";if(e.match(/\.\W+/))return"error";if(e.eat("|"))return r.waitFilter=!0,"null";throw Error("Unexpected error while waiting for filter.")}return r.waitProperty&&(r.waitProperty=!1,e.match(/\b(\w+)\b/))?(r.waitDot=!0,r.waitPipe=!0,"property"):r.waitFilter&&(r.waitFilter=!1,e.match(t))?"variable-2":e.eatSpace()?(r.waitProperty=!1,"null"):e.match(/\b\d+(\.\d+)?\b/)?"number":e.match("'")?(r.tokenize=a("'",r.tokenize),"string"):e.match('"')?(r.tokenize=a('"',r.tokenize),"string"):e.match(/\b(\w+)\b/)&&!r.foundVariable?(r.waitDot=!0,r.waitPipe=!0,"variable"):e.match("}}")?(r.waitProperty=null,r.waitFilter=null,r.waitDot=null,r.waitPipe=null,r.tokenize=i,"tag"):(e.next(),"null")}function l(o,l){if(l.waitDot){if(l.waitDot=!1,"."!=o.peek())return"null";if(o.match(/\.\W+/))return"error";if(o.eat("."))return l.waitProperty=!0,"null";throw Error("Unexpected error while waiting for property.")}if(l.waitPipe){if(l.waitPipe=!1,"|"!=o.peek())return"null";if(o.match(/\.\W+/))return"error";if(o.eat("|"))return l.waitFilter=!0,"null";throw Error("Unexpected error while waiting for filter.")}if(l.waitProperty&&(l.waitProperty=!1,o.match(/\b(\w+)\b/)))return l.waitDot=!0,l.waitPipe=!0,"property";if(l.waitFilter&&(l.waitFilter=!1,o.match(t)))return"variable-2";if(o.eatSpace())return l.waitProperty=!1,"null";if(o.match(/\b\d+(\.\d+)?\b/))return"number";if(o.match("'"))return l.tokenize=a("'",l.tokenize),"string";if(o.match('"'))return l.tokenize=a('"',l.tokenize),"string";if(o.match(r))return"operator";if(o.match(n))return"keyword";var u=o.match(e);return u?("comment"==u[0]&&(l.blockCommentTag=!0),"keyword"):o.match(/\b(\w+)\b/)?(l.waitDot=!0,l.waitPipe=!0,"variable"):o.match("%}")?(l.waitProperty=null,l.waitFilter=null,l.waitDot=null,l.waitPipe=null,l.blockCommentTag?(l.blockCommentTag=!1,l.tokenize=c):l.tokenize=i,"tag"):(o.next(),"null")}function u(e,t){return e.match(/^.*?#\}/)?t.tokenize=i:e.skipToEnd(),"comment"}function c(e,t){return e.match(/\{%\s*endcomment\s*%\}/,!1)?(t.tokenize=l,e.match("{%"),"tag"):(e.next(),"comment")}return e=new RegExp("^\\b("+e.join("|")+")\\b"),t=new RegExp("^\\b("+t.join("|")+")\\b"),r=new RegExp("^\\b("+r.join("|")+")\\b"),n=new RegExp("^\\b("+n.join("|")+")\\b"),{startState:function(){return{tokenize:i}},token:function(e,t){return t.tokenize(e,t)},blockCommentStart:"{% comment %}",blockCommentEnd:"{% endcomment %}"}}),e.defineMode("django",function(t){var r=e.getMode(t,"text/html"),n=e.getMode(t,"django:inner");return e.overlayMode(r,n)}),e.defineMIME("text/x-django","django")});
//# sourceMappingURL=../../sourcemaps/mode/django/django.js.map
