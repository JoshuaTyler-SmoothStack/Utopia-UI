import constants from "../resources/constants.json";
import Orchestration from "../Orchestration";
import RootReducer from "../reducers/RootReducer";

class BookingsDispatcher {
  static onCancel() {
    RootReducer.reduce({type: constants.bookings.cancel});
  }

  static onDelete(bookingId) {
    RootReducer.reduce({ type: constants.bookings.request });
    RootReducer.reduce({ type: constants.bookings.deleteRequest });
    // Orchestration.createRequest(
    //   constants.httpRequest.delete,
    //   "/bookings/" + bookingId,
    //   (httpError) => {
    //     console.log(httpError);
    //     RootReducer.reduce({
    //       type: constants.bookings.error,
    //       payload: JSON.stringify(httpError),
    //     });
    //     BookingsDispatcher.onCancel();
    //   },
    //   (httpResponseBody) => {
    //     console.log(httpResponseBody);
    //     if(httpResponseBody.error) {
    //       RootReducer.reduce({
    //         type: constants.bookings.error,
    //         payload: httpResponseBody.error,
    //       });
    //       BookingsDispatcher.onCancel();
    //     } else {
    //       RootReducer.reduce({type: constants.bookings.reset});
    //       BookingsDispatcher.onFindAll();
    //     }
    //   }
    // );
  }

  static onEdit(selectedBooking, editParams) {
    RootReducer.reduce({ type: constants.bookings.request });
    Orchestration.createRequestWithBody(
      constants.httpRequest.put,
      "/bookings",
      {...selectedBooking, ...editParams},
      (httpError) => {
        RootReducer.reduce({
          type: constants.bookings.error,
          payload: JSON.stringify(httpError),
        });
        BookingsDispatcher.onCancel();
      },
      (httpResponseBody) => {
        console.log(httpResponseBody);
        if(httpResponseBody.error) {
          RootReducer.reduce({
            type: constants.bookings.error,
            payload: httpResponseBody.error,
          });
          BookingsDispatcher.onCancel();
        } else {
          RootReducer.reduce({type: constants.bookings.reset});
          BookingsDispatcher.onFindAll();
        }
      }
    );
  }

  static onError(message) {
    if(message) {
      RootReducer.reduce({
        type: constants.bookings.error,
        payload: message,
      });
    } else {
      RootReducer.reduce({ type: constants.bookings.request });
      Orchestration.createRequest(
        constants.httpRequest.post,
        "/bookings",
        (httpError) => {
          RootReducer.reduce({
            type: constants.bookings.error,
            payload: httpError,
          });
        },
        (httpResponseBody) => {
          if(httpResponseBody.error) {
            RootReducer.reduce({
              type: constants.bookings.error,
              payload: httpResponseBody.error,
            });
          } else {
            RootReducer.reduce({
              type: constants.bookings.response,
              payload: httpResponseBody,
            });
          }
        }
      );
    }
  }

  static onFindAll() {
    RootReducer.reduce({ type: constants.bookings.request });

    Orchestration.createRequest(
      constants.httpRequest.get,
      "/bookings/referencedata",
      (httpError) => {
        RootReducer.reduce({
          type: constants.bookings.error,
          payload: httpError,
        });
      },
      (httpResponseBody) => {
        if(httpResponseBody.error) {
          RootReducer.reduce({
            type: constants.bookings.error,
            payload: httpResponseBody.error,
          });
        } else {
          RootReducer.reduce({
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
      RootReducer.reduce({
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
      RootReducer.reduce({
        type: constants.bookings.searchError,
        payload: "Invalid search term!",
      });
      return;
    }
    
    RootReducer.reduce({ type: constants.bookings.request });
    Orchestration.createRequest(
      constants.httpRequest.get,
      "/bookings/" + searchPath,
      (httpError) => {
        RootReducer.reduce({
          type: constants.bookings.error,
          payload: "Connection failed.",
        });
      },
      (httpResponseBody) => {
        if(httpResponseBody.error) {
          RootReducer.reduce({
            type: constants.bookings.error,
            payload: httpResponseBody.error,
          });
        } else {
          RootReducer.reduce({
            type: constants.bookings.response,
            payload: httpResponseBody,
          });
        }
      }
    );
  }

  static onPromptDelete(bookingId){
    const { bookings } = RootReducer.getState();
    if(bookings) {
      const selectedBooking = bookings.searchResults
      .filter((i) => i.id === bookingId);

      if(selectedBooking) {
        if(selectedBooking.length === 1) {
          if(selectedBooking[0].id) {
            RootReducer.reduce({
              type: constants.bookings.deletePrompt,
              payload: selectedBooking[0]
            });
            return;
          }
        }
      }
    } 
    RootReducer.reduce({
      type: constants.bookings.error,
      payload: "Unable to select Booking ID: " + bookingId
    });
  }

  static onPromptEdit(bookingId){
    const { bookings } = RootReducer.getState();
    if(bookings) {
      const selectedBooking = bookings.searchResults
      .filter((i) => i.id === bookingId);

      if(selectedBooking) {
        if(selectedBooking.length === 1) {
          if(selectedBooking[0].id) {
            RootReducer.reduce({
              type: constants.bookings.editPrompt,
              payload: selectedBooking[0]
            });
            return;
          }
        }
      }
    } 
    RootReducer.reduce({
      type: constants.bookings.error,
      payload: "Unable to select Booking ID: " + bookingId
    });
  }

  static onResultsPage(resultsPage) {
    RootReducer.reduce({
      type: constants.bookings.searchResultsPage,
      payload: resultsPage,
    });
  }

  static onResultsPerPage(resultsPerPage) {
    RootReducer.reduce({
      type: constants.bookings.searchResultsPerPage,
      payload: resultsPerPage,
    });
  }
}
export default BookingsDispatcher;
