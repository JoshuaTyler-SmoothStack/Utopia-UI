import constants from "../resources/constants.json";
import Orchestration from "../Orchestration";

class BookingsDispatcher {
  static onFindAll(reduce) {
    reduce({type: constants.bookings.request});

    Orchestration.createRequest(
      constants.httpRequest.get,
      "bookings", 
      null,
      onError => {
        reduce({
          type: constants.bookings.error,
          payload: onError
        });
      }, 
      onSuccess => {
        reduce({
          type: constants.bookings.response,
          payload: onSuccess
        });
    });
  }
}
export default BookingsDispatcher;
