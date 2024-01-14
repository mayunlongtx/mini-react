- 思考及问题：
	- 发现自己在第一天的实现代码中使用 createDom 的时候调用 createTextNode 传入的参数多了一个props.nodeValue,然后最终发现是自己在看第一节课的时候不仔细漏了 nodeValue 是DOM中可读写的属性，可以用于获取或设置一个节点的文本内容，所以导致自己在看代码的时候懵逼了，
	- 在自己看完视频去重新写的时候思路还是会出现卡顿，然后感觉可以自己在看完视频后，先尝试使用流程图等工具去自己梳理整个逻辑，然后再实现代码，最后进行代码的优化
- 收获：
	- 认识了[requestIdleCallback](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)方法，自己在业务代码中的递归处理可以进行更好的优化处理。[IdleDeadline](https://developer.mozilla.org/zh-CN/docs/Web/API/IdleDeadline)---[IdleDeadline.timeRemaining()](https://developer.mozilla.org/zh-CN/docs/Web/API/IdleDeadline/timeRemaining)
	- 了解了链表结构  以后在项目中如果出现递归等处理的时候多了一个可选项去处理
- 反思点：
	- 看课的时候需要再用心一点、仔细一点
	- 多看、多写几遍巩固自己的知识
- 课后问题思考
- requestIdleCallback 无时间的时候导致页面后续创建任务不执行，需要怎么解决？
- 解决思路：
	- 是否可以控制任务的优先级，先处理 DOM渲染这块的任务
	- 是否可以任务拆分，每次更少的渲染提高渲染的性能
代码地址：
https://github.com/mayunlongtx/mini-react/tree/main/Day02

更详细的分析以及思考记录在项目中的每天代码的 README.md 文件中都有更详细的记录
