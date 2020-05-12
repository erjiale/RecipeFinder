import React, { Component } from "react";

const User_ = (props) => {
  const { user } = props;
  return (
    <main>
      <p>
        You are successfully logged in as {user.name}{" "}
        {user.admin ? "(admin)" : ""}
      </p>
    </main>
  );
};

export default User_;
