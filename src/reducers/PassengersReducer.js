import constants from "../resources/constants.json"
import Store from "./Store";

const PassengersReducer = (action) => {
  const passengersRoot = constants.passengers;
  const { passengers } = Store.getState();

  switch(action.type) {  
    case passengersRoot.cancel:
      return {
        create: defaultPassengersState.create,
        delete: defaultPassengersState.delete,
        edit: defaultPassengersState.edit,
        error: "",
        search: {
          ...passengers.search,
          resultsPage: 1
        },
        status: "SUCCESS"
      };

    case passengersRoot.createError:
      return {
        create: {
          error: action.payload.result,
          isActive: true,
          results: {
            ...defaultPassengersState.create.results,
            passenger: action.payload,
          },
          resultsStatus: {
            passenger: "ERROR",
            flights: "DISABLED",
            guests: "DISABLED",
            passengers: "DISABLED",
            users: "DISABLED"
          },
          status: "ERROR"
        }
      };

    case passengersRoot.createPrompt:
      return {
        create: {
          ...defaultPassengersState.create,
          isActive: true
        },
        delete: defaultPassengersState.delete,
        edit: defaultPassengersState.edit
      };

    case passengersRoot.createRequest:
      return {
        create: {
          ...defaultPassengersState.create,
          isActive: true,
          resultsStatus: "PENDING",
          status: "PENDING"
        }
      };

    case passengersRoot.createResponse:
      return {
        create: {
          ...passengers.create,
          results: action.payload,
          resultsStatus: "SUCCESS"
        }
      };

    case passengersRoot.deletePrompt:
      return {
        create: defaultPassengersState.create,
        delete: {
          ...defaultPassengersState.delete,
          isActive: true
        },
        edit: defaultPassengersState.edit,
      };

    case passengersRoot.deleteRequest:
      return {
        delete: {
          ...defaultPassengersState.delete,
          isActive: true,
          status: "PENDING"
        },
      };

    case passengersRoot.deleteResponse:
      return {
        delete: {
          ...passengers.delete,
          results: action.payload.results,
          resultsStatus: action.payload.resultsStatus,
          status: "PENDING"
        }
      };

    case passengersRoot.editPrompt:
      return {
        create: defaultPassengersState.create,
        delete: defaultPassengersState.delete,
        edit: {
          ...defaultPassengersState.edit,
          isActive: true
        },
        selected: action.payload,
        status: "SUCCESS"
      };

    case passengersRoot.editRequest:
      return {
        edit: {
          ...defaultPassengersState.edit,
          isActive: true,
          status: "PENDING"
        },
      };

    case passengersRoot.editResponse:
      return {
        edit: {
          ...passengers.edit,
          results: action.payload.results,
          resultsStatus: action.payload.resultsStatus,
          status: "PENDING"
        }
      };

    case passengersRoot.error:
      return {
        error: action.payload || "[ERROR]: 404 - Not Found!",
        status: "ERROR"
      };

    case passengersRoot.request:
      return {
        error: "",
        status: "PENDING"
      };

    case passengersRoot.response:
      return {
        error: "",
        search: {
          ...passengers.search,
          error: "",
          results: action.payload
        },
        status: "SUCCESS"
      }

    case passengersRoot.searchError:
      return {
        search: {
          ...passengers.search,
          error: action.payload
        }
      };

    case passengersRoot.searchResultsPage:
      return {
        search: {
          ...passengers.search,
          resultsPage: action.payload
        }
      };

    case passengersRoot.searchResultsPerPage:
      return {
        search: {
          ...passengers.search,
          resultsPage: 1,
          resultsPerPage: action.payload
        }
      };

    case passengersRoot.select:
      return {selected: action.payload};

    case passengersRoot.reset:
      return defaultPassengersState;

    default:
      console.error("Invalid action.type!", action);
  }
};
export default PassengersReducer;

export const defaultPassengersState = {
  create: {
    error: "",
    isActive: false,
    results: {
      passenger: "N/A",
      flights: "N/A",
      guests: "N/A",
      passengers: "N/A",
      users: "N/A"
    },
    resultsStatus: {
      passenger: "PENDING",
      flights: "PENDING",
      guests: "PENDING",
      passengers: "PENDING",
      users: "PENDING"
    },
    status: "INACTIVE"
  },
  delete: {
    error: "",
    isActive: false,
    results: {
      passenger: "N/A",
      flights: "N/A",
      guests: "N/A",
      passengers: "N/A",
      users: "N/A"
    },
    resultsStatus: {
      passenger: "PENDING",
      flights: "PENDING",
      guests: "PENDING",
      passengers: "PENDING",
      users: "PENDING"
    },
    status: "INACTIVE"
  },
  edit: {
    error: "",
    isActive: false,
    results: {
      passenger: "N/A",
      flights: "N/A",
      guests: "N/A",
      passengers: "N/A",
      users: "N/A"
    },
    resultsStatus: {
      passenger: "PENDING",
      flights: "PENDING",
      guests: "PENDING",
      passengers: "PENDING",
      users: "PENDING"
    },
    status: "INACTIVE"
  },
  error: "",
  selected: null,
  search: {
    error: "",
    filters: {
      activeCount: 0,
      byAirplaneId: null,
      byAirplaneType: null,
      byPassengerStatus: null,
      byFlightId: null,
      byFlightOrigin: null,
      byFlightDestination: null,
      byPassengerAgeGreaterThan: null,
      byPassenegerAgeLessThan: null,
      byPassengerId: null,
      byPassengerNameFirst: null,
      byPassengerNameLast: null,
      byPassengerSex: null,
      byPaymentId: null,
      byUserId: null,
      byUserRole: null,
    },
    results: [],
    resultsPage: 1,
    resultsPerPage: 10,
    resultsTotal: 0,
    status: "INACTIVE"
  },
  status: "INACTIVE"
};