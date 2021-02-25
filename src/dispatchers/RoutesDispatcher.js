import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import Store from "../reducers/Store";

class RoutesDispatcher {
  static onFindAll() {
   Store.reduce({type: constants.routes.request});

    Orchestration.createRequest(
      constants.httpRequest.get,
      "routes", 
      onError => {
       Store.reduce({
          type: constants.routes.error,
          payload: onError
        });
      }, 
      httpResponseBody => {
       Store.reduce({
          type: constants.routes.response,
          payload: httpResponseBody
        });
    });
  }
}
export default RoutesDispatcher;