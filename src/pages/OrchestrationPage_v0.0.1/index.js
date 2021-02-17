// Libraries
import React, { Component } from 'react';

// Components
import NavBar from '../../componentgroups/NavBar_v0.0.1';
import OrchestratorDashboard from './ServiceDisplays/OrchestrationDashboard';
import ServicesDisplay from './ServiceDisplays';

// Styles
import "../../styles/KitStyles.css";

class OrchestrationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // InputText
      isActive_InputText: false,
      inputTextLabel: "",
    };
  }

  render() { 
    const { state, reduce } = this.props;
    const { orchestration, sizing } = state;

    const isActive_OrchestrationDashboard = orchestration
      ? orchestration.status === "ACTIVE"
      : false;

    return ( 
      <div 
        className={"bg-blue flex-column"}
        style={{ 
          position: "absolute", 
          height: "100vh", 
          width: "100vw",
        }}
       >

        {/* Content */}
        <div 
          className={"flex-column-around"}
          style={{
            height: (sizing.buttonLarge * 4 + sizing.button * 8) + "px",
            width: (sizing.buttonLarge * 7) + "px",
            maxHeight: "100%",
            maxWidth: "100%",
          }}
        >
          {/* OrchestratorMS */}
          <div 
              style={{
                height: isActive_OrchestrationDashboard
                  ? "200px"
                  : "100px",
                width: "100%",
                marginBottom: sizing.button + "px"
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
        </div>

        {/* Navbar */}
        <div 
          style={{
            position: "absolute", 
            height: sizing.screenbar+"px",
            width: "100vw",
            top:"0", 
          }}
        >
          <NavBar
            reduce={reduce}
            sizing={sizing}
          />
        </div>
      </div>
    );
  }
}
export default OrchestrationPage;