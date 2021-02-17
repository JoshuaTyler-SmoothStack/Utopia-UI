import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";

class UsersDispatcher {
  static onFindAll(reduce) {
    reduce({type: constants.users.request});

    Orchestration.createRequest(
      constants.httpRequest.get,
      "users", 
      null,
      onError => {
        reduce({
          type: constants.users.error,
          payload: onError
        });
      }, 
      onSuccess => {
        reduce({
          type: constants.users.response,
          payload: onSuccess
        });
    });
  }
}
export default UsersDispatcher;