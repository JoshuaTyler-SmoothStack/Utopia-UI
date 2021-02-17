// Libraries
import React from 'react';
import OrchestrationDispatcher from '../../../dispatchers/OrchestrationDispatcher';

// Components
import ContentNegotiationIndicator from './ContentNegotiationIndicator';
import PathIndicator from './PathIndicator';
import StatusIndicator from './StatusIndicator';

// Styles
import "../../../styles/KitStyles.css";

const OrchestrationDashboard = (props) => {
  const { state, reduce } = props;
  const { orchestration, sizing } = state;

  const buttonSize = sizing 
    ? sizing.button
    : 30;
  
  const contentNegotiation = orchestration
    ? orchestration.contentNegotiation
    : "JSON";

  const location = "http://localhost:8080";

  const isActive = orchestration 
    ? orchestration.ready
    : false;

  const services = orchestration
  ? orchestration.services
  : {list: [], status: "UNKNOWN"};

  const status = orchestration
    ? orchestration.status
    : "INACTIVE";

  return ( 
    <div
      className={"gradient-lightgrey90 border-radius-sm border-shadow flex-column"}
      style={{height:"100%", width:"100%", overflow:"hidden"}}
    >
      {/* Header */}
      <div
        className={"flex-row-start"}
        style={{height: "30%", width:"100%"}}
      >
        {/* Connection Button */}
        {isActive
          ? <button 
              className={"btn bg-red color-cream no-user"}
              style={{
                height: buttonSize + "px",
                width: (buttonSize * 4.5) + "px",
                fontSize: buttonSize * 0.33 + "px",
                marginLeft: buttonSize * 0.5 + "px",
              }}
              onClick={() => OrchestrationDispatcher.onStop(reduce)}
            >
              {"Disconnect Orchestrator"}
            </button>
          : <button 
              className={"btn bg-green no-user"}
              style={{
                height: buttonSize + "px",
                width: (buttonSize * 4.5) + "px",
                fontSize: buttonSize * 0.33 + "px",
                marginLeft: buttonSize * 0.5 + "px",
              }}
              onClick={() => OrchestrationDispatcher.onStart(reduce)}
            >
              {"Connect Orchestrator"}
            </button>
        }

        {/* Status Indicator */}
        <div style={{marginLeft:"auto", marginRight: buttonSize * 0.25 +"px"}}>
          <StatusIndicator 
            status={status}
            size={buttonSize * 0.75}
          />
        </div>

        {/* URI Path Text */}
        <div style={{marginRight: buttonSize * 0.5 +"px"}}>
          <PathIndicator 
            location={location}
            size={buttonSize * 0.8}
          />
        </div>
      </div>

      {/* XML / JSON Toggle */}
      {isActive &&
        <div style={{width: "100%"}}>
          <ContentNegotiationIndicator
            contentNegotiation={contentNegotiation}
            size={buttonSize}
            onSelectContentNegotiation={(e) => OrchestrationDispatcher.onContentNegotiation(reduce, e)}  
          />
        </div>
      }

      {/* Function Buttons */}
      {isActive &&
      <div
        className={"flex-row-start"}
        style={{
          height: "50%", 
          width:"95%",
          flexWrap: "wrap"
        }}
      >
        <button
          className={"btn bg-cream bg-yellow-hover border-radius-sm border-shadow border-shadow-hover flex-column"}
          style={{
            height: buttonSize + "px", 
            width: (buttonSize * 3.5) + "px",
          }}
          onClick={() => OrchestrationDispatcher.onServices(reduce)}
        >
          {services.status === "PENDING" 
            ? <div
                className="spinner-border color-cream"
                style={{
                  height: buttonSize * 0.5 + "px",
                  width: buttonSize * 0.5 + "px",
                }}
              />
            : "findActiveServices()"
          }
        </button>
      </div>}
    </div>
  );
}
export default OrchestrationDashboard;