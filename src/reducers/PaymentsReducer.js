import constants from "../resources/constants.json"

const PaymentsReducer = (action) => {
  const payments = constants.payments;
  switch(action.type) {
    
    case payments.cancel:
      return {
        deletePrompt: false,
        editPrompt: false,
      };

    case payments.error:
      return {
        error: action.payload || "[ERROR]: 404 - Not Found!",
        status: "ERROR"
      };

    case payments.request:
      return {
        error: "",
        status: "PENDING"
      };

    case payments.response:
      if(action.payload) {
        return {
          error: "",
          searchResults: action.payload,
          status: "SUCCESS"
        }
      }
      return {error: "No Payload", status: "SUCCESS"}

    case payments.searchError:
      return {
        searchError: action.payload,
        searchText: action.payload
      };

    case payments.searchResultsPage:
      return {searchResultsPage: action.payload};

    case payments.searchResultsPerPage:
      return {searchResultsPerPage: action.payload};

    case payments.reset:
      return defaultPaymentsState;

    default:
      console.error("Invalid action.type!", action);
  }
};
export default PaymentsReducer;

export const defaultPaymentsState = {
  error: "",
  searchError: "",
  searchFilters: {
    activeCount: 0
  },
  searchResults: [],
  searchResultsPage: 1,
  searchResultsPerPage: 100,
  searchResultsTotal: 0,
  status: "INACTIVE"
};