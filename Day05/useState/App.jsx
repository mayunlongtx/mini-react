import React from "./core/React.js";
function handleClick() {
  console.log(123);
}
function Counter({num}) {
  return <div>Counter: {num}<button onClick={handleClick}>click</button>;</div>;
}
function CounterContainer() {
  return <Counter></Counter>
}
function App() {
  return (
    <div>
      app-mini-react
      <Counter num={10}/>
      {/* <Counter num={20}/> */}
    </div>
  );
}
export default App;
