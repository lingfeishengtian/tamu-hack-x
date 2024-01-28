/*global chrome*/

import "./App.css";
import Category from "./components/Category";
import Chat from "./components/Chat";

function App() {
  chrome.tabs.query({ }, function (tabs) {
    for (let tab of tabs) {
      console.log(tab);
      console.log("test")
    }
  })
  return (
    <>
      <div id="topBar">Tabventure</div>
      <div id="mainContainer">
        <div id="sideBarWrapper">
          <div className="categoryMenuButtons">Airlines</div>
          <div className="categoryMenuButtons">Housing</div>
          <div className="categoryMenuButtons">Dining</div>
          <div className="categoryMenuButtons">Activities</div>
          <div className="categoryMenuButtons"></div>
          <div className="categoryMenuButtons">Bookmarks</div>

        </div>
        <div id="chatWrapper">
          <Chat/>
        </div>
        {/* <div id="left">
            <Chat />
        </div> */}
        {/* <div id="right">
          <div id="box">
            <Category title="Airlines" />
            <Category title="Housing" />
            <Category title="Food" />
            <Category title="Entertainment" />
          </div>
        </div> */}
      </div>
    </>
  );
}

export default App;
