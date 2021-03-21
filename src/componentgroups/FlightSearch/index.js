// Libraries
import React, { useCallback, useEffect, useState } from "react";
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

const BLUR_DELAY = 100;
const FLIGHT_TYPE_ONEWAY = "One-Way";
const FLIGHT_TYPE_ROUNDTRIP = "Round-Trip";

const FlightSearch = (props) => {
  const { airports, flights } = Store.getState();
  const [destinationRecommendations, setDestinationRecommendations] = useState([]);
  const [originRecommendations, setOriginRecommendations] = useState([]);
  const [isFocusDestination, setIsFocusDestination] = useState(false);
  const [isFocusOrigin, setIsFocusOrigin] = useState(false);
  const [isRecommendationsMounted, setIsRecommendationsMounted] = useState(false);
  const isResultsPending = props.isPending || false;

  const isActiveOriginRecommendations =
    isFocusOrigin && originRecommendations.length > 0;
  const isActiveDestinationRecommendations =
    isFocusDestination && destinationRecommendations.length > 0;

  // Recommend Airport search results
  const handleAirportRecommendations = useCallback((type, inputText) => {
    const matchingAirports = [];
    inputText = inputText.trim().toLowerCase();

    // Grab Airports if needed
    if (airports.search.results.length < 1) {
      AirportsDispatcher.onRequest();
    }

    // Do not recommend anything if the search is empty
    if(inputText !== "") {

      // Loop Airports
      for (const i in airports.search.results) {
        if (airports.search.results[i]) {
          const airport = airports.search.results[i];
          const airportAsString = (airport.airportIataId + airport.airportCityName).toLowerCase();

          // Only select matching Airports
          if (airportAsString.includes(inputText)) {
            const formattedAirport = String(`${airport.airportIataId}: ${airport.airportCityName}`);
            if (type === "origin" && formattedAirport !== flights.search.filters.destination)
              matchingAirports.push(formattedAirport);
            if (type === "destination" && formattedAirport !== flights.search.filters.origin)
              matchingAirports.push(formattedAirport);
          }
        }
      }
    }

    if (type === "origin") setOriginRecommendations(matchingAirports);
    if (type === "destination") setDestinationRecommendations(matchingAirports);
    return matchingAirports;
  }, [airports, flights]);

  // Populate Airports on mount
  useEffect(() => {
    if(!isRecommendationsMounted) {
      setIsRecommendationsMounted(true);
      handleAirportRecommendations("origin", "");
      handleAirportRecommendations("destination", "");
    }
  }, [isRecommendationsMounted, setIsRecommendationsMounted, handleAirportRecommendations]);

  return (
    <div className={props.className || ""} style={props.style}>
      {/* Title */}
      <div className="h2 mt-1 mb-0">Search Flights</div>
      <hr className="w-100 mt-2"></hr>

      {/* Radio One-way/Round-Trip */}
      <div className="row">
        <FlexRow className="col-12" justify="start" wrap="no-wrap">
          {/* One-Way */}
          <FlexRow
            onClick={() =>
              FlightsDispatcher.onSetFilter("flightType", FLIGHT_TYPE_ONEWAY)
            }
          >
            <input
              className="m-auto"
              style={{ height: "1.5rem", width: "1.5rem" }}
              type="radio"
              checked={flights.search.filters.flightType === FLIGHT_TYPE_ONEWAY}
              readOnly
            />
            <label className="ml-2 mt-auto mb-auto text-center kit-no-user">
              One-Way
            </label>
          </FlexRow>

          {/* Round-Trip */}
          <FlexRow
            className="ml-4"
            onClick={() =>
              FlightsDispatcher.onSetFilter("flightType", FLIGHT_TYPE_ROUNDTRIP)
            }
          >
            <input
              className="m-auto"
              style={{ height: "1.5rem", width: "1.5rem" }}
              type="radio"
              checked={flights.search.filters.flightType === FLIGHT_TYPE_ROUNDTRIP}
              readOnly
            />
            <label className="ml-2 mt-auto mb-auto text-center kit-no-user">
              Round-Trip
            </label>
          </FlexRow>

          {/* Sign-Post SVGs */}
          <div className="ml-2 mb-auto">
            {flights.search.filters.flightType === "One-Way" ? (
              <div>
                <svg
                  className="kit-svg-turqouise"
                  height="2.5rem"
                  width="2.5rem"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.293.707A1 1 0 0 0 7 1.414V4H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h5v6h2v-6h3.532a1 1 0 0 0 .768-.36l1.933-2.32a.5.5 0 0 0 0-.64L13.3 4.36a1 1 0 0 0-.768-.36H9V1.414A1 1 0 0 0 7.293.707z" />
                </svg>
              </div>
            ) : (
              <div>
                <svg
                  className="kit-svg-turqouise"
                  height="2.5rem"
                  width="2.5rem"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.293.707A1 1 0 0 0 7 1.414V2H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h5v1H2.5a1 1 0 0 0-.8.4L.725 8.7a.5.5 0 0 0 0 .6l.975 1.3a1 1 0 0 0 .8.4H7v5h2v-5h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H9V6h4.5a1 1 0 0 0 .8-.4l.975-1.3a.5.5 0 0 0 0-.6L14.3 2.4a1 1 0 0 0-.8-.4H9v-.586A1 1 0 0 0 7.293.707z" />
                </svg>
              </div>
            )}
          </div>
        </FlexRow>
      </div>

      {/* Origin & Destination */}
      <div className="row mt-3">
        {/* Origin */}
        <div className="col-12 col-sm-6" style={{ height: "3.5rem" }}>
          <InputText
            className="h-100 rounded kit-border-shadow mb-0"
            label={"Origin"}
            labelClassName={"text-info"}
            fontClass={"h4"}
            name="origin"
            value={flights.search.filters.origin}
            onBlur={() => setTimeout(() => setIsFocusOrigin(false), BLUR_DELAY)}
            onFocus={() => setIsFocusOrigin(true)}
            onChange={(value) => {
              FlightsDispatcher.onSetFilter("origin", value);
              handleAirportRecommendations("origin", value);
            }}
          />
          {isActiveOriginRecommendations && (
            <DropDown
              style={{ height: 0 }}
              isActive={isActiveOriginRecommendations}
              options={
                flights.status === "PENDING" ? "PENDING" : originRecommendations
              }
              selection={" "}
              onSelect={(value) =>
                FlightsDispatcher.onSetFilter("origin", value)
              }
            />
          )}
        </div>

        {/* Destination */}
        <div
          className="col-12 col-sm-6 mt-2 mt-sm-0"
          style={{ height: "3.5rem" }}
        >
          <InputText
            className="h-100 rounded kit-border-shadow mb-0"
            label={"Destination"}
            labelClassName={"text-info"}
            fontClass={"h4"}
            name="destination"
            value={flights.search.filters.destination}
            onBlur={() => setTimeout(() => setIsFocusDestination(false), BLUR_DELAY)}
            onFocus={() => setIsFocusDestination(true)}
            onChange={(value) => {
              FlightsDispatcher.onSetFilter("destination", value);
              handleAirportRecommendations("destination", value);
            }}
          />
          {isActiveDestinationRecommendations && (
            <DropDown
              style={{ height: 0 }}
              isActive={isActiveDestinationRecommendations}
              options={
                flights.status === "PENDING"
                  ? "PENDING"
                  : destinationRecommendations
              }
              selection={" "}
              onSelect={(value) =>
                FlightsDispatcher.onSetFilter("destination", value)
              }
            />
          )}
        </div>
      </div>

      {/* Date Pickers */}
      <div className="col-12 mt-3">
        <div className="row">
          {/* Departure Date */}
          <div className="col-6">
            <FlexColumn>
              <label className="form-label mr-auto">Departure Date</label>
              <input
                className="form-label mr-auto"
                style={{ height: "3.5rem", maxWidth: "99%" }}
                type="datetime-local"
                onChange={(e) =>
                  FlightsDispatcher.onSetFilter(
                    "departureDateTime",
                    e.target.value
                  )
                }
              />
            </FlexColumn>
          </div>

          {/* Return Date */}
          {flights.search.filters.flightType === "Round-Trip" && (
            <div className="col-6">
              <FlexColumn>
                <label className="form-label mr-auto">Return Date</label>
                <input
                  className="form-label mr-auto"
                  style={{ height: "3.5rem", maxWidth: "99%" }}
                  type="datetime-local"
                  onChange={(e) =>
                    FlightsDispatcher.onSetFilter(
                      "returnDateTime",
                      e.target.value
                    )
                  }
                />
              </FlexColumn>
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="row mt-3 mb-3">
        {/* Results Info */}
        <FlexRow className="col-8" justify="around">
          {/* DropDown */}
          <DropDown
            buttonClassName="btn-secondary dropdown-toggle"
            className="mb-2"
            selection={flights.search.resultsPerPage}
            options={["3", "10", "25", "50"]}
            optionsName="flights"
            onSelect={(e) => FlightsDispatcher.onSelectItemsPerPage(e)}
          />

          {/* Results Readout */}
          <ItemsIndexReadout
            className="mb-2"
            currentPage={flights.search.resultsPage}
            itemsPerPage={flights.search.resultsPerPage}
            itemsTotal={flights.search.results.length}
          />

          {/* Pagination (seperate) */}
          {flights.search.results.length > 1 && (
            <Pagination
              className="text-center mb-2"
              currentPage={flights.search.resultsPage}
              totalPages={Math.ceil(
                flights.search.results.length /
                  Math.max(flights.search.resultsPerPage, 1)
              )}
              onSelectPage={(e) => FlightsDispatcher.onSelectItemsPage(e)}
            />
          )}
        </FlexRow>

        {/* Search Button */}
        <div className="col-4 ml-auto">
          <button
            className="btn btn-lg btn-success text-white kit-text-shadow-thin"
            style={{ minWidth: "50%" }}
            onClick={() => props.onSubmit()}
          >
            {isResultsPending ? (
              <div className="spinner-border" />
            ) : (
              "Search Flights"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default FlightSearch;
