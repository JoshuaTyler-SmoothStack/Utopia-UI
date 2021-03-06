import BaseReducer from "./BaseReducer";
import AirplanesDispatcher from "../dispatchers/AirplanesDispatcher";

class AirplanesReducer extends BaseReducer {
  static initialize(constantsParent, dispatcherAPIPath) {
    AirplanesDispatcher.initialize(constantsParent, dispatcherAPIPath);
    this.constantsParent = constantsParent;
    return this;
  }
}
export default AirplanesReducer;