import constants from "../resources/constants.json"

const AuthenticationReducer = (action) => {
  const authentication = constants.authentication;
  switch(action.type) {

    case authentication.cancel:
      return {isActive_LoginUI: false};

    case authentication.createAccountRequest:
      return {status: "PENDING"};

    case authentication.createAccountError:
      return {
        error: action.payload,
        status: "ERROR",
        userId: "UNKNOWN"
      };

    case authentication.createAccountSuccess:
      console.log("UserMS - Login payload: ", action.payload);
      return {
        status: "ACTIVE",
        userId: action.payload.id
      };

    case authentication.error:
      return {
        errpr: action.payload || "[ERROR]: 404 - Not Found!",
        status: "ERROR"
      };

    case authentication.forgotPasswordRequest:
      return {status: "PENDING"};

    case authentication.forgotPasswordError:
      return {
        status: "ERROR",
        error: "Did not work ERROR"
      };

    case authentication.forgotPasswordSuccess:
      return {status: "SUCCESS"};

    case authentication.prompt:
      return {
        error: "",
        isActive_LoginUI: true,
        status: "INACTIVE",
      };

    case authentication.loginRequest:
      return {status: "PENDING"};

    case authentication.loginError:
      return {
        error: action.payload,
        status: "ERROR",
        userId: "UNKNOWN"
      };

    case authentication.loginSuccess:
      console.log("UserMS - Login payload: ", action.payload);
      return {
        status: "ACTIVE",
        userId: action.payload 
        ? action.payload.id
        : "UNKNOWN"
      };

    case authentication.logout:
      return defaultAuthenticationState;

    default:
      console.error("Invalid action.type!", action);
  }
};
export default AuthenticationReducer;

export const defaultAuthenticationState = {
  error: "",
  isActive_LoginUI: false,
  forgotPasswordStatus: "",
  status: "INACTIVE",
  userId: "UNKNOWN"
};