import constants from "../resources/constants.json"
import Store from "./Store";

const AirplanesReducer = (action) => {
  const airplanesConst = constants.airplanes;
  const { airplanes } = Store.getState();

  switch(action.type) {
    
    case airplanesConst.cancel:
      return {
        create: defaultAirplanesState.create,
        delete: defaultAirplanesState.delete,
        edit: defaultAirplanesState.edit,
        error: ""
      };

    case airplanesConst.createPrompt:
      return {
        create: {
          ...defaultAirplanesState.create,
          isActive: true
        },
        delete: defaultAirplanesState.delete,
        edit: defaultAirplanesState.edit
      };

    case airplanesConst.createRequest:
      return {
        create: {
          ...airplanes.create,
          resultsStatus: "PENDING",
          status: "PENDING"
        },
      };

    case airplanesConst.createResponse:
      return {
        create: {
          ...airplanes.create,
          results: action.payload,
          resultsStatus: "SUCCESS",
          status: "PENDING"
        },
      };

    case airplanesConst.deletePrompt:
      return {
        create: defaultAirplanesState.create,
        delete: {
          ...defaultAirplanesState.delete,
          isActive: true
        },
        edit: defaultAirplanesState.edit,
        selected: action.payload
      };

      case airplanesConst.deleteRequest:
        return {
          delete: {
            ...airplanes.delete,
            resultsStatus: "PENDING",
            status: "PENDING"
          },
        };
  
      case airplanesConst.deleteResponse:
        return {
          delete: {
            ...airplanes.delete,
            results: action.payload,
            resultsStatus: "SUCCESS",
            status: "PENDING"
          },
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
        search: {
          ...airplanes.search,
          error: "",
          results: action.payload
        },
        status: "SUCCESS"
      }

    case airplanesConst.searchError:
      return {
        search: {
          ...airplanes.search,
          error: action.payload
        }
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