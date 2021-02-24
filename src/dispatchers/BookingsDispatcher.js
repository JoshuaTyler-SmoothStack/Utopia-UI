import constants from "../resources/constants.json";
import Orchestration from "../Orchestration";
import Store from "../reducers/Store";

class BookingsDispatcher {
  static onCancel() {
    Store.reduce({type: constants.bookings.cancel});
  }

  static onDelete(bookingId) {
    Store.reduce({ type: constants.bookings.request });
    Store.reduce({ type: constants.bookings.deleteRequest });
    // Orchestration.createRequest(
    //   constants.httpRequest.delete,
    //   "/bookings/" + bookingId,
    //   (httpError) => {
    //     console.log(httpError);
    //     Store.reduce({
    //       type: constants.bookings.error,
    //       payload: JSON.stringify(httpError),
    //     });
    //     BookingsDispatcher.onCancel();
    //   },
    //   (httpResponseBody) => {
    //     console.log(httpResponseBody);
    //     if(httpResponseBody.error) {
    //       Store.reduce({
    //         type: constants.bookings.error,
    //         payload: httpResponseBody.error,
    //       });
    //       BookingsDispatcher.onCancel();
    //     } else {
    //       Store.reduce({type: constants.bookings.reset});
    //       BookingsDispatcher.onFindAll();
    //     }
    //   }
    // );
  }

  static onEdit(selectedBooking, editParams) {
    Store.reduce({ type: constants.bookings.request });
    Orchestration.createRequestWithBody(
      constants.httpRequest.put,
      "/bookings",
      {...selectedBooking, ...editParams},
      (httpError) => {
        Store.reduce({
          type: constants.bookings.error,
          payload: JSON.stringify(httpError),
        });
        BookingsDispatcher.onCancel();
      },
      (httpResponseBody) => {
        console.log(httpResponseBody);
        if(httpResponseBody.error) {
          Store.reduce({
            type: constants.bookings.error,
            payload: httpResponseBody.error,
          });
          BookingsDispatcher.onCancel();
        } else {
          Store.reduce({type: constants.bookings.reset});
          BookingsDispatcher.onFindAll();
        }
      }
    );
  }

  static onError(message) {
    if(message) {
      Store.reduce({
        type: constants.bookings.error,
        payload: message,
      });
    } else {
      Store.reduce({ type: constants.bookings.request });
      Orchestration.createRequest(
        constants.httpRequest.post,
        "/bookings",
        (httpError) => {
          Store.reduce({
            type: constants.bookings.error,
            payload: httpError,
          });
        },
        (httpResponseBody) => {
          if(httpResponseBody.error) {
            Store.reduce({
              type: constants.bookings.error,
              payload: httpResponseBody.error,
            });
          } else {
            Store.reduce({
              type: constants.bookings.response,
              payload: httpResponseBody,
            });
          }
        }
      );
    }
  }

  static onFindAll() {
    Store.reduce({ type: constants.bookings.request });

    Orchestration.createRequest(
      constants.httpRequest.get,
      "/bookings/referencedata",
      (httpError) => {
        console.log(httpError);
        Store.reduce({
          type: constants.bookings.error,
          payload: httpError,
        });
      },
      (httpResponseBody) => {
        if(httpResponseBody.error) {
          Store.reduce({
            type: constants.bookings.error,
            payload: httpResponseBody.error,
          });
        } else {
          Store.reduce({
            type: constants.bookings.response,
            payload: httpResponseBody,
          });
        }
      }
    );
  }

  static onFindBy(searchText) {
    
    if(!searchText || searchText.length < 4) {
      BookingsDispatcher.onFindAll();
      return;
    }
    
    const formattedText = searchText.toLowerCase();
    if(!formattedText.includes("id=") && !formattedText.includes("confirmation=")){
      Store.reduce({
        type: constants.bookings.searchError,
        payload: "Invalid search term!",
      });
      return;
    }

    let searchPath = formattedText.split("id=")[1];
    if(formattedText.includes("confirmation=")) {
      searchPath = "confirmation/" +
      formattedText.split("confirmation=")[1];
    } else if(isNaN(parseInt(searchPath))) {
      Store.reduce({
        type: constants.bookings.searchError,
        payload: "Invalid search term!",
      });
      return;
    }
    
    Store.reduce({ type: constants.bookings.request });
    Orchestration.createRequest(
      constants.httpRequest.get,
      "/bookings/" + searchPath,
      (httpError) => {
        Store.reduce({
          type: constants.bookings.error,
          payload: "Connection failed.",
        });
      },
      (httpResponseBody) => {
        if(httpResponseBody.error) {
          Store.reduce({
            type: constants.bookings.error,
            payload: httpResponseBody.error,
          });
        } else {
          Store.reduce({
            type: constants.bookings.response,
            payload: httpResponseBody,
          });
        }
      }
    );
  }

  static onPromptDelete(bookingId){
    const { bookings } = Store.getState();
    if(bookings) {
      const selectedBooking = bookings.searchResults
      .filter((i) => i.id === bookingId);

      if(selectedBooking) {
        if(selectedBooking.length === 1) {
          if(selectedBooking[0].id) {
            Store.reduce({
              type: constants.bookings.deletePrompt,
              payload: selectedBooking[0]
            });
            return;
          }
        }
      }
    } 
    Store.reduce({
      type: constants.bookings.error,
      payload: "Unable to select Booking ID: " + bookingId
    });
  }

  static onPromptEdit(bookingId){
    const { bookings } = Store.getState();
    if(bookings) {
      const selectedBooking = bookings.searchResults
      .filter((i) => i.id === bookingId);

      if(selectedBooking) {
        if(selectedBooking.length === 1) {
          if(selectedBooking[0].id) {
            Store.reduce({
              type: constants.bookings.editPrompt,
              payload: selectedBooking[0]
            });
            return;
          }
        }
      }
    } 
    Store.reduce({
      type: constants.bookings.error,
      payload: "Unable to select Booking ID: " + bookingId
    });
  }

  static onResultsPage(resultsPage) {
    Store.reduce({
      type: constants.bookings.searchResultsPage,
      payload: resultsPage,
    });
  }

  static onResultsPerPage(resultsPerPage) {
    Store.reduce({
      type: constants.bookings.searchResultsPerPage,
      payload: resultsPerPage,
    });
  }
}
export default BookingsDispatcher;
