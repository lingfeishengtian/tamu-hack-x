import "../App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";

function Category({
  title = "title",
  tabList = ["www.trivago.com", "www.aa.com"],
  summary = "this is a summary. this is a summary. this is a summary. ",
}) {
  const [messages, setMessages] = useState([
    { message: "message one lolz", sender: "bot" },
  ]);

  return (
    <div id="categoryContainer">
      <div id="categoryHeader">{title}</div>
      <div id="contentContainer">
        <div id="summaryContainer">
          <textarea
            style={{
              width: "100%",
              height: "100%",
              resize: "none",
              border: "none",
              overflow: "auto",
              backgroundColor: "transparent",
              padding: "20px",
            }}
          >
            {summary}
          </textarea>
        </div>
        <div id="tabListContainer">
        {tabList.map((tab, index) => (
            <div key={index}>{tab}</div>
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default Category;
