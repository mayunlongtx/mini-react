let nextWorkOfUnit = null;
function createTextNode(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === "string" ? createTextNode(child) : child;
      }),
    },
  };
}

function render(el, container) {
  nextWorkOfUnit = {
    dom: container,
    props: {
      children: [el],
    },
  };
}

function workLoop(deadline) {
  let shouldYield = false;
  while (!shouldYield && nextWorkOfUnit) {
    shouldYield = deadline.timeRemaining() < 1;
    nextWorkOfUnit = performUnitOfWork(nextWorkOfUnit);
  }
  // 这里要一直执行，找寻浏览器的空闲时间
  requestIdleCallback(workLoop);
}
function createDom(type) {
  return type !== "TEXT_ELEMENT"
    ? document.createElement(type)
    : document.createTextNode("");
}
function updateProps(dom, props) {
  Object.keys(props).forEach((key) => {
    if (key !== "children") {
      dom[key] = props[key];
    }
  });
}
function initChildren(fiber) {
  const children = fiber.props.children;
  let prevChild = null;
    children.forEach((child, index) => {
      const newFiber = {
        type: child.type,
        props: child.props,
        parent: fiber,
        child: null,
        sibling: null,
        dom: null,
      };
      if (index === 0) {
        fiber.child = newFiber;
      } else {
        prevChild.sibling = newFiber;
      }
      prevChild = newFiber;
    });
}
function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    const dom = (fiber.dom = createDom(fiber.type));
    fiber.parent.dom.append(dom);
    updateProps(dom, fiber.props);
  }
  // 3.处理链表数据
  // 三种情况
  // 3.1.有child
  // 3.2. 有sibling
  // 3.3.有叔叔节点
  initChildren(fiber);
  // 4.返回下一个需要执行的数据
  if (fiber.child) {
    return fiber.child;
  }
  if (fiber.sibling) {
    return fiber.sibling;
  }
  return fiber.parent?.sibling;
}
requestIdleCallback(workLoop);

const React = {
  render,
  createElement,
  createTextNode,
};

export default React;
