import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import RootReducer from "../reducers/RootReducer";

class AirplanesDispatcher {

  static onFindAll() {
    RootReducer.reduce({type: constants.airplanes.request});

    Orchestration.createRequest(
      constants.httpRequest.get,
      "airplanes", 
      null,
      onError => {
        RootReducer.reduce({
          type: constants.airplanes.error,
          payload: onError
        });
      }, 
      onSuccess => {
        RootReducer.reduce({
          type: constants.airplanes.response,
          payload: onSuccess
        });
    });
  }
}
export default AirplanesDispatcher;