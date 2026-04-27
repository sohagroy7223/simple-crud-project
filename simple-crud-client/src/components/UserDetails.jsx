import React from "react";
import { useLoaderData } from "react-router";

const UserDetails = () => {
  const user = useLoaderData();

  return (
    <div>
      <h3>User details</h3>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
};

export default UserDetails;
