import React from "react";

const SingleUser = ({ user }) => {
  //   console.log(user);
  return (
    <div>
      <h2>{user.name}</h2>
      {user.email}
    </div>
  );
};

export default SingleUser;
