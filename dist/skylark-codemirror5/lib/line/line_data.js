/**
 * skylark-codemirror5 - A version of codemirror 5.17.1  that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror5/
 * @license MIT
 */
define(["../util/bidi","../util/browser","../util/dom","../util/event","../util/feature_detection","../util/misc","./highlight","./spans","./utils_line"],function(e,t,l,s,n,i,a,r,o){"use strict";class c{constructor(e,t,l){this.text=e,r.attachMarkedSpans(this,t),this.height=l?l(this):1}lineNo(){return o.lineNo(this)}}s.eventMixin(c);let p={},d={};function u(e,t){if(!e||/^\s*$/.test(e))return null;let l=t.addModeClass?d:p;return l[e]||(l[e]=e.replace(/\S+/g,"cm-$&"))}function h(e,s,n,a,r,o,c){if(!s)return;let p,d=e.splitSpaces?function(e,t){if(e.length>1&&!/  /.test(e))return e;let l=t,s="";for(let t=0;t<e.length;t++){let n=e.charAt(t);" "!=n||!l||t!=e.length-1&&32!=e.charCodeAt(t+1)||(n=" "),s+=n,l=" "==n}return s}(s,e.trailingSpace):s,u=e.cm.state.specialChars,h=!1;if(u.test(s)){p=document.createDocumentFragment();let n=0;for(;;){u.lastIndex=n;let a,r=u.exec(s),o=r?r.index-n:s.length-n;if(o){let s=document.createTextNode(d.slice(n,n+o));t.ie&&t.ie_version<9?p.appendChild(l.elt("span",[s])):p.appendChild(s),e.map.push(e.pos,e.pos+o,s),e.col+=o,e.pos+=o}if(!r)break;if(n+=o+1,"\t"==r[0]){let t=e.cm.options.tabSize,s=t-e.col%t;(a=p.appendChild(l.elt("span",i.spaceStr(s),"cm-tab"))).setAttribute("role","presentation"),a.setAttribute("cm-text","\t"),e.col+=s}else"\r"==r[0]||"\n"==r[0]?((a=p.appendChild(l.elt("span","\r"==r[0]?"␍":"␤","cm-invalidchar"))).setAttribute("cm-text",r[0]),e.col+=1):((a=e.cm.options.specialCharPlaceholder(r[0])).setAttribute("cm-text",r[0]),t.ie&&t.ie_version<9?p.appendChild(l.elt("span",[a])):p.appendChild(a),e.col+=1);e.map.push(e.pos,e.pos+1,a),e.pos++}}else e.col+=s.length,p=document.createTextNode(d),e.map.push(e.pos,e.pos+s.length,p),t.ie&&t.ie_version<9&&(h=!0),e.pos+=s.length;if(e.trailingSpace=32==d.charCodeAt(s.length-1),n||a||r||h||o){let t=n||"";a&&(t+=a),r&&(t+=r);let s=l.elt("span",[p],t,o);if(c)for(let e in c)c.hasOwnProperty(e)&&"style"!=e&&"class"!=e&&s.setAttribute(e,c[e]);return e.content.appendChild(s)}e.content.appendChild(p)}function m(e,t){return(l,s,n,i,a,r,o)=>{n=n?n+" cm-force-border":"cm-force-border";let c=l.pos,p=c+s.length;for(;;){let d;for(let e=0;e<t.length&&!((d=t[e]).to>c&&d.from<=c);e++);if(d.to>=p)return e(l,s,n,i,a,r,o);e(l,s.slice(0,d.to-c),n,i,null,r,o),i=null,s=s.slice(d.to-c),c=d.to}}}function f(e,t,l,s){let n=!s&&l.widgetNode;n&&e.map.push(e.pos,e.pos+t,n),!s&&e.cm.display.input.needsContentAttribute&&(n||(n=e.content.appendChild(document.createElement("span"))),n.setAttribute("cm-marker",l.id)),n&&(e.cm.display.input.setUneditable(n),e.content.appendChild(n)),e.pos+=t,e.trailingSpace=!1}function g(e,t,l){let s=e.markedSpans,n=e.text,i=0;if(!s){for(let e=1;e<l.length;e+=2)t.addToken(t,n.slice(i,i=l[e]),u(l[e+1],t.cm.options));return}let a,o,c,p,d,h,m,g=n.length,C=0,b=1,k="",y=0;for(;;){if(y==C){c=p=d=o="",m=null,h=null,y=1/0;let e,l=[];for(let t=0;t<s.length;++t){let n=s[t],i=n.marker;if("bookmark"==i.type&&n.from==C&&i.widgetNode)l.push(i);else if(n.from<=C&&(null==n.to||n.to>C||i.collapsed&&n.to==C&&n.from==C)){if(null!=n.to&&n.to!=C&&y>n.to&&(y=n.to,p=""),i.className&&(c+=" "+i.className),i.css&&(o=(o?o+";":"")+i.css),i.startStyle&&n.from==C&&(d+=" "+i.startStyle),i.endStyle&&n.to==y&&(e||(e=[])).push(i.endStyle,n.to),i.title&&((m||(m={})).title=i.title),i.attributes)for(let e in i.attributes)(m||(m={}))[e]=i.attributes[e];i.collapsed&&(!h||r.compareCollapsedMarkers(h.marker,i)<0)&&(h=n)}else n.from>C&&y>n.from&&(y=n.from)}if(e)for(let t=0;t<e.length;t+=2)e[t+1]==y&&(p+=" "+e[t]);if(!h||h.from==C)for(let e=0;e<l.length;++e)f(t,0,l[e]);if(h&&(h.from||0)==C){if(f(t,(null==h.to?g+1:h.to)-C,h.marker,null==h.from),null==h.to)return;h.to==C&&(h=!1)}}if(C>=g)break;let e=Math.min(g,y);for(;;){if(k){let l=C+k.length;if(!h){let s=l>e?k.slice(0,e-C):k;t.addToken(t,s,a?a+c:c,d,C+s.length==y?p:"",o,m)}if(l>=e){k=k.slice(e-C),C=e;break}C=l,d=""}k=n.slice(i,i=l[b++]),a=u(l[b++],t.cm.options)}}}function C(e,t,l){this.line=t,this.rest=r.visualLineContinued(t),this.size=this.rest?o.lineNo(i.lst(this.rest))-l+1:1,this.node=this.text=null,this.hidden=r.lineIsHidden(e,t)}return{Line:c,updateLine:function(e,t,l,s){e.text=t,e.stateAfter&&(e.stateAfter=null),e.styles&&(e.styles=null),null!=e.order&&(e.order=null),r.detachMarkedSpans(e),r.attachMarkedSpans(e,l);let n=s?s(e):1;n!=e.height&&o.updateLineHeight(e,n)},cleanUpLine:function(e){e.parent=null,r.detachMarkedSpans(e)},buildLineContent:function(i,r){let o=l.eltP("span",null,null,t.webkit?"padding-right: .1px":null),c={pre:l.eltP("pre",[o],"CodeMirror-line"),content:o,col:0,pos:0,cm:i,trailingSpace:!1,splitSpaces:i.getOption("lineWrapping")};r.measure={};for(let t=0;t<=(r.rest?r.rest.length:0);t++){let s,o=t?r.rest[t-1]:r.line;c.pos=0,c.addToken=h,n.hasBadBidiRects(i.display.measure)&&(s=e.getOrder(o,i.doc.direction))&&(c.addToken=m(c.addToken,s)),c.map=[];let p=r!=i.display.externalMeasured&&t.lineNo(o);g(o,c,a.getLineStyles(i,o,p)),o.styleClasses&&(o.styleClasses.bgClass&&(c.bgClass=l.joinClasses(o.styleClasses.bgClass,c.bgClass||"")),o.styleClasses.textClass&&(c.textClass=l.joinClasses(o.styleClasses.textClass,c.textClass||""))),0==c.map.length&&c.map.push(0,0,c.content.appendChild(n.zeroWidthElement(i.display.measure))),0==t?(r.measure.map=c.map,r.measure.cache={}):((r.measure.maps||(r.measure.maps=[])).push(c.map),(r.measure.caches||(r.measure.caches=[])).push({}))}if(t.webkit){let e=c.content.lastChild;(/\bcm-tab\b/.test(e.className)||e.querySelector&&e.querySelector(".cm-tab"))&&(c.content.className="cm-tab-wrap-hack")}return s.signal(i,"renderLine",i,r.line,c.pre),c.pre.className&&(c.textClass=l.joinClasses(c.pre.className,c.textClass||"")),c},defaultSpecialCharPlaceholder:function(e){let t=l.elt("span","•","cm-invalidchar");return t.title="\\u"+e.charCodeAt(0).toString(16),t.setAttribute("aria-label",t.title),t},LineView:C,buildViewArray:function(e,t,l){let s,n=[];for(let i=t;i<l;i=s){let t=new C(e.doc,o.getLine(e.doc,i),i);s=i+t.size,n.push(t)}return n}}});
//# sourceMappingURL=../../sourcemaps/lib/line/line_data.js.map
