// Libraries
import React from "react";

// Components
import AirplanesDashboard from './AirplanesDashboard';
import AirportsDashboard from './AirportsDashboard';
import BookingsDashboard from './BookingsDashboard';
import FlightsDashboard from './FlightsDashboard';
import RoutesDashboard from './RoutesDashboard';
import UsersDashboard from './UsersDashboard';
import ErrorMessage from '../../../components/ErrorMessage_v0.0.1';
import FlexBox from "../../../components/FlexBox";
import ServiceDisplay from "../ServiceDisplay";

const ServicesDisplay = (props) => {

  const { reduce, state } = props;

  const serviceHeight = "10rem";
  const serviceWidth = "30rem";

  const services = state.orchestration
  ? state.orchestration.services
  : {list: [], status: "UNKNOWN"};

  return (
    <div>

      {/* Loading Spinner */}
      {services.status === "PENDING" && <div className="spinner-border kit-color-cream"/>}

      {/* No Active Services Error */}
      {services.status === "REGISTERED" && services.list.length < 1 && 
        <FlexBox 
          className="h1 text-warning bg-smoke rounded kit-border-shadow"
          style={{width: "50%"}}
        >
          <ErrorMessage 
            message={"No Active Services!"}
          />
        </FlexBox>
      }

      {/* Active Services Display */}
      {services.status === "REGISTERED" && services.list.length > 0 && 
        <FlexBox justify={"around"} type={"column"}>

          <ServiceDisplay 
            className="kit-gradient-lightgrey90 rounded kit-border-shadow"
            isActive={services.list.includes("airplane-service")}
            location={"http://airplane-service"}
            name={"Airplane MS"}
            reduce={reduce}
            state={state}
            style={{
              height: serviceHeight,
              width: serviceWidth
            }}
          >


          </ServiceDisplay>

          <AirplanesDashboard 
            isActive={services.list.includes("airplane-service")}
            reduce={reduce}
            state={state}
          />

          <AirportsDashboard 
            isActive={services.list.includes("airport-service")}
            reduce={reduce}
            state={state}
          />

          <BookingsDashboard 
            isActive={services.list.includes("booking-service")}
            reduce={reduce}
            state={state}
          />

          <FlightsDashboard 
            isActive={services.list.includes("flight-service")}
            reduce={reduce}
            state={state}
          />

          <RoutesDashboard 
            isActive={services.list.includes("flight-service")}
            reduce={reduce}
            state={state}
          />

          <UsersDashboard 
            isActive={services.list.includes("flight-service")}
            reduce={reduce}
            state={state}
          />
        </FlexBox>
      }
    </div>
  );
};
export default ServicesDisplay;