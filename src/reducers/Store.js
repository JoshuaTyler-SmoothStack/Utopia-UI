// Constants
import constants from "../resources/constants.json"

// Reducers
import airplanesReducer, { defaultAirplanesState } from "./AirplanesReducer";
import airportsReducer, { defaultAirportsState } from "./AirportsReducer";
import authenticationReducer, {defaultAuthenticationState} from "./AuthenticationReducer";
import bookingsReducer, { defaultBookingsState } from "./BookingsReducer";
import flightsReducer, { defaultFlightsState } from "./FlightsReducer";
import orchestrationReducer, {defaultOrchestrationState} from "./OrchestrationReducer";
import paymentsReducer, { defaultPaymentsState } from "./PaymentsReducer";
import routesReducer, { defaultRoutesState } from "./RoutesReducer";
import usersReducer, { defaultUsersState } from "./UsersReducer";

class Store {

  // Requires App.js to initialize State in constructor() 
  static setState = null;
  static getState = null;


  static reduce(action) {
    // Check setState is valid
    if(!Store.setState) {
      console.error("Cannot reduce action! Invalid setState() method.", action);
      return;
    }

    // Route reduction based on action.type,  
    // utilizes constants.json to determine reducer
    switch(action.type.split("_")[0]) {
      
      // airplanes
      case constants.airplanes.root:
        Store.setState((state) => ({
          airplanes: {
            ...state.airplanes, 
            ...airplanesReducer(action)
          }
        }));
      break;

      // airports
      case constants.airports.root:
        Store.setState((state) => ({
          airports: {
            ...state.airports, 
            ...airportsReducer(action)
          }
        }));
      break;

      // authentication
      case constants.authentication.root:
        Store.setState((state) => ({
          authentication: {
            ...state.authentication, 
            ...authenticationReducer(action)
          }
        }));
      break;

      // bookings
      case constants.bookings.root:
        Store.setState((state) => ({
          bookings: {
            ...state.bookings, 
            ...bookingsReducer(action)
          }
        }));
      break;

      // flights
      case constants.flights.root:
        Store.setState((state) => ({
          flights: {
            ...state.flights, 
            ...flightsReducer(action)
          }
        }));
      break;

      // orchestration
      case constants.orchestration.root:
        Store.setState((state) => ({ 
          orchestration: {
            ...state.orchestration,
            ...orchestrationReducer(action)
          }
        }));
      break;

      // payments
      case constants.payments.root:
        Store.setState((state) => ({
          payments: {
            ...state.payments, 
            ...paymentsReducer(action)
          }
        }));
      break;

      // routes
      case constants.routes.root:
        Store.setState((state) => ({
          routes: {
            ...state.routes, 
            ...routesReducer(action)
          }
        }));
      break;

      // users
      case constants.users.root:
        Store.setState((state) => ({
          users: {
            ...state.users, 
            ...usersReducer(action)
          }
        }));
      break;

      default:
        console.error("Invalid action.type!", action);
    }
  }

  static getCombinedDefaultReducerStates() {
    return { 
      airplanes: defaultAirplanesState,
      airports: defaultAirportsState,
      authentication: defaultAuthenticationState,
      bookings: defaultBookingsState,
      flights: defaultFlightsState,
      orchestration: defaultOrchestrationState,
      payments: defaultPaymentsState,
      routes: defaultRoutesState,
      users: defaultUsersState
    };
  }
}
export default Store;