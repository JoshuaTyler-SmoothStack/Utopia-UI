import BaseReducer from "./BaseReducer";
import RoutesDispatcher from "../dispatchers/RoutesDispatcher";

class RoutesReducer extends BaseReducer {
  static initialize(constantsParent, dispatcherAPIPath) {
    RoutesDispatcher.initialize(constantsParent, dispatcherAPIPath);
    this.constantsParent = constantsParent;
    return this;
  }
}
export default RoutesReducer;