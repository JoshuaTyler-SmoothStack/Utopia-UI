import constants from "../resources/constants.json"
import Store from "./Store";

const FlightsReducer = (action) => {
  const flightsConst = constants.flights;
  switch(action.type) {
    case flightsConst.error:
      return {
        error: action.payload || "[ERROR]: 404 - Not Found!",
        status: "ERROR"
      };

    case flightsConst.request:
      return {
        error: "",
        status: "PENDING",
        departureFlights : action.payload
      };

    case flightsConst.requestReturn:
        return {
          error: "",
          status: "PENDING",
          returnFlights : action.payload
    };

    case flightsConst.response:
      return {
        error: "",
        status: "SUCCESS",
        departureFlights : action.payload
      };

    case flightsConst.returnFlightResponse:
      return {
        error: "",
        status: "SUCCESS",
        returnFlights: action.payload,
    };

    case flightsConst.stop:
      return defaultFlightsState;

    default:
      console.error("Invalid action.type!", action);
  }
};
export default FlightsReducer;

export const defaultFlightsState = {
  error: "",
  status: "INACTIVE",
  departureFlights : {
    searchResults: [],
    searchResultsPage: 1,
    searchResultsPerPage: 20,
    searchResultsTotal: 0,
    status: "INACTIVE"
  },
  returnFlights : {
    searchResults: [],
    searchResultsPage: 1,
    searchResultsPerPage: 20,
    searchResultsTotal: 0,
    status: "INACTIVE"
  }
};