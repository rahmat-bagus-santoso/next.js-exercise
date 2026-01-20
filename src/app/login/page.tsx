"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const handleLogin = () => {
    const data = JSON.stringify({ nameLS: name });
    localStorage.setItem("login", data);
    router.push("/private");
  };

  return (
    <>
      <h1>login page</h1>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleLogin}>login</button>
    </>
  );
}

export default page;
