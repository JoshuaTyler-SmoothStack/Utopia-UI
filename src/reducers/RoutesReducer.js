import constants from "../resources/constants.json"

const RoutesReducer = (action) => {
  const routes = constants.routes;
  switch(action.type) {
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
      return {
        error: "",
        searchResults: action.payload,
        status: "REGISTERED"
      };

    case routes.stop:
      return defaultRoutesState;
  }
};
export default RoutesReducer;

export const defaultRoutesState = {
  error: "",
  searchResults: [],
  searchResultsPage: 1,
  searchResultsPerPage: 20,
  searchResultsTotal: 0,
  status: "INACTIVE"
};