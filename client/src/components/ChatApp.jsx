import { useEffect, useState } from "react";

import io from "socket.io-client";

import { Message } from "./Message";

const socket = io("http://localhost:5001");

export const ChatApp = () => {
  // const socket = io("http://localhost:5001");

  const [incoming, setIncoming] = useState("");

  const [messageList, setMessageList] = useState([
    "This is a message",
    "This is another message",
  ]);

  socket.on("incoming", (stuff) => {
    setIncoming(stuff);
    // setMessageList([...messageList, stuff]);
  });

  useEffect(() => {
    setMessageList([...messageList, incoming.message]);

    return () => {
      "Message Sent";
    };
  }, [incoming]);

  const [newMessage, setNewMessage] = useState("");

  const listItems = messageList.map((message) => {
    return <Message key={Math.random()} value={message} />;
  });

  const handleTypingMessage = (e) => {
    setNewMessage(e.target.value);
  };

  const handleMessageSend = (e) => {
    e.preventDefault();
    socket.emit("newMessage", newMessage);
    setNewMessage("");
  };

  return (
    <div>
      <div>{listItems}</div>
      <form onSubmit={handleMessageSend}>
        <input
          type="text"
          placeholder="message"
          onChange={handleTypingMessage}
          value={newMessage}
        />
        <button onClick={handleMessageSend}>Send</button>
      </form>
    </div>
  );
};
