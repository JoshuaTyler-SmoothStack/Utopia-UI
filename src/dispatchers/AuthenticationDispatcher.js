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
      httpError => {
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
      httpError => {
        Store.reduce({ type: constants.authentication.createAccountError });
      }, httpResponseBody => {
        Store.reduce({ type: constants.authentication.createAccountSuccess });
      }
    );
  }

  static onLogin(email, password) {

    const encodedLogin = "Basic " + window.btoa(email + ":" + password);
    const authorization = { "Authorization": encodedLogin };
    console.log(authorization);

    Store.reduce({
      type: constants.authentication.requestLogin,
      payload: encodedLogin
    });

    Orchestration.createRequestWithHeader(
      constants.httpRequest.get,
      this.apiPath + "/login",
      authorization,
      httpError => {
        console.log("ERROR -> ", httpError);
        Store.reduce({
          type: constants.authentication.error,
          payload: httpError
        });
      }, httpResponseBody => {
        console.log(httpResponseBody)
        if (httpResponseBody.error) {
          Store.reduce({
            type: constants.authentication.error,
            payload: httpResponseBody.error
          });
        } else {
          Store.reduce({
            type: constants.authentication.responseLogin,
            payload: httpResponseBody.token
          });
        }
      });
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