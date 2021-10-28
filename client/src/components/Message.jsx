export const Message = (props) => {
  const msg = props.value.message;
  const userName = props.value.userName;

  if (!userName) {
    return <p>{msg}</p>;
  } else {
    return (
      <p>
        {userName}: {msg}
      </p>
    );
  }
};
