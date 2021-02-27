// Libraries
import React from "react";
import FlexRow from "../../components/FlexRow";

// Components
import StatusAsyncIndicator from "../../components/StatusAsyncIndicator";
import StatusIndicator from "../../components/StatusIndicator";

const ServiceDisplay = (props) => {
  const {
    children,
    className,
    isActive,
    location,
    name,
    // status,
    style,
  } = props;

  const _isActive = isActive || false;
  const _location = location || "UNKOWN";
  const _name = name || "UNKOWN";
  const _status = props.status || "INACTIVE";

  return (
    <FlexRow 
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
      <FlexRow
        justify={"start"}
        style={{ height: "40%", width: "100%" }}
      >
        {/* Title */}
        <FlexRow
          className={"btn kit-no-user kit-border-shadow kit-pointer-none ml-2 " + 
          (_isActive ? "bg-success" : "bg-warning")}
          style={{width: "10rem"}}
        >
          {_name}
        </FlexRow>

        {/* Status Indicator */}
        <StatusAsyncIndicator className="ml-auto mr-2" status={_status} />

        {/* Status Indicator */}
        <StatusIndicator className="ml-2 mr-2" status={isActive ? "ACTIVE" : "INACTIVE"} />

        {/* URI Path Text */}
        <FlexRow 
          className={"rounded kit-bg-smoke rounded kit-border-shadow mr-2"}
          style={{height: "2rem", width: "33%"}}
        >
          {_location}
        </FlexRow>
      </FlexRow>

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
    </FlexRow>
  );
};
export default ServiceDisplay;
