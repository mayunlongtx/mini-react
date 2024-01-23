let nextWOrkOfUnit = null;
let wipRoot = null;
let wipFiber = null;
let currentRoot = null;
let deletions = [];
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
        const isTextNode =
          typeof child === "string" || typeof child === "number";
        return isTextNode ? createTextNode(child) : child;
      }),
    },
  };
}

function render(el, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [el],
    },
  };
  nextWOrkOfUnit = wipRoot;
}

function workLoop(deadline) {
  let shouldYield = false;
  while (!shouldYield && nextWOrkOfUnit) {
    nextWOrkOfUnit = performWorkOfUnit(nextWOrkOfUnit);

    if (wipRoot?.sibling?.type === nextWOrkOfUnit?.type) {
      nextWOrkOfUnit = undefined;
    }

    shouldYield = deadline.timeRemaining() < 1;
  }

  // 这里的添加替换为统一提交
  if (!nextWOrkOfUnit && wipRoot) {
    commitRoot();
  }
  // 这里要一直执行，找寻浏览器的空闲时间
  requestIdleCallback(workLoop);
}
function commitRoot() {
  deletions.forEach(commitDeletions);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  console.log(currentRoot);
  wipRoot = null;
  deletions = [];
}
function commitDeletions(fiber) {
  let fiberParent = fiber.parent;
  while (!fiberParent.dom) {
    fiberParent = fiberParent.parent;
  }
  if (fiber.dom) {
    fiberParent.dom.removeChild(fiber.dom);
  } else {
    commitDeletions(fiber.child);
  }
}
function commitWork(fiber) {
  if (!fiber) return;

  let fiberParent = fiber.parent;
  while (!fiberParent.dom) {
    fiberParent = fiberParent.parent;
  }

  if (fiber.effectTag === "update") {
    console.log(fiber.alternate.props);
    updateProps(fiber.dom, fiber.props, fiber.alternate?.props);
  } else if (fiber.effectTag === "placement") {
    if (fiber.dom) {
      fiberParent.dom.append(fiber.dom);
    }
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
function createDom(type) {
  return type !== "TEXT_ELEMENT"
    ? document.createElement(type)
    : document.createTextNode("");
}
function updateProps(dom, nextProps, prevProps) {
  // Object.keys(nextProps).forEach((key) => {
  //   if (key !== "children") {
  //     if (key.startsWith("on")) {
  //       const eventType = key.slice(2).toLowerCase();
  //       dom.addEventListener(eventType, nextProps[key]);
  //     } else {
  //       dom[key] = nextProps[key];
  //     }
  //   }
  // });
  // 1.  old  有  new 无  就删除
  Object.keys(prevProps).forEach((key) => {
    if (key !== "children") {
      if (!(key in nextProps)) {
        dom.removeAttribute(key);
      }
    }
  });
  // 2.  new  有  old 无 就添加
  // 3.  new  有  old 有  就修改
  Object.keys(nextProps).forEach((key) => {
    if (key !== "children") {
      if (nextProps[key] !== prevProps[key]) {
        if (key.startsWith("on")) {
          const eventType = key.slice(2).toLowerCase();
          dom.removeEventListener(eventType, prevProps[key]);
          dom.addEventListener(eventType, nextProps[key]);
        } else {
          dom[key] = nextProps[key];
        }
      }
    }
  });
}
function reconcileChildren(fiber, children) {
  let oldFiber = fiber.alternate?.child;
  let prevChild = null;
  children.forEach((child, index) => {
    const isSameType = oldFiber && oldFiber.type === child.type;
    let newFiber;
    if (isSameType) {
      newFiber = {
        type: child.type,
        props: child.props,
        parent: fiber,
        child: null,
        sibling: null,
        dom: oldFiber.dom,
        alternate: oldFiber,
        effectTag: "update",
      };
    } else {
      if (child) {
        newFiber = {
          type: child.type,
          props: child.props,
          parent: fiber,
          child: null,
          sibling: null,
          dom: null,
          effectTag: "placement",
        };
      }
      if (oldFiber) {
        deletions.push(oldFiber);
      }
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevChild.sibling = newFiber;
    }
    if (newFiber) {
      prevChild = newFiber;
    }
  });
  while (oldFiber) {
    deletions.push(oldFiber);
    oldFiber = oldFiber.sibling;
  }
}
function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}
function updateHostComponent(fiber) {
  if (!fiber.dom) {
    const dom = (fiber.dom = createDom(fiber.type));
    updateProps(dom, fiber.props, {});
  }
  const children = fiber.props.children;
  reconcileChildren(fiber, children);
}
function performWorkOfUnit(fiber) {
  const isFunctionComponent = typeof fiber.type === "function";
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
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
    if (nextFiber.sibling) return nextFiber.sibling;
    nextFiber = nextFiber.parent;
  }
}

function update() {
  return () => {
    let currentFiber = wipFiber;
    console.log(currentFiber, "currentFiber");
    wipRoot = {
      ...currentFiber,
      alternate: currentRoot,
    };
    nextWOrkOfUnit = wipRoot;
  };
}

requestIdleCallback(workLoop);

const React = {
  render,
  update,
  createElement,
};

export default React;

// alternate
