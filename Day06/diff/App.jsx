import React from "./core/React.js";

let countFoo = 1
function Foo() {
  const update =  React.update();
  function handleCount() {
    countFoo++
    update()
  }
  return (
    <div>
      <h1>Foo</h1>
      minimini---
      { countFoo }
      <button onClick={handleCount}>handleCount</button>
    </div>
  );
}


let countBar= 1
function Bar() {
  const update =  React.update();
  function handleCount() {
    countBar++
    update()
  }
  return (
    <div>
      <h1>Bar</h1>
      minimini---
      { countBar }
      <button onClick={handleCount}>handleCount</button>
    </div>
  );
}

let countApp = 1
function App() {
  const update =  React.update();
  function handleCount() {
    countApp++
    update()
  }
  return (
    <div>
      app-mini-react
      <div>{countApp}</div>
      <button onClick={handleCount}>handleCount</button>
      <Foo />
      <Bar/>
      {/* <Counter num={20}/> */}
    </div>
  );
}
export default App;
