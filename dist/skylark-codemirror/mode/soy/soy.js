/**
 * skylark-codemirror - A version of codemirror 5.45  that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror/
 * @license MIT
 */
define(["../../CodeMirror","../htmlmixed/htmlmixed"],function(t){"use strict";var e=["template","literal","msg","fallbackmsg","let","if","elseif","else","switch","case","default","foreach","ifempty","for","call","param","deltemplate","delcall","log","element"];t.defineMode("soy",function(a){var n=t.getMode(a,"text/plain"),s={html:t.getMode(a,{name:"text/html",multilineTagIndentFactor:2,multilineTagIndentPastTag:!1}),attributes:n,text:n,uri:n,trusted_resource_uri:n,css:t.getMode(a,"text/css"),js:t.getMode(a,{name:"text/javascript",statementIndent:2*a.indentUnit})};function r(t){return t[t.length-1]}function l(t,e,a){if(t.sol()){for(var n=0;n<e.indent&&t.eat(/\s/);n++);if(n)return null}var s=t.string,l=a.exec(s.substr(t.pos));l&&(t.string=s.substr(0,t.pos+l.index));var i=t.hideFirstChars(e.indent,function(){var a=r(e.localStates);return a.mode.token(t,a.state)});return t.string=s,i}function i(t,e){return{element:e,next:t}}function o(t){t.scopes&&(t.variables=t.scopes.element,t.scopes=t.scopes.next)}return{startState:function(){return{kind:[],kindTag:[],soyState:[],templates:null,variables:i(null,"ij"),scopes:null,indent:0,quoteKind:null,localStates:[{mode:s.html,state:t.startState(s.html)}]}},copyState:function(e){return{tag:e.tag,kind:e.kind.concat([]),kindTag:e.kindTag.concat([]),soyState:e.soyState.concat([]),templates:e.templates,variables:e.variables,scopes:e.scopes,indent:e.indent,quoteKind:e.quoteKind,localStates:e.localStates.map(function(e){return{mode:e.mode,state:t.copyState(e.mode,e.state)}})}},token:function(n,c){var m,d,p;switch(r(c.soyState)){case"comment":if(n.match(/^.*?\*\//)?c.soyState.pop():n.skipToEnd(),!c.scopes)for(var u=/@param\??\s+(\S+)/g,f=n.current();h=u.exec(f);)c.variables=i(c.variables,h[1]);return"comment";case"string":var h;return(h=n.match(/^.*?(["']|\\[\s\S])/))?h[1]==c.quoteKind&&(c.quoteKind=null,c.soyState.pop()):n.skipToEnd(),"string"}if(!c.soyState.length||"literal"!=r(c.soyState)){if(n.match(/^\/\*/))return c.soyState.push("comment"),"comment";if(n.match(n.sol()?/^\s*\/\/.*/:/^\s+\/\/.*/))return"comment"}switch(r(c.soyState)){case"templ-def":return(h=n.match(/^\.?([\w]+(?!\.[\w]+)*)/))?(c.templates=i(c.templates,h[1]),c.scopes=i(c.scopes,c.variables),c.soyState.pop(),"def"):(n.next(),null);case"templ-ref":return(h=n.match(/(\.?[a-zA-Z_][a-zA-Z_0-9]+)+/))?(c.soyState.pop(),"."==h[0][0]?"variable-2":"variable"):(n.next(),null);case"namespace-def":return(h=n.match(/^\.?([\w\.]+)/))?(c.soyState.pop(),"variable"):(n.next(),null);case"param-def":return(h=n.match(/^\w+/))?(c.variables=i(c.variables,h[0]),c.soyState.pop(),c.soyState.push("param-type"),"def"):(n.next(),null);case"param-ref":return(h=n.match(/^\w+/))?(c.soyState.pop(),"property"):(n.next(),null);case"param-type":return"}"==n.peek()?(c.soyState.pop(),null):n.eatWhile(/^([\w]+|[?])/)?"type":(n.next(),null);case"var-def":return(h=n.match(/^\$([\w]+)/))?(c.variables=i(c.variables,h[1]),c.soyState.pop(),"def"):(n.next(),null);case"tag":if(n.match(/^\/?}/))return"/template"==c.tag||"/deltemplate"==c.tag?(o(c),c.variables=i(null,"ij"),c.indent=0):("/for"!=c.tag&&"/foreach"!=c.tag||o(c),c.indent-=a.indentUnit*("/}"==n.current()||-1==e.indexOf(c.tag)?2:1)),c.soyState.pop(),"keyword";if(n.match(/^([\w?]+)(?==)/)){if("kind"==n.current()&&(h=n.match(/^="([^"]+)/,!1))){var g=h[1];c.kind.push(g),c.kindTag.push(c.tag);var y=s[g]||s.html;(S=r(c.localStates)).mode.indent&&(c.indent+=S.mode.indent(S.state,"","")),c.localStates.push({mode:y,state:t.startState(y)})}return"attribute"}return(h=n.match(/([\w]+)(?=\()/))?"variable callee":(h=n.match(/^["']/))?(c.soyState.push("string"),c.quoteKind=h,"string"):n.match(/(null|true|false)(?!\w)/)||n.match(/0x([0-9a-fA-F]{2,})/)||n.match(/-?([0-9]*[.])?[0-9]+(e[0-9]*)?/)?"atom":n.match(/(\||[+\-*\/%]|[=!]=|\?:|[<>]=?)/)?"operator":(h=n.match(/^\$([\w]+)/))?(m=c.variables,d=h[1],function(t,e){for(;t;){if(t.element===e)return!0;t=t.next}return!1}(m,d)?"variable-2":p?"variable":"variable-2 error"):(h=n.match(/^\w+/))?/^(?:as|and|or|not|in)$/.test(h[0])?"keyword":null:(n.next(),null);case"literal":return n.match(/^(?=\{\/literal})/)?(c.indent-=a.indentUnit,c.soyState.pop(),this.token(n,c)):l(n,c,/\{\/literal}/)}if(n.match(/^\{literal}/))return c.indent+=a.indentUnit,c.soyState.push("literal"),"keyword";if(h=n.match(/^\{([/@\\]?\w+\??)(?=$|[\s}]|\/[/*])/)){var S;if("/switch"!=h[1]&&(c.indent+=(/^(\/|(else|elseif|ifempty|case|fallbackmsg|default)$)/.test(h[1])&&"switch"!=c.tag?1:2)*a.indentUnit),c.tag=h[1],c.tag=="/"+r(c.kindTag))c.kind.pop(),c.kindTag.pop(),c.localStates.pop(),(S=r(c.localStates)).mode.indent&&(c.indent-=S.mode.indent(S.state,"",""));return c.soyState.push("tag"),"template"==c.tag||"deltemplate"==c.tag?c.soyState.push("templ-def"):"call"==c.tag||"delcall"==c.tag?c.soyState.push("templ-ref"):"let"==c.tag?c.soyState.push("var-def"):"for"==c.tag||"foreach"==c.tag?(c.scopes=i(c.scopes,c.variables),c.soyState.push("var-def")):"namespace"==c.tag?(c.soyState.push("namespace-def"),c.scopes||(c.variables=i(null,"ij"))):c.tag.match(/^@(?:param\??|inject|state)/)?c.soyState.push("param-def"):c.tag.match(/^(?:param)/)&&c.soyState.push("param-ref"),"keyword"}return n.eat("{")?(c.tag="print",c.indent+=2*a.indentUnit,c.soyState.push("tag"),"keyword"):l(n,c,/\{|\s+\/\/|\/\*/)},indent:function(e,n,s){var l=e.indent,i=r(e.soyState);if("comment"==i)return t.Pass;if("literal"==i)/^\{\/literal}/.test(n)&&(l-=a.indentUnit);else{if(/^\s*\{\/(template|deltemplate)\b/.test(n))return 0;/^\{(\/|(fallbackmsg|elseif|else|ifempty)\b)/.test(n)&&(l-=a.indentUnit),"switch"!=e.tag&&/^\{(case|default)\b/.test(n)&&(l-=a.indentUnit),/^\{\/switch\b/.test(n)&&(l-=a.indentUnit)}var o=r(e.localStates);return l&&o.mode.indent&&(l+=o.mode.indent(o.state,n,s)),l},innerMode:function(t){return t.soyState.length&&"literal"!=r(t.soyState)?null:r(t.localStates)},electricInput:/^\s*\{(\/|\/template|\/deltemplate|\/switch|fallbackmsg|elseif|else|case|default|ifempty|\/literal\})$/,lineComment:"//",blockCommentStart:"/*",blockCommentEnd:"*/",blockCommentContinue:" * ",useInnerComments:!1,fold:"indent"}},"htmlmixed"),t.registerHelper("wordChars","soy",/[\w$]/),t.registerHelper("hintWords","soy",e.concat(["delpackage","namespace","alias","print","css","debugger"])),t.defineMIME("text/x-soy","soy")});
//# sourceMappingURL=../../sourcemaps/mode/soy/soy.js.map
