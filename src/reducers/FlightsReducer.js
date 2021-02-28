import constants from "../resources/constants.json"

const FlightsReducer = (action) => {
  const flights = constants.flights;
  switch(action.type) {
    
    case flights.cancel:
      return {
        deletePrompt: false,
        editPrompt: false,
      };

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
      if(action.payload) {
        return {
          error: "",
          searchResults: action.payload,
          status: "SUCCESS"
        }
      }
      return {error: "No Payload", status: "SUCCESS"}

    case flights.searchError:
      return {
        searchError: action.payload,
        searchText: action.payload
      };

    case flights.searchResultsPage:
      return {searchResultsPage: action.payload};

    case flights.searchResultsPerPage:
      return {searchResultsPerPage: action.payload};

    case flights.reset:
      return defaultFlightsState;

    default:
      console.error("Invalid action.type!", action);
  }
};
export default FlightsReducer;

export const defaultFlightsState = {
  error: "",
  searchError: "",
  searchFilters: {
    activeCount: 0
  },
  searchResults: [],
  searchResultsPage: 1,
  searchResultsPerPage: 100,
  searchResultsTotal: 0,
  status: "INACTIVE"
};