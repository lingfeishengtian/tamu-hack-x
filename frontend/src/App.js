/*global chrome*/

import "./App.css";
import Category from "./components/Category";
import hamburger from "../src/assets/hamburger.png";
import Chat from "./components/Chat";
import { useEffect, useState } from "react";
import CategoryDetails from "./components/CategoryDetails";
import { sendHTMLRequest } from "./AI_API";

function App() {
  useEffect(() => {
    sendHTMLRequest();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [showSideBar, setShowSideBar] = useState(false);

  function handleHamburgerClick() {
    setShowSideBar(!showSideBar);
  }

  function handleCategoryClick(category) {
    setSelectedCategory(category);
  }

  function handleCategoryDetailsClose() {
    setSelectedCategory(null);
  }

  return (
    <>
      <div id="topBar">Tabventure</div>
      <div id="mainContainer">
        {showSideBar && (
          <div id="sideBarWrapper">
            <div
              className="categoryMenuButtons"
              onClick={() => handleCategoryClick("Airlines")}
            >
              Airlines
            </div>
            <div
              className="categoryMenuButtons"
              onClick={() => handleCategoryClick("Housing")}
            >
              Housing
            </div>
            <div
              className="categoryMenuButtons"
              onClick={() => handleCategoryClick("Dining")}
            >
              Dining
            </div>
            <div
              className="categoryMenuButtons"
              onClick={() => handleCategoryClick("Activities")}
            >
              Activities
            </div>
            {selectedCategory && (
              <CategoryDetails
                category={selectedCategory}
                onClose={handleCategoryDetailsClose}
              />
            )}
          </div>
        )}

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
      <div id="hamburgerWrap">
        <img onClick={handleHamburgerClick} id="hbImg" src={hamburger} />
      </div>
    </>
  );
}

export default App;
