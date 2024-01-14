##  Mini-React

 存放自己学习 Mini-React 的代码

 ### day02
- 实现任务调度器
	- 使用到的技术点
		- [requestIdleCallback](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)
		- [IdleDeadline](https://developer.mozilla.org/zh-CN/docs/Web/API/IdleDeadline)
- 实现fiber架
	- 使用链表结构 以及 requestIdleCallback方法去实现，目前还有问题如果浏览器没有空余时间会导致页面加载出来慢应该怎么解决

- 思考及问题：
	- 在实现的过程中出现卡顿，自己的思路跟不上，看了几遍视频大概才理解了大致的流程，
	- 发现自己在第一天的实现代码中使用 createDom 的时候调用 createTextNode 传入的参数多了一个props.nodeValue,然后最终发现是自己在看第一节课的时候不仔细漏了 nodeValue 是DOM中可读写的属性，可以用于获取或设置一个节点的文本内容，所以导致自己在看代码的时候懵逼了，
- 收获：
	- 认识了[requestIdleCallback](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)方法，自己在业务代码中的递归处理可以进行更好的优化处理。[IdleDeadline](https://developer.mozilla.org/zh-CN/docs/Web/API/IdleDeadline)---[IdleDeadline.timeRemaining()](https://developer.mozilla.org/zh-CN/docs/Web/API/IdleDeadline/timeRemaining)
	- 了解了 链表结构  以后在项目中如果出现递归等处理的时候多了一个可选项区处理

- 反思点：
	- 看课的时候需要再用心一点、仔细一点
	- 多看、多写几遍巩固自己的知识

### 其他记录
###  课后问题思考
- requestIdleCallback 无时间的时候导致页面后续创建任务不执行，需要怎么解决？
- 解决思路：
	- 是否可以控制任务的优先级，先处理 DOM渲染这块的任务
	- 是否可以任务拆分，每次更少的渲染提高渲染的性能
	- 