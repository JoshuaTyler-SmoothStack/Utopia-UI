import constants from "../resources/constants.json"
import Store from "./Store";

const AirportsReducer = (action) => {
  const airportsRoot = constants.airports;
  const { airports } = Store.getState();

  switch(action.type) {
    
    case airportsRoot.cancel:
      return {
        create: defaultAirportsState.create,
        delete: defaultAirportsState.delete,
        edit: defaultAirportsState.edit,
        error: "",
        search: {
          ...airports.search,
          resultsPage: 1
        },
        status: "SUCCESS"
      };

    case airportsRoot.createPrompt:
      return {
        create: {
          ...defaultAirportsState.create,
          isActive: true
        },
        delete: defaultAirportsState.delete,
        edit: defaultAirportsState.edit
      };

    case airportsRoot.createRequest:
      return {
        create: {
          ...airports.create,
          resultsStatus: "PENDING",
          status: "PENDING"
        },
      };

    case airportsRoot.createResponse:
      return {
        create: {
          ...airports.create,
          results: action.payload,
          resultsStatus: "SUCCESS",
          status: "PENDING"
        },
      };

    case airportsRoot.deletePrompt:
      return {
        create: defaultAirportsState.create,
        delete: {
          ...defaultAirportsState.delete,
          isActive: true
        },
        edit: defaultAirportsState.edit,
        selected: action.payload
      };

    case airportsRoot.deleteRequest:
      return {
        delete: {
          ...airports.delete,
          resultsStatus: "PENDING",
          status: "PENDING"
        },
      };

    case airportsRoot.deleteResponse:
      return {
        delete: {
          ...airports.delete,
          results: action.payload,
          resultsStatus: "SUCCESS",
          status: "PENDING"
        },
      };

    case airportsRoot.editPrompt:
      return {
        create: defaultAirportsState.create,
        delete: defaultAirportsState.delete,
        edit: {
          ...defaultAirportsState.edit,
          isActive: true
        },
        selected: action.payload
      };

    case airportsRoot.editRequest:
      return {
        edit: {
          ...defaultAirportsState.edit,
          isActive: true,
          status: "PENDING"
        },
      };

    case airportsRoot.editResponse:
      return {
        edit: {
          ...airports.edit,
          results: action.payload.results,
          resultsStatus: action.payload.status,
          status: "PENDING"
        }
      };

    case airportsRoot.error:
      return {
        error: action.payload || "[ERROR]: 404 - Not Found!",
        status: "ERROR"
      };

    case airportsRoot.request:
      return {
        error: "",
        status: "PENDING"
      };

    case airportsRoot.response:
      return {
        error: "",
        search: {
          ...airports.search,
          error: "",
          results: action.payload
        },
        status: "SUCCESS"
      }

    case airportsRoot.searchError:
      return {
        search: {
          ...airports.search,
          error: action.payload
        }
      };

    case airportsRoot.searchResultsPage:
      return {
        search:{
          ...airports.search,
          resultsPage: action.payload
        }
      };

    case airportsRoot.searchResultsPerPage:
      return {
        search:{
          ...airports.search,
          resultsPerPage: action.payload
        }
      };

    case airportsRoot.reset:
      return defaultAirportsState;

    default:
      console.error("Invalid action.type!", action);
  }
};
export default AirportsReducer;

export const defaultAirportsState = {
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
  error: "",
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
  selected: null,
  status: "INACTIVE"
};