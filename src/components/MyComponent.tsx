import { Props } from "../types/type";

// memastikan props yang dilempar dari parent component sudah type safety

const MyComponent = ({ title }: { title: string }) => {
  const name: string = "nama saya Thoriq";
  const count: number = 22;
  const isDarkMode: boolean = true;
  const library: string[] = ["next js", "react", "nest js"];
  const user: { name: string; age?: number } = { name: "revou", age: 5 };

  return (
    <div>
      <h1>My Component</h1>
      <h1>My {title}</h1>
    </div>
  );
};

export default MyComponent;
