import constants from "../resources/constants.json"

const AuthenticationReducer = (action) => {
  const authentication = constants.authentication;
  switch(action.type) {

    case authentication.cancel:
      return {isActive_LoginUI: false};

    case authentication.error:
      return {
        errpr: action.payload || "[ERROR]: 404 - Not Found!",
        status: "ERROR"
      };

    case authentication.prompt:
      return {isActive_LoginUI: true};

    case authentication.login:
      return {status: "PENDING"};

    case authentication.logout:
      return defaultAuthenticationState;
  }
};
export default AuthenticationReducer;

export const defaultAuthenticationState = {
  error: "",
  isActive_LoginUI: false,
  status: "INACTIVE",
  userId: "UNKNOWN"
};