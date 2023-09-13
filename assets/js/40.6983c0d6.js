(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{324:function(s,t,a){"use strict";a.r(t);var n=a(14),e=Object(n.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"shell"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#shell"}},[s._v("#")]),s._v(" shell")]),s._v(" "),t("p",[s._v("通过 MongoDB shell 进行实例的交互，基本上可以通过 shell 实现所有逻辑"),t("br"),s._v("\nShell 是一个 JS 解释器，也就是说可以运行 JS，但是和 NodeJS 不一样，没法用"),t("code",[s._v("console.log")]),s._v("等"),t("br"),s._v("\n支持 ES6，可以用"),t("code",[s._v("let")]),s._v(", "),t("code",[s._v("Promise")])]),s._v(" "),t("h2",{attrs:{id:"数据库"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数据库"}},[s._v("#")]),s._v(" 数据库")]),s._v(" "),t("p",[t("code",[s._v("db")]),s._v("查看当前所在的数据库，默认是"),t("code",[s._v("test")])]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" db\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("test")]),s._v("\n")])])]),t("p",[t("code",[s._v("use")]),s._v("使用指定的数据库，如果数据库名不存在，会自动创建")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" use blog\nswitched to db blog\n")])])]),t("h2",{attrs:{id:"插入"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#插入"}},[s._v("#")]),s._v(" 插入")]),s._v(" "),t("p",[t("code",[s._v("insert")]),s._v(": 插入一条文档到集合里面")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" const post "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"title"')]),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"hello"')]),s._v(",\n  "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"date"')]),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" new Date"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" db.blog.insert"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("post"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\nWriteResult"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"nInserted"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" db.blog."),t("span",{pre:!0,attrs:{class:"token function-name function"}},[s._v("find")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"_id"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" ObjectId"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"5deb0878e0820d679e54d495"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(", "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"title"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"hello"')]),s._v(", "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"date"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" ISODate"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"2019-12-07T02:02:37.582Z"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])])]),t("h2",{attrs:{id:"查找"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#查找"}},[s._v("#")]),s._v(" 查找")]),s._v(" "),t("p",[t("code",[s._v("find")]),s._v(": 集合的方法")])])}),[],!1,null,null,null);t.default=e.exports}}]);