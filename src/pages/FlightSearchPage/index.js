// Libraries
import moment from "moment";
import React, { Component } from "react";
import Store from "../../reducers/Store";
import AirportsDispatcher from "../../dispatchers/AirportsDispatcher";
import FlightsDispatcher from "../../dispatchers/FlightsDispatcher";

// Components
import FlexColumn from "../../components/FlexColumn";
import FlightModal from "../../componentgroups/FlightModal";
import NavBar from "../../componentgroups/NavBar";
import SeatingModal from "../../componentgroups/SeatingModal";
import FlightSearch from "../../componentgroups/FlightSearch";

class FlightSearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive_FlightModal: false,
      isActive_SeatingModal: false,
    };
  }

  render() {
    const { flights } = Store.getState();
    const { isActive_FlightModal, isActive_SeatingModal } = this.state;

    return (
      <div className="container-fluid kit-bg-blue" style={{ height: "100vh", width: "100vw",  overflowY: "hidden" }}>
        <div className="row">

          {/* Navbar */}
          <NavBar className="col-12" hideSearchBar={true} />

          {/* Search Flights Header */}
          <FlightSearch 
            className="col-12 bg-white"
            onSubmit={() => this.handleSubmit()}
          />

          {/* Flights List */}
          {flights.search.results.length > 0 &&
          <div className="col-12 mt-3">
            {this.handleRenderFlightsList()}
          </div>}

        </div>

        {/* Flight Modal */}
        {isActive_FlightModal && 
        <FlightModal
          className="col-12 col-sm-10 col-md-8 col-lg-6 bg-primary p-2 m-auto rounded kit-border-shadow"
          zIndex="4"
          onSelectSeat={() => {
            this.setState({isActive_SeatingModal: true});
            this.handleFlightModalToggle(false, null);
          }}
          onClose={() => this.handleFlightModalToggle(false, null)}
        />}

        {/* Seating Modal */}
        {isActive_SeatingModal && 
        <SeatingModal
          className="col-12 col-sm-10 col-md-8 col-lg-6 bg-primary p-2 m-auto rounded kit-border-shadow"
          zIndex="4"
          onClose={() => {
            this.setState({isActive_SeatingModal: false});
            this.handleFlightModalToggle(false, null);
          }}
        />}
      </div>
    );
  }

  componentDidMount() {
    const { airports } = Store.getState();
    if(!airports.search.results) AirportsDispatcher.onRequest();
  }

  handleFlightModalToggle = (toggleOn, flightIndex) => {
    if(toggleOn !== this.isActive_FlightModal) this.setState({isActive_FlightModal: toggleOn});
    if(toggleOn && (flightIndex !== null && flightIndex !== undefined)) {
      const { flights } = Store.getState();
      FlightsDispatcher.onSelectItem(flights.search.results[flightIndex]);
    }
  }

  handleRenderFlightsList = () => {
    const { flights } = Store.getState();
    const flightsList = flights.search.results;
    const resultsDisplayed = Number(flights.search.resultsPerPage);
    const resultsStart = flights.search.resultsPerPage * (flights.search.resultsPage - 1);

    let flightsTable = [];
    for (var i = resultsStart; (i < resultsStart + resultsDisplayed && i < flightsList.length); i++) {
      
      const flightId = flightsList[i].flightId;
      if (!flightId) continue;

      const departureTime = moment(flightsList[i].flightDepartureTime).format('M/DD/YY | h:mm a');

      const index = Number(i) + 1;
      flightsTable.push(
        <tr key={index} onClick={() => this.handleFlightModalToggle(true, (index - 1))}>
          <th scope="row">{index}</th>
          <td><h5 className="text-light">{flightId}</h5></td>
          <td>
            <h5 className="text-primary">{flightsList[i].flightRouteOriginIataId}</h5>
            <div className="text-dark">{flightsList[i].flightRouteOriginCityName}</div>
          </td>
          <td>
            <h5 className="text-primary">{flightsList[i].flightRouteDestinationIataId}</h5>
            <div className="text-dark">{flightsList[i].flightRouteDestinationCityName}</div>
          </td>
          <td>
            <h5 className="text-dark">{departureTime.split("|")[1]}</h5>
            <div>{departureTime.split("|")[0]}</div>
          </td>
        </tr>
      );
    }

    return (
      <FlexColumn 
        className="bg-white rounded overflow-hidden" 
        style={{ height: "50vh", width: "99%", overflowY: "scroll" }}
        justify="start" 
      >
        <table className="table table-hover kit-border-shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Flight ID</th>
              <th scope="col">Origin</th>
              <th scope="col">Destination</th>
              <th scope="col">{"Date & Time (UTC)"}</th>
            </tr>
          </thead>
          <tbody>
            {flightsTable}
            <tr><td colSpan="5"></td>{/* Space at end of table for aesthetic */}</tr>
          </tbody>
        </table>
      </FlexColumn>
    );
  }

  handleSubmit = () => {
    const { flights } = Store.getState();
    FlightsDispatcher.onSearchAndFilter("/search", "", flights.search.filters);
  }
}
export default FlightSearchPage;