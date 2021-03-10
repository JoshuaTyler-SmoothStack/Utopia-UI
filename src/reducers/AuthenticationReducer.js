import BaseReducer from "./BaseReducer";

class AuthenticationReducer extends BaseReducer {

  static getDefaultReducerState() {
    return defaultAuthenticationState;
  }

  static reduce(action, state) {
    switch (action.type) {

      case this.constantsParent.cancel:
        return { isActive_LoginUI: false };

      case this.constantsParent.error:
        return {
          error: action.payload || "[ERROR]: 404 - Not Found!",
          status: "ERROR",
          userId: "UNKNOWN"
        };

      case this.constantsParent.errorLogin:
        return {
          error: "Invalid email or password.",
          status: "ERROR",
          userId: "UNKNOWN"
        };

      // Prompts
      // =====================================
      case this.constantsParent.promptLogin:
        return {
          error: "",
          isActive_LoginUI: true,
        };

      // Requests
      // =====================================
      case this.constantsParent.requestCreateAccount:
        return { status: "PENDING" };

      case this.constantsParent.forgotPasswordRequest:
        return { status: "PENDING" };

      case this.constantsParent.requestLogin:
        return {
          status: "PENDING",
          userLogin: action.payload
        };


      // Responses
      // =====================================
      case this.constantsParent.responseCreateAccount:
        return {
          status: "SUCCESS",
          userId: action.payload.id
        };

      case this.constantsParent.responseLogin:
        return {
          isActive_LoginUI: false,
          status: "SUCCESS",
          userToken: action.payload
        };

      // Reset
      // =====================================
      case this.constantsParent.reset:
        return defaultAuthenticationState;

      default:
        console.error("Invalid action.type!", action);
    }
  }
}
export default AuthenticationReducer;

export const defaultAuthenticationState = {
  error: "",
  isActive_LoginUI: false,
  status: "INACTIVE",
  userLogin: '',
  userToken: ""
};