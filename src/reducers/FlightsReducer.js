import constants from "../resources/constants.json"
import Store from "./Store";

const FlightsReducer = (action) => {
  const flightsConst = constants.flights;
  const { flights } = Store.getState();

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
        departureFlights : {
          ...flights.departureFlights,
          status: "PENDING"
        }
      };

    // case flightsConst.requestDepature:
    //   return {
    //     error: "",
    //     status: "PENDING",
    //     departureFlights: {
    //       ...flights.departureFlights,
    //       status: "PENDING"
    //     }
    //   };

    case flightsConst.requestReturn:
        return {
          error: "",
          status: "PENDING",
          returnFlights: {
            ...flights.returnFlights,
            status: "PENDING"
          } 
        };

    case flightsConst.response:
      return {
        error: "",
        status: "SUCCESS",
        departureFlights: {
          ...flights.departureFlights,
          searchResults: action.payload,
          status : "ACTIVE"
        } 
      };

    case flightsConst.returnFlightResponse:
      return {
        status: "SUCCESS",
        returnFlights: {
          ...flights.returnFlights,
          status: "SUCCESS",
          searchResults: action.payload
        }
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