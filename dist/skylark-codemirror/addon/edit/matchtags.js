/**
 * skylark-codemirror - A version of codemirror 5.45  that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror/
 * @license MIT
 */
define(["../../CodeMirror","../fold/xml-fold"],function(t){"use strict";function a(t){t.state.tagHit&&t.state.tagHit.clear(),t.state.tagOther&&t.state.tagOther.clear(),t.state.tagHit=t.state.tagOther=null}function e(e){e.state.failedTagMatch=!1,e.operation(function(){if(a(e),!e.somethingSelected()){var o=e.getCursor(),i=e.getViewport();i.from=Math.min(i.from,o.line),i.to=Math.max(o.line+1,i.to);var n=t.findMatchingTag(e,o,i);if(n){if(e.state.matchBothTags){var r="open"==n.at?n.open:n.close;r&&(e.state.tagHit=e.markText(r.from,r.to,{className:"CodeMirror-matchingtag"}))}var c="close"==n.at?n.open:n.close;c?e.state.tagOther=e.markText(c.from,c.to,{className:"CodeMirror-matchingtag"}):e.state.failedTagMatch=!0}}})}function o(t){t.state.failedTagMatch&&e(t)}t.defineOption("matchTags",!1,function(i,n,r){r&&r!=t.Init&&(i.off("cursorActivity",e),i.off("viewportChange",o),a(i)),n&&(i.state.matchBothTags="object"==typeof n&&n.bothTags,i.on("cursorActivity",e),i.on("viewportChange",o),e(i))}),t.commands.toMatchingTag=function(a){var e=t.findMatchingTag(a,a.getCursor());if(e){var o="close"==e.at?e.open:e.close;o&&a.extendSelection(o.to,o.from)}}});
//# sourceMappingURL=../../sourcemaps/addon/edit/matchtags.js.map
