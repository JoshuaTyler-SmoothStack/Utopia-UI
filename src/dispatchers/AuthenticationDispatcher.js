import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import RootReducer from "../reducers/RootReducer";

class AuthenticationDispatcher {

  static onCancel() {
   RootReducer.reduce({type: constants.authentication.cancel});
  }

  static onForgotPassword(email) {
    RootReducer.reduce({type: constants.authentication.forgotPasswordRequest});

    const httpBody = {
      email: email
    }

    Orchestration.createRequest(
      constants.httpRequest.post,
      "/users/forgotpassword",
      httpBody,
      onError => {
        RootReducer.reduce({type: constants.authentication.forgotPasswordError});
      }, httpResponse => {
        console.log(httpResponse);
        if(httpResponse.error) {
          RootReducer.reduce({type: constants.authentication.forgotPasswordError});
        } else {
          RootReducer.reduce({type: constants.authentication.forgotPasswordSuccess});
        }
      }
    )
  }

  static onCreateAccount(email) {
    RootReducer.reduce({type: constants.authentication.createAccountRequest});

    Orchestration.createRequest(
      constants.httpRequest.post,
      "/users/create",
      {email: email},
      onError => {
        RootReducer.reduce({type: constants.authentication.createAccountError});
      }, onSuccess => {
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

    Orchestration.createRequest(
      constants.httpRequest.get, 
      "users", 
      httpRequestBody,
      onError => {
      const errorMsg = onError;
      RootReducer.reduce({
        type: constants.authentication.loginError,
        payload: errorMsg
      })

    }, onSuccess => {
      const user = onSuccess;
      console.log(user);

      // check content is not error msg
      // if(404) {
      // const errorMsg = onSuccess;
      //  RootReducer.reduce({
      //     type: constants.authentication.error,
      //     payload: errorMsg
      //   })
      // }
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

    // Clear Authentication
    // onError => {
    // 
    // }, onSuccess => {
    // 
    // });
  }

  static onPrompt() {
    console.log("Called");
   RootReducer.reduce({type: constants.authentication.prompt});
  }
}
export default AuthenticationDispatcher;