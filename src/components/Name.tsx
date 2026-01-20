"use client";
// selama kita menggunakan cliet side rendering kita akan membutuhkan "use client"
import { useEffect, useState } from "react";

// Cara #1
// function Name({ instructor }: { instructor: string }) {

// Cara #2 biasanya digunakan lebih dari 2 props
// interface IProps {
//   instructor: string;
// }

// function Name({ instructor }: IProps) {

// Cara #3
// interface IProps {
//   instructor: string;
// }

// const Name: React.FC<IProps> = ({ instructor }) => {

// pilih manapun tidak masalah, karena semua codingan TS akan di compile kembali menjadi JS

interface IProps {
  instructor?: string;
  click: () => void; // karena tidak ada return, kasih void
}
function Name({ instructor = "tes", click }: IProps) {
  const [name, setName] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  console.log("instructor", instructor);

  const [todo, setTodo] = useState<{
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }>({
    userId: 0,
    id: 0,
    title: "",
    completed: false,
  });

  const fetchDataSingle = () => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => setTodo(json));
  };

  useEffect(() => {
    fetchDataSingle();
  }, []);

  console.log("todo", todo);

  return (
    <div>
      <h1>Name</h1>
      <input type="text" value={name} onChange={handleChange} />
    </div>
  );
}

export default Name;
