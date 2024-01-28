/*global chrome*/

import "./App.css";
import Category from "./components/Category";
import Chat from "./components/Chat";
import { extractElemList, ValidSites, getBestSiteForUrl } from "./html_parser/extract_elem_list";

function App() {
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
          <Chat />
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
