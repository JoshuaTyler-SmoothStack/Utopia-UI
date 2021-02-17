import constants from "../resources/constants.json"

const AirplanesReducer = (action) => {
  const airplanes = constants.airplanes;
  switch(action.type) {
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
      return {
        error: "",
        searchResults: action.payload,
        status: "REGISTERED"
      };

    case airplanes.stop:
      return defaultAirplanesState;
  }
};
export default AirplanesReducer;

export const defaultAirplanesState = {
  error: "",
  searchResults: [],
  searchResultsPage: 1,
  searchResultsPerPage: 20,
  searchResultsTotal: 0,
  status: "INACTIVE"
};