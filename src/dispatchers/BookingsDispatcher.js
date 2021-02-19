import constants from "../resources/constants.json";
import Orchestration from "../Orchestration";
import RootReducer from "../reducers/RootReducer";

class BookingsDispatcher {
  static onFindAll() {
   RootReducer.reduce({type: constants.bookings.request});

    Orchestration.createRequest(
      constants.httpRequest.get,
      "bookings", 
      null,
      onError => {
       RootReducer.reduce({
          type: constants.bookings.error,
          payload: onError
        });
      }, 
      onSuccess => {
       RootReducer.reduce({
          type: constants.bookings.response,
          payload: onSuccess
        });
    });
  }
}
export default BookingsDispatcher;
