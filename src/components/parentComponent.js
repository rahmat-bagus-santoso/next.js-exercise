import ChildComponent from "./childComponent";

function ParentComponent() {
  const name = "madrid";
  const addNumber = () => {
    console.log("add number");
  };
  return (
    <>
      <h1>Parent Component</h1>
      <ChildComponent name={name} name2={name} />
    </>
  );
}

export default ParentComponent;
