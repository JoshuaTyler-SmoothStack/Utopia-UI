import constants from "../resources/constants.json"
import Store from "./Store";

const FlightsReducer = (action) => {
  const flightsConst = constants.flights;
  const { flights } = Store.getState();

  switch(action.type) {
    case flightsConst.cancel:
      return {
        create: defaultFlightsState.create,
        delete: defaultFlightsState.delete,
        edit: defaultFlightsState.edit,
        error: "",
        status: "SUCCESS"
      };

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

    case flightsConst.searchRequest:
      return {
        error: "",
        status: "PENDING"
      };

    case flightsConst.searchResponse:
      return {
        error: "",
        search: {
          ...flights.search,
          error: "",
          results: action.payload
        },
        status: "SUCCESS"
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
  },
  create: {
    error: "",
    isActive: false,
    results: "",
    resultsStatus: "INACTIVE",
    status: "INACTIVE"
  },
  delete: {
    error: "",
    isActive: false,
    results: "",
    resultsStatus: "INACTIVE",
    status: "INACTIVE"
  },
  edit: {
    error: "",
    isActive: false,
    results: "",
    resultsStatus: "INACTIVE",
    status: "INACTIVE"
  },
  search: {
    error: "",
    filters: {
      activeCount: 0
    },
    results: [],
    resultsPage: 1,
    resultsPerPage: 100,
    resultsTotal: 0,
    status: "INACTIVE"
  },
  selected: null
};