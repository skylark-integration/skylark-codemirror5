/**
 * skylark-ui-coder - The skylark coder widget
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-ui-coder/
 * @license MIT
 */
define(["../util/browser","../CoderCtor"],function(e,r){var a=0;r.partial({onDrop:function(e){var r=this;if(r.clearDragCursor(),!signalDOMEvent(r,e)&&!eventInWidget(r.display,e)){e_preventDefault(e),ie&&(a=+new Date);var t=posFromMouse(r,e,!0),i=e.dataTransfer.files;if(t&&!r.isReadOnly())if(i&&i.length&&window.FileReader&&window.File)for(var o=i.length,n=Array(o),s=0,d=function(e,a){if(!r.options.allowDropFileTypes||indexOf(r.options.allowDropFileTypes,e.type)!=-1){var i=new FileReader;i.onload=operation(r,function(){var e=i.result;if(/[\x00-\x08\x0e-\x1f]{2}/.test(e)&&(e=""),n[a]=e,++s==o){t=clipPos(r.doc,t);var d={from:t,to:t,text:r.doc.splitLines(n.join(r.doc.lineSeparator())),origin:"paste"};makeChange(r.doc,d),setSelectionReplaceHistory(r.doc,simpleSelection(t,changeEnd(d)))}}),i.readAsText(e)}},l=0;l<o;++l)d(i[l],l);else{if(r.state.draggingText&&r.doc.sel.contains(t)>-1)return r.state.draggingText(e),void setTimeout(function(){r.display.input.focus()},20);try{var n=e.dataTransfer.getData("Text");if(n){if(r.state.draggingText&&!r.state.draggingText.copy)var p=r.listSelections();if(setSelectionNoUndo(r.doc,simpleSelection(t,t)),p)for(var l=0;l<p.length;++l)replaceRange(r.doc,"",p[l].anchor,p[l].head,"drag");r.replaceSelection(n,"around","paste"),r.display.input.focus()}}catch(e){}}}},onDragStart:function(e){var r=this;if(ie&&(!r.state.draggingText||+new Date-a<100))return void e_stop(e);if(!signalDOMEvent(r,e)&&!eventInWidget(r.display,e)&&(e.dataTransfer.setData("Text",r.getSelection()),e.dataTransfer.effectAllowed="copyMove",e.dataTransfer.setDragImage&&!safari)){var t=elt("img",null,null,"position: fixed; left: 0; top: 0;");t.src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",presto&&(t.width=t.height=1,r.display.wrapper.appendChild(t),t._top=t.offsetTop),e.dataTransfer.setDragImage(t,0,0),presto&&t.parentNode.removeChild(t)}},onDragOver:function(e){var r=this,a=posFromMouse(r,e);if(a){var t=document.createDocumentFragment();drawSelectionCursor(r,a,t),r.display.dragCursor||(r.display.dragCursor=elt("div",null,"CodeMirror-cursors CodeMirror-dragcursors"),r.display.lineSpace.insertBefore(r.display.dragCursor,r.display.cursorDiv)),removeChildrenAndAdd(r.display.dragCursor,t)}},clearDragCursor:function(){var e=this;e.display.dragCursor&&(e.display.lineSpace.removeChild(e.display.dragCursor),e.display.dragCursor=null)}})});
//# sourceMappingURL=../../sourcemaps/primitives/edit/drop_events.js.map