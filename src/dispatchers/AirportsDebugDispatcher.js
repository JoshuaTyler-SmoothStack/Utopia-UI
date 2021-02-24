import constants from "../resources/constants.json"
// import Orchestration from "../Orchestration";
import Store from "../reducers/Store";

class AirportsDebugDispatcher {

  static onDeleteFake() {
    Store.reduce({ type: constants.airports.deleteRequest });
  }

  static onFakeAPICall() {
    Store.reduce({ type: constants.airports.request });
    setTimeout(() => {
      Store.reduce({ type: constants.airports.response });
    }, 1500);
  }
}
export default AirportsDebugDispatcher;