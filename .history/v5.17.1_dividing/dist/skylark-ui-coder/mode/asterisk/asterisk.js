/**
 * skylark-ui-coder - The skylark coder widget
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-ui-coder/
 * @license MIT
 */
define(["../../Coder"],function(e){"use strict";e.defineMode("asterisk",function(){function e(e,n){var i="",r=e.next();if(";"==r)return e.skipToEnd(),"comment";if("["==r)return e.skipTo("]"),e.eat("]"),"header";if('"'==r)return e.skipTo('"'),"string";if("'"==r)return e.skipTo("'"),"string-2";if("#"==r&&(e.eatWhile(/\w/),i=e.current(),a.indexOf(i)!==-1))return e.skipToEnd(),"strong";if("$"==r){var o=e.peek();if("{"==o)return e.skipTo("}"),e.eat("}"),"variable-3"}if(e.eatWhile(/\w/),i=e.current(),t.indexOf(i)!==-1){switch(n.extenStart=!0,i){case"same":n.extenSame=!0;break;case"include":case"switch":case"ignorepat":n.extenInclude=!0}return"atom"}}var t=["exten","same","include","ignorepat","switch"],a=["#include","#exec"],n=["addqueuemember","adsiprog","aelsub","agentlogin","agentmonitoroutgoing","agi","alarmreceiver","amd","answer","authenticate","background","backgrounddetect","bridge","busy","callcompletioncancel","callcompletionrequest","celgenuserevent","changemonitor","chanisavail","channelredirect","chanspy","clearhash","confbridge","congestion","continuewhile","controlplayback","dahdiacceptr2call","dahdibarge","dahdiras","dahdiscan","dahdisendcallreroutingfacility","dahdisendkeypadfacility","datetime","dbdel","dbdeltree","deadagi","dial","dictate","directory","disa","dumpchan","eagi","echo","endwhile","exec","execif","execiftime","exitwhile","extenspy","externalivr","festival","flash","followme","forkcdr","getcpeid","gosub","gosubif","goto","gotoif","gotoiftime","hangup","iax2provision","ices","importvar","incomplete","ivrdemo","jabberjoin","jabberleave","jabbersend","jabbersendgroup","jabberstatus","jack","log","macro","macroexclusive","macroexit","macroif","mailboxexists","meetme","meetmeadmin","meetmechanneladmin","meetmecount","milliwatt","minivmaccmess","minivmdelete","minivmgreet","minivmmwi","minivmnotify","minivmrecord","mixmonitor","monitor","morsecode","mp3player","mset","musiconhold","nbscat","nocdr","noop","odbc","odbc","odbcfinish","originate","ospauth","ospfinish","osplookup","ospnext","page","park","parkandannounce","parkedcall","pausemonitor","pausequeuemember","pickup","pickupchan","playback","playtones","privacymanager","proceeding","progress","queue","queuelog","raiseexception","read","readexten","readfile","receivefax","receivefax","receivefax","record","removequeuemember","resetcdr","retrydial","return","ringing","sayalpha","saycountedadj","saycountednoun","saycountpl","saydigits","saynumber","sayphonetic","sayunixtime","senddtmf","sendfax","sendfax","sendfax","sendimage","sendtext","sendurl","set","setamaflags","setcallerpres","setmusiconhold","sipaddheader","sipdtmfmode","sipremoveheader","skel","slastation","slatrunk","sms","softhangup","speechactivategrammar","speechbackground","speechcreate","speechdeactivategrammar","speechdestroy","speechloadgrammar","speechprocessingsound","speechstart","speechunloadgrammar","stackpop","startmusiconhold","stopmixmonitor","stopmonitor","stopmusiconhold","stopplaytones","system","testclient","testserver","transfer","tryexec","trysystem","unpausemonitor","unpausequeuemember","userevent","verbose","vmauthenticate","vmsayname","voicemail","voicemailmain","wait","waitexten","waitfornoise","waitforring","waitforsilence","waitmusiconhold","waituntil","while","zapateller"];return{startState:function(){return{extenStart:!1,extenSame:!1,extenInclude:!1,extenExten:!1,extenPriority:!1,extenApplication:!1}},token:function(t,a){var i="";return t.eatSpace()?null:a.extenStart?(t.eatWhile(/[^\s]/),i=t.current(),/^=>?$/.test(i)?(a.extenExten=!0,a.extenStart=!1,"strong"):(a.extenStart=!1,t.skipToEnd(),"error")):a.extenExten?(a.extenExten=!1,a.extenPriority=!0,t.eatWhile(/[^,]/),a.extenInclude&&(t.skipToEnd(),a.extenPriority=!1,a.extenInclude=!1),a.extenSame&&(a.extenPriority=!1,a.extenSame=!1,a.extenApplication=!0),"tag"):a.extenPriority?(a.extenPriority=!1,a.extenApplication=!0,t.next(),a.extenSame?null:(t.eatWhile(/[^,]/),"number")):a.extenApplication?(t.eatWhile(/,/),i=t.current(),","===i?null:(t.eatWhile(/\w/),i=t.current().toLowerCase(),a.extenApplication=!1,n.indexOf(i)!==-1?"def strong":null)):e(t,a)}}}),e.defineMIME("text/x-asterisk","asterisk")});
//# sourceMappingURL=../../sourcemaps/mode/asterisk/asterisk.js.map