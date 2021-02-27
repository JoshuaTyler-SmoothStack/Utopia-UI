import constants from "../resources/constants.json"
import Store from "./Store";

const BookingsReducer = (action) => {
  const bookingsRoot = constants.bookings;
  const { bookings } = Store.getState();

  switch(action.type) {  
    case bookingsRoot.cancel:
      return {
        create: {
          ...bookings.create,
          isActive: false
        },
        delete: {
          ...bookings.delete,
          isActive: false
        },
        edit: {
          ...bookings.edit,
          isActive: false
        },
        search: {
          ...bookings.search,
          resultsPage: 1
        }
      };

    case bookingsRoot.createError:
      return {
        create: {
          error: action.payload.result,
          isActive: true,
          results: {
            ...defaultBookingsState.create.results,
            booking: action.payload,
          },
          resultsStatus: {
            booking: "ERROR",
            flights: "DISABLED",
            guests: "DISABLED",
            passengers: "DISABLED",
            users: "DISABLED"
          },
          status: "ERROR"
        }
      };

    case bookingsRoot.createPrompt:
      return {
        create: {
          ...defaultBookingsState.create,
          isActive: true
        },
        delete: defaultBookingsState.delete,
        edit: defaultBookingsState.edit
      };

    case bookingsRoot.createRequest:
      return {
        create: {
          ...defaultBookingsState.create,
          isActive: true,
          status: "PENDING"
        },
      };

    case bookingsRoot.createResponse:
      return {
        create: {
          ...bookings.create,
          results: action.payload.results,
          resultsStatus: action.payload.resultsStatus
        }
      };

    case bookingsRoot.deletePrompt:
      return {
        create: defaultBookingsState.create,
        delete: {
          ...defaultBookingsState.delete,
          isActive: true
        },
        edit: defaultBookingsState.edit,
      };

    case bookingsRoot.deleteRequest:
      return {
        delete: {
          ...defaultBookingsState.delete,
          isActive: true,
          status: "PENDING"
        },
      };

    case bookingsRoot.deleteResponse:
      return {
        delete: {
          ...bookings.delete,
          results: action.payload.results,
          resultsStatus: action.payload.resultsStatus,
          status: "PENDING"
        }
      };

    case bookingsRoot.editPrompt:
      return {
        create: defaultBookingsState.create,
        delete: defaultBookingsState.delete,
        edit: {
          ...defaultBookingsState.edit,
          isActive: true
        },
      };

    case bookingsRoot.editRequest:
      return {
        edit: {
          ...defaultBookingsState.edit,
          isActive: true,
          status: "PENDING"
        },
      };

    case bookingsRoot.editResponse:
      return {
        edit: {
          ...bookings.edit,
          results: action.payload.results,
          resultsStatus: action.payload.resultsStatus,
          status: "PENDING"
        }
      };

    case bookingsRoot.error:
      return {
        error: action.payload || "[ERROR]: 404 - Not Found!",
        status: "ERROR"
      };

    case bookingsRoot.request:
      return {
        error: "",
        status: "PENDING"
      };

    case bookingsRoot.response:
      return {
        error: "",
        search: {
          ...bookings.search,
          error: "",
          results: action.payload
        },
        status: "SUCCESS"
      }

    case bookingsRoot.searchError:
      return {
        search: {
          ...bookings.search,
          error: action.payload
        }
      };

    case bookingsRoot.searchResultsPage:
      return {
        search: {
          ...bookings.search,
          resultsPage: action.payload
        }
      };

    case bookingsRoot.searchResultsPerPage:
      return {
        search: {
          ...bookings.search,
          resultsPage: 1,
          resultsPerPage: action.payload
        }
      };

    case bookingsRoot.select:
      return {selected: action.payload};

    case bookingsRoot.reset:
      return defaultBookingsState;

    default:
      console.error("Invalid action.type!", action);
  }
};
export default BookingsReducer;

export const defaultBookingsState = {
  create: {
    error: "",
    isActive: false,
    results: {
      booking: "N/A",
      flights: "N/A",
      guests: "N/A",
      passengers: "N/A",
      users: "N/A"
    },
    resultsStatus: {
      booking: "PENDING",
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
      booking: "N/A",
      flights: "N/A",
      guests: "N/A",
      passengers: "N/A",
      users: "N/A"
    },
    resultsStatus: {
      booking: "PENDING",
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
      booking: "N/A",
      flights: "N/A",
      guests: "N/A",
      passengers: "N/A",
      users: "N/A"
    },
    resultsStatus: {
      booking: "PENDING",
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
      byBookingStatus: null,
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