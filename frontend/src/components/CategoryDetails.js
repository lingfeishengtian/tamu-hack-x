import { useEffect, useState } from "react";
import backButton from "../assets/backButton.png";
import { getCategories } from "../AI_API";

function getCategoryName(category) {
  switch (category) {
    case "Airlines":
      return "flight";
    case "Housing":
      return "housing";
    case "Dining":
      return "restaurant";
    case "Activities":
      return "activity";
    default:
      return "flight";
  }
}

const CategoryDetails = ({ category, onClose }) => {
  let [tabs, setTabs] = useState([]);
  useEffect(() => {
    getCategories(getCategoryName(category)).then((response) => {
      setTabs([...new Set(response.ret.map((tab) => tab.link))]);
    });
  }
  , []);

  return (
    <div id="infoBG">
      <div
        style={{
          color: "white",
          fontFamily: "mainFont",
          fontSize: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80px",
        }}
      >
        {category}
      </div>
      <img
        onClick={onClose}
        style={{
          position: "absolute",
          width: "15px",
          height: "30px",
          top: "20px",
          left: "20px",
        }}
        src={backButton}
      />
      <div style={{display: "flex", marginTop: "50px", alignItems: 'center', flexDirection: 'column'}}>
      {tabs.map((tab, index) => (
            <div style={{color: 'white', fontFamily: 'secFont'}} key={index}>{tab}</div>
          ))}
      </div>
    </div>
  );
};

export default CategoryDetails;
