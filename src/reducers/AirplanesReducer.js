import constants from "../resources/constants.json"
import Store from "./Store";

const AirplanesReducer = (action) => {
  const airplanesRoot = constants.airplanes;
  const { airplanes } = Store.getState();

  switch(action.type) {
    
    case airplanesRoot.cancel:
      return {
        create: defaultAirplanesState.create,
        delete: defaultAirplanesState.delete,
        edit: defaultAirplanesState.edit,
        error: ""
      };

    case airplanesRoot.createPrompt:
      return {
        create: {
          ...defaultAirplanesState.create,
          isActive: true
        },
        delete: defaultAirplanesState.delete,
        edit: defaultAirplanesState.edit
      };

    case airplanesRoot.createRequest:
      return {
        create: {
          ...airplanes.create,
          resultsStatus: "PENDING",
          status: "PENDING"
        },
      };

    case airplanesRoot.createResponse:
      return {
        create: {
          ...airplanes.create,
          results: action.payload,
          resultsStatus: "SUCCESS",
          status: "PENDING"
        },
      };

    case airplanesRoot.deletePrompt:
      return {
        create: defaultAirplanesState.create,
        delete: {
          ...defaultAirplanesState.delete,
          isActive: true
        },
        edit: defaultAirplanesState.edit,
        selected: action.payload
      };

      case airplanesRoot.deleteRequest:
        return {
          delete: {
            ...airplanes.delete,
            resultsStatus: "PENDING",
            status: "PENDING"
          },
        };
  
      case airplanesRoot.deleteResponse:
        return {
          delete: {
            ...airplanes.delete,
            results: action.payload,
            resultsStatus: "SUCCESS",
            status: "PENDING"
          },
        };

    case airplanesRoot.error:
      return {
        error: action.payload || "[ERROR]: 404 - Not Found!",
        status: "ERROR"
      };

    case airplanesRoot.request:
      return {
        error: "",
        status: "PENDING"
      };

    case airplanesRoot.response:
      return {
        error: "",
        search: {
          ...airplanes.search,
          error: "",
          results: action.payload
        },
        status: "SUCCESS"
      }

    case airplanesRoot.searchError:
      return {
        search: {
          ...airplanes.search,
          error: action.payload
        }
      };

    case airplanesRoot.searchResultsPage:
      return {
        search:{
          ...airplanes.search,
          resultsPage: action.payload
        }
      };

    case airplanesRoot.searchResultsPerPage:
      return {
        search:{
          ...airplanes.search,
          resultsPerPage: action.payload
        }
      };

    case airplanesRoot.reset:
      return defaultAirplanesState;

    default:
      console.error("Invalid action.type!", action);
  }
};
export default AirplanesReducer;

export const defaultAirplanesState = {
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