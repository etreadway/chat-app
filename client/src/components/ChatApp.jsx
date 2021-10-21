import { useEffect, useState } from "react";

import io from "socket.io-client";

import { Message } from "./Message";
import { Topics } from "./Topics";

const socket = io("http://localhost:5001");

export const ChatApp = () => {
  const [currentTopic, setCurrentTopic] = useState("general");

  const [incoming, setIncoming] = useState("");

  const [messageList, setMessageList] = useState([]);

  const [newMessage, setNewMessage] = useState("");

  socket.on("incoming", (stuff) => {
    setIncoming(stuff);
  });

  // socket.on("join test", (msg) => {
  //   console.log(msg);
  // });

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

  return (
    <div>
      <Topics
        socket={socket}
        setCurrentTopic={setCurrentTopic}
        currentTopic={currentTopic}
      />

      <h1>Welcome To Topic: {currentTopic}</h1>
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
