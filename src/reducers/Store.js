// Libraries
import constants from "../resources/constants.json"

// Reducers
import AirplanesReducer, { defaultAirplanesState } from "./AirplanesReducer";
import AirportsReducer, { defaultAirportsState } from "./AirportsReducer";
import AuthenticationReducer, {defaultAuthenticationState} from "./AuthenticationReducer";
import BookingsReducer, { defaultBookingsState } from "./BookingsReducer";
import FlightsReducer, { defaultFlightsState } from "./FlightsReducer";
import OrchestrationReducer, {defaultOrchestrationState} from "./OrchestrationReducer";
import PassengersReducer from "./PassengersReducer";
import PaymentsReducer, { defaultPaymentsState } from "./PaymentsReducer";
import RoutesReducer, { defaultRoutesState } from "./RoutesReducer";
import UsersReducer, { defaultUsersState } from "./UsersReducer";

class Store {
  static setState = null;
  static getState = null;
  static reducers = [];

  static initialize(getState, setState) {
    Store.getState = getState;
    Store.setState = setState;
    Store.reducers = [
      AirplanesReducer, 
      AirportsReducer,
      AuthenticationReducer,
      BookingsReducer,
      FlightsReducer,
      OrchestrationReducer.initialize(
        constants.orchestration,
        constants.orchestration.apiPath
      ),
      PassengersReducer.initialize(
        constants.passengers,
        constants.passengers.apiPath
      ),
      PaymentsReducer,
      RoutesReducer,
      UsersReducer
    ];
  }

  static reduce(action) {

    // Check action is valid
    if(!action.type) {
      console.error("Cannot reduce action - invalid action.type", action);
      return;
    }

    // Check action.type root is valid
    const actionTypeRoot = action.type.split("_")[0];
    if(!actionTypeRoot) {
      console.error("Cannot reduce action - invalid action.type root", action);
      return;
    }

    // Check setState is valid
    if(!this.setState) {
      console.error("Cannot reduce action - invalid setState() method", action);
      return;
    }
    
    for(var i in this.reducers) {
      const reducer = this.reducers[i];
      if(!reducer.constantsParent) continue;
      if(reducer.constantsParent.root === actionTypeRoot) {
        const reducerName = reducer.constantsParent.name;
        this.setState((state) => ({
          [reducerName]: {
            ...state[reducerName],
            ...reducer.reduce(action, state[reducerName])
          }
        }));
        break;
      }
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
      passengers: PassengersReducer.getDefaultReducerState(),
      payments: defaultPaymentsState,
      routes: defaultRoutesState,
      users: defaultUsersState
    };
  }
}
export default Store;