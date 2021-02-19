import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import RootReducer from "../reducers/RootReducer";

class AuthenticationDispatcher {

  static onCancel() {
   RootReducer.reduce({type: constants.authentication.cancel});
  }

  static onForgotPassword(email) {
    // TODO
    // RootReducer.reduce({
    //   type: constants.authentication.forgotPassword,
    //   payload: email
    // });
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
   RootReducer.reduce({type: constants.authentication.prompt});
  }
}
export default AuthenticationDispatcher;