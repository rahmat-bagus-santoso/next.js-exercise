function CounterChild({ count, setCount }) {
  return (
    <>
      <h1>Counter Child</h1>
      <h2>Total Count {count}</h2>
      <div>
        <button onClick={() => setCount(count + 1)}>+</button>
        <button onClick={() => setCount(count - 1)}>-</button>
      </div>
    </>
  );
}

export default CounterChild;
