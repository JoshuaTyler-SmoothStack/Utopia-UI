import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";

class FlightsDispatcher {
  static onFindAll(reduce) {
    reduce({type: constants.flights.request});

    Orchestration.createRequest(
      constants.httpRequest.get,
      "flights", 
      null,
      onError => {
        reduce({
          type: constants.flights.error,
          payload: onError
        });
      }, 
      onSuccess => {
        reduce({
          type: constants.flights.response,
          payload: onSuccess
        });
    });
  }
}
export default FlightsDispatcher;