let shouldYield = false;
let nextWOrkOfUnit = null;
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
  nextWOrkOfUnit = {
    dom: container,
    props: {
      children: [el],
    },
  };
}

function workLoop(deadline) {
  while (!shouldYield) {
    shouldYield = deadline.timeRemaining() < 1;
    nextWOrkOfUnit = performWorkOfUnit(nextWOrkOfUnit);
  }
  // 这里要一直执行，找寻浏览器的空闲时间
  requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop);
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
function initChildren(work) {
  const children = work.props.children;
  let prevChild = null;
  if (children) {
    children.forEach((child, index) => {
      const newChild = {
        type: child.type,
        props: child.props,
        parent: work,
        child: null,
        sibling: null,
        dom: null,
      };
      if (index === 0) {
        work.child = newChild;
      } else {
        work.sibling = prevChild;
      }
      prevChild = newChild;
    });
  }
}
function performWorkOfUnit(work) {
  if (!work.dom) {
    const dom = (work.dom = createDom(work.type));
    work.parent.dom.append(dom);
    updateProps(dom, work.props);
  }
  // 3.处理链表数据
  // 三种情况
  // 3.1.有child
  // 3.2. 有sibling
  // 3.3.有叔叔节点
  initChildren(work);
  // 4.返回下一个需要执行的数据
  if (work.child) {
    return work.child;
  }
  if (work.sibling) {
    return work.sibling;
  }
  return work.parent?.child;
}

const React = {
  render,
  createElement,
  createTextNode,
};

export default React;
