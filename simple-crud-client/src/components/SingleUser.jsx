import React from "react";

const SingleUser = ({ user }) => {
  //   console.log(user);

  const handelDeleteUser = (id) => {
    console.log("user delete ", id);
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after delete", data);
      });
  };

  return (
    <div>
      <p>
        {user.name}: {user.email}
        <button onClick={() => handelDeleteUser(user._id)}>x</button>
      </p>
    </div>
  );
};

export default SingleUser;
