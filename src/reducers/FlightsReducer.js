import BaseReducer from "./BaseReducer";

class FlightsReducer extends BaseReducer {

  static getDefaultReducerState() {
    return defaultFlightsReducerState;
  }
}
export default FlightsReducer;

export const defaultFlightsReducerState = {
  create: {
    isActive: false,
    results: {},
    resultsStatus: "INACTIVE"
  },
  delete: {
    isActive: false,
    results: {},
    resultsStatus: "INACTIVE"
  },
  edit: {
    isActive: false,
    results: {},
    resultsStatus: "INACTIVE"
  },
  departureFlights: {},
  returnFlights: {},
  error: "",
  selected: {},
  search: {
    filters: {
      activeCount: 0,
    },
    results: [],
    resultsPage: 1,
    resultsPerPage: 10,
    resultsTotal: 0,
  },
  status: "INACTIVE"
};