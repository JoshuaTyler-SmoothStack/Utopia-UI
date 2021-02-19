// Libraries
import React, { Component } from 'react';

// Components
import ErrorMessage from '../../components/ErrorMessage_v0.0.1';
import FlexBox from '../../components/FlexBox';
import NavBar from '../../componentgroups/NavBar_v0.0.1';
import OrchestratorDashboard from './ServiceDisplays/OrchestrationDashboard';
import ServiceDisplay from './ServiceDisplay';

// Components - Dashboards
import AirplanesDashboard from './ServiceDisplays/AirplanesDashboard';
import AirportsDashboard from './ServiceDisplays/AirportsDashboard';
import UsersDashboard from './ServiceDisplays/UsersDashboard';
import RootReducer from '../../reducers/RootReducer';

class OrchestrationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive_InputText: false,
      inputTextLabel: "",
    };
  }

  render() { 
    const { orchestration } = RootReducer.getState();

    const isActive_OrchestrationDashboard = orchestration
      ? orchestration.status === "ACTIVE"
      : false;

    const services = orchestration
      ? orchestration.services
      : {list: [], status: "UNKNOWN"};

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
          {/* OrchestratorMS */}
          <OrchestratorDashboard
            className="kit-bg-grey mb-3"
            style={{
              height: isActive_OrchestrationDashboard
              ? "12rem"
              : "5rem",
              width: "66%",
            }}
          />

          {/* Services Container */}
          {isActive_OrchestrationDashboard &&
          <FlexBox type={"column"} style={{height: "auto", width: "100%"}}>
            
            {/* Loading Spinner */}
            {services.status === "PENDING" && <div className="spinner-border kit-color-cream"/>}

            {/* No Active Services Error */}
            {services.status === "REGISTERED" && services.list.length < 1 && 
              <FlexBox 
                className="h1 text-warning kit-bg-smoke rounded kit-border-shadow"
                style={{width: "50%"}}
              >
                <ErrorMessage message={"No Active Services!"} soundAlert={true}/>
              </FlexBox>
            }

            {/* ServiceDisplays */}
            {services.status === "REGISTERED" && services.list.length > 0 && 
            <FlexBox style={{width: "66%"}} type={"column"}>

              <ServiceDisplay 
                isActive={services.list.includes("airplane-service")}
                location={"http://airplane-service"}
                name={"Airplane MS"}
              >
                <AirplanesDashboard/>
              </ServiceDisplay>

              <ServiceDisplay 
                isActive={services.list.includes("airport-service")}
                location={"http://airport-service"}
                name={"Airport MS"}
              >
                <AirportsDashboard/>
              </ServiceDisplay>

              <ServiceDisplay 
                isActive={services.list.includes("user-service")}
                location={"http://user-service"}
                name={"User MS"}
              >
                <UsersDashboard/>
              </ServiceDisplay>

            </FlexBox>}
          </FlexBox>}
        </FlexBox>

        {/* Navbar */}
        <NavBar/>
      </div>
    );
  }
}
export default OrchestrationPage;