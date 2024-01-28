import backButton from "../assets/backButton.png";

const CategoryDetails = ({ category, onClose , tabs}) => {
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
