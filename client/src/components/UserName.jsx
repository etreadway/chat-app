import { useState } from "react";

export const UserName = (props) => {
  const setUserName = props.value.setUserName;

  const [newUserName, setNewUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserName(newUserName);
  };

  const handleTypedUserName = (e) => {
    setNewUserName(e.target.value);
  };

  return (
    <div>
      <p>Choose A Username</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Choose a User Name!"
          value={newUserName}
          onChange={handleTypedUserName}
        />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};
