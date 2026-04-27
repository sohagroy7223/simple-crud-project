import React from "react";
import { useLoaderData } from "react-router";

const UpdateUser = () => {
  const user = useLoaderData();
  console.log(user);

  const handelUpdateUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    // console.log(name, email);
    const updateUser = { name, email };
    fetch(`http://localhost:3000/users/${user._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateUser),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("after update ", data);
        if (data.modifiedCount) {
          alert("user update success fully");
        }
      });
  };

  return (
    <div>
      <h3>update user</h3>

      <form onSubmit={handelUpdateUser}>
        <input type="text" name="name" defaultValue={user.name} />
        <br />
        <input type="email" name="email" defaultValue={user.email} id="" />
        <br />
        <input type="submit" value="Update user" />
      </form>
    </div>
  );
};

export default UpdateUser;
