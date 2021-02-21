// Libraries
import React from 'react';

const StatusIndicator = (props) => {
  //@PROP: status - string

  const status = props.status || "INACTIVE";
  let classColorName = "kit-bg-red";
  if(status === "ACTIVE") classColorName = "kit-bg-green";
  if(status === "PENDING") classColorName = "kit-bg-yellow";

  return (
    <div 
      className={
        (props.className || "") + " " +
        classColorName + " " +
        " kit-border-shadow rounded-circle"
      }
      style={{
        height: "2rem",
        width: "2rem"
      }}
    />
  );
}
export default StatusIndicator;