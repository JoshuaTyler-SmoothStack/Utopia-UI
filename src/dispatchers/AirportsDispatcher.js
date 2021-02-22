import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import RootReducer from "../reducers/RootReducer";

class AirportsDispatcher {

  static onFindAll() {
   RootReducer.reduce({type: constants.airports.request});

   Orchestration.createRequest(
    constants.httpRequest.get,
    "airports", 
    onError => {
     RootReducer.reduce({
        type: constants.airports.error,
        payload: onError
      });
    }, 
    httpResponseBody => {
     RootReducer.reduce({
        type: constants.airports.response,
        payload: httpResponseBody
      });
    });
  }

    static onPostAirplane(payload) {
     RootReducer.reduce({
        type: constants.orchestration.airports,
        payload: payload
      });
  
      Orchestration.createRequestWithBody(
        constants.httpRequest.post, 
        "airports", 
        payload,
        onError => {
         RootReducer.reduce({
            type: constants.orchestration.airports,
            payload: {
              list: [],
              status: "ERROR"
            }
          });
        }, 
        httpResponseBody => {
         RootReducer.reduce({
            type: constants.orchestration.airports,
            payload: {
              list: httpResponseBody,
              status: "REGISTERED"
            }
          });
      });
  }
}
export default AirportsDispatcher;