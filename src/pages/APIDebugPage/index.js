// Libraries
import React, { Component } from "react";

// Components
import AirplanesDebug from "./displays/AirplanesDebug";
import AirportsDebug from "./displays/AirportsDebug";
import BookingsDebug from "./displays/BookingsDebug";
import PassengersDebug from "./displays/PassengersDebug";
import FlightsDebug from "./displays/FlightsDebug";
import RoutesDebug from "./displays/RoutesDebug";
import LocalSidebar from "./LocalSidebar";
import NavBar from "../../componentgroups/NavBar";

class APIDebugPage extends Component {
  constructor(props) {
    super(props);
    this.navbar = React.createRef()
    this.state = {
      activeDisplay: "AIRPLANES",
    };
  }

  render() {
    const { activeDisplay } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          
          {/* Navbar */}
          <NavBar className="col-12" hideSearchBar={true}/>

          {/* Siderbar */}
          <LocalSidebar
            className={"col-4 col-md-2 p-0"} 
            style={{position:"absolute", zIndex:"1", top:"4rem"}}
            activeDisplay={activeDisplay} 
            onSelectDisplay={(e) => this.setState({activeDisplay: e})}
            onToggle={(e) => this.setState({isActive_Sidebar: e})}
          />

          {/* Content */}
          <div className="col-0 col-md-2 bg-dark"/>
          <div className="col-12 col-md-10">
            {/* Debug Displays */}
            {activeDisplay === "AIRPLANES" && <AirplanesDebug/>}
            {activeDisplay === "AIRPORTS" && <AirportsDebug/>}
            {activeDisplay === "BOOKINGS" && <BookingsDebug/>}
            {activeDisplay === "PASSENGERS" && <PassengersDebug/>}
            {activeDisplay === "FLIGHTS" && <FlightsDebug/>}
            {activeDisplay === "ROUTES" && <RoutesDebug/>}
          </div>
        </div>
      </div>
    );
  }
}
export default APIDebugPage;
