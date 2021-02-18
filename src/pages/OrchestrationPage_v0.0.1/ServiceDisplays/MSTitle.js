// Libraries
import React from 'react';

const MSTitle = (props) => {
  //@PROP: buttonSize - num
  //@PROP: isActive - bool
  //@PROP: text - string
  const buttonSize = props.buttonSize || 30;
  const isActive = props.isActive || false;
  const text = props.text || "No connection.";

  return ( 
    <div 
      className={"rounded border-shadow kit-no-user flex-row " + (isActive ? "bg-green" : "bg-yellow")}
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