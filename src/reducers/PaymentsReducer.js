import BaseReducer from "./BaseReducer";
import PaymentsDispatcher from "../dispatchers/PaymentsDispatcher";

class PaymentsReducer extends BaseReducer {
  static initialize(constantsParent, dispatcherAPIPath) {
    PaymentsDispatcher.initialize(constantsParent, dispatcherAPIPath);
    this.constantsParent = constantsParent;
    return this;
  }
}
export default PaymentsReducer;