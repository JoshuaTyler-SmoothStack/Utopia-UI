import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import RootReducer from "../reducers/RootReducer";

class AirplanesDispatcher {

  static onFindAll() {
    RootReducer.reduce({type: constants.airplanes.request});

    Orchestration.createRequest(
      constants.httpRequest.get,
      "airplanes",
      onError => {
        RootReducer.reduce({
          type: constants.airplanes.error,
          payload: onError
        });
      }, 
      httpResponseBody => {
        RootReducer.reduce({
          type: constants.airplanes.response,
          payload: httpResponseBody
        });
    });
  }
}
export default AirplanesDispatcher;