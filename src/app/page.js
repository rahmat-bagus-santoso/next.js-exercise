// import List from "../components/List";
import ParentComponent from "@/components/parentComponent";
import Counter from "../components/counter";

export default function Home() {
  const name = "madrid";

  return (
    <>
      <p className="text-blue-500">JSX {name}</p>
      <ParentComponent />
      <Counter />
      {/* <List /> */}
    </>
  );
}
