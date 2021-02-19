import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import RootReducer from "../reducers/RootReducer";

class AirportsDispatcher {

  static onFindAll() {
   RootReducer.reduce({type: constants.airports.request});

   setTimeout(() => {
    Orchestration.createRequest(
      constants.httpRequest.get,
      "airports", 
      null,
      onError => {
       RootReducer.reduce({
          type: constants.airports.error,
          payload: onError
        });
      }, 
      onSuccess => {
       RootReducer.reduce({
          type: constants.airports.error
        });
    });
   }, 500);
  }

    static onPostAirplane(payload) {
     RootReducer.reduce({
        type: constants.orchestration.airports,
        payload: payload
      });
  
      Orchestration.createRequest(
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
        onSuccess => {
         RootReducer.reduce({
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