import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import RootReducer from "../reducers/RootReducer";

class AuthenticationDispatcher {

  static onCancel() {
   RootReducer.reduce({type: constants.authentication.cancel});
  }

  static onForgotPassword(email) {
    RootReducer.reduce({type: constants.authentication.forgotPasswordRequest});

    const httpRequestBody = {email: email};

    Orchestration.createRequestWithBody(
      constants.httpRequest.post,
      "/users/forgotpassword",
      httpRequestBody,
      onError => {
        RootReducer.reduce({type: constants.authentication.forgotPasswordError});
      }, httpResponseBody => {
        if(httpResponseBody.error) {
          RootReducer.reduce({type: constants.authentication.forgotPasswordError});
        } else {
          RootReducer.reduce({type: constants.authentication.forgotPasswordSuccess});
        }
      }
    )
  }

  static onCreateAccount(email) {
    RootReducer.reduce({type: constants.authentication.createAccountRequest});

    const httpRequestBody = {email: email};

    Orchestration.createRequestWithBody(
      constants.httpRequest.post,
      "/users/create",
      httpRequestBody,
      onError => {
        RootReducer.reduce({type: constants.authentication.createAccountError});
      }, httpResponseBody => {
        RootReducer.reduce({type: constants.authentication.createAccountSuccess});
      }
    );
  }

  static onLogin(email, password) {
   RootReducer.reduce({type: constants.authentication.loginRequest});

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
      RootReducer.reduce({
        type: constants.authentication.loginError,
        payload: errorMsg
      })

    }, httpResponseBody => {
      const user = httpResponseBody;
      console.log(user);

      if(user.error) {
        // invalid
        RootReducer.reduce({
          type: constants.authentication.loginError,
          payload: user.error
        });
      } else {
        // valid
        RootReducer.reduce({
          type: constants.authentication.loginSuccess,
          payload: user
        });
      }
    });
  }

  static onLogout() {
   RootReducer.reduce({type: constants.authentication.logout});
   // TODO clear Auth
  }

  static onPrompt() {
   RootReducer.reduce({type: constants.authentication.prompt});
  }
}
export default AuthenticationDispatcher;