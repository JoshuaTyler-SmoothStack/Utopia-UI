import constants from "../resources/constants.json"
// import Orchestration from "../Orchestration";

class AuthenticationDispatcher {

  static onCancel(reduce) {
    reduce({type: constants.authentication.cancel});
  }

  static onLogin(reduce, payload) {
    reduce({
      type: constants.authentication.login,
      payload: {status: "PENDING"},
    });

    // Orchestration.createRequest(
    //   constants.httpsRequest.post, 
    //   "users/login", 
    //   payload,
    // onError => {
    // 
    // }, onSuccess => {
    // 
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