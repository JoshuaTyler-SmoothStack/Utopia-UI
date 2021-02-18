// Libraries
import React from 'react';
import FlexBox from '../../../components/FlexBox';

// Components
import PathIndicator from './PathIndicator';
import StatusIndicator from './StatusIndicator';

const ServiceDisplay = (props) => {
  const { children, className, isActive, location, 
    name, status, reduce, state, style } = props;
  const {  } = state;

  const _isActive = isActive || false;
  const _location = location || "UNKOWN";
  const _name = name || "UNKOWN";
  const _status = status || "INACTIVE";

  return ( 
    <FlexBox
      className={className}
      style={{height:"100%", width:"100%", overflow:"hidden"}}
    >
      {/* Header */}
      <div
        className={"flex-row-start"}
        style={{height: "40%", width:"100%"}}
      >
        {/* Title */}
        <MSTitle
          className="ml-2"
          isActive={isActive}
          text={_name}
        />

        {/* Status Indicator */}
        <StatusIndicator
          className="ml-auto mr-2"
          status={_status}
        />
        
        {/* URI Path Text */}
        <PathIndicator
          className="mr-2"
          location={_location}
          size={buttonSize * 0.8}
        />
    </div>

    {/* Divider */}
    {isActive &&
    <div 
        className={"gradient-smoke border-shadow flex-row-start"}
        style={{
        height:"5%",
        width:"100%"
        }}
    />
    }

    {/* Function Buttons */}
    {isActive &&
    <div
        className={"flex-row-start"}
        style={{
        height: "55%", 
        width:"95%",
        flexWrap: "wrap"
        }}
    >
        <button
        className={"btn bg-cream bg-yellow-hover rounded border-shadow border-shadow-hover flex-column"}
        style={{
            height: buttonSize + "px", 
            width: (buttonSize * 3.5) + "px",
        }}
        onClick={() => this.findAllAirports()}
        >
        {status === "PENDING" 
            ? <div
                className="spinner-border kit-color-cream"
                style={{
                height: buttonSize * 0.5 + "px",
                width: buttonSize * 0.5 + "px",
                }}
            />
            : "findAllAirports()"
        }
        </button>
    </div>
    </FlexBox>
  );
}
export default ServiceDisplay;