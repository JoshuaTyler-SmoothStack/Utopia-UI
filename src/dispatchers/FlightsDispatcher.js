import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import RootReducer from "../reducers/RootReducer";

class FlightsDispatcher {
  static onFindAll() {
   RootReducer.reduce({type: constants.flights.request});

    Orchestration.createRequest(
      constants.httpRequest.get,
      "flights", 
      null,
      onError => {
       RootReducer.reduce({
          type: constants.flights.error,
          payload: onError
        });
      }, 
      onSuccess => {
       RootReducer.reduce({
          type: constants.flights.response,
          payload: onSuccess
        });
    });
  }
}
export default FlightsDispatcher;