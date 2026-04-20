import React from "react";

const Users = () => {
  const handelSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    console.log(name, email);
    const newUser = { name, email };

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after saving user", data);
      });
  };

  return (
    <div>
      <form onSubmit={handelSubmit}>
        <input type="text" name="name" placeholder="Enter Your Name" />
        <br />
        <input type="email" name="email" placeholder="Your Email" id="" />
        <br />
        <input type="submit" value="submit" />
        <br />
      </form>
    </div>
  );
};

export default Users;
