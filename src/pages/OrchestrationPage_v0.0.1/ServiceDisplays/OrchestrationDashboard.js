// Libraries
import React from 'react';
import FlexBox from '../../../components/FlexBox';
import OrchestrationDispatcher from '../../../dispatchers/OrchestrationDispatcher';

// Components
import ContentNegotiationIndicator from './ContentNegotiationIndicator';
import PathIndicator from './PathIndicator';
import StatusIndicator from './StatusIndicator';

const OrchestrationDashboard = (props) => {
  const { state, reduce } = props;
  const { orchestration } = state;
  
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
    <FlexBox
      className={"kit-gradient-lightgrey90 rounded kit-border-shadow"}
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
              className={"btn kit-bg-red kit-color-cream kit-no-user ml-2"}
              onClick={() => OrchestrationDispatcher.onStop(reduce)}
            >
              {"Disconnect Orchestrator"}
            </button>
          : <button 
              className={"btn kit-bg-green kit-no-user ml-2"}
              onClick={() => OrchestrationDispatcher.onStart(reduce)}
            >
              {"Connect Orchestrator"}
            </button>
        }

        {/* Status Indicator */}
        <div className={"ml-auto mr-2"}>
          <StatusIndicator 
            status={status}
            size={"2rem"}
          />
        </div>

        {/* URI Path Text */}
        <div className={"mr-2"}>
          <PathIndicator 
            location={location}
            style={{
              height:"2rem",
              width:"10rem"
            }}
          />
        </div>
      </div>

      {/* XML / JSON Toggle */}
      {isActive &&
        <div style={{width: "100%"}}>
          <ContentNegotiationIndicator
            contentNegotiation={contentNegotiation}
            onSelectContentNegotiation={(e) => OrchestrationDispatcher.onContentNegotiation(reduce, e)}  
          />
        </div>
      }

      {/* Function Buttons */}
      {isActive &&
      <FlexBox
        justify={"start"}
        wrap={"wrap"}
        style={{
          height: "50%", 
          width:"95%",
        }}
      >
        <button
          className={"btn kit-bg-cream kit-bg-yellow-hover rounded kit-border-shadow kit-border-shadow-hover"}
          type={"column"}
          onClick={() => OrchestrationDispatcher.onServices(reduce)}
        >
          {services.status === "PENDING" 
            ? <div className="spinner-border kit-color-cream"/>
            : "findActiveServices()"
          }
        </button>
      </FlexBox>}
    </div>
  );
}
export default OrchestrationDashboard;