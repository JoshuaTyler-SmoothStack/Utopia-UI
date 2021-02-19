import constants from "../resources/constants.json"

const BookingsReducer = (action) => {
  const bookings = constants.bookings;
  switch(action.type) {
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
      return {
        error: "",
        searchResults: action.payload,
        status: "REGISTERED"
      };

    case bookings.stop:
      return defaultBookingsState;

    default:
      console.error("Invalid action.type!", action);
  }
};
export default BookingsReducer;

export const defaultBookingsState = {
  error: "",
  searchResults: [],
  searchResultsPage: 1,
  searchResultsPerPage: 20,
  searchResultsTotal: 0,
  status: "INACTIVE"
};