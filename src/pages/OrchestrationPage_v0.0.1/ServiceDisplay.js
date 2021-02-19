// Libraries
import React from "react";
import FlexBox from "../../components/FlexBox";

// Components
import StatusIndicator from "./StatusIndicator";

const ServiceDisplay = (props) => {
  const {
    children,
    className,
    isActive,
    location,
    name,
    status,
    style,
  } = props;

  const _isActive = isActive || false;
  const _location = location || "UNKOWN";
  const _name = name || "UNKOWN";
  const _status = _isActive 
    ? "ACTIVE" 
    : "INACTIVE";

  return (
    <FlexBox 
      className={(className || "" ) + " kit-gradient-lightgrey90 rounded kit-border-shadow mb-3"} 
      style={{
        ...style,
        height: _isActive
        ? "10rem"
        : "5rem",
        width: "100%"
      }}
    >
      
      {/* Header */}
      <FlexBox
        justify={"start"}
        style={{ height: "40%", width: "100%" }}
      >
        {/* Title */}
        <FlexBox 
          className={
            " btn rounded no-user kit-border-shadow kit-no-pointer ml-2 " + 
            (_isActive ? "kit-bg-green" : "kit-bg-yellow")
          }
          style={{width: "10rem"}}
        >
          {_name}
        </FlexBox>

        {/* Status Indicator */}
        <StatusIndicator className="ml-auto mr-2" status={_status} />

        {/* URI Path Text */}
        <FlexBox 
          className={"rounded kit-bg-smoke rounded kit-border-shadow mr-2"}
          style={{height: "2rem", width: "33%"}}
        >
          {_location}
        </FlexBox>
      </FlexBox>

      {/* Divider */}
      {_isActive &&
      <div
        className="kit-bg-white"
        style={{
          height: "5%",
          width: "100%",
        }}
      />}

      {/* Service Dashboard */}
      {_isActive &&
      <div style={{ height: "55%", width: "100%" }}>
         {children}
      </div>}
    </FlexBox>
  );
};
export default ServiceDisplay;
