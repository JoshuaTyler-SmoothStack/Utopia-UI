import BaseReducer from "./BaseReducer";
import BookingsDispatcher from "../dispatchers/BookingsDispatcher";

class BookingsReducer extends BaseReducer {
  static initialize(constantsParent, dispatcherAPIPath) {
    BookingsDispatcher.initialize(constantsParent, dispatcherAPIPath);
    this.constantsParent = constantsParent;
    return this;
  }
}
export default BookingsReducer;