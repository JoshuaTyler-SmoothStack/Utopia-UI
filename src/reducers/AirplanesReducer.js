import constants from "../resources/constants.json"

const AirplanesReducer = (action) => {
  const airplanes = constants.airplanes;
  switch(action.type) {
    
    case airplanes.cancel:
      return {
        deletePrompt: false,
        editPrompt: false,
      };

    case airplanes.error:
      return {
        error: action.payload || "[ERROR]: 404 - Not Found!",
        status: "ERROR"
      };

    case airplanes.request:
      return {
        error: "",
        status: "PENDING"
      };

    case airplanes.response:
      if(action.payload) {
        return {
          error: "",
          searchResults: action.payload,
          status: "SUCCESS"
        }
      }
      return {error: "No Payload", status: "SUCCESS"}

    case airplanes.searchError:
      return {
        searchError: action.payload,
        searchText: action.payload
      };

    case airplanes.searchResultsPage:
      return {searchResultsPage: action.payload};

    case airplanes.searchResultsPerPage:
      return {searchResultsPerPage: action.payload};

    case airplanes.reset:
      return defaultAirplanesState;

    default:
      console.error("Invalid action.type!", action);
  }
};
export default AirplanesReducer;

export const defaultAirplanesState = {
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