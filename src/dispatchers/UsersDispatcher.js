import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import RootReducer from "../reducers/RootReducer";

class UsersDispatcher {
  static onFindAll() {
   RootReducer.reduce({type: constants.users.request});

    Orchestration.createRequest(
      constants.httpRequest.get,
      "users", 
      null,
      onError => {
       RootReducer.reduce({
          type: constants.users.error,
          payload: onError
        });
      }, 
      onSuccess => {
       RootReducer.reduce({
          type: constants.users.response,
          payload: onSuccess
        });
    });
  }
}
export default UsersDispatcher;