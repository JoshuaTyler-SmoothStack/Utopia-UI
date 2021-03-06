import BaseReducer from "./BaseReducer";
import UsersDispatcher from "../dispatchers/UsersDispatcher";

class UsersReducer extends BaseReducer {
  static initialize(constantsParent, dispatcherAPIPath) {
    UsersDispatcher.initialize(constantsParent, dispatcherAPIPath);
    this.constantsParent = constantsParent;
    return this;
  }
}
export default UsersReducer;