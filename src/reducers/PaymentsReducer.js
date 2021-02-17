import constants from "../resources/constants.json"

const PaymentsReducer = (action) => {
  const payments = constants.payments;
  switch(action.type) {
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
      return {
        error: "",
        searchResults: action.payload,
        status: "REGISTERED"
      };

    case payments.stop:
      return defaultPaymentsState;
  }
};
export default PaymentsReducer;

export const defaultPaymentsState = {
  error: "",
  searchResults: [],
  searchResultsPage: 1,
  searchResultsPerPage: 20,
  searchResultsTotal: 0,
  status: "INACTIVE"
};