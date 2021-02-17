import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";

class RoutesDispatcher {
  static onFindAll(reduce) {
    reduce({type: constants.routes.request});

    Orchestration.createRequest(
      constants.httpRequest.get,
      "routes", 
      null,
      onError => {
        reduce({
          type: constants.routes.error,
          payload: onError
        });
      }, 
      onSuccess => {
        reduce({
          type: constants.routes.response,
          payload: onSuccess
        });
    });
  }
}
export default RoutesDispatcher;