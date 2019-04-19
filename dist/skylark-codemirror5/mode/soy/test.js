/**
 * skylark-codemirror5 - A version of codemirror 5.17.1  that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror5/
 * @license MIT
 */
!function(){var e=CodeMirror.getMode({indentUnit:2},"soy");function r(r){test.mode(r,e,Array.prototype.slice.call(arguments,1))}r("keywords-test","[keyword {] [keyword as] worrying [keyword and] notorious [keyword as]","    the Fandor[operator -]alias assassin, [keyword or]","    Corcand cannot fit [keyword in] [keyword }]"),r("let-test","[keyword {template] [def .name][keyword }]",'  [keyword {let] [def $name]: [string "world"][keyword /}]',"  [tag&bracket <][tag h1][tag&bracket >]","    Hello, [keyword {][variable-2 $name][keyword }]","  [tag&bracket </][tag h1][tag&bracket >]","[keyword {/template}]",""),r("function-test",'[keyword {] [callee&variable css]([string "MyClass"])[keyword }]','[tag&bracket <][tag input] [attribute value]=[string "][keyword {] [callee&variable index]([variable-2&error $list])[keyword }][string "][tag&bracket />]'),r("namespace-test","[keyword {namespace] [variable namespace][keyword }]"),r("namespace-with-attribute-test",'[keyword {namespace] [variable my.namespace.templates] [attribute requirecss]=[string "my.namespace"][keyword }]'),r("operators-test","[keyword {] [atom 1] [operator ==] [atom 1] [keyword }]","[keyword {] [atom 1] [operator !=] [atom 2] [keyword }]","[keyword {] [atom 2] [operator +] [atom 2] [keyword }]","[keyword {] [atom 2] [operator -] [atom 2] [keyword }]","[keyword {] [atom 2] [operator *] [atom 2] [keyword }]","[keyword {] [atom 2] [operator /] [atom 2] [keyword }]","[keyword {] [atom 2] [operator %] [atom 2] [keyword }]","[keyword {] [atom 2] [operator <=] [atom 2] [keyword }]","[keyword {] [atom 2] [operator >=] [atom 2] [keyword }]","[keyword {] [atom 3] [operator >] [atom 2] [keyword }]","[keyword {] [atom 2] [operator >] [atom 3] [keyword }]",'[keyword {] [atom null] [operator ?:] [string ""] [keyword }]',"[keyword {] [variable-2&error $variable] [operator |] safeHtml [keyword }]"),r("primitive-test","[keyword {] [atom true] [keyword }]","[keyword {] [atom false] [keyword }]","[keyword {] truethy [keyword }]","[keyword {] falsey [keyword }]","[keyword {] [atom 42] [keyword }]","[keyword {] [atom .42] [keyword }]","[keyword {] [atom 0.42] [keyword }]","[keyword {] [atom -0.42] [keyword }]","[keyword {] [atom -.2] [keyword }]","[keyword {] [atom 6.03e23] [keyword }]","[keyword {] [atom -0.03e0] [keyword }]","[keyword {] [atom 0x1F] [keyword }]","[keyword {] [atom 0x1F00BBEA] [keyword }]"),r("param-type-test","[keyword {@param] [def a]: [type list]<[[[type a]: [type int], [type b]: [type map]<[type string], [type bool]>]]>][keyword }]","[keyword {@param] [def unknown]: [type ?][keyword }]","[keyword {@param] [def list]: [type list]<[type ?]>[keyword }]"),r("undefined-var","[keyword {][variable-2&error $var]"),r("param-scope-test","[keyword {template] [def .a][keyword }]","  [keyword {@param] [def x]: [type string][keyword }]","  [keyword {][variable-2 $x][keyword }]","[keyword {/template}]","","[keyword {template] [def .b][keyword }]","  [keyword {][variable-2&error $x][keyword }]","[keyword {/template}]",""),r("if-variable-test","[keyword {if] [variable-2&error $showThing][keyword }]","  Yo!","[keyword {/if}]",""),r("defined-if-variable-test","[keyword {template] [def .foo][keyword }]","  [keyword {@param?] [def showThing]: [type bool][keyword }]","  [keyword {if] [variable-2 $showThing][keyword }]","    Yo!","  [keyword {/if}]","[keyword {/template}]",""),r("template-calls-test","[keyword {call] [variable-2 .foo][keyword /}]","[keyword {call] [variable foo][keyword /}]","[keyword {call] [variable foo][keyword }] [keyword {/call}]","[keyword {call] [variable first1.second.third_3][keyword /}]","[keyword {call] [variable first1.second.third_3] [keyword }] [keyword {/call}]",""),r("foreach-scope-test","[keyword {@param] [def bar]: [type string][keyword }]","[keyword {foreach] [def $foo] [keyword in] [variable-2&error $foos][keyword }]","  [keyword {][variable-2 $foo][keyword }]","[keyword {/foreach}]","[keyword {][variable-2&error $foo][keyword }]","[keyword {][variable-2 $bar][keyword }]"),r("foreach-ifempty-indent-test","[keyword {foreach] [def $foo] [keyword in] [variable-2&error $foos][keyword }]","  something","[keyword {ifempty}]","  nothing","[keyword {/foreach}]",""),r("nested-kind-test",'[keyword {template] [def .foo] [attribute kind]=[string "html"][keyword }]',"  [tag&bracket <][tag div][tag&bracket >]","    [keyword {call] [variable-2 .bar][keyword }]",'      [keyword {param] [property propertyName] [attribute kind]=[string "js"][keyword }]',"        [keyword var] [def bar] [operator =] [number 5];","      [keyword {/param}]","    [keyword {/call}]","  [tag&bracket </][tag div][tag&bracket >]","[keyword {/template}]",""),r("tag-starting-with-function-call-is-not-a-keyword","[keyword {][callee&variable index]([variable-2&error $foo])[keyword }]",'[keyword {css] [string "some-class"][keyword }]','[keyword {][callee&variable css]([string "some-class"])[keyword }]',""),r("allow-missing-colon-in-@param","[keyword {template] [def .foo][keyword }]","  [keyword {@param] [def showThing] [type bool][keyword }]","  [keyword {if] [variable-2 $showThing][keyword }]","    Yo!","  [keyword {/if}]","[keyword {/template}]",""),r("single-quote-strings","[keyword {][string \"foo\"] [string 'bar'][keyword }]",""),r("literal-comments","[keyword {literal}]/* comment */ // comment[keyword {/literal}]"),r("highlight-command-at-eol","[keyword {msg]","    [keyword }]")}();
//# sourceMappingURL=../../sourcemaps/mode/soy/test.js.map