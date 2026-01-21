"use client";
import { useForm, SubmitHandler } from "react-hook-form";

// 1. Define the shape of your form
interface IProductForm {
  name: string;
  notes: string;
  email: string;
}

function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProductForm>();

  // 2. Updated onSubmit with native fetch
  const onSubmitForm: SubmitHandler<IProductForm> = async (data) => {
    try {
      console.log("Submitting data:", data);

      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Manual stringify required for fetch
      });

      // Fetch doesn't throw on 4xx/5xx errors, so we check response.ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json(); // Manual JSON parsing required
      console.log("Response Success:", result);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div>
      <h1>Page Product</h1>

      <form onSubmit={handleSubmit(onSubmitForm)}>
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="name"
        />
        {errors.name && (
          <div style={{ color: "red" }}>{errors.name.message}</div>
        )}

        <input
          {...register("notes", { required: "Notes are required" })}
          placeholder="notes"
        />
        {errors.notes && (
          <div style={{ color: "red" }}>{errors.notes.message}</div>
        )}

        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
              message: "Invalid email format",
            },
          })}
          placeholder="email"
        />
        {errors.email && (
          <div style={{ color: "red" }}>{errors.email.message}</div>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Page;
