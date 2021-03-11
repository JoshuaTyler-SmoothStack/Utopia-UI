// Libraries
import moment from "moment";
import React, { Component } from "react";
import Store from "../../reducers/Store";
import AirportsDispatcher from "../../dispatchers/AirportsDispatcher";
import FlightsDispatcher from "../../dispatchers/FlightsDispatcher";

// Components
import DropDown from "../../components/DropDown";
import FlexRow from "../../components/FlexRow";
import FlexColumn from "../../components/FlexColumn";
import FlightModal from "../../componentgroups/FlightModal";
import InputText from "../../components/InputText";
import NavBar from "../../componentgroups/NavBar";
import Pagination from "../../components/Pagination";

class FlightSearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTimeDeparture: "",
      dateTimeReturn: "",
      destination: "",
      origin: "",
      flightType: "One-Way",
      adultSelect: 1,
      seniorSelect: 0,
      childrenSelect: 0,
      currentSort: "ascending",
      sortedItem: "seatPrice",
    };
  }

  render() {
    const { flights } = Store.getState();
    const { flightType, destination, origin, isActive_FlightModal,
      isFocus_Destination, isFocus_Origin } = this.state;

    const departureFlights = flights.search.originToDestination;
    const returnFlights = flights.search.destinationToOrigin;

    const originRecommendations = this.handleAirportRecommendations(origin, "origin");
    const destinationRecommendations = this.handleAirportRecommendations(destination, "destination");

    const isActive_OriginRecommendations = isFocus_Origin && originRecommendations.length > 0;
    const isActive_DestinationRecommendations = isFocus_Destination && destinationRecommendations.length > 0;

    return (
      <div className="container-fluid kit-bg-blue" style={{ height: "100vh", width: "100vw",  overflowY: "hidden" }}>
        <div className="row">
          {/* Navbar */}
          <NavBar className="col-12" hideSearchBar={true} />

          {/* Search & Filter Header */}
          <div className="bg-white col-12">
            
            {/* Title */}
            <div className="h2 mt-3 mb-0">Search Flights</div>
            <hr className="w-100 mt-2"></hr>

              {/* Radio One-way/Round-Trip */}
              <div className="row">
                <FlexRow className="col-6" justify="start" wrap="no-wrap">
                  
                  {/* One-Way */}
                  <FlexRow onClick={() => this.setState({flightType: "One-Way"})}>
                    <input 
                      className="ml-2" 
                      style={{height:"1.5rem", width:"1.5rem"}}
                      type="radio" 
                      checked={flightType === "One-Way"}
                      readOnly
                    />
                    <label className="ml-2 mt-auto mb-auto kit-no-user">
                      One-Way
                    </label>
                  </FlexRow>

                  {/* Round-Trip */}
                  <FlexRow onClick={() => this.setState({flightType: "Round-Trip"})}>
                    <input 
                      className="ml-4" 
                      style={{height:"1.5rem", width:"1.5rem"}}
                      type="radio" 
                      checked={flightType === "Round-Trip"}
                      readOnly
                    />
                    <label className="ml-2 mt-auto mb-auto kit-no-user">
                      Round-Trip
                    </label>
                  </FlexRow>

                  {/* Sign-Post SVGs */}
                  <div className="ml-2">
                    {flightType === "One-Way"
                      ? <div>
                          <svg
                            className="kit-svg-turqouise" 
                            height="2rem" 
                            width="2rem" 
                            viewBox="0 0 16 16"
                          >
                            <path d="M7.293.707A1 1 0 0 0 7 1.414V4H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h5v6h2v-6h3.532a1 1 0 0 0 .768-.36l1.933-2.32a.5.5 0 0 0 0-.64L13.3 4.36a1 1 0 0 0-.768-.36H9V1.414A1 1 0 0 0 7.293.707z"/>
                          </svg>
                        </div>
                      : <div>
                        <svg
                          className="kit-svg-turqouise" 
                          height="2rem" 
                          width="2rem" 
                          viewBox="0 0 16 16"
                        >
                          <path d="M7.293.707A1 1 0 0 0 7 1.414V2H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h5v1H2.5a1 1 0 0 0-.8.4L.725 8.7a.5.5 0 0 0 0 .6l.975 1.3a1 1 0 0 0 .8.4H7v5h2v-5h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H9V6h4.5a1 1 0 0 0 .8-.4l.975-1.3a.5.5 0 0 0 0-.6L14.3 2.4a1 1 0 0 0-.8-.4H9v-.586A1 1 0 0 0 7.293.707z"/>
                        </svg>
                      </div>
                    }
                  </div>
                  
                </FlexRow>
              </div>

              {/* Origin & Destination */}
              <div className="row mt-3">
                {/* Origin */}
                <div className="col-12 col-sm-6" style={{height: "3.5rem"}}>
                  <InputText
                    className="h-100 rounded kit-border-shadow mb-0"
                    label={"Origin"}
                    labelClassName={"text-info"}
                    fontClass={"h4"}
                    name="origin"
                    onBlur={() => {
                      setTimeout(() => {
                        this.setState({isFocus_Origin: false})
                      }, 100);
                    }}
                    onFocus={() => this.setState({isFocus_Origin: true})}
                    onChange={(value) => this.setState({origin: value})}
                    value={origin}
                  />
                  {isActive_OriginRecommendations &&
                  <DropDown
                    style={{height: 0}}
                    isActive={isActive_OriginRecommendations}
                    options={originRecommendations}
                    selection={" "}
                    onSelect={(value) => this.setState({origin: value})}
                  />}
                </div>

                {/* Destination */}
                <div className="col-12 col-sm-6" style={{height: "3.5rem"}}>
                  <InputText
                    className="h-100 rounded kit-border-shadow mb-0"
                    label={"Destination"}
                    labelClassName={"text-info"}
                    fontClass={"h4"}
                    name="destination"
                    onBlur={() => {
                      setTimeout(() => {
                        this.setState({isFocus_Destination: false})
                      }, 100);
                    }}
                    onFocus={() => this.setState({isFocus_Destination: true})}
                    onChange={(value) => this.setState({destination: value})}
                    value={destination}
                  />
                  {isActive_DestinationRecommendations &&
                  <DropDown
                    style={{height: 0}}
                    isActive={isActive_DestinationRecommendations}
                    options={this.handleAirportRecommendations(destination, "destination")}
                    selection={" "}
                    onSelect={(value) => this.setState({destination: value})}
                  />}
                </div>
              </div>

              {/* Date Pickers */}
              <div className="col-12 mt-3">
                <div className="row">

                  {/* Departure Date */}
                  <div className="col-6">
                    <FlexColumn>
                      <label className="form-label mr-auto">
                        Departure Date
                      </label>
                      <input 
                        className="form-label w-75 mr-auto" 
                        style={{height: "3.5rem"}}
                        name="dateTimeDeparture"
                        type="datetime-local" 
                        onChange={(e) => this.setState({dateTimeDeparture: e.target.value})}
                      />
                    </FlexColumn>
                  </div>


                  {/* Return Date */}
                  {flightType === "Round-Trip" &&
                  <div className="col-6">
                    <FlexColumn>
                      <label className="form-label mr-auto">
                        Return Date
                      </label>
                      <input 
                        className="form-label w-75 mr-auto" 
                        name="dateTimeDeparture"
                        onChange={(e) => this.setState({dateTimeReturn: e.target.value})}
                        style={{height: "3.5rem"}}
                        type="date" 
                      />
                    </FlexColumn>
                  </div>}
                </div>
              </div>

              {/* Buttons */}
              <div className="row m-4">
                
                {/* Drop Down */}
                <FlexRow className="col-3">
                  <DropDown 
                    buttonClassName="btn-secondary dropdown-toggle"
                    selection={flights.search.resultsPerPage}
                    options={["3", "10", "25", "50"]}
                    optionsName="flights"
                    onSelect={(e) => FlightsDispatcher.onSelectItemsPerPage(e)}
                  />
                </FlexRow>

                {/* Pagination */}
                <FlexRow className="col-5">
                  <Pagination
                    className="text-center"
                    currentPage={flights.search.resultsPage}
                    totalPages={Math.ceil(flights.search.results.length / Math.max(flights.search.resultsPerPage, 1))}
                    onSelectPage={(e) => FlightsDispatcher.onSelectItemsPage(e)}
                  />
                </FlexRow>

                {/* Search Button */}
                <div className="col-4 ml-auto">
                  <button className="btn btn-lg btn-success text-white kit-text-shadow-thin"
                    onClick={() => this.handleSubmit()}>
                    Search Flights
                  </button>
                </div>
              </div>
          </div>


          {/* Flights Table */}
          <FlexRow className="col-12 bg-white">
            {this.handleRenderFlightsList(flights.search.results)}
          </FlexRow>

        </div>

        {/* Flight Modal */}
        {isActive_FlightModal && 
        <FlightModal 
          zIndex="4"
          onClose={() => this.handleFlightModalToggle(false, null)}
        />}
      </div>
    );
  }

  componentDidMount() {
    AirportsDispatcher.onRequest();
  }

  handleAirportRecommendations = (inputText, type) => {
    inputText = inputText.toLowerCase();
    
    const { airports } = Store.getState();
    const matchingAirports = [];

    for(var i in airports.search.results) {
      const airport = airports.search.results[i];
      const airportAsString = JSON.stringify(airport)
      .toLowerCase()
      .replace("aiportiataid", "")
      .replace("airportcityname", "");

      if(airportAsString.includes(inputText)) {
        matchingAirports.push(airport.airportIataId + ": " + airport.airportCityName);
      }
    }
    return matchingAirports;
  }

  handleFlightModalToggle = (toggleOn, flightIndex) => {
    if(toggleOn !== this.isActive_FlightModal) this.setState({isActive_FlightModal: toggleOn});
    if(toggleOn) {
      const { flights } = Store.getState();
      FlightsDispatcher.onSelectItem(flights.search.results[flightIndex]);
    }
  }

  handleRenderFlightsList = (flightsList) => {
    const { flights } = Store.getState();
    const resultsDisplayed = Number(flights.search.resultsPerPage);
    const resultsStart = flights.search.resultsPerPage * (flights.search.resultsPage - 1);

    let flightsTable = [];
    if (!flightsList.length) flightsList = [flightsList];
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
      <FlexColumn justify="start" style={{ height: "50vh", width: "99%", overflowY: "scroll" }}>
        <table className="table table-hover kit-border-shadow rounded overflow-hidden">
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
    const { dateTimeDeparture, dateTimeReturn, destination, origin, flightType } = this.state;
    const globalDateTimeDeparture = moment.utc(dateTimeDeparture).format("YYYY-MM-DD H:MM:SS");
    const globalDateTimeReturn = moment.utc(dateTimeReturn).format("YYYY-MM-DD H:MM:SS");
    console.log(globalDateTimeDeparture);

    const filterMap = {
      flightRouteOriginIataId: origin.split(":")[0],
      flightRouteDestinationIataId: destination.split(":")[0],
    };

    FlightsDispatcher.onSearchAndFilter("/search", "", filterMap);
  }
}
export default FlightSearchPage;