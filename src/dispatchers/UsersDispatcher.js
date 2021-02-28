import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import Store from "../reducers/Store";

class UsersDispatcher {
  static onFindAll() {
   Store.reduce({type: constants.users.request});

    Orchestration.createRequest(
      constants.httpRequest.get,
      "/users",
      onError => {
       Store.reduce({
          type: constants.users.error,
          payload: onError
        });
      }, 
      httpResponseBody => {
       Store.reduce({
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

    Store.reduce({ type: constants.authentication.createAccountRequest });
    
    Orchestration.createRequestWithBody(
      constants.httpRequest.post,
      "/users",
      newUser,
      onError => {
        Store.reduce({
          type: constants.authentication.createAccountError,
          payload: onError
        });
      },
      httpResponseBody => {
        Store.reduce({
          type: constants.authentication.createAccountSuccess,
          payload: httpResponseBody
        });
      });
  }
}
export default UsersDispatcher;