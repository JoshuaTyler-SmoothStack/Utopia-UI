import constants from "../resources/constants.json"
// import Orchestration from "../Orchestration";
import RootReducer from "../reducers/RootReducer";

class AirportsDebugDispatcher {

  static onDeleteFake() {
    RootReducer.reduce({ type: constants.airports.deleteRequest });
  }

  static onFakeAPICall() {
    RootReducer.reduce({ type: constants.airports.request });
    setTimeout(() => {
      RootReducer.reduce({ type: constants.airports.response });
    }, 1500);
  }
}
export default AirportsDebugDispatcher;