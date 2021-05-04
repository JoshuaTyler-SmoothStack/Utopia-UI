// Libraries
import React, { Component } from "react";

// Components
import AirplanesDebug from "./displays/AirplanesDebug";
import AirportsDebug from "./displays/AirportsDebug";
import BookingsDebug from "./displays/BookingsDebug";
import PassengersDebug from "./displays/PassengersDebug";
import PaymentsDebug from "./displays/PaymentsDebug";
import FlightsDebug from "./displays/FlightsDebug";
import RoutesDebug from "./displays/RoutesDebug";
import UsersDebug from "./displays/UsersDebug";
import LocalSidebar from "./LocalSidebar";
import NavBar from "../../componentgroups/NavBar";

class APIDebugPage extends Component {
  constructor(props) {
    super(props);
    this.navbar = React.createRef();
    this.state = {
      activeDisplay: "AIRPLANES",
    };
  }

  render() {
    const { activeDisplay } = this.state;
    return (
      <div className={"container-fluid"} style={{minHeight: "100vh", maxWidth:"1400px", overflow: "auto"}}>
        <div className="row">
          {/* Navbar */}
          <NavBar className="col-12" />

          {/* Siderbar */}
          <LocalSidebar
            className={"col-4 col-md-2 col-xl-1 p-0"}
            style={{ position: "absolute", zIndex: "1", top: "4rem" }}
            activeDisplay={activeDisplay}
            onSelectDisplay={(e) => this.setState({ activeDisplay: e })}
            onToggle={(e) => this.setState({ isActive_Sidebar: e })}
          />

          {/* Content */}
          <div className="col-0 col-md-2 col-xl-1 bg-dark" />
          <div className="col-12 col-md-10 col-xl-11">
            {/* Debug Displays */}
            {activeDisplay === "AIRPLANES" && <AirplanesDebug/>}
            {activeDisplay === "AIRPORTS" && <AirportsDebug/>}
            {activeDisplay === "BOOKINGS" && <BookingsDebug/>}
            {activeDisplay === "PASSENGERS" && <PassengersDebug/>}
            {activeDisplay === "PAYMENTS" && <PaymentsDebug/>}
            {activeDisplay === "FLIGHTS" && <FlightsDebug/>}
            {activeDisplay === "ROUTES" && <RoutesDebug/>}
            {activeDisplay === "USERS" && <UsersDebug/>}
          </div>
        </div>
      </div>
    );
  }
}
export default APIDebugPage;
