import constants from "../resources/constants.json"

const AirportsReducer = (action) => {
  const airports = constants.airports;
  switch(action.type) {
    
    case airports.cancel:
      return {
        deletePrompt: false,
        editPrompt: false,
      };

    case airports.error:
      return {
        error: action.payload || "[ERROR]: 404 - Not Found!",
        status: "ERROR"
      };

    case airports.request:
      return {
        error: "",
        status: "PENDING"
      };

    case airports.response:
      if(action.payload) {
        return {
          error: "",
          searchResults: action.payload,
          status: "SUCCESS"
        }
      }
      return {error: "No Payload", status: "SUCCESS"}

    case airports.searchError:
      return {
        searchError: action.payload,
        searchText: action.payload
      };

    case airports.searchResultsPage:
      return {searchResultsPage: action.payload};

    case airports.searchResultsPerPage:
      return {searchResultsPerPage: action.payload};

    case airports.reset:
      return defaultAirportsState;

    default:
      console.error("Invalid action.type!", action);
  }
};
export default AirportsReducer;

export const defaultAirportsState = {
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