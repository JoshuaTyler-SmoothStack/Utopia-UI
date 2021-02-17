// Libraries
import React from 'react';

// Styles
import "../../styles_v0.0.1/KitStyles.css";

const PathIndicator = (props) => {
  //@PROP: location - string
  //@PROP: size - num
  const location = props.location || "No connection.";
  const size = props.size || 30;

  return ( 
    <div 
      className={"bg-smoke border-radius-xsm border-shadow flex-row"}
      style={{
        height: size + "px",
        width: (size * 5) +"px",
      }}
    >
      {location}
    </div>
  );
}
export default PathIndicator;