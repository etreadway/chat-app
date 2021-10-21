import { useEffect, useState } from "react";

import io from "socket.io-client";

import { Message } from "./Message";

const socket = io("http://localhost:5001");

export const ChatApp = () => {
  const [currentTopic, setCurrentTopic] = useState("general");

  const [incoming, setIncoming] = useState("");

  const [messageList, setMessageList] = useState([]);

  const [newMessage, setNewMessage] = useState("");

  socket.on("incoming", (stuff) => {
    setIncoming(stuff);
  });

  useEffect(() => {
    setMessageList((messageList) => [...messageList, incoming.message]);

    return () => {
      "Message Sent";
    };
  }, [incoming]);

  const listItems = messageList.map((message) => {
    return <Message key={Math.random()} value={message} />;
  });

  const handleTypingMessage = (e) => {
    setNewMessage(e.target.value);
  };

  const handleMessageSend = (e) => {
    e.preventDefault();
    socket.emit("New Message", newMessage, currentTopic);
    setNewMessage("");
  };

  const handleJoin = (e) => {
    socket.emit("leave topic", currentTopic);
    setCurrentTopic(e.target.value);
    socket.emit("join topic", e.target.value);
  };

  return (
    <div>
      <button value="1" onClick={handleJoin}>
        Join topic 1
      </button>
      <button value="2" onClick={handleJoin}>
        Join topic 2
      </button>
      <button value="3" onClick={handleJoin}>
        Join topic 3
      </button>
      <button value="general" onClick={handleJoin}>
        general
      </button>
      <h1>Welcome To Room: {currentTopic}</h1>
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
