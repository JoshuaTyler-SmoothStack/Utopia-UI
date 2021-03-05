import BaseReducer from "./BaseReducer";
import PassengersDispatcher from "../dispatchers/PassengersDispatcher";

class PassengersReducer extends BaseReducer {
  static initialize(constantsParent, dispatcherAPIPath) {
    PassengersDispatcher.initialize(constantsParent, dispatcherAPIPath);
    this.constantsParent = constantsParent;
    return this;
  }
}
export default PassengersReducer;