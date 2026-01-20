"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
function page() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedin = localStorage.getItem("login");
    if (!isLoggedin) {
      router.push("/");
    }
  }, []);
  return (
    <div>
      <h1>private page </h1>
    </div>
  );
}

export default page;
