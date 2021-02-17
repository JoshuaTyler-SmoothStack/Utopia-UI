import constants from "../resources/constants.json"

const AirportsReducer = (action) => {
  const airports = constants.airports;
  switch(action.type) {
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
      return {
        error: "",
        searchResults: action.payload,
        status: "REGISTERED"
      };

    case airports.stop:
      return defaultAirportsState;
  }
};
export default AirportsReducer;

export const defaultAirportsState = {
  error: "",
  searchResults: [],
  searchResultsPage: 1,
  searchResultsPerPage: 20,
  searchResultsTotal: 0,
  status: "INACTIVE"
};