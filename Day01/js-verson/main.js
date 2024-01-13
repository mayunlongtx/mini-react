// TODO:v01  先实现 在页面中展示app
// <div>app</div> 将这一步通过 原生 js 实现
// 创建一个 div
// const dom = document.createElement("div");
// dom.id = "app";
// // 创建文本节点内容
// const textNode = document.createTextNode("");
//  根据性能以及安全 性 选择使用 document.createTextNode
// dom.innerText = 'app'
// textNode.nodeValue = "app";
// dom.append(textNode);
// document.querySelector("#root").append(dom);

// TODO:v02 object（vnode）
//  基础结构
// {
// 	type:'',
// 	props: {
// 		class:'',
// 		style:'',
// 		children: []
// 	}
// }
// const textEl = {
//   type: "TEXT_ELEMENT",
//   props: {
//     nodeValue: "app",
//   },
// };
// const el = {
//   type: "div",
//   props: {
//     id: "app",
//     children: [textEl],
//   },
// };

// // 创建文本节点内容
// const textNode = document.createTextNode("");
// textNode.nodeValue = textEl.props.nodeValue;
// dom.append(textNode);
// document.querySelector("#root").append(dom);

// TODO:v03 实现创建 dom 以及 创建 textEl 的函数
// function createTextNode(text) {
//   return {
//     type: "TEXT_ELEMENT",
//     props: {
//       nodeValue: text,
//     },
//   };
// }
// function createElement(type, props, ...children) {
//   return {
//     type,
//     props: {
//       ...props,
//       children: children,
//     },
//   };
// }
// const textEl =  createTextNode('app')
// const App = createElement('div', {id: 'app'}, textEl)
// const dom = document.createElement(App.type);
// document.querySelector("#root").append(dom);
// dom.id = App.props.id
// dom.append(textEl.props.nodeValue);

// TODO: v04
// function createTextNode(text) {
//   return {
//     type: "TEXT_ELEMENT",
//     props: {
//       nodeValue: text,
//       children: [],
//     },
//   };
// }
// function createElement(type, props, ...children) {
//   return {
//     type,
//     props: {
//       ...props,
//       children: children.map((child) => {
//         return typeof child === "string" ? createTextNode(child) : child;
//       }),
//     },
//   };
// }
// function render(el, container) {
//   const dom =
//     el.type !== "TEXT_ELEMENT"
//       ? document.createElement(el.type)
//       : document.createTextNode(el.props.nodeValue);
//   Object.keys(el.props).forEach((key) => {
//     if (key !== "children") {
//       dom[key] = el.props[key];
//     }
//   });
//   //  这里处理 children`
//   const children = el.props.children
//   if (children) {
//     children.forEach((child) => {
//       render(child, dom);
//     });
//   }
//   container.append(dom);
// }
// const textEl = createTextNode("app");
// const App = createElement("div", { id: "app" }, textEl, "-app1");
// render(App, document.querySelector("#root"));

// TODO: v05 实现 ReactDom.createRoot(document.querySelector("#root")).render(App)
// function createTextNode(text) {
//   return {
//     type: "TEXT_ELEMENT",
//     props: {
//       nodeValue: text,
//       children: [],
//     },
//   };
// }
// function createElement(type, props, ...children) {
//   return {
//     type,
//     props: {
//       ...props,
//       children: children.map((child) => {
//         return typeof child === "string" ? createTextNode(child) : child;
//       }),
//     },
//   };
// }
// function render(el, container) {
//   const dom =
//     el.type !== "TEXT_ELEMENT"
//       ? document.createElement(el.type)
//       : document.createTextNode(el.props.nodeValue);
//   Object.keys(el.props).forEach((key) => {
//     if (key !== "children") {
//       dom[key] = el.props[key];
//     }
//   });
//   //  这里处理 children`
//   const children = el.props.children;
//   if (children) {
//     children.forEach((child) => {
//       render(child, dom);
//     });
//   }
//   container.append(dom);
// }
// const textEl = createTextNode("app");
// const App = createElement("div", { id: "app" }, textEl, "-app1");
// // render(App, document.querySelector("#root"));

// // ReactDom.createRoot(document.querySelector("#root")).render(App)
// const ReactDom = {
//   createRoot(container) {
//     return {
//       render(el) {
//         render(el, container);
//       },
//     };
//   },
// };

// ReactDom.createRoot(document.querySelector("#root")).render(App)

// TODO: v06  方法抽离
import ReactDom from './core/ReactDom.js'
import App from './App.js'

ReactDom.createRoot(document.querySelector("#root")).render(App)
