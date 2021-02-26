// Libraries
import React, { Component } from "react";

// Components
import AirplanesDebug from "./displays/AirplanesDebug";
import AirportsDebug from "./displays/AirportsDebug";
import BookingsDebug from "./displays/BookingsDebug";
import LocalSidebar from "./LocalSidebar";
import NavBar from "../../componentgroups/NavBar";
import OrchestrationDispathcer from "../../dispatchers/OrchestrationDispatcher";

class APIDebugPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDisplay: "BOOKINGS",
    };
  }

  render() {
    const { activeDisplay } = this.state;
    return (
      <div className="container-fluid overflow-hidden p-0" style={{height:"100vh", width:"100vw"}}>
        
        {/* Navbar */}
        <div className="row">
          <NavBar className="col" hideSearchBar={true}/>
        </div>

        {/* Content */}
        <div className="row m-0">
          {/* Siderbar */}
          <LocalSidebar
            style={{height:"100vh"}}
            activeDisplay={activeDisplay} 
            onSelectDisplay={(e) => this.setState({activeDisplay: e})}
          />
          
          {/* Debug Displays */}
          {activeDisplay === "AIRPLANES" && <AirplanesDebug className="col-12 col-md-10 m-0 ml-auto p-0"/>}
          {activeDisplay === "AIRPORTS" && <AirportsDebug className="col-12 col-md-10 m-0 ml-auto p-0"/>}
          {activeDisplay === "BOOKINGS" && <BookingsDebug className="col-12 col-md-10 m-0 ml-auto p-0"/>}
        </div>
      </div>
    );
  }

  componentDidMount() {
    OrchestrationDispathcer.onServices();
  }
}
export default APIDebugPage;
