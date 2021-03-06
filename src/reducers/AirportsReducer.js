import BaseReducer from "./BaseReducer";
import AirportsDispatcher from "../dispatchers/AirportsDispatcher";

class AirportsReducer extends BaseReducer {
  static initialize(constantsParent, dispatcherAPIPath) {
    AirportsDispatcher.initialize(constantsParent, dispatcherAPIPath);
    this.constantsParent = constantsParent;
    return this;
  }
}
export default AirportsReducer;