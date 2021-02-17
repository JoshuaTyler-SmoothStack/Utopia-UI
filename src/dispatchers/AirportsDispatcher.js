import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";

class AirportsDispatcher {

  static onFindAll(reduce) {
    reduce({type: constants.airports.request});

    Orchestration.createRequest(
      constants.httpRequest.get,
      "airports", 
      null,
      onError => {
        reduce({
          type: constants.airports.error,
          payload: onError
        });
      }, 
      onSuccess => {
        reduce({
          type: constants.airports.response,
          payload: onSuccess
        });
    });
  }

    static onPostAirplane(reduce, payload) {
      reduce({
        type: constants.orchestration.airports,
        payload: payload
      });
  
      Orchestration.createRequest(
        constants.httpRequest.post, 
        "airports", 
        payload,
        onError => {
          reduce({
            type: constants.orchestration.airports,
            payload: {
              list: [],
              status: "ERROR"
            }
          });
        }, 
        onSuccess => {
          reduce({
            type: constants.orchestration.airports,
            payload: {
              list: onSuccess,
              status: "REGISTERED"
            }
          });
      });
  }
}
export default AirportsDispatcher;