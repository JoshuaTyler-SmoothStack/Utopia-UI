// Libraries
import React from 'react';

// Styles
import "../../../styles/KitStyles.css";

const MSTitle = (props) => {
  //@PROP: buttonSize - num
  //@PROP: isActive - bool
  //@PROP: text - string
  const buttonSize = props.buttonSize || 30;
  const isActive = props.isActive || false;
  const text = props.text || "No connection.";

  return ( 
    <div 
      className={"border-radius-sm border-shadow no-user flex-row " + (isActive ? "bg-green" : "bg-yellow")}
      style={{
        height: buttonSize + "px",
        width: (buttonSize * 4) + "px",
        fontSize: buttonSize * 0.33 + "px",
      }}
    >
      {text}
    </div>
  );
}
export default MSTitle;