// Libraries
import React from 'react';
import FlexBox from '../../../components/FlexBox';
import OrchestrationDispatcher from '../../../dispatchers/OrchestrationDispatcher';

// Components
import ContentNegotiationIndicator from './ContentNegotiationIndicator';
import StatusIndicator from '../StatusIndicator';

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
      className={ 
        "kit-gradient-lightgrey90 rounded kit-border-shadow " +
        (props.className || "")
      }
      style={props.style}
    >
      {/* Header */}
      <FlexBox
        justify={"start"}
        style={{height: isActive ? "10%" : "100%", width:"100%"}}
      >
        {/* Connection Button */}
        {isActive
          ? <button 
              className={"btn btn-warning ml-2"}
              onClick={() => OrchestrationDispatcher.onStop(reduce)}
            >
              {"Disconnect Orchestrator"}
            </button>
          : <button 
              className={"btn btn-success ml-2"}
              onClick={() => OrchestrationDispatcher.onStart(reduce)}
            >
              {"Connect Orchestrator"}
            </button>
        }

        {/* Status Indicator */}
        <StatusIndicator className="ml-auto mr-2" status={status} />

        {/* URI Path Text */}
        <FlexBox 
          className={"rounded kit-bg-smoke rounded kit-border-shadow mr-2"}
          style={{height: "2rem", width: "33%"}}
        >
          {location}
        </FlexBox>
      </FlexBox>

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
      <FlexBox className="p-2" justify={"start"} style={{width:"100%"}}>
        <button
          className={"btn btn-info"}
          type={"column"}
          onClick={() => OrchestrationDispatcher.onServices(reduce)}
        >
          {services.status === "PENDING" 
            ? <div className="spinner-border kit-color-cream"/>
            : "findActiveServices()"
          }
        </button>
      </FlexBox>}
    </FlexBox>
  );
}
export default OrchestrationDashboard;