import { useState, useEffect } from "react";

export const Topics = (props) => {
  const socket = props.socket;
  const setCurrentTopic = props.setCurrentTopic;
  const currentTopic = props.currentTopic;

  const [topicList, setTopicList] = useState([]);

  const [newTopic, setNewTopic] = useState("");

  const handleJoin = (e) => {
    if (currentTopic !== e.target.value) {
      socket.emit("leave topic", currentTopic);
      setCurrentTopic(e.target.value);
      socket.emit("join topic", e.target.value);
    }
  };

  const handleSubmitTopic = (e) => {
    e.preventDefault();
    if (newTopic !== "") {
      socket.emit("POST new topic", newTopic);
      setNewTopic("");
    }
  };

  const handleTypedTopic = (e) => {
    setNewTopic(e.target.value);
  };

  useEffect(() => {
    socket.on("new topic list", (topic) => {
      setTopicList(topic);
    });
    return () => {
      socket.off("new topic list");
    };
  }, [socket]);

  const topicArray = topicList.map((topic) => {
    return (
      <button key={Math.random()} value={topic} onClick={handleJoin}>
        {topic}
      </button>
    );
  });

  return (
    <div>
      <form onSubmit={handleSubmitTopic}>
        <input value={newTopic} type="text" onChange={handleTypedTopic} />
        <button onClick={handleSubmitTopic}>make new topic</button>
      </form>
      {topicArray}
    </div>
  );
};
