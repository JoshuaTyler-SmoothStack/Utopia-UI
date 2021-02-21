// Libraries
import React from 'react';

const StatusAsyncIndicator = (props) => {
  //@PROP: status - string

  const status = props.status || "INACTIVE";
  return (
    <div 
      className={"kit-border-shadow rounded-circle " + 
        (props.className || "") + " " +
        (status === "PENDING" ? "kit-blink" : "kit-opacity-25")
      }
      style={{
        backgroundColor:"#007bff",
        height: "2rem",
        width: "2rem",
        ...props.style
      }}
    />
  );
}
export default StatusAsyncIndicator;