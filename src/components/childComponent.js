"use client";
function ChildComponent({ name, name2 }) {
  // console.log("add number", addNumber);
  return (
    <>
      <h1>Child Component</h1>
      <p>
        props dari parent {name} {name2}
      </p>
      <button>Child dengan function dari parent</button>
    </>
  );
}

export default ChildComponent;
