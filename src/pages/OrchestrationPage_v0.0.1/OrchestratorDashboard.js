// Libraries
import React from 'react';

// Styles
import "../../styles_v0.0.1/KitStyles.css";

const OrchestratorDashboard = (props) => {
  return ( 
    <div
      className={"gradient-lightgrey90 border-radius-sm border-shadow flex-column"}
      style={{height:"100%", width:"100%"}}
    >
      {/* Header */}
      <div
        className={"flex-row-start"}
        style={{height: "30%", width:"100%"}}
      >
        {/* Connection Button */}
        {props.isActive
          ? <button 
              className={"btn bg-red color-cream no-user"}
              style={{
                height: props.buttonSize + "px",
                width: (props.buttonSize * 4.5) + "px",
                marginLeft: props.buttonSize * 0.5 + "px"
              }}
              onClick={() => props.onOrchestratorDisconnect()}
            >
              {"Disconnect Orchestrator"}
            </button>
          : <button 
              className={"btn bg-green no-user"}
              style={{
                height: props.buttonSize + "px",
                width: (props.buttonSize * 4.5) + "px",
                marginLeft: props.buttonSize * 0.5 + "px"
              }}
              onClick={() => props.onOrchestratorConnect()}
            >
              {"Connect Orchestrator"}
            </button>
        }

        {/* Status Indicator */}
        {props.isActive
          ? <div 
              className={"bg-green border-shadow"}
              style={{
                height: props.buttonSize * 0.75 + "px",
                width: props.buttonSize * 0.75 + "px",
                borderRadius: "50%",
                marginLeft: "auto",
                marginRight: props.buttonSize * 0.5 + "px"
              }}
            />
          : <div 
              className={"bg-red border-shadow"}
              style={{
                height: props.buttonSize * 0.75 + "px",
                width: props.buttonSize * 0.75 + "px",
                borderRadius: "50%",
                marginLeft: "auto",
                marginRight: props.buttonSize * 0.5 + "px"
              }}
            />
        }

        {/* URI Path Text */}
        <div 
          className={"bg-smoke border-radius-xsm border-shadow flex-row"}
          style={{
            height: props.buttonSize * 0.75 + "px",
            width: (props.buttonSize * 5) +"px",
            marginRight: props.buttonSize + "px"
          }}
        >
          {props.location || "No connection."}
        </div>
      </div>

      {/* XML / JSON Toggle */}
      {props.isActive &&
      <div
        className={"gradient-yellow flex-row-start"}
        style={{
          height: "20%",
          width: "100%",
        }}
      >
        {/* "Send Request As" Label */}
        <div 
          className={"color-cream flex-row"}
          style={{
            height: props.buttonSize + "px",
            width: (props.buttonSize * 3) +"px",
          }}
        >
          {"Send requests as: "}
        </div>

        {/* JSON / XML Toggle */}
        <div
          className={"border-radius-sm border-shadow flex-row-start"}
          style={{
            height: "85%",
            width: (props.buttonSize * 3.5) + "px",
            overflow: "hidden",
          }}
        >
          {/* JSON */}
          <button
            className={"btn " + (props.contentNegotiation === "JSON" && "bg-green")}
            style={{
              height: "150%",
              width: "49%",
            }}
            onClick={() => props.onContentNegotiation("JSON")}
          >
            {"JSON"}
          </button>

          {/* Divider */}
          <div
            style={{
              height: "100%",
              width: "2%",
            }}
          />

          {/* XML */}
          <button
            className={"btn " + (props.contentNegotiation === "XML" && "bg-green")}
            style={{
              height: "150%",
              width: "49%",
            }}
            onClick={() => props.onContentNegotiation("XML")}
          >
            {"XML"}
          </button>
        </div>
      </div>}

      {/* Function Buttons */}
      {props.isActive &&
      <div
        className={"flex-column"}
        style={{height: "60%", width:"100%"}}
      >
        {/* Row 1 */}
        <div
          className={"flex-row-start"}
          style={{
            height: "45%", 
            width:"95%"
          }}
        >
          {/* Button 1 */}
          <button
            className={"btn bg-cream border-radius-sm border-shadow"}
            style={{
              height: props.buttonSize + "px", 
              width: (props.buttonSize * 3.5) + "px",
            }}
            onClick={() => props.onSelectButton1()}
          >
            {"findActiveServices()"}
          </button>

        </div>

        {/* Row 2 */}
        <div
          className={"flex-row-start"}
          style={{
            height: "45%", 
            width:"100%"
          }}
        >
        </div>
      </div>}
    </div>
    );
}
export default OrchestratorDashboard;