import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import Store from "../reducers/Store";

class FlightsDispatcher {
  static onFindAll() {
   Store.reduce({type: constants.flights.request});

    Orchestration.createRequest(
      constants.httpRequest.get,
      "flights",
      onError => {
       Store.reduce({
          type: constants.flights.error,
          payload: onError
        });
      }, 
      httpResponseBody => {
       Store.reduce({
          type: constants.flights.response,
          payload: httpResponseBody
        });
    });
  }
}
export default FlightsDispatcher;