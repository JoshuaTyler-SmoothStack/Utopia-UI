import BaseReducer from "./BaseReducer";
import AuthenticationDispatcher from "../dispatchers/AuthenticationDispatcher";

class AuthenticationReducer extends BaseReducer {
  static initialize(constantsParent, dispatcherAPIPath) {
    AuthenticationDispatcher.initialize(constantsParent, dispatcherAPIPath);
    this.constantsParent = constantsParent;
    return this;
  }

  static getDefaultReducerState() {
    return defaultAuthenticationState;
  }

  static reduce(action, state) {
    switch(action.type) {

      case this.constantsParent.cancel:
        return {isActive_LoginUI: false};
  
      case this.constantsParent.error:
        return {
          error: action.payload || "[ERROR]: 404 - Not Found!",
          status: "ERROR",
          userId: "UNKNOWN"
        };
  
      // Prompts
      // =====================================
      case this.constantsParent.promptLogin:
        return {
          error: "",
          isActive_LoginUI: true,
          status: "INACTIVE",
        };
  
      // Requests
      // =====================================
      case this.constantsParent.requestCreateAccount:
        return {status: "PENDING"};

      case this.constantsParent.forgotPasswordRequest:
        return {status: "PENDING"};

      case this.constantsParent.requestLogin:
        return {status: "PENDING"};
  
      // Responses
      // =====================================
      case this.constantsParent.responseCreateAccount:
        return {
          status: "ACTIVE",
          userId: action.payload.id
        };

      case this.constantsParent.responseLogin:
        return {
          status: "ACTIVE",
          userId: action.payload 
          ? action.payload.id
          : "UNKNOWN"
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
  userId: "",
  userToken: ""
};