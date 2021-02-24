import constants from "../resources/constants.json"

const BookingsReducer = (action) => {
  const bookings = constants.bookings;
  switch(action.type) {
    
    case bookings.cancel:
      return {
        deletePrompt: false,
        editPrompt: false,
      };

    case bookings.deletePrompt:
      return {
        deletePrompt: true,
        deleteStatus: "INACTIVE",
        selected: action.payload,
      };

    case bookings.deleteRequest:
      return {
        deleteResults: defaultBookingsState.deleteResults,
        deleteResultsStatus: defaultBookingsState.deleteResultsStatus,
        deleteStatus: "PENDING",
      };

    case bookings.deleteResponse:
      return {
        deleteResults: action.payload.deleteResults,
        deleteResultsStatus: action.payload.deleteResultsStatus,
      };

    case bookings.editPrompt:
      return {
        editPrompt: true,
        selected: action.payload,
      };

    case bookings.error:
      return {
        error: action.payload || "[ERROR]: 404 - Not Found!",
        status: "ERROR"
      };

    case bookings.request:
      return {
        error: "",
        status: "PENDING"
      };

    case bookings.response:
      if(action.payload) {
        return {
          error: "",
          searchResults: action.payload,
          status: "SUCCESS"
        }
      }
      return {error: "No Payload", status: "SUCCESS"}

    case bookings.searchError:
      return {
        searchError: action.payload,
        searchText: action.payload
      };

    case bookings.searchResultsPage:
      return {searchResultsPage: action.payload};

    case bookings.searchResultsPerPage:
      return {searchResultsPerPage: action.payload};

    case bookings.reset:
      return defaultBookingsState;

    default:
      console.error("Invalid action.type!", action);
  }
};
export default BookingsReducer;

export const defaultBookingsState = {
  deletePrompt: false,
  deleteResults: {
    booking: null,
    flights: null,
    guests: null,
    passengers: null,
    payments: null,
    users: null
  },
  deleteResultsStatus: {
    booking: "PENDING",
    flights: "PENDING",
    guests: "PENDING",
    passengers: "PENDING",
    payments: "PENDING",
    users: "PENDING"
  },
  deleteStatus: "INACTIVE",
  editPrompt: false,
  error: "",
  selected: null,
  searchError: "",
  searchFilters: {
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
  searchResults: [],
  searchResultsPage: 1,
  searchResultsPerPage: 100,
  searchResultsTotal: 0,
  status: "INACTIVE"
};