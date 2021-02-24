import constants from "../resources/constants.json"
// import Orchestration from "../Orchestration";
import RootReducer from "../reducers/RootReducer";

class AirplanesDebugDispatcher {

  static onDeleteFake() {
    RootReducer.reduce({ type: constants.airplanes.deleteRequest });
  }

  static onFakeAPICall() {
    RootReducer.reduce({ type: constants.airplanes.request });
    setTimeout(() => {
      RootReducer.reduce({ type: constants.airplanes.response });
    }, 1500);
  }
}
export default AirplanesDebugDispatcher;