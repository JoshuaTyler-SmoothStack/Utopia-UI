// Libraries
import React, { Component } from "react";
import Store from "../../reducers/Store";
import FlightsDispatcher from "../../dispatchers/FlightsDispatcher";

// Components
import NavBar from "../../componentgroups/NavBar";
import FlexRow from "../../components/FlexRow";
import InputText from "../../components/InputText";
import FlexColumn from "../../components/FlexColumn";
import DropDown from "../../components/DropDown";
import AirportsDispatcher from "../../dispatchers/AirportsDispatcher";

class FlightSearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateDeparture: "",
      dateReturn: "",
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
    const { flightType, destination, origin, isFocus_Destination, isFocus_Origin } = this.state;

    const departureFlights = flights.search.originToDestination;
    const returnFlights = flights.search.destinationToOrigin;

    const isActive_OriginRecommendations = isFocus_Origin && origin.trim() !== "";
    const isActive_DestinationRecommendations = isFocus_Destination && destination.trim() !== "";

    return (
      <div className="container-fluid kit-bg-blue" style={{ height: "100vh", width: "100vw"}}>
        <div className="row">
          {/* Navbar */}
          <NavBar className="col-12" hideSearchBar={true} />

          {/* Search & Filter Header */}
          <div className="bg-white col-12">
            
            {/* Title */}
            <div className="h2 mt-3 mb-0">Search Flights</div>
            <hr className="w-100 mt-2"></hr>

              {/* DropDown One-way/Round-Trip */}
              <div className="row">
                <FlexRow className="col-6" justify="around" wrap="no-wrap">
                  
                  {/* One-Way */}
                  <FlexRow onClick={() => this.setState({flightType: "One-Way"})}>
                    <input 
                      className="" 
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
                      className="" 
                      style={{height:"1.5rem", width:"1.5rem"}}
                      type="radio" 
                      checked={flightType === "Round-Trip"}
                      readOnly
                    />
                    <label className="ml-2 mt-auto mb-auto kit-no-user">
                      Round-Trip
                    </label>
                  </FlexRow>
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
                  <DropDown
                    style={{height: 0}}
                    isActive={isActive_OriginRecommendations}
                    options={this.handleAirportRecommendations(origin, "origin")}
                    selection={" "}
                    onSelect={(value) => this.setState({origin: value})}
                  />
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
                  <DropDown
                    style={{height: 0}}
                    isActive={isActive_DestinationRecommendations}
                    options={this.handleAirportRecommendations(destination, "destination")}
                    selection={" "}
                    onSelect={(value) => this.setState({destination: value})}
                  />
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
                        name="dateDeparture"
                        type="date" 
                        onChange={(e) => this.setState({dateDeparture: e.target.value})}
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
                        name="dateDeparture"
                        onChange={(e) => this.setState({dateReturn: e.target.value})}
                        style={{height: "3.5rem"}}
                        type="date" 
                      />
                    </FlexColumn>
                  </div>}
                </div>
              </div>

              {/* Search Button */}
              <div className="row m-4">
                <div className="col-4 ml-auto">
                  <button className="btn btn-lg btn-success text-white kit-border-shadow-thin"
                  onClick={() => this.handleSubmit()}>
                    Search Flights
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    AirportsDispatcher.onRequest();
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  handleAirportRecommendations = (inputText, type) => {
    inputText.toLowerCase();
    
    const { airports } = Store.getState();
    const matchingAirports = [];

    for(var i in airports.search.results) {
      const airport = airports.search.results[i];
      const airportAsString = JSON.stringify(airport).toLowerCase()
      .replace("aiportIataId", "").replace("airportCityName", "");

      if(airportAsString.includes(inputText)) {
        matchingAirports.push(airport.airportIataId + ": " + airport.airportCityName);
      }
    }
    return matchingAirports;
  }

  handleSubmit = () => {
    const { dateDeparture, dateReturn, destination, origin, flightType } = this.state;

  }
}
export default FlightSearchPage;