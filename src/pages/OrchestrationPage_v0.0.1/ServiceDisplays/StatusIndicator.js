// Libraries
import React from 'react';

// Styles
import "../../../styles/KitStyles.css";

const StatusIndicator = (props) => {
  //@PROP: size - num
  //@PROP: status - string
  const size = props.size || 30;
  const status = props.status || "INACTIVE";

  return (
    <div>
      {status === "ACTIVE" &&
        <div 
          className={"bg-green border-shadow"}
          style={{
            height: size + "px",
            width: size + "px",
            borderRadius: "50%",
          }}
        />
      }
      {status === "PENDING" && 
        <div 
          className={"bg-yellow border-shadow flex-column"}
          style={{
            height: size + "px",
            width: size + "px",
            borderRadius: "50%",
          }}
        >
          <div
            className="spinner-border color-cream"
            style={{
              height: size * 0.5 + "px",
              width: size * 0.5 + "px",
            }}
          />
        </div>
      }
      {status === "INACTIVE" && 
        <div 
          className={"bg-red border-shadow"}
          style={{
            height: size + "px",
            width: size + "px",
            borderRadius: "50%",
          }}
        />
      }
    </div>
  );
}
export default StatusIndicator;