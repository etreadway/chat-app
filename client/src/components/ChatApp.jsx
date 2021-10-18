import { useEffect, useState } from "react";

import io from "socket.io-client";

import { Message } from "./Message";

const socket = io("http://localhost:5001");

export const ChatApp = () => {
  // const socket = io("http://localhost:5001");
  const [currentRoom, setCurrentRoom] = useState("general");

  const [incoming, setIncoming] = useState("");

  const [messageList, setMessageList] = useState([
    "This is a message",
    "This is another message",
  ]);

  const [newMessage, setNewMessage] = useState("");

  socket.on("incoming", (stuff) => {
    setIncoming(stuff);
  });

  useEffect(() => {
    setMessageList([...messageList, incoming.message]);

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
    socket.emit("New Message", newMessage, currentRoom);
    setNewMessage("");
  };

  const handleJoin = (e) => {
    setCurrentRoom(e.target.value);
    socket.emit("join room", e.target.value);
  };

  // useEffect(() => {
  //   setMessageList([...messageList, incoming.message]);

  //   return () => {
  //     "Message Sent";
  //   };
  // }, [incoming]);

  const handleLogCurrentRoom = () => {
    socket.emit("too room one");
  };

  return (
    <div>
      <button value="1" onClick={handleJoin}>
        Join room 1
      </button>
      <button value="2" onClick={handleJoin}>
        Join room 2
      </button>
      <button value="3" onClick={handleJoin}>
        Join room 3
      </button>
      <button value="general" onClick={handleJoin}>
        general
      </button>
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
