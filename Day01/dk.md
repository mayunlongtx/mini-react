- 思考及问题：
	- 看视频的时候看到崔大在创建app内容的时候使用的是 createTextNode 去创建了一个文本节点，当时自己还在想 为啥不直接赋值呢？然后使用ai去查询了一下两者的区别以及原因。
	- 获取root节点的时候使用 getElementById 和 querySelector 的区别在哪里呢？之前没有很认真的去看过这两个的对比，这次计划刚好直接又巩固了一下自己的知识
	- 在处理 `children` 为 `string` 的字符串时，自己第一时间想的是在 `render` 的 `children` 中处理，但是自己处理的逻辑是错的，没有生效，然后就继续往下一步想着在 `createElement`方法中去处理但是在执行 `render`的时候还是报错但是就是根据这个报错自己才反应过来我可以在 `el.props?.children.forEach` 循环的过程中去根据 `child` 的类型重新处理数据，问题得以解决。然后功能实现之后返回查看崔大视频教程，发现自己最开始的思路就出现了偏差，在 `createElement` 的时候就可以针对 `children` 的类型处理
- 收获：
	- 巩固了自己对于原生`js`语法的知识；
- 反思点：
	- 原生js Api不熟悉 使用错误的方法未能实现功能、对于方法的一些区别不清晰（需要自己再去熟悉一下）
	- 自己在组织代码结构以及测试方面需要再补强

代码地址：https://github.com/mayunlongtx/mini-react/tree/main/Day01
更详细的分析以及思考记录在项目中的每天代码的 README.md 文件中都有更详细的记录
