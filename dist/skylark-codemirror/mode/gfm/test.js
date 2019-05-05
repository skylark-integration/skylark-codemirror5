/**
 * skylark-codemirror - A version of codemirror 5.45  that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror/
 * @license MIT
 */
!function(){var o={tabSize:4,indentUnit:2},e=CodeMirror.getMode(o,"gfm");function t(o){test.mode(o,e,Array.prototype.slice.call(arguments,1))}var r=CodeMirror.getMode(o,{name:"gfm",highlightFormatting:!0});function a(o){test.mode(o,r,Array.prototype.slice.call(arguments,1))}a("codeBackticks","[comment&formatting&formatting-code `][comment foo][comment&formatting&formatting-code `]"),a("doubleBackticks","[comment&formatting&formatting-code ``][comment foo ` bar][comment&formatting&formatting-code ``]"),a("taskList","[variable-2&formatting&formatting-list&formatting-list-ul - ][meta&formatting&formatting-task [ ]]][variable-2  foo]","[variable-2&formatting&formatting-list&formatting-list-ul - ][property&formatting&formatting-task [x]]][variable-2  foo]"),a("formatting_strikethrough","[strikethrough&formatting&formatting-strikethrough ~~][strikethrough foo][strikethrough&formatting&formatting-strikethrough ~~]"),a("formatting_strikethrough","foo [strikethrough&formatting&formatting-strikethrough ~~][strikethrough bar][strikethrough&formatting&formatting-strikethrough ~~]"),a("formatting_emoji","foo [builtin&formatting&formatting-emoji :smile:] foo"),t("emInWordAsterisk","foo[em *bar*]hello"),t("emInWordUnderscore","foo_bar_hello"),t("emStrongUnderscore","[em&strong ___foo___] bar"),t("taskListAsterisk","[variable-2 * ][link&variable-2 [[]]][variable-2 foo]","[variable-2 * ][link&variable-2 [[ ]]][variable-2 bar]","[variable-2 * ][link&variable-2 [[x]]][variable-2 hello]","[variable-2 * ][meta [ ]]][variable-2  ][link&variable-2 [[world]]]","    [variable-3 * ][property [x]]][variable-3  foo]"),t("taskListPlus","[variable-2 + ][link&variable-2 [[]]][variable-2 foo]","[variable-2 + ][link&variable-2 [[x]]][variable-2 hello]","[variable-2 + ][meta [ ]]][variable-2  ][link&variable-2 [[world]]]","    [variable-3 + ][property [x]]][variable-3  foo]"),t("taskListDash","[variable-2 - ][link&variable-2 [[]]][variable-2 foo]","[variable-2 - ][link&variable-2 [[x]]][variable-2 hello]","[variable-2 - ][meta [ ]]][variable-2  world]","    [variable-3 - ][property [x]]][variable-3  foo]"),t("taskListNumber","[variable-2 1. ][link&variable-2 [[]]][variable-2 foo]","[variable-2 2. ][link&variable-2 [[ ]]][variable-2 bar]","[variable-2 3. ][meta [ ]]][variable-2  world]","    [variable-3 1. ][property [x]]][variable-3  foo]"),t("SHA","foo [link be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd2] bar"),t("SHAEmphasis","[em *foo ][em&link be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd2][em *]"),t("shortSHA","foo [link be6a8cc] bar"),t("tooShortSHA","foo be6a8c bar"),t("longSHA","foo be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd22 bar"),t("badSHA","foo be6a8cc1c1ecfe9489fb51e4869af15a13fc2cg2 bar"),t("userSHA","foo [link bar@be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd2] hello"),t("userSHAEmphasis","[em *foo ][em&link bar@be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd2][em *]"),t("userProjectSHA","foo [link bar/hello@be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd2] world"),t("userProjectSHAEmphasis","[em *foo ][em&link bar/hello@be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd2][em *]"),t("wordSHA","ask for feedbac"),t("num","foo [link #1] bar"),t("numEmphasis","[em *foo ][em&link #1][em *]"),t("badNum","foo #1bar hello"),t("userNum","foo [link bar#1] hello"),t("userNumEmphasis","[em *foo ][em&link bar#1][em *]"),t("userProjectNum","foo [link bar/hello#1] world"),t("userProjectNumEmphasis","[em *foo ][em&link bar/hello#1][em *]"),t("vanillaLink","foo [link http://www.example.com/] bar"),t("vanillaLinkNoScheme","foo [link www.example.com] bar"),t("vanillaLinkHttps","foo [link https://www.example.com/] bar"),t("vanillaLinkDataSchema","foo [link data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==] bar"),t("vanillaLinkPunctuation","foo [link http://www.example.com/]. bar"),t("vanillaLinkExtension","foo [link http://www.example.com/index.html] bar"),t("vanillaLinkEmphasis","foo [em *][em&link http://www.example.com/index.html][em *] bar"),t("notALink","foo asfd:asdf bar"),t("notALink","[comment ``foo `bar` http://www.example.com/``] hello"),t("notALink","[comment `foo]","[comment&link http://www.example.com/]","[comment `] foo","","[link http://www.example.com/]"),t("strikethrough","[strikethrough ~~foo~~]"),t("strikethroughWithStartingSpace","~~ foo~~"),t("strikethroughUnclosedStrayTildes","[strikethrough ~~foo~~~]"),t("strikethroughUnclosedStrayTildes","[strikethrough ~~foo ~~]"),t("strikethroughUnclosedStrayTildes","[strikethrough ~~foo ~~ bar]"),t("strikethroughUnclosedStrayTildes","[strikethrough ~~foo ~~ bar~~]hello"),t("strikethroughOneLetter","[strikethrough ~~a~~]"),t("strikethroughWrapped","[strikethrough ~~foo]","[strikethrough foo~~]"),t("strikethroughParagraph","[strikethrough ~~foo]","","foo[strikethrough ~~bar]"),t("strikethroughEm","[strikethrough ~~foo][em&strikethrough *bar*][strikethrough ~~]"),t("strikethroughEm","[em *][em&strikethrough ~~foo~~][em *]"),t("strikethroughStrong","[strikethrough ~~][strong&strikethrough **foo**][strikethrough ~~]"),t("strikethroughStrong","[strong **][strong&strikethrough ~~foo~~][strong **]"),t("emoji","text [builtin :blush:] text [builtin :v:] text [builtin :+1:] text",":text text: [builtin :smiley_cat:]")}();
//# sourceMappingURL=../../sourcemaps/mode/gfm/test.js.map