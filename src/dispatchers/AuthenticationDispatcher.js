import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";

class AuthenticationDispatcher {

  static onCancel(reduce) {
    reduce({type: constants.authentication.cancel});
  }

  static onLogin(reduce, httpRequestBody) {
    reduce({type: constants.authentication.pending});

    // Orchestration.createRequest(
    //   constants.httpsRequest.post, 
    //   "users/login", 
    //   httpRequestBody,
    // onError => {
    //   // no connection
    //   const errorMsg = onError;
    //   reduce({
    //     type: constants.authentication.error,
    //     payload: errorMsg
    //   })

    // }, onSuccess => {
    //   const user = onSuccess;

    //   // check status code
    //   if(404) {
    //     const errorMsg = onSuccess;
    //     reduce({
    //       type: constants.authentication.error,
    //       payload: errorMsg
    //     })
    //   }

    //   if(validUser(user)){ 
    //     reduce({
    //       type: constants.authentication.onSuccess,
    //       payload: user
    //     })
    //   }
    // });
  }

  static onLogout(reduce) {
    reduce({type: constants.authentication.logout});

    // Clear Authentication
    // onError => {
    // 
    // }, onSuccess => {
    // 
    // });
  }

  static onPrompt(reduce) {
    reduce({type: constants.authentication.prompt});
  }
}
export default AuthenticationDispatcher;