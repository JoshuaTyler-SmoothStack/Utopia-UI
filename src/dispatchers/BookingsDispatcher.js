import constants from "../resources/constants.json";
import Orchestration from "../Orchestration";
import RootReducer from "../reducers/RootReducer";

class BookingsDispatcher {
  static onFindAll() {
   RootReducer.reduce({type: constants.bookings.request});

    Orchestration.createRequest(
      constants.httpRequest.get,
      "bookings",
      onError => {
       RootReducer.reduce({
          type: constants.bookings.error,
          payload: onError
        });
      }, 
      httpResponseBody => {
       RootReducer.reduce({
          type: constants.bookings.response,
          payload: httpResponseBody
        });
    });
  }
}
export default BookingsDispatcher;
