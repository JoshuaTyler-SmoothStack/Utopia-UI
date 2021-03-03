import constants from "../resources/constants.json"
import Store from "./Store";

const FlightsReducer = (action) => {
  const flightsRoot = constants.flights;
  const { flights } = Store.getState();

  switch(action.type) {
    case flightsRoot.cancel:
      return {
        create: defaultFlightsState.create,
        delete: defaultFlightsState.delete,
        edit: defaultFlightsState.edit,
        error: "",
        status: "SUCCESS"
      };

    case flightsRoot.error:
      return {
        error: action.payload || "[ERROR]: 404 - Not Found!",
        status: "ERROR"
      };

    case flightsRoot.request:
      return {
        error: "",
        status: "PENDING",
        departureFlights : {
          ...flights.departureFlights,
          status: "PENDING"
        }
      };

    // case flightsRoot.requestDepature:
    //   return {
    //     error: "",
    //     status: "PENDING",
    //     departureFlights: {
    //       ...flights.departureFlights,
    //       status: "PENDING"
    //     }
    //   };

    case flightsRoot.requestReturn:
      return {
        error: "",
        status: "PENDING",
        returnFlights: {
          ...flights.returnFlights,
          status: "PENDING"
        } 
      };

    case flightsRoot.response:
      return {
        error: "",
        status: "SUCCESS",
        search: {
          ...flights.search,
          all: {
            results: action.payload,
            status: "SUCCESS"
          }
        }
      };

    case flightsRoot.returnFlightResponse:
      return {
        status: "SUCCESS",
        returnFlights: {
          ...flights.returnFlights,
          status: "SUCCESS",
          searchResults: action.payload
        }
    };

    case flightsRoot.searchResultsPage:
      return {
        search: {
          ...flights.search,
          resultsPage: action.payload
        }
      };

    case flightsRoot.searchResultsPerPage:
      return {
        search: {
          ...flights.search,
          resultsPage: 1,
          resultsPerPage: action.payload
        }
      };

    case flightsRoot.select:
      return {selected: action.payload};

    case flightsRoot.reset:
      return defaultFlightsState;

    default:
      console.error("Invalid action.type!", action);
  }
};
export default FlightsReducer;

export const defaultFlightsState = {
  error: "",
  status: "INACTIVE",
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
      activeCount: 0,

    },
    all: {
      results: [],
      status: []
    },
    departure: {
      results: [],
      status: "INACTIVE"
    },
    return: {
      results: [],
      status: "INACTIVE"
    },
    resultsPage: 1,
    resultsPerPage: 10,
    resultsTotal: 0,
    status: "INACTIVE"
  },
  selected: null
};