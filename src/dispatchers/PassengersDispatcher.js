import constants from "../resources/constants.json";
import Orchestration from "../Orchestration";
import Store from "../reducers/Store";

class PassengersDispatcher {
  static onCancel() {
    Store.reduce({type: constants.passengers.cancel});
  }

  static onCreate(passengerValues) {
    Store.reduce({ type: constants.passengers.createRequest });

    const onCreateResponse = (result, resultStatus, resultType) => {
      const { passengers } = Store.getState();
      const { results, resultsStatus } = passengers.create;
      Store.reduce({ 
        type: constants.passengers.createResponse,
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
        type: constants.passengers.createError,
        payload: {result, resultStatus}
      });
    };

    const syncrhonizePassengerReferences = (passenger) => {
      Store.reduce({ 
        type: constants.passengers.select,
        payload: passenger
      });

      // Flight IDs
      if(passenger.flightId) {
        const flightPassenger = {
          passengerId: passenger.id,
          flightId: passenger.flightId
        };
  
        Orchestration.createRequestWithBody(
          constants.httpRequest.put,
          "/passengers/flights",
          flightPassenger,
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
      if(passenger.guestEmail && passenger.guestPhone) {
        setTimeout(() => {
          onCreateResponse(
            "Assigned guests contact | Email: " + passenger.guestEmail + 
            " | Phone: " + passenger.guestPhone + ".",
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
      if(passenger.passengerId) {
        setTimeout(() => {
          onCreateResponse(
            "Updated (1) passenger(s) with ID(s): " + passenger.passengerId + ".",
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
      if(passenger.userId) {
        setTimeout(() => {
          onCreateResponse(
            "Updated (1) users(s) with ID(s): " + passenger.userId + ".",
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
    if(passengerValues.userId) {
      Orchestration.createRequest(
        constants.httpRequest.post,
        "/passengers/users/" + passengerValues.userId,
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
              "passenger"
            );
            syncrhonizePassengerReferences({
              id: httpResponseBody.id,
              confirmationCode: httpResponseBody.confirmationCode,
              status: passengerValues.status,
              flightId: passengerValues.flightId,
              passengerId: passengerValues.passengerId,
              userId: passengerValues.userId,
              guestEmail: passengerValues.guestEmail,
              guestPhone: passengerValues.guestPhone
            });
          }
        }
      );
    } 
    
    // Create for Guest
    else if(passengerValues.guestEmail && passengerValues.guestPhone) {
      const requestBody = {
        email: passengerValues.guestEmail,
        phone: passengerValues.guestPhone
      };
      Orchestration.createRequestWithBody(
        constants.httpRequest.post,
        "/passengers/guests",
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
              "passenger"
            );
            syncrhonizePassengerReferences({
              id: httpResponseBody.id,
              confirmationCode: httpResponseBody.confirmationCode,
              status: passengerValues.status,
              flightId: passengerValues.flightId,
              passengerId: passengerValues.passengerId,
              userId: passengerValues.userId,
              guestEmail: passengerValues.guestEmail,
              guestPhone: passengerValues.guestPhone
            });
          }
        }
      );
    } 
    
    // Error - must have valid User or Guest to create passenger
    else {
      Store.reduce({ 
        type: constants.passengers.createError,
        payload: "Either a UserID or a Guest (email & phone) are required."
      });
      return;
    }
  }

  static onDelete(passengerId) {
    Store.reduce({ type: constants.passengers.deleteRequest });

    const onDeleteResponse = (result, resultStatus, resultType) => {
      const { passengers } = Store.getState();
      const { results, resultsStatus } = passengers.delete;
      Store.reduce({ 
        type: constants.passengers.deleteResponse,
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

    // Passenger
    Orchestration.createRequest(
      constants.httpRequest.delete,
      "/passengers/" + passengerId,
      (httpError) => {
        onDeleteResponse("Service temporarily unavailable.", "ERROR", "passenger");
      },
      (httpResponseBody) => {
        if(httpResponseBody.error) {
          onDeleteResponse(httpResponseBody.error, "ERROR", "passenger");
        } else {
          onDeleteResponse("Successfully deleted.", "SUCCESS", "passenger");
        }
      }
    );

    // Flight Passengers
    Orchestration.createRequest(
      constants.httpRequest.delete,
      "/passengers/flights/" + passengerId,
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

    // Passenger Guests
    Orchestration.createRequest(
      constants.httpRequest.delete,
      "/passengers/guests/" + passengerId,
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

    // Passenger Users
    Orchestration.createRequest(
      constants.httpRequest.delete,
      "/passengers/users/" + passengerId,
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

  static onEdit(selectedPassenger, editParams) {
    Store.reduce({ type: constants.passengers.editRequest });

    const onEditResponse = (result, resultStatus, resultType) => {
      const { passengers } = Store.getState();
      const { results, resultsStatus } = passengers.edit;
      Store.reduce({ 
        type: constants.passengers.editResponse,
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
    if(selectedPassenger.status !== editParams.status) {
      const passenger = {
        id: selectedPassenger.id,
        confirmationCode: selectedPassenger.confirmationCode,
        status: editParams.status
      };

      Orchestration.createRequestWithBody(
        constants.httpRequest.put,
        "/passengers",
        passenger,
        (httpError) => {
          onEditResponse("Service temporarily unavailable.", "ERROR", "passenger");
        },
        (httpResponseBody) => {
          if(httpResponseBody.error) {
            onEditResponse(httpResponseBody.error, "ERROR", "passenger");
          } else {
            onEditResponse("Status updated to: " + httpResponseBody.status + ".", "SUCCESS", "passenger");
          }
        }
      );
    } else {
      setTimeout(() => {
        onEditResponse("N/A", "DISABLED", "passenger");
      }, 500);
    }

    // Flight IDs
    if(selectedPassenger.flightId !== editParams.flightId) {
      const passenger = {
        passengerId: selectedPassenger.id,
        flightId: editParams.flightId
      }

      Orchestration.createRequestWithBody(
        constants.httpRequest.put,
        "/passengers/flights",
        passenger,
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
    if(selectedPassenger.passengers !== editParams.passengers) {

      setTimeout(() => {
        onEditResponse(
          "Updated to Passenger ID: " + editParams.passengers + ".",
          "SUCCESS", 
          "passengers"
        );
      }, 500);

      // const passenger = {
      //   id: selectedPassenger.id,
      //   passengers: editParams.passengers
      // }

      // Orchestration.createRequestWithBody(
      //   constants.httpRequest.put,
      //   "/passengers/passengers",
      //   passenger,
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
    if(selectedPassenger.userId !== editParams.userId) {
      const passenger = {
        passengerId: selectedPassenger.id,
        userId: editParams.userId
      }

      Orchestration.createRequestWithBody(
        constants.httpRequest.put,
        "/passengers/users",
        passenger,
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
    if(selectedPassenger.guestEmail !== editParams.guestEmail || selectedPassenger.guestPhone !== editParams.guestPhone) {
      const passenger = {
        passengerId: selectedPassenger.id,
        email: editParams.guestEmail,
        phone: editParams.guestPhone
      }

      Orchestration.createRequestWithBody(
        constants.httpRequest.put,
        "/passengers/guests",
        passenger,
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
      type: constants.passengers.error,
      payload: message,
    });
  }

  static onFakeAPICall(disableResponse) {
    Store.reduce({ type: constants.passengers.request });
    if(!disableResponse) {
      setTimeout(() => {
        const { passengers } = Store.getState();
        Store.reduce({ 
          type: constants.passengers.response,
          payload: passengers.search.results
        });
      }, 1500);
    }
  }

  static onFindAll() {
    Store.reduce({ type: constants.passengers.request });

    Orchestration.createRequest(
      constants.httpRequest.get,
      "/passengers",
      (httpError) => {
        Store.reduce({
          type: constants.passengers.error,
          payload: httpError,
        });
      },
      (httpResponseBody) => {
        if(httpResponseBody.error) {
          Store.reduce({
            type: constants.passengers.error,
            payload: httpResponseBody.error,
          });
        } else {
          Store.reduce({
            type: constants.passengers.response,
            payload: httpResponseBody,
          });
        }
      }
    );
  }

  static onSelect(path, onError, onSuccess) {
    Store.reduce({ type: constants.passengers.request });
    Orchestration.createRequest(
      constants.httpRequest.get,
      "/passengers/" + path,
      (httpError) => onError("Service temporarily unavailable."),
      (httpResponseBody) => {
        if(httpResponseBody.error) onError(httpResponseBody.error);
        else onSuccess(httpResponseBody);
      }
    );
  }

  static onFindBy(searchText) {
    
    if(!searchText || searchText.length < 4) {
      PassengersDispatcher.onFindAll();
      return;
    }
    
    const formattedText = searchText.toLowerCase();
    if(!formattedText.includes("id=") && !formattedText.includes("confirmation=")){
      Store.reduce({
        type: constants.passengers.searchError,
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
        type: constants.passengers.searchError,
        payload: "Invalid search term!",
      });
      return;
    }
    PassengersDispatcher.onSelect(searchPath);
  }

  static onPromptCreate(){
    Store.reduce({type: constants.passengers.createPrompt});
  }

  static onPromptDelete(passengerId){
    PassengersDispatcher.onSelect(passengerId, 
    onError => Store.reduce({type: constants.passengers.deleteError, payload: onError}),
    onSuccess => Store.reduce({type: constants.passengers.deletePrompt}));
  }

  static onPromptEdit(passengerId) {
    PassengersDispatcher.onSelect(passengerId, 
      onError => Store.reduce({type: constants.passengers.editError, payload: onError}),
      onSuccess => Store.reduce({type: constants.passengers.editPrompt}));
    }

  static onResultsPage(resultsPage) {
    Store.reduce({
      type: constants.passengers.searchResultsPage,
      payload: resultsPage,
    });
  }

  static onResultsPerPage(resultsPerPage) {
    Store.reduce({
      type: constants.passengers.searchResultsPerPage,
      payload: resultsPerPage,
    });
  }
}
export default PassengersDispatcher;