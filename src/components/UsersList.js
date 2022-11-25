import React from "react";
import User from "./User";

const UsersList = ({ users, check, onAddtoPanel, onRemovePanel }) => {
  const addHandler = (userId) => {
    onAddtoPanel(userId);
  };
  const removeHandler = (userId) => {
    onRemovePanel(userId);
  };
  return (
    <>
      {users.map((user) => (
        <User
          key={user._id}
          val={user._id}
          name={user.name}
          email={user.email}
          status={user.status}
          registerDate={user.createdAt}
          loginDate={user.updatedAt}
          check={check}
          onAddId={addHandler}
          onRemoveId={removeHandler}
        />
      ))}
    </>
  );
};

export default UsersList;
