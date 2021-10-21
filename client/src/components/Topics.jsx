export const Topics = (props) => {
  const socket = props.socket;
  const setCurrentTopic = props.setCurrentTopic;
  const currentTopic = props.currentTopic;

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
    </div>
  );
};
