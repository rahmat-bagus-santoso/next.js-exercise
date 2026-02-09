"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [product, setProduct] = useState<any>({});

  // get data using axios read, GET
  useEffect(() => {
    const fetchData = async () => {
      const response: any = await axios.get("https://dummyjson.com/posts");
      setProduct(response.data.posts);
    };
    fetchData();
  }, []);
  console.log("response", product);

  // submit form using axios post, POST
  const onSubmitForm = async (data: any) => {
    console.log("useForm", data);

    const response = await axios.post(
      "https://dummyjson.com/products/add",
      data,
    );

    console.log("response", response.data);
  };
  return (
    <div>
      <h1>page product</h1>

      <form onSubmit={handleSubmit(onSubmitForm)}>
        <input {...register("name", { required: true })} placeholder="name" />
        {/* kalau butuh error sudah disiapkan dari react hook form */}
        {errors.name && <div>required input namanyaaa</div>}

        <input {...register("notes", { required: true })} placeholder="notes" />
        {errors.notes && <div>required input notes</div>}
        {/* regex pattern ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ */}
        {/* /i adalah insensitive */}
        {/* apa sih syarat sebuah email? */}
        {/* a@a.a */}
        <input
          {...register("email", {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
          })}
          placeholder="email"
        />
        {errors.email && <div>required email notes</div>}

        <button type="submit">submittttt</button>
      </form>
    </div>
  );
}

export default page;
