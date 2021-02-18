// Libraries
import React from 'react';

const StatusIndicator = (props) => {
  //@PROP: size - num
  //@PROP: status - string
  const size = props.size || "30px";
  const status = props.status || "INACTIVE";
  let classColorName = "kit-bg-red ";
  if(status === "ACTIVE") classColorName = "kit-bg-green ";
  if(status === "PENDING") classColorName = "kit-bg-yellow ";

  return (
    <div 
      className={classColorName + "kit-border-shadow rounded-circle"}
      style={{
        height: size,
        width: size,
      }}
    />
  );
}
export default StatusIndicator;