##  Mini-React

 存放自己学习 Mini-React 的代码

 ### day01
- 先在页面中展示 app
- 思考：
1. 看视频的时候看到崔大在创建app内容的时候使用的是 createTextNode 去创建了一个文本节点，当时自己还在想 为啥不直接赋值呢？然后使用ai去查询了一下两者的区别以及原因。
```javescript
在 React 内部源码中，使用 `createTextNode` 方法创建文本节点并插入到 DOM 中，是为了确保安全性和性能方面的考虑。

1. 安全性：使用 `createTextNode` 可以防止潜在的 XSS（跨站脚本攻击）攻击。当我们直接将用户提供的文本内容作为 HTML 字符串插入到 DOM 中时，存在安全风险，因为用户可能会插入恶意的脚本或标签。通过使用 `createTextNode` 创建纯文本节点，React 可以确保插入的内容不会被解析为 HTML，从而减少了潜在的安全风险。

2. 性能：使用 `createTextNode` 创建文本节点比使用 `innerHTML` 或 `innerText` 属性更高效。当我们使用 `innerHTML` 或 `innerText` 直接修改元素的 HTML 内容或纯文本内容时，浏览器会重新解析整个 HTML 结构，这可能会导致性能下降。而使用 `createTextNode` 创建文本节点，然后将其插入到 DOM 中，可以避免这种重新解析的开销，提高性能。

因此，React 在内部源码中选择使用 `createTextNode` 来创建文本节点并插入到 DOM 中，以确保安全性和性能方面的考虑。
```
2. 获取root节点的时候使用 getElementById 和 querySelector 的区别在哪里呢？之前没有很认真的去看过这两个的对比，这次计划刚好直接又巩固了一下自己的知识
```javascript
document.querySelector 和 document.getElementById 是两种不同的 DOM 查询方法，它们之间有以下区别：

选择器语法：document.querySelector 使用 CSS 选择器语法，可以通过类名、标签名、属性等多种方式进行选择，而 document.getElementById 只能通过元素的 ID 进行选择。

返回值：document.querySelector 返回匹配选择器的第一个元素，如果没有匹配的元素，则返回 null。而 document.getElementById 返回具有指定 ID 的元素，如果找不到具有该 ID 的元素，则返回 null。

兼容性：document.querySelector 是在较新的浏览器中引入的，而 document.getElementById 是 DOM 标准的一部分，支持更广泛，包括较旧的浏览器。

用途：document.querySelector 提供了更灵活的选择器语法，可以选择更复杂的元素组合。它适用于需要选择特定元素的情况，可以根据元素的类名、标签名、属性等进行选择。而 document.getElementById 适用于通过元素的 ID 快速获取特定元素的情况。
```
3. 在处理 `children` 为 `string` 的字符串时，自己第一时间想的是在 `render` 的 `children` 中处理，但是自己处理的逻辑是错的，没有生效，然后就继续往下一步想着在 `createElement`方法中去处理但是在执行 `render`的时候还是报错但是就是根据这个报错自己才反应过来我可以在 `el.props?.children.forEach` 循环的过程中去根据 `child` 的类型重新处理数据，问题得以解决。然后功能实现之后返回查看崔大视频教程，发现自己最开始的思路就出现了偏差，在 `createElement` 的时候就可以针对 `children` 的类型处理
- 收获：
	- 巩固了自己对于原生`js`语法的知识；
- 反思点：
1. 原生js Api不熟悉 使用错误的方法未能实现功能、对于方法的一些区别不清晰（需要自己再去熟悉一下）
2. 自己在组织代码结构以及测试方面需要再补强

### 其他记录
- 扩展-自定义 react的名字
	- 在 jsx 文件中添加 /** @jsx CReact.createElement */ 注释就可以了
	- 需要注意点：每个用到 CReact 的地方 都需要添加
```javascript
/** @jsx CReact.createElement */
import CReact from './core/React.js'
const App = <div>app-mini-react</div>;

export default App
```