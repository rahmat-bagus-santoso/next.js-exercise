"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Counter from "@/components/Counter";
import MyComponent from "@/components/MyComponent";
import Name from "@/components/Name";

export default function Home() {
  const router = useRouter();
  const handleClick = () => {
    console.log("click");
  };
  return (
    <>
      <div>
        <h1>Next.js TS</h1>
        {/* link hanya bantu pindah halaman sesuai dari Next js */}
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <a href="/about">about anchor</a>
        <Name click={handleClick} />
        {/* <Counter /> */}
        {/* <MyComponent
          title="ini judul saya"
          subTitle="ini sub title"
          image="image 123"
        /> */}
        <div>
          <button onClick={() => router.push("/contact")}>
            button menuju contact
          </button>
        </div>
      </div>
    </>
  );
}
