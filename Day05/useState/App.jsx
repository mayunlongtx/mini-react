import React from "./core/React.js";

let count = 66;
let props = {
  id: "ididid",
};
function Counter({ num }) {
  function handleClick() {
    count++;
    props = {};
    React.update();
  }
  return (
    <div {...props}>
      Counter: {count}
      <button onClick={handleClick}>click</button>
    </div>
  );
}
function CounterContainer() {
  return <Counter></Counter>;
}
function App() {
  return (
    <div>
      app-mini-react
      <Counter num={10} />
      {/* <Counter num={20}/> */}
    </div>
  );
}
export default App;
