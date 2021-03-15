// Libraries
import React, { Component } from "react";
import Store from "../../reducers/Store";
import AirportsDispatcher from "../../dispatchers/AirportsDispatcher";
import FlightsDispatcher from "../../dispatchers/FlightsDispatcher";

// Components
import FlightSearch from "../../componentgroups/FlightSearch";
import NavBar from "../../componentgroups/NavBar";
import FlexRow from "../../components/FlexRow";

// Images
import TropicalBeach from "../../images/TropicalBeach.jpg";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container-fluid kit-bg-blue" style={{ height: "100vh", width: "100vw",  overflowY: "hidden" }}>
        <div className="row">

          {/* Navbar */}
          <NavBar className="col-12" hideSearchBar={true} />

          {/* Search Flights Header */}
          <div className="col-12">
            <img alt="" src={TropicalBeach} style={{position:"fixed", left:"0", opacity:"75%"}} />
            <FlexRow className="row p-3" justify="start">
              <FlightSearch 
                className="bg-white col-8 rounded"
                onSubmit={() => this.handleSubmit()}
              />
            </FlexRow>
          </div>

          <FlexRow className="col-12 mt-3">
            <div 
              className="kit-cursive text-white kit-text-shadow"
              style={{fontSize: "5rem"}}
            >
              {"Tropical Beach"}
            </div>
          </FlexRow>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { airports } = Store.getState();
    if(!airports.search.results) AirportsDispatcher.onRequest();
  }

  handleSubmit = () => {
    const { flights } = Store.getState();
    FlightsDispatcher.onSearchAndFilter("/search", "", flights.search.filters);
  }
}
export default LandingPage;