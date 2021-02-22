import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import RootReducer from "../reducers/RootReducer";

class RoutesDispatcher {
  static onFindAll() {
   RootReducer.reduce({type: constants.routes.request});

    Orchestration.createRequest(
      constants.httpRequest.get,
      "routes", 
      onError => {
       RootReducer.reduce({
          type: constants.routes.error,
          payload: onError
        });
      }, 
      httpResponseBody => {
       RootReducer.reduce({
          type: constants.routes.response,
          payload: httpResponseBody
        });
    });
  }
}
export default RoutesDispatcher;