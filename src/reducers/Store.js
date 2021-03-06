// Libraries
import constants from "../resources/constants.json"

// Reducers
import AirplanesReducer from "./AirplanesReducer";
import AirportsReducer from "./AirportsReducer";
import AuthenticationReducer from "./AuthenticationReducer";
import BookingsReducer from "./BookingsReducer";
import FlightsReducer from "./FlightsReducer";
import OrchestrationReducer from "./OrchestrationReducer";
import PassengersReducer from "./PassengersReducer";
import PaymentsReducer from "./PaymentsReducer";
import RoutesReducer from "./RoutesReducer";
import UsersReducer from "./UsersReducer";

class Store {
  static setState = null;
  static getState = null;
  static reducers = [];

  static initialize(getState, setState) {
    Store.getState = getState;
    Store.setState = setState;
    Store.reducers = [
      AirplanesReducer.initialize(
        constants.airplanes,
        constants.airplanes.apiPath
      ),
      AirportsReducer.initialize(
        constants.airports,
        constants.airports.apiPath
      ),
      AuthenticationReducer.initialize(
        constants.authentication,
        constants.authentication.apiPath
      ),
      BookingsReducer.initialize(
        constants.bookings,
        constants.bookings.apiPath
      ),
      FlightsReducer.initialize(
        constants.flights,
        constants.flights.apiPath
      ),
      OrchestrationReducer.initialize(
        constants.orchestration,
        constants.orchestration.apiPath
      ),
      PassengersReducer.initialize(
        constants.passengers,
        constants.passengers.apiPath
      ),
      PaymentsReducer.initialize(
        constants.payments,
        constants.payments.apiPath
      ),
      RoutesReducer.initialize(
        constants.routes,
        constants.routes.apiPath
      ),
      UsersReducer.initialize(
        constants.users,
        constants.users.apiPath
      )
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
      airplanes: AirplanesReducer.getDefaultReducerState(),
      airports: AirportsReducer.getDefaultReducerState(),
      authentication: AuthenticationReducer.getDefaultReducerState(),
      bookings: BookingsReducer.getDefaultReducerState(),
      flights: FlightsReducer.getDefaultReducerState(),
      orchestration: OrchestrationReducer.getDefaultReducerState(),
      passengers: PassengersReducer.getDefaultReducerState(),
      payments: PaymentsReducer.getDefaultReducerState(),
      routes: RoutesReducer.getDefaultReducerState(),
      users: UsersReducer.getDefaultReducerState()
    };
  }
}
export default Store;