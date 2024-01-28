const Message = ({ message, sender }) => {
  return (
    <div id="messageWrapper">
      <div id="contentWrapper">
        <div style={{fontWeight: "bold"}}>{sender}</div>
        <div >{message}</div>
      </div>
    </div>
  );
};

export default Message;
