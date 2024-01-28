import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { sendChatMessage } from "../AI_API";

const Chat = () => {
  const [messages, setMessages] = useState([
    { message: "Hello, how can I help you?", sender: "Tabventure Assistant" },
  ]);

  const [inputValue, setInputValue] = useState("");

  const messagesContainerRef = useRef();

  useEffect(() => {
    // Scroll to the bottom of the messages container when messages change
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }, [messages]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (inputValue.trim() !== "") {
        setMessages([...messages, { message: inputValue, sender: "You" }]);
        // Perform the form submission or any other action
        // For example, you can reset the input value after submission
        sendChatMessage(inputValue.trim()).then((response) => {
          event.preventDefault();
          console.log(response.message)
          setMessages([
            ...messages,
            { message: inputValue, sender: "You" },
            { message: response.message, sender: "Tabventure Assistant" },
          ]);
        });
        setInputValue("");
      }
    }
    // Check if the input value is not empty before submitting
  };

  return (
    <div id="chatMainWrapper">
      <div id="messagesWrap">
        <div id="messagesContainer" ref={messagesContainerRef}>
          <div id="buffer" style={{ width: "100%", height: "20px" }}></div>
          {messages.map((message) => (
            <Message message={message.message} sender={message.sender} />
          ))}
        </div>
      </div>
      <div id="inputWrap">
        <div id="oval">
          <input
            id="messageInput"
            type="text"
            style={{
              border: "none",
              backgroundColor: "transparent",
              outline: "10px",
              width: "100%",
            }}
            onChange={handleInputChange}
            value={inputValue}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question..."
          />
        </div>
      </div>
      {/* <div id="window">
        
        <div id="inputWrapper">
          <div id="inputOval">
            
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Chat;
