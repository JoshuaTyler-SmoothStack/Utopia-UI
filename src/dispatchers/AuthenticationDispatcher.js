import BaseDispatcher from "./BaseDispatcher";
import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import Store from "../reducers/Store";

class AuthenticationDispatcher extends BaseDispatcher {

  static apiPath = constants.authentication.apiPath;
  static constantsParent = constants.authentication;

  static onCancel() {
    Store.reduce({ type: constants.authentication.cancel });
  }

  static onForgotPassword(email) {
    Store.reduce({ type: constants.authentication.forgotPasswordRequest });

    const httpRequestBody = { email: email };

    Orchestration.createRequestWithBody(
      constants.httpRequest.post,
      "/users/forgotpassword",
      httpRequestBody,
      onError => {
        Store.reduce({ type: constants.authentication.forgotPasswordError });
      }, httpResponseBody => {
        if (httpResponseBody.error) {
          Store.reduce({ type: constants.authentication.forgotPasswordError });
        } else {
          Store.reduce({ type: constants.authentication.forgotPasswordSuccess });
        }
      }
    )
  }

  static onCreateAccount(email) {
    Store.reduce({ type: constants.authentication.createAccountRequest });

    const httpRequestBody = { email: email };

    Orchestration.createRequestWithBody(
      constants.httpRequest.post,
      "/users/create",
      httpRequestBody,
      onError => {
        Store.reduce({ type: constants.authentication.createAccountError });
      }, httpResponseBody => {
        Store.reduce({ type: constants.authentication.createAccountSuccess });
      }
    );
  }

  static onLogin(email, password) {

    const { authentication } = Store.getState();

    Store.reduce({
      type: constants.authentication.requestLogin,
      payload: window.btoa(email + ":" + password)
    });
    setTimeout(() => {
      console.log(authentication.userLogin);
      Orchestration.createRequest(
        constants.httpRequest.get,
        this.apiPath + "/login",
        onError => {
          const errorMsg = onError;
          Store.reduce({
            type: constants.authentication.error,
            payload: errorMsg
          })

        }, httpResponseBody => {
          const user = httpResponseBody;
          console.log(httpResponseBody)

          if (user.error) {
            // invalid
            Store.reduce({
              type: constants.authentication.error,
              payload: user.error

            });
          } else {
            // valid
            Store.reduce({
              type: constants.authentication.responseLogin,
              payload: user.token
            });
          }
        });

    }, 250);


  }

  static onLogout() {
    Store.reduce({ type: constants.authentication.logout });
    // TODO clear Auth
  }

  static onPromptLogin() {
    Store.reduce({ type: constants.authentication.promptLogin });
  }
}
export default AuthenticationDispatcher;