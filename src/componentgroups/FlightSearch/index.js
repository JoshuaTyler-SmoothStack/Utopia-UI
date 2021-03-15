// Libraries
import React, { useState } from "react";
import Store from "../../reducers/Store";
import AirportsDispatcher from "../../dispatchers/AirportsDispatcher";
import FlightsDispatcher from "../../dispatchers/FlightsDispatcher";

// Components
import DropDown from "../../components/DropDown";
import FlexRow from "../../components/FlexRow";
import FlexColumn from "../../components/FlexColumn";
import InputText from "../../components/InputText";
import ItemsIndexReadout from "../../components/ItemsIndexReadout";
import Pagination from "../../components/Pagination";

const FlightSearch = (props) => {

  const { flights } = Store.getState();
  const [destinationRecommendations, setDestinationRecommendations] = useState([]);
  const [originRecommendations, setOriginRecommendations] = useState([]);
  const [isFocus_Destination, setIsFocus_Destination] = useState(false);
  const [isFocus_Origin, setIsFocus_Origin] = useState(false);

  const isActive_OriginRecommendations = isFocus_Origin && originRecommendations.length > 0;
  const isActive_DestinationRecommendations = isFocus_Destination && destinationRecommendations.length > 0;

  const handleAirportRecommendations = (type, inputText) => {    
    const { airports, flights } = Store.getState();

    // Grab Airports if needed
    if(!(airports.search.results.length > 0)) {
      AirportsDispatcher.onRequest();
    }

    const matchingAirports = [];
    inputText = inputText.toLowerCase();

    for(var i in airports.search.results) {
      const airport = airports.search.results[i];
      const airportAsString = (airport.airportIataId + airport.airportCityName).toLowerCase();

      if(airportAsString.includes(inputText)) {
        const formattedAirport = airport.airportIataId + ": " + airport.airportCityName;
        if(type === "origin" && formattedAirport !== flights.search.filters.destination) matchingAirports.push(formattedAirport);
        if(type === "destination" && formattedAirport !== flights.search.filters.origin) matchingAirports.push(formattedAirport);
      }
    }
    if(type === "origin") setOriginRecommendations(matchingAirports);
    if(type === "destination") setDestinationRecommendations(matchingAirports);
    return matchingAirports;
  };

  return (
    <div {...props}>
      
      {/* Title */}
      <div className="h2 mt-3 mb-0">Search Flights</div>
      <hr className="w-100 mt-2"></hr>

        {/* Radio One-way/Round-Trip */}
        <div className="row">
          <FlexRow className="col-6" justify="start" wrap="no-wrap">
            
            {/* One-Way */}
            <FlexRow 
              onClick={() => FlightsDispatcher.onSetFilter("flightType", "One-Way")}
            >
              <input 
                className="m-auto" 
                style={{height:"1.5rem", width:"1.5rem"}}
                type="radio" 
                checked={flights.search.filters.flightType === "One-Way"}
                readOnly
              />
              <label className="ml-2 mt-auto mb-auto text-center kit-no-user">
                One-Way
              </label>
            </FlexRow>

            {/* Round-Trip */}
            <FlexRow 
              className="ml-4"
              onClick={() => FlightsDispatcher.onSetFilter("flightType", "Round-Trip")}
            >
              <input 
                className="m-auto" 
                style={{height:"1.5rem", width:"1.5rem"}}
                type="radio" 
                checked={flights.search.filters.flightType === "Round-Trip"}
                readOnly
              />
              <label className="ml-2 mt-auto mb-auto text-center kit-no-user">
                Round-Trip
              </label>
            </FlexRow>

            {/* Sign-Post SVGs */}
            <div className="ml-2 mb-auto">
              {flights.search.filters.flightType === "One-Way"
                ? <div>
                    <svg
                      className="kit-svg-turqouise" 
                      height="2.5rem" 
                      width="2.5rem" 
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.293.707A1 1 0 0 0 7 1.414V4H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h5v6h2v-6h3.532a1 1 0 0 0 .768-.36l1.933-2.32a.5.5 0 0 0 0-.64L13.3 4.36a1 1 0 0 0-.768-.36H9V1.414A1 1 0 0 0 7.293.707z"/>
                    </svg>
                  </div>
                : <div>
                  <svg
                    className="kit-svg-turqouise" 
                    height="2.5rem" 
                    width="2.5rem" 
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
          <div className="col-6" style={{height: "3.5rem"}}>
            <InputText
              className="h-100 rounded kit-border-shadow mb-0"
              label={"Origin"}
              labelClassName={"text-info"}
              fontClass={"h4"}
              name="origin"
              value={flights.search.filters.origin}
              onBlur={() => setTimeout(() => setIsFocus_Origin(false), 100)}
              onFocus={() => setIsFocus_Origin(true)}
              onChange={(value) => {
                FlightsDispatcher.onSetFilter("origin", value);
                handleAirportRecommendations("origin", value);
              }}
            />
            {isActive_OriginRecommendations &&
            <DropDown
              style={{height: 0}}
              isActive={isActive_OriginRecommendations}
              options={flights.status === "PENDING" ? "PENDING" : originRecommendations}
              selection={" "}
              onSelect={(value) => FlightsDispatcher.onSetFilter("origin", value)}
            />}
          </div>

          {/* Destination */}
          <div className="col-6" style={{height: "3.5rem"}}>
            <InputText
              className="h-100 rounded kit-border-shadow mb-0"
              label={"Destination"}
              labelClassName={"text-info"}
              fontClass={"h4"}
              name="destination"
              value={flights.search.filters.destination}
              onBlur={() => setTimeout(() => setIsFocus_Destination(false), 100)}
              onFocus={() => setIsFocus_Destination(true)}
              onChange={(value) => {
                FlightsDispatcher.onSetFilter("destination", value);
                handleAirportRecommendations("destination", value);
              }}
            />
            {isActive_DestinationRecommendations &&
            <DropDown
              style={{height: 0}}
              isActive={isActive_DestinationRecommendations}
              options={flights.status === "PENDING" ? "PENDING" : destinationRecommendations}
              selection={" "}
              onSelect={(value) => FlightsDispatcher.onSetFilter("destination", value)}
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
                  className="form-label mr-auto" 
                  style={{height: "3.5rem", maxWidth:"99%"}}
                  type="datetime-local" 
                  onChange={(e) => FlightsDispatcher.onSetFilter("departureDateTime", e.target.value)}
                />
              </FlexColumn>
            </div>


            {/* Return Date */}
            {flights.search.filters.flightType === "Round-Trip" &&
            <div className="col-6">
              <FlexColumn>
                <label className="form-label mr-auto">
                  Return Date
                </label>
                <input 
                  className="form-label mr-auto"
                  style={{height: "3.5rem", maxWidth:"99%"}}
                  type="date" 
                  onChange={(e) => FlightsDispatcher.onSetFilter("returnDateTime", e.target.value)}
                />
              </FlexColumn>
            </div>}
          </div>
        </div>

        {/* Buttons */}
        <div className="row mt-3 mb-3">
          
          {/* Results Info */}
          <div className="col-8">
            <div className="row">
              
              {/* DropDown & Results (together) */}
              <FlexRow className="col-12 col-md-6" justify="around" wrap="no-wrap">
                
                {/* DropDown */}
                <DropDown
                  buttonClassName="btn-secondary dropdown-toggle"
                  selection={flights.search.resultsPerPage}
                  options={["3", "10", "25", "50"]}
                  optionsName="flights"
                  onSelect={(e) => FlightsDispatcher.onSelectItemsPerPage(e)}
                />

                {/* Results Readout */}
                <ItemsIndexReadout
                  className="ml-2"
                  currentPage={flights.search.resultsPage}
                  itemsPerPage={flights.search.resultsPerPage}
                  itemsTotal={flights.search.results.length}
                />
              </FlexRow>

              {/* Pagination (seperate) */}
              {flights.search.results.length > 1 &&
              <FlexRow className="col-12 col-md-6 mt-2 mt-md-0">
                <Pagination
                  className="text-center"
                  currentPage={flights.search.resultsPage}
                  totalPages={Math.ceil(flights.search.results.length / Math.max(flights.search.resultsPerPage, 1))}
                  onSelectPage={(e) => FlightsDispatcher.onSelectItemsPage(e)}
                />
              </FlexRow>}
            </div>
          </div>

          {/* Search Button */}
          <div className="col-4 ml-auto">
            <button className="btn btn-lg btn-success text-white kit-text-shadow-thin"
              onClick={() => props.onSubmit()}
            >
              Search Flights
            </button>
          </div>
        </div>
    </div>
  );
}
export default FlightSearch;