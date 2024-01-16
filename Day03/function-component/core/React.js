let shouldYield = false;
let nextWOrkOfUnit = null;
let root = null;
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
        const isTextNode = typeof child === "string" || typeof child === "number";
        return isTextNode ? createTextNode(child) : child;
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
  root = nextWOrkOfUnit;
}

function workLoop(deadline) {
  while (!shouldYield && nextWOrkOfUnit) {
    shouldYield = deadline.timeRemaining() < 1;
    nextWOrkOfUnit = performWorkOfUnit(nextWOrkOfUnit);
  }
  // 这里的添加替换为统一提交
  if (!nextWOrkOfUnit && root) {
    commitRoot();
  }
  // 这里要一直执行，找寻浏览器的空闲时间
  requestIdleCallback(workLoop);
}
function commitRoot() {
  commitWork(root.child);
  root = null
}
function commitWork(fiber) {
  if(!fiber) return

  let fiberParent = fiber.parent
  if(!fiberParent.dom) {
    fiberParent = fiber.parent.parent
  }

  if(fiber.dom) {
    fiberParent.dom.append(fiber.dom)
  }
  commitWork(fiber.child)
  commitWork(fiber.sibling)
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
function initChildren(fiber, children) {
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
function updateFunctionComponent(fiber) {
  const children = [fiber.type(fiber.props)]
  initChildren(fiber, children);
}
function updateHostComponent(fiber) {
    if (!fiber.dom) {
      const dom = (fiber.dom = createDom(fiber.type));
      updateProps(dom, fiber.props);
    }
  const children = fiber.props.children;
  initChildren(fiber, children);
}
function performWorkOfUnit(fiber) {
  const isFunctionComponent = typeof fiber.type === 'function';
  if(isFunctionComponent) {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
  }
  // 3.处理链表数据
  // 三种情况
  // 3.1.有child
  // 3.2. 有sibling
  // 3.3.有叔叔节点
  // 4.返回下一个需要执行的数据
  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;
  while (nextFiber) {
    if(nextFiber.sibling) return nextFiber.sibling;
    nextFiber = nextFiber.parent;
  }
}
requestIdleCallback(workLoop);

const React = {
  render,
  createElement,
  createTextNode,
};

export default React;
