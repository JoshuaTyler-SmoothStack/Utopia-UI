import constants from "../resources/constants.json"
import Store from "./Store";

const AirplanesReducer = (action) => {
  const airplanesConst = constants.airplanes;
  const { airplanes } = Store.getState();

  switch(action.type) {
    
    case airplanesConst.cancel:
      return {
        deletePrompt: false,
        editPrompt: false,
      };

    case airplanesConst.error:
      return {
        error: action.payload || "[ERROR]: 404 - Not Found!",
        status: "ERROR"
      };

    case airplanesConst.request:
      return {
        error: "",
        status: "PENDING"
      };

    case airplanesConst.response:
      return {
        error: "",
        search:{
          ...airplanes.search,
          results: action.payload
        },
        status: "SUCCESS"
      }

    case airplanesConst.searchError:
      return {
        searchError: action.payload,
        searchText: action.payload
      };

    case airplanesConst.searchResultsPage:
      return {
        search:{
          ...airplanes.search,
          resultsPage: action.payload
        }
      };

    case airplanesConst.searchResultsPerPage:
      return {
        search:{
          ...airplanes.search,
          resultsPerPage: action.payload
        }
      };

    case airplanesConst.reset:
      return defaultAirplanesState;

    default:
      console.error("Invalid action.type!", action);
  }
};
export default AirplanesReducer;

export const defaultAirplanesState = {
  error: "",
  search: {
    error: "",
    filters: {
      activeCount: 0
    },
    results: [],
    resultsPage: 1,
    resultsPerPage: 100,
    resultsTotal: 0
  }
};