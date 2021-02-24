import constants from "../resources/constants.json"

const RoutesReducer = (action) => {
  const routes = constants.routes;
  switch(action.type) {
    
    case routes.cancel:
      return {
        deletePrompt: false,
        editPrompt: false,
      };

    case routes.error:
      return {
        error: action.payload || "[ERROR]: 404 - Not Found!",
        status: "ERROR"
      };

    case routes.request:
      return {
        error: "",
        status: "PENDING"
      };

    case routes.response:
      if(action.payload) {
        return {
          error: "",
          searchResults: action.payload,
          status: "SUCCESS"
        }
      }
      return {error: "No Payload", status: "SUCCESS"}

    case routes.searchError:
      return {
        searchError: action.payload,
        searchText: action.payload
      };

    case routes.searchResultsPage:
      return {searchResultsPage: action.payload};

    case routes.searchResultsPerPage:
      return {searchResultsPerPage: action.payload};

    case routes.reset:
      return defaultRoutesState;

    default:
      console.error("Invalid action.type!", action);
  }
};
export default RoutesReducer;

export const defaultRoutesState = {
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