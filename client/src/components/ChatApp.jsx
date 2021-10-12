import { useState, useEffect } from "react";

import io from "socket.io-client";

const socket = io("http://localhost:5000");

export const ChatApp = () => {
  const [messageList, setMessageList] = useState([
    "This is a message",
    "This is another message",
  ]);
  const [newMessage, setNewMessage] = useState("");

  const listItems = messageList.map((message) => {
    return <li key={Math.random()}>{message}</li>;
  });

  const handleNewMessage = (e) => {
    setNewMessage(e.target.value);
  };

  const handleMessageSend = (e) => {
    e.preventDefault();

    setMessageList([...messageList, newMessage]);
    setNewMessage("");
  };

  useEffect(() => {
    socket.on("chat message");
  }, []);

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
