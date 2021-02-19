import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import RootReducer from "../reducers/RootReducer";

class RoutesDispatcher {
  static onFindAll() {
   RootReducer.reduce({type: constants.routes.request});

    Orchestration.createRequest(
      constants.httpRequest.get,
      "routes", 
      null,
      onError => {
       RootReducer.reduce({
          type: constants.routes.error,
          payload: onError
        });
      }, 
      onSuccess => {
       RootReducer.reduce({
          type: constants.routes.response,
          payload: onSuccess
        });
    });
  }
}
export default RoutesDispatcher;