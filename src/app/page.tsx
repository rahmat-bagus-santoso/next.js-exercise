import MyComponent from "@/components/MyComponent";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div>
        <h1>Next.js TS</h1>
        <MyComponent title="ini judul saya" />
      </div>
    </>
  );
}
