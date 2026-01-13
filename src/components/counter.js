"use client";
import { useState } from "react";
import CounterChild from "./counterChild";

const Counter = () => {
  // pembuatan state berbeda dari variable
  const [count, setCount] = useState(12345);
  console.log("render");

  let testVariable = 0;
  return (
    <>
      <h1>Counter Component</h1>
      <CounterChild count={count} setCount={setCount} />

      <div>
        <h1>Variable {testVariable}</h1>
        <button onClick={() => testVariable + 1}>+</button>
      </div>
    </>
  );
};

export default Counter;
