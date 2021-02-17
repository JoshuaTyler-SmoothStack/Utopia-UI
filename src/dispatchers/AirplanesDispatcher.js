import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";

class AirplanesDispatcher {

  static onFindAll(reduce) {
    reduce({type: constants.airplanes.request});

    Orchestration.createRequest(
      constants.httpRequest.get,
      "airplanes", 
      null,
      onError => {
        reduce({
          type: constants.airplanes.error,
          payload: onError
        });
      }, 
      onSuccess => {
        reduce({
          type: constants.airplanes.response,
          payload: onSuccess
        });
    });
  }
}
export default AirplanesDispatcher;