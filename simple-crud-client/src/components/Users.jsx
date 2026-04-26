import React from "react";
import { use } from "react";
import SingleUser from "./SingleUser";
import { useState } from "react";

const Users = ({ userPromise }) => {
  const initialUsers = use(userPromise);
  const [users, setUsers] = useState(initialUsers);

  const handelSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    // console.log(name, email);
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

        if (data.insertedId) {
          newUser._id = data.insertedId;
          const newUsers = [...users, newUser];
          setUsers(newUsers);
          alert("user insertedId successfully");
          e.target.reset();
        }
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
      <div>
        <h3>all user is here {users.length}</h3>
        {users.map((user) => (
          <SingleUser key={user._id} user={user}></SingleUser>
        ))}
      </div>
    </div>
  );
};

export default Users;
