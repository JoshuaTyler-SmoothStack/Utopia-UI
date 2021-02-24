import constants from "../resources/constants.json"
// import Orchestration from "../Orchestration";
import Store from "../reducers/Store";

class AirplanesDebugDispatcher {

  static onDeleteFake() {
    Store.reduce({ type: constants.airplanes.deleteRequest });
  }

  static onFakeAPICall() {
    Store.reduce({ type: constants.airplanes.request });
    setTimeout(() => {
      Store.reduce({ type: constants.airplanes.response });
    }, 1500);
  }
}
export default AirplanesDebugDispatcher;