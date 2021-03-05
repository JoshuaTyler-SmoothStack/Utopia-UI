import constants from "../resources/constants.json";
import Orchestration from "../Orchestration";
import Store from "../reducers/Store";

class BookingsDispatcher {
  static onCancel() {
    Store.reduce({type: constants.bookings.cancel});
  }

  static onCreate(bookingValues) {
    Store.reduce({ type: constants.bookings.createRequest });

    const onCreateResponse = (result, resultStatus, resultType) => {
      const { bookings } = Store.getState();
      const { results, resultsStatus } = bookings.create;
      Store.reduce({ 
        type: constants.bookings.createResponse,
        payload: {
          results: {
            ...results,
            [resultType]: result
          },
          resultsStatus: {
            ...resultsStatus,
            [resultType]: resultStatus
          }
        }
      });
    };

    const onCreateError = (result, resultStatus) => {
      Store.reduce({ 
        type: constants.bookings.createError,
        payload: {result, resultStatus}
      });
    };

    const syncrhonizeBookingReferences = (booking) => {
      Store.reduce({ 
        type: constants.bookings.select,
        payload: booking
      });

      // Flight IDs
      if(booking.flightId) {
        const flightBooking = {
          bookingId: booking.id,
          flightId: booking.flightId
        };
  
        Orchestration.createRequestWithBody(
          constants.httpRequest.put,
          "/bookings/flights",
          flightBooking,
          (httpError) => {
            onCreateResponse("Service temporarily unavailable.", "ERROR", "flights");
          },
          (httpResponseBody) => {
            if(httpResponseBody.error) {
              onCreateResponse(httpResponseBody.error, "ERROR", "flights");
            } else {
              onCreateResponse("Flight ID updated to: " + httpResponseBody.flightId + ".", "SUCCESS", "flights");
            }
          }
        );
      } else {
        setTimeout(() => {
          onCreateResponse("N/A", "DISABLED", "flights");
        }, 500);
      }


      // Guests Update
      if(booking.guestEmail && booking.guestPhone) {
        setTimeout(() => {
          onCreateResponse(
            "Assigned guests contact | Email: " + booking.guestEmail + 
            " | Phone: " + booking.guestPhone + ".",
            "SUCCESS", 
            "guests"
          );
        }, 500);
      } else {
        setTimeout(() => {
          onCreateResponse(
            "No guests contact assigned.",
            "DISABLED", 
            "guests"
          );
        }, 500);
      }

      // Passengers Update
      if(booking.passengerId) {
        setTimeout(() => {
          onCreateResponse(
            "Updated (1) passenger(s) with ID(s): " + booking.passengerId + ".",
            "SUCCESS", 
            "passengers"
          );
        }, 500);
      } else {
        setTimeout(() => {
          onCreateResponse(
            "No passenger assigned.",
            "DISABLED", 
            "passengers"
          );
        }, 500);
      }

      // Users Update
      if(booking.userId) {
        setTimeout(() => {
          onCreateResponse(
            "Updated (1) users(s) with ID(s): " + booking.userId + ".",
            "SUCCESS", 
            "users"
          );
        }, 500);
      } else {
        setTimeout(() => {
          onCreateResponse(
            "No user assigned.",
            "DISABLED", 
            "users"
          );
        }, 500);
      }
    };

    // Create for User
    if(bookingValues.userId) {
      Orchestration.createRequest(
        constants.httpRequest.post,
        "/bookings/users/" + bookingValues.userId,
        httpError => {
          onCreateError("Service temporarily unavailable.", "ERROR");
        }, httpResponseBody => {
          if(httpResponseBody.error) {
            onCreateError(httpResponseBody.error, "ERROR");
          } else {
            onCreateResponse(
              "ID: " + httpResponseBody.id + 
              " Confirmation: " + httpResponseBody.confirmationCode, 
              "SUCCESS", 
              "booking"
            );
            syncrhonizeBookingReferences({
              id: httpResponseBody.id,
              confirmationCode: httpResponseBody.confirmationCode,
              status: bookingValues.status,
              flightId: bookingValues.flightId,
              passengerId: bookingValues.passengerId,
              userId: bookingValues.userId,
              guestEmail: bookingValues.guestEmail,
              guestPhone: bookingValues.guestPhone
            });
          }
        }
      );
    } 
    
    // Create for Guest
    else if(bookingValues.guestEmail && bookingValues.guestPhone) {
      const requestBody = {
        email: bookingValues.guestEmail,
        phone: bookingValues.guestPhone
      };
      Orchestration.createRequestWithBody(
        constants.httpRequest.post,
        "/bookings/guests",
        requestBody,
        httpError => {
          onCreateError("Service temporarily unavailable.", "ERROR");
        }, httpResponseBody => {
          if(httpResponseBody.error) {
            onCreateError(httpResponseBody.error, "ERROR");
          } else {
            onCreateResponse(
              "ID: " + httpResponseBody.id + 
              " Confirmation: " + httpResponseBody.confirmationCode, 
              "SUCCESS", 
              "booking"
            );
            syncrhonizeBookingReferences({
              id: httpResponseBody.id,
              confirmationCode: httpResponseBody.confirmationCode,
              status: bookingValues.status,
              flightId: bookingValues.flightId,
              passengerId: bookingValues.passengerId,
              userId: bookingValues.userId,
              guestEmail: bookingValues.guestEmail,
              guestPhone: bookingValues.guestPhone
            });
          }
        }
      );
    } 
    
    // Error - must have valid User or Guest to create booking
    else {
      Store.reduce({ 
        type: constants.bookings.createError,
        payload: "Either a UserID or a Guest (email & phone) are required."
      });
      return;
    }
  }

  static onDelete(bookingId) {
    Store.reduce({ type: constants.bookings.deleteRequest });

    const onDeleteResponse = (result, resultStatus, resultType) => {
      const { bookings } = Store.getState();
      const { results, resultsStatus } = bookings.delete;
      Store.reduce({ 
        type: constants.bookings.deleteResponse,
        payload: {
          results: {
            ...results,
            [resultType]: result
          },
          resultsStatus: {
            ...resultsStatus,
            [resultType]: resultStatus
          }
        }
      });
    };

    // Booking
    Orchestration.createRequest(
      constants.httpRequest.delete,
      "/bookings/" + bookingId,
      (httpError) => {
        onDeleteResponse("Service temporarily unavailable.", "ERROR", "booking");
      },
      (httpResponseBody) => {
        if(httpResponseBody.error) {
          onDeleteResponse(httpResponseBody.error, "ERROR", "booking");
        } else {
          onDeleteResponse("Successfully deleted.", "SUCCESS", "booking");
        }
      }
    );

    // Flight Bookings
    Orchestration.createRequest(
      constants.httpRequest.delete,
      "/bookings/flights/" + bookingId,
      (httpError) => {
        onDeleteResponse("Service temporarily unavailable.", "ERROR", "flights");
      },
      (httpResponseBody) => {
        if(httpResponseBody.error) {
          onDeleteResponse(httpResponseBody.error, "ERROR", "flights");
        } else {
          onDeleteResponse(
            httpResponseBody, 
            httpResponseBody.includes("(0)")
              ? "DISABLED"
              : "SUCCESS", 
            "flights"
          );
        }
      }
    );

    // Passengers - NYI
    setTimeout(() => {
      onDeleteResponse(
        "Not yet implemented",
        "DISABLED", 
        "passengers"
      );
    }, 500);

    // Booking Guests
    Orchestration.createRequest(
      constants.httpRequest.delete,
      "/bookings/guests/" + bookingId,
      (httpError) => {
        onDeleteResponse("Service temporarily unavailable.", "ERROR", "guests");
      },
      (httpResponseBody) => {
        if(httpResponseBody.error) {
          onDeleteResponse(httpResponseBody.error, "ERROR", "guests");
        } else {
          onDeleteResponse(
            httpResponseBody, 
            httpResponseBody.includes("(0)")
              ? "DISABLED"
              : "SUCCESS", 
            "guests"
          );
        }
      }
    );

    // Booking Users
    Orchestration.createRequest(
      constants.httpRequest.delete,
      "/bookings/users/" + bookingId,
      (httpError) => {;
        onDeleteResponse("Service temporarily unavailable.", "ERROR", "users");
      },
      (httpResponseBody) => {
        if(httpResponseBody.error) {
          onDeleteResponse(httpResponseBody.error, "ERROR", "users");
        } else {
          onDeleteResponse(
            httpResponseBody, 
            httpResponseBody.includes("(0)")
              ? "DISABLED"
              : "SUCCESS", 
            "users"
          );
        }
      }
    );
  }

  static onEdit(selectedBooking, editParams) {
    Store.reduce({ type: constants.bookings.editRequest });

    const onEditResponse = (result, resultStatus, resultType) => {
      const { bookings } = Store.getState();
      const { results, resultsStatus } = bookings.edit;
      Store.reduce({ 
        type: constants.bookings.editResponse,
        payload: {
          results: {
            ...results,
            [resultType]: result
          },
          resultsStatus: {
            ...resultsStatus,
            [resultType]: resultStatus
          }
        }
      });
    };

    // Status
    if(selectedBooking.status !== editParams.status) {
      const booking = {
        id: selectedBooking.id,
        confirmationCode: selectedBooking.confirmationCode,
        status: editParams.status
      };

      Orchestration.createRequestWithBody(
        constants.httpRequest.put,
        "/bookings",
        booking,
        (httpError) => {
          onEditResponse("Service temporarily unavailable.", "ERROR", "booking");
        },
        (httpResponseBody) => {
          if(httpResponseBody.error) {
            onEditResponse(httpResponseBody.error, "ERROR", "booking");
          } else {
            onEditResponse("Status updated to: " + httpResponseBody.status + ".", "SUCCESS", "booking");
          }
        }
      );
    } else {
      setTimeout(() => {
        onEditResponse("N/A", "DISABLED", "booking");
      }, 500);
    }

    // Flight IDs
    if(selectedBooking.flightId !== editParams.flightId) {
      const booking = {
        bookingId: selectedBooking.id,
        flightId: editParams.flightId
      }

      Orchestration.createRequestWithBody(
        constants.httpRequest.put,
        "/bookings/flights",
        booking,
        (httpError) => {
          onEditResponse("Service temporarily unavailable.", "ERROR", "flights");
        },
        (httpResponseBody) => {
          if(httpResponseBody.error) {
            onEditResponse(httpResponseBody.error, "ERROR", "flights");
          } else {
            onEditResponse("Flight ID updated to: " + httpResponseBody.flightId + ".", "SUCCESS", "flights");
          }
        }
      );
    } else {
      setTimeout(() => {
        onEditResponse("N/A", "DISABLED", "flights");
      }, 500);
    }

    // Passenger IDs
    if(selectedBooking.passengers !== editParams.passengers) {

      setTimeout(() => {
        onEditResponse(
          "Updated to Passenger ID: " + editParams.passengers + ".",
          "SUCCESS", 
          "passengers"
        );
      }, 500);

      // const booking = {
      //   id: selectedBooking.id,
      //   passengers: editParams.passengers
      // }

      // Orchestration.createRequestWithBody(
      //   constants.httpRequest.put,
      //   "/bookings/passengers",
      //   booking,
      //   (httpError) => {
      //     onEditResponse("Service temporarily unavailable.", "ERROR", "passengers");
      //   },
      //   (httpResponseBody) => {
      //     if(httpResponseBody.error) {
      //       onEditResponse(httpResponseBody.error, "ERROR", "passengers");
      //     } else {
      //       onEditResponse(httpResponseBody, "SUCCESS", "passengers");
      //     }
      //   }
      // );
    } else {
      setTimeout(() => {
        onEditResponse("N/A", "DISABLED", "passengers");
      }, 500);
    }

    // User IDs
    if(selectedBooking.userId !== editParams.userId) {
      const booking = {
        bookingId: selectedBooking.id,
        userId: editParams.userId
      }

      Orchestration.createRequestWithBody(
        constants.httpRequest.put,
        "/bookings/users",
        booking,
        (httpError) => {
          onEditResponse("Service temporarily unavailable.", "ERROR", "users");
        },
        (httpResponseBody) => {
          if(httpResponseBody.error) {
            onEditResponse(httpResponseBody.error, "ERROR", "users");
          } else {
            onEditResponse("Updated to User ID: " + httpResponseBody.userId + ".", "SUCCESS", "users");
          }
        }
      );
    } else {
      setTimeout(() => {
        onEditResponse("N/A", "DISABLED", "users");
      }, 500);
    }

    // User IDs
    if(selectedBooking.guestEmail !== editParams.guestEmail || selectedBooking.guestPhone !== editParams.guestPhone) {
      const booking = {
        bookingId: selectedBooking.id,
        email: editParams.guestEmail,
        phone: editParams.guestPhone
      }

      Orchestration.createRequestWithBody(
        constants.httpRequest.put,
        "/bookings/guests",
        booking,
        (httpError) => {
          onEditResponse("Service temporarily unavailable.", "ERROR", "guests");
        },
        (httpResponseBody) => {
          if(httpResponseBody.error) {
            onEditResponse(httpResponseBody.error, "ERROR", "guests");
          } else {
            onEditResponse("Updated Guest contact email: " + httpResponseBody.email + " & phone: " + httpResponseBody.phone + ".", "SUCCESS", "guests");
          }
        }
      );
    } else {
      setTimeout(() => {
        onEditResponse("N/A", "DISABLED", "guests");
      }, 500);
    }
  }

  static onError(message) {
    Store.reduce({
      type: constants.bookings.error,
      payload: message,
    });
  }

  static onFakeAPICall(disableResponse) {
    Store.reduce({ type: constants.bookings.request });
    if(!disableResponse) {
      setTimeout(() => {
        const { bookings } = Store.getState();
        Store.reduce({ 
          type: constants.bookings.response,
          payload: bookings.search.results
        });
      }, 1500);
    }
  }

  static onRequest() {
    Store.reduce({ type: constants.bookings.request });

    Orchestration.createRequest(
      constants.httpRequest.get,
      "/bookings/referencedata",
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

  static onSelect(path, onError, onSuccess) {
    Store.reduce({ type: constants.bookings.request });
    Orchestration.createRequest(
      constants.httpRequest.get,
      "/bookings/" + path,
      (httpError) => onError("Service temporarily unavailable."),
      (httpResponseBody) => {
        if(httpResponseBody.error) onError(httpResponseBody.error);
        else onSuccess(httpResponseBody);
      }
    );
  }

  static onSearchAndFilter(searchText) {
    
    if(!searchText || searchText.length < 4) {
      BookingsDispatcher.onRequest();
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
    BookingsDispatcher.onSelect(searchPath);
  }

  static onPromptCreate(){
    Store.reduce({type: constants.bookings.createPrompt});
  }

  static onPromptDelete(bookingId){
    BookingsDispatcher.onSelect(bookingId, 
    onError => Store.reduce({type: constants.bookings.deleteError, payload: onError}),
    onSuccess => Store.reduce({type: constants.bookings.deletePrompt}));
  }

  static onPromptEdit(bookingId) {
    BookingsDispatcher.onSelect(bookingId, 
      onError => Store.reduce({type: constants.bookings.editError, payload: onError}),
      onSuccess => Store.reduce({type: constants.bookings.editPrompt}));
    }

  static onSelectResultsPage(resultsPage) {
    Store.reduce({
      type: constants.bookings.searchResultsPage,
      payload: resultsPage,
    });
  }

  static onSelectResultsPerPage(resultsPerPage) {
    Store.reduce({
      type: constants.bookings.searchResultsPerPage,
      payload: resultsPerPage,
    });
  }
}
export default BookingsDispatcher;