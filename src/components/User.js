import React, { useState } from "react";

const User = ({
  name,
  status,
  email,
  registerDate,
  loginDate,
  val,
  check,
  onAddId,
  onRemoveId,
}) => {
  const [checkbox, setCheckbox] = useState(false);

  const checkboxHandler = (e) => {
    setCheckbox(e.target.checked);
    if (e.target.checked) {
      onAddId({ _id: e.target.value });
    } else {
      onRemoveId({ _id: e.target.value });
    }
  };

  return (
    <tr>
      <td>
        {check ? (
          <input
            className="form-check-input"
            type="checkbox"
            name="oneSelect"
            checked={check}
            value={val}
          />
        ) : (
          <input
            className="form-check-input"
            type="checkbox"
            name="oneSelect"
            checked={checkbox}
            value={val}
            onChange={checkboxHandler}
          />
        )}
      </td>
      <td>{status ? "active" : "block"}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{new Date(registerDate).toLocaleString()}</td>
      <td>{new Date(loginDate).toLocaleString()}</td>
    </tr>
  );
};

export default User;
