import { useState } from "react";

export const ChatApp = () => {
  const [messageList, setMessageList] = useState([
    "This is a message",
    "This is another message",
  ]);
  const [newMessage, setNewMessage] = useState("");

  const listItems = messageList.map((message) => {
    return <li>{message}</li>;
  });

  const handleNewMessage = (e) => {
    setNewMessage(e.target.value);
  };

  const handleMessageSend = (e) => {
    e.preventDefault();
    console.log(newMessage);
    setMessageList([...messageList, newMessage]);
    setNewMessage("");
  };

  return (
    <div>
      <ul>{listItems}</ul>
      <form onSubmit={handleMessageSend}>
        <input
          type="text"
          placeholder="message"
          onChange={handleNewMessage}
          value={newMessage}
        />
        <button onClick={handleMessageSend}>Send</button>
      </form>
    </div>
  );
};
