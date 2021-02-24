import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import Store from "../reducers/Store";

class AirportsDispatcher {

  static onFindAll() {
   Store.reduce({type: constants.airports.request});

   Orchestration.createRequest(
    constants.httpRequest.get,
    "/airports", 
    httpError => {
     Store.reduce({
        type: constants.airports.error,
        payload: httpError
      });
    }, 
    httpResponseBody => {
     Store.reduce({
        type: constants.airports.response,
        payload: httpResponseBody
      });
    });
  }

  static onPostAirplane(payload) {
    Store.reduce({
      type: constants.orchestration.airports,
      payload: payload
    });

    Orchestration.createRequestWithBody(
      constants.httpRequest.post, 
      "/airports", 
      payload,
      httpError => {
        Store.reduce({
          type: constants.orchestration.airports,
          payload: {
            list: [],
            status: "ERROR"
          }
        });
      }, 
      httpResponseBody => {
        Store.reduce({
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