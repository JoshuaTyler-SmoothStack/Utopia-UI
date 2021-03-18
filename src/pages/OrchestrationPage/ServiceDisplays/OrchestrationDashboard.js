// Libraries
import React from 'react';
import OrchestrationDispatcher from '../../../dispatchers/OrchestrationDispatcher';
import Store from '../../../reducers/Store';

// Components
import ContentNegotiationIndicator from './ContentNegotiationIndicator';
import StatusIndicator from '../../../components/StatusIndicator';
import FlexRow from '../../../components/FlexRow';

const OrchestrationDashboard = (props) => {
  
  const { orchestration } = Store.getState();
  const contentNegotiation = orchestration.contentNegotiation || "JSON";
  const isActive = orchestration.ready || false;
  const status = orchestration.status || "INACTIVE";

  return ( 
    <FlexRow
      className={ 
        "kit-gradient-lightgrey90 rounded kit-border-shadow " +
        (props.className || "")
      }
      style={props.style}
    >
      {/* Header */}
      <FlexRow
        justify={"start"}
        style={{height: isActive ? "10%" : "100%", width:"100%"}}
      >
        {/* Connection Button */}
        {isActive
          ? <button 
              className={"btn btn-warning ml-2"}
              onClick={() => OrchestrationDispatcher.onStop()}
            >
              {"Disconnect Orchestrator"}
            </button>
          : <button 
              className={"btn btn-success ml-2"}
              onClick={() => OrchestrationDispatcher.onStart()}
            >
              {"Connect Orchestrator"}
            </button>
        }

        {/* Status Indicator */}
        <StatusIndicator className="ml-auto mr-2" status={status} />

        {/* URI Path Text */}
        <FlexRow 
          className={"rounded kit-bg-smoke rounded kit-border-shadow mr-2"}
          style={{height: "2rem", width: "33%"}}
        >
        </FlexRow>
      </FlexRow>

      {/* XML / JSON Toggle */}
      {isActive &&
        <div style={{width: "100%"}}>
          <ContentNegotiationIndicator
            contentNegotiation={contentNegotiation}
            onSelectContentNegotiation={(e) => OrchestrationDispatcher.onContentNegotiation(e)}  
          />
        </div>
      }

      {/* Function Buttons */}
      {isActive &&
      <FlexRow className="p-2" justify={"start"} style={{width:"100%"}}>
        <button
          className={"btn btn-info"}
          type={"column"}
          onClick={() => OrchestrationDispatcher.onFindActiveServices()}
        >
          {status === "PENDING" 
            ? <div className="spinner-border"/>
            : "findActiveServices()"
          }
        </button>
      </FlexRow>}
    </FlexRow>
  );
}
export default OrchestrationDashboard;