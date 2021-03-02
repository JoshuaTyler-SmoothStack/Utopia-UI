import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import Store from "../reducers/Store";

class AuthenticationDispatcher {

  static onCancel() {
   Store.reduce({type: constants.authentication.cancel});
  }

  static onForgotPassword(email) {
    Store.reduce({type: constants.authentication.forgotPasswordRequest});

    const httpRequestBody = {email: email};

    Orchestration.createRequestWithBody(
      constants.httpRequest.post,
      "/users/forgotpassword",
      httpRequestBody,
      onError => {
        Store.reduce({type: constants.authentication.forgotPasswordError});
      }, httpResponseBody => {
        if(httpResponseBody.error) {
          Store.reduce({type: constants.authentication.forgotPasswordError});
        } else {
          Store.reduce({type: constants.authentication.forgotPasswordSuccess});
        }
      }
    )
  }

  static onCreateAccount(email) {
    Store.reduce({type: constants.authentication.createAccountRequest});

    const httpRequestBody = {email: email};

    Orchestration.createRequestWithBody(
      constants.httpRequest.post,
      "/users/create",
      httpRequestBody,
      onError => {
        Store.reduce({type: constants.authentication.createAccountError});
      }, httpResponseBody => {
        Store.reduce({type: constants.authentication.createAccountSuccess});
      }
    );
  }

  static onLogin(email, password) {
   Store.reduce({type: constants.authentication.loginRequest});

    const httpRequestBody = {
      email: email,
      password: password,
    };

    Orchestration.createRequestWithBody(
      constants.httpRequest.get, 
      "/users", 
      httpRequestBody,
      onError => {
      const errorMsg = onError;
      Store.reduce({
        type: constants.authentication.loginError,
        payload: errorMsg
      })

    }, httpResponseBody => {
      const user = httpResponseBody;

      if(user.error) {
        // invalid
        Store.reduce({
          type: constants.authentication.loginError,
          payload: user.error
        });
      } else {
        // valid
        Store.reduce({
          type: constants.authentication.loginSuccess,
          payload: user
        });
      }
    });
  }

  static onLogout() {
   Store.reduce({type: constants.authentication.logout});
   // TODO clear Auth
  }

  static onPromptLogin() {
   Store.reduce({type: constants.authentication.prompt});
  }
}
export default AuthenticationDispatcher;