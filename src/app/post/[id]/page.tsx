"use client";
import { usePathname } from "next/navigation";

function page() {
  const id = usePathname();
  return <div>page post {id}</div>;
}

export default page;

// bagaimana kalau mau buat /post/comment
