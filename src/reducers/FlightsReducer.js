import constants from "../resources/constants.json"

const FlightsReducer = (action) => {
  const flights = constants.flights;
  switch(action.type) {
    case flights.error:
      return {
        error: action.payload || "[ERROR]: 404 - Not Found!",
        status: "ERROR"
      };

    case flights.request:
      return {
        error: "",
        status: "PENDING"
      };

    case flights.response:
      return {
        error: "",
        searchResults: action.payload,
        status: "REGISTERED"
      };

    case flights.stop:
      return defaultFlightsState;

    default:
      console.error("Invalid action.type!", action);
  }
};
export default FlightsReducer;

export const defaultFlightsState = {
  error: "",
  searchResults: [],
  searchResultsPage: 1,
  searchResultsPerPage: 20,
  searchResultsTotal: 0,
  status: "INACTIVE"
};