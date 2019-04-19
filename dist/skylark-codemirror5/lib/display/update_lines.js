/**
 * skylark-codemirror5 - A version of codemirror 5.17.1  that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror5/
 * @license MIT
 */
define(["../line/spans","../line/utils_line","../measurement/position_measurement","../util/browser"],function(e,t,i,n){"use strict";function l(e){if(e.widgets)for(let t=0;t<e.widgets.length;++t){let i=e.widgets[t],n=i.node.parentNode;n&&(i.height=n.offsetHeight)}}return{updateHeightsInViewport:function(e){let o=e.display,s=o.lineDiv.offsetTop;for(let r=0;r<o.view.length;r++){let h,g=o.view[r],a=e.options.lineWrapping,p=0;if(g.hidden)continue;if(n.ie&&n.ie_version<8){let e=g.node.offsetTop+g.node.offsetHeight;h=e-s,s=e}else{let e=g.node.getBoundingClientRect();h=e.bottom-e.top,!a&&g.text.firstChild&&(p=g.text.firstChild.getBoundingClientRect().right-e.left-1)}let d=g.line.height-h;if((d>.005||d<-.005)&&(t.updateLineHeight(g.line,h),l(g.line),g.rest))for(let e=0;e<g.rest.length;e++)l(g.rest[e]);if(p>e.display.sizerWidth){let t=Math.ceil(p/i.charWidth(e.display));t>e.display.maxLineLength&&(e.display.maxLineLength=t,e.display.maxLine=g.line,e.display.maxLineChanged=!0)}}},visibleLines:function(n,l,o){let s=o&&null!=o.top?Math.max(0,o.top):n.scroller.scrollTop;s=Math.floor(s-i.paddingTop(n));let r=o&&null!=o.bottom?o.bottom:s+n.wrapper.clientHeight,h=t.lineAtHeight(l,s),g=t.lineAtHeight(l,r);if(o&&o.ensure){let i=o.ensure.from.line,s=o.ensure.to.line;i<h?(h=i,g=t.lineAtHeight(l,e.heightAtLine(t.getLine(l,i))+n.wrapper.clientHeight)):Math.min(s,l.lastLine())>=g&&(h=t.lineAtHeight(l,e.heightAtLine(t.getLine(l,s))-n.wrapper.clientHeight),g=s)}return{from:h,to:Math.max(g,h+1)}}}});
//# sourceMappingURL=../../sourcemaps/lib/display/update_lines.js.map
