import React from "./core/React";
function Counter({ num }) {
  return <div>Counter: {num}</div>;
}
function App() {
  return (
    <div>
      app-mini-react
      <Counter num={30} />
      <Counter num={40} />
    </div>
  );
}
export default App;
