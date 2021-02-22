import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import RootReducer from "../reducers/RootReducer";

class UsersDispatcher {
  static onFindAll() {
   RootReducer.reduce({type: constants.users.request});

    Orchestration.createRequest(
      constants.httpRequest.get,
      "/users",
      onError => {
       RootReducer.reduce({
          type: constants.users.error,
          payload: onError
        });
      }, 
      httpResponseBody => {
       RootReducer.reduce({
          type: constants.users.response,
          payload: httpResponseBody
        });
    });
  }

  static createAccount() {
    const newUser = {
      firstName: "what",
      lastName: "how",
      email: "yoyo@gmail.com",
      password: "wyeasfhjl",
      phone: "59987453",
    };

    RootReducer.reduce({ type: constants.authentication.createAccountRequest });
    
    Orchestration.createRequestWithBody(
      constants.httpRequest.post,
      "/users",
      newUser,
      onError => {
        RootReducer.reduce({
          type: constants.authentication.createAccountError,
          payload: onError
        });
      },
      httpResponseBody => {
        RootReducer.reduce({
          type: constants.authentication.createAccountSuccess,
          payload: httpResponseBody
        });
      });
  }
}
export default UsersDispatcher;