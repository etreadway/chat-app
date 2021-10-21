import { useState } from "react";

export const Topics = (props) => {
  const socket = props.socket;
  const setCurrentTopic = props.setCurrentTopic;
  const currentTopic = props.currentTopic;

  const [topicList, setTopicList] = useState(["1", "2", "3", "general"]);

  const [newTopic, setNewTopic] = useState("");

  const handleJoin = (e) => {
    socket.emit("leave topic", currentTopic);
    setCurrentTopic(e.target.value);
    socket.emit("join topic", e.target.value);
  };

  const handleSubmitTopic = (e) => {
    e.preventDefault();
    setTopicList([...topicList, newTopic]);
    setNewTopic("");
  };

  const handleTypedTopic = (e) => {
    setNewTopic(e.target.value);
  };

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
