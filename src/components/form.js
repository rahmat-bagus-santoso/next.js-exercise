"use client";

import { useState } from "react";

const Form = () => {
  // state untuk form
  const [name, setName] = useState("state kosong");
  const [email, setEmail] = useState("email@boongan.com");
  const [errors, setErrors] = useState({ email: "" });

  const validate = () => {
    let emailError = "";
    if (!email.includes("@")) {
      emailError = "invalid";
      console.log("validate email");
    }
    setErrors({ email: emailError });

    return emailError === "";
  };

  console.log("error", errors);
  // function handle submit
  const handleSubmit = (event) => {
    // event prevent default supaya ketika klik tidak reload halaman
    event.preventDefault();

    // kita validate email dahulu
    if (validate()) {
      console.log("validate submit");
      alert("submit email");
    }
    console.log("submit test", name, email);
    // mengembalikan state menjadi kosong seperti awal
    setName("");
    setEmail("");
  };

  console.log("form component");
  return (
    <div>
      <h1>form</h1>
      <form onSubmit={handleSubmit}>
        <p>Name</p>
        <input
          type="text"
          // value menempelkan nilai state ke input
          value={name}
          // onchange merubah state sesuai hasil user input
          onChange={(event) => setName(event.target.value)}
        />
        <p>email</p>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        {/* button submit untuk trigger button submit ke event onsobmit */}
        <button type="submit">submit button</button>
      </form>
    </div>
  );
};

export default Form;
