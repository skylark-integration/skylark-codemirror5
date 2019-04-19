/**
 * skylark-codemirror5 - A version of codemirror 5.17.1  that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror5/
 * @license MIT
 */
define(["./dom","./browser"],function(e,t){"use strict";let n,r;let i=null;return{dragAndDrop:function(){if(t.ie&&t.ie_version<9)return!1;let n=e.elt("div");return"draggable"in n||"dragDrop"in n}(),zeroWidthElement:function(r){if(null==n){let i=e.elt("span","​");e.removeChildrenAndAdd(r,e.elt("span",[i,document.createTextNode("x")])),0!=r.firstChild.offsetHeight&&(n=i.offsetWidth<=1&&i.offsetHeight>2&&!(t.ie&&t.ie_version<8))}let i=n?e.elt("span","​"):e.elt("span"," ",null,"display: inline-block; width: 1px; margin-right: -1px");return i.setAttribute("cm-text",""),i},hasBadBidiRects:function(t){if(null!=r)return r;let n=e.removeChildrenAndAdd(t,document.createTextNode("AخA")),i=e.range(n,0,1).getBoundingClientRect(),l=e.range(n,1,2).getBoundingClientRect();return e.removeChildren(t),!(!i||i.left==i.right)&&(r=l.right-i.right<3)},splitLinesAuto:3!="\n\nb".split(/\n/).length?e=>{let t=0,n=[],r=e.length;for(;t<=r;){let r=e.indexOf("\n",t);-1==r&&(r=e.length);let i=e.slice(t,"\r"==e.charAt(r-1)?r-1:r),l=i.indexOf("\r");-1!=l?(n.push(i.slice(0,l)),t+=l+1):(n.push(i),t=r+1)}return n}:e=>e.split(/\r\n?|\n/),hasSelection:window.getSelection?e=>{try{return e.selectionStart!=e.selectionEnd}catch(e){return!1}}:e=>{let t;try{t=e.ownerDocument.selection.createRange()}catch(e){}return!(!t||t.parentElement()!=e)&&0!=t.compareEndPoints("StartToEnd",t)},hasCopyEvent:(()=>{let t=e.elt("div");return"oncopy"in t||(t.setAttribute("oncopy","return;"),"function"==typeof t.oncopy)})(),hasBadZoomedRects:function(t){if(null!=i)return i;let n=e.removeChildrenAndAdd(t,e.elt("span","x")),r=n.getBoundingClientRect(),l=e.range(n,0,1).getBoundingClientRect();return i=Math.abs(r.left-l.left)>1}}});
//# sourceMappingURL=../../sourcemaps/lib/util/feature_detection.js.map
