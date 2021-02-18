// Libraries
import React, { Component } from 'react';

// Components
import NavBar from '../../componentgroups/NavBar_v0.0.1';
import OrchestratorDashboard from './ServiceDisplays/OrchestrationDashboard';
import ServicesDisplay from './ServiceDisplays';
import FlexBox from '../../components/FlexBox';

class OrchestrationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive_InputText: false,
      inputTextLabel: "",
    };
  }

  render() { 
    const { state, reduce } = this.props;
    const { orchestration } = state;

    const isActive_OrchestrationDashboard = orchestration
      ? orchestration.status === "ACTIVE"
      : false;

    return ( 
      <div>
        <FlexBox
          className={"kit-bg-blue"}
          type={"column"}
          style={{ 
            position: "absolute", 
            height: "100vh", 
            width: "100vw",
          }}
        >

          {/* Content */}
          <FlexBox 
            justify={"around"}
            type={"column"}
            style={{
              minHeight: "25%",
              minWidth: "25%",
            }}
          >
            {/* OrchestratorMS */}
            <div 
              className="kit-bg-grey mb-2"
              style={{
                height: isActive_OrchestrationDashboard
                  ? "15rem"
                  : "7.5rem",
                width: "33rem",
              }}
            >
              <OrchestratorDashboard
                state={state}
                reduce={reduce}
              />
            </div>

            {/* MS Container */}
            {isActive_OrchestrationDashboard &&
            <div
                style={{
                  height: "auto",
                  width: "100%",
                }}
              >
              <ServicesDisplay 
                reduce={reduce}
                state={state}
              />
            </div>}         
          </FlexBox>
        </FlexBox>
        {/* Navbar */}
        <NavBar
          reduce={reduce}
          state={state}
        />
      </div>
    );
  }
}
export default OrchestrationPage;