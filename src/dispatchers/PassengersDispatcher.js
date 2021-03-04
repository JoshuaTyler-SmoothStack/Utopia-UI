import _ from "lodash";
import constants from "../resources/constants.json";
import Orchestration from "../Orchestration";
import Store from "../reducers/Store";

class PassengersDispatcher {
  static onCancel() {
    Store.reduce({type: constants.passengers.cancel});
  }

  static onCreate(bookingId, passportId, firstName, lastName, 
    dateOfBirth, sex, address, isVeteran) {

    const passenger = { bookingId, passportId, firstName, lastName,
    dateOfBirth, sex, address, isVeteran };

    Store.reduce({ type: constants.passengers.createRequest });
    Orchestration.createRequestWithBody(
      constants.httpRequest.post,
      "/passengers",
      passenger,
      (httpError) => {
        Store.reduce({
          type: constants.passengers.error,
          payload: httpError,
        });
      },
      (httpResponseBody) => {
        if (httpResponseBody.error) {
          Store.reduce({
            type: constants.passengers.error,
            payload: httpResponseBody.error,
          });
        } else {
          Store.reduce({
            type: constants.passengers.createResponse,
            payload: httpResponseBody,
          });
        }
      }
    );
  }

  static onDelete(passengerId) {
    Store.reduce({ type: constants.passengers.deleteRequest });
    Orchestration.createRequest(
      constants.httpRequest.delete,
      "/passengers/" + passengerId,
      (httpError) => {
        Store.reduce({
          type: constants.passengers.error,
          payload: httpError,
        });
      },
      (httpResponseBody) => {
        if (httpResponseBody.error) {
          Store.reduce({
            type: constants.passengers.error,
            payload: httpResponseBody.error,
          });
        } else {
          Store.reduce({type: constants.passengers.deleteResponse});
        }
      }
    );
  }

  static onEdit(currentPassenger, bookingId, passportId, firstName, 
    lastName, dateOfBirth, sex, address, isVeteran, isRevert) {

    Store.reduce({ type: constants.passengers.editRequest });

    const newPassenger = {
      id : Number(currentPassenger.id),
      bookingId: Number(bookingId),
      passportId,
      firstName,
      lastName,
      dateOfBirth: dateOfBirth,
      sex,
      address,
      isVeteran: Boolean(isVeteran)
    };
    
    const isPassengerUnchanged = _.isEqual(currentPassenger, newPassenger);
    if(!isPassengerUnchanged || isRevert) {
      Orchestration.createRequestWithBody(
        constants.httpRequest.put,
        "/passengers",
        newPassenger,
        (httpError) => {
          console.log(httpError);
          Store.reduce({
            type: constants.passengers.error,
            payload: httpError,
          });
        },
        (httpResponseBody) => {
          if (httpResponseBody.error) {
            console.log(httpResponseBody.error);
            Store.reduce({
              type: constants.passengers.error,
              payload: httpResponseBody.error,
            });
          } else {
            const results = {
              id: httpResponseBody.id,
              bookingId: !_.isEqual(currentPassenger.bookingId, httpResponseBody.bookingId)
                ? "Updated to Booking ID: " + httpResponseBody.bookingId + "." 
                : "N/A",
              passportId: !_.isEqual(currentPassenger.passportId, httpResponseBody.passportId)
                ? "Updated to Passport ID: " + httpResponseBody.passportId + "." 
                : "N/A",
              firstName: !_.isEqual(currentPassenger.firstName, httpResponseBody.firstName)
                ? "Updated to First Name: " + httpResponseBody.firstName + "." 
                : "N/A",
              lastName: !_.isEqual(currentPassenger.lastName, httpResponseBody.lastName)
                ? "Updated to Last Name: " + httpResponseBody.lastName + "." 
                : "N/A",
              dateOfBirth: !_.isEqual(currentPassenger.dateOfBirth, httpResponseBody.dateOfBirth)
                ? "Updated to Date Of Birth: " + httpResponseBody.dateOfBirth + "." 
                : "N/A",
              sex: !_.isEqual(currentPassenger.sex, httpResponseBody.sex)
                ? "Updated to Sex: " + httpResponseBody.sex + "." 
                : "N/A",
              address: !_.isEqual(currentPassenger.address, httpResponseBody.address)
                ? "Updated to Address: " + httpResponseBody.address + "." 
                : "N/A",
              isVeteran: !_.isEqual(currentPassenger.isVeteran, httpResponseBody.isVeteran)
                ? "Updated to U.S. Military Active Duty / Veteran: " + httpResponseBody.isVeteran + "." 
                : "N/A"
            };

            const resultsStatus = {
              bookingId: !_.isEqual(currentPassenger.bookingId, httpResponseBody.bookingId)
                ? "SUCCESS" : "DISABLED",
              passportId: !_.isEqual(currentPassenger.passportId, httpResponseBody.passportId)
                ? "SUCCESS" : "DISABLED",
              firstName: !_.isEqual(currentPassenger.firstName, httpResponseBody.firstName)
                ? "SUCCESS" : "DISABLED",
              lastName: !_.isEqual(currentPassenger.lastName, httpResponseBody.lastName)
                ? "SUCCESS" : "DISABLED",
              dateOfBirth: !_.isEqual(currentPassenger.dateOfBirth, httpResponseBody.dateOfBirth)
                ? "SUCCESS" : "DISABLED",
              sex: !_.isEqual(currentPassenger.sex, httpResponseBody.sex)
                ? "SUCCESS" : "DISABLED",
              address: !_.isEqual(currentPassenger.address, httpResponseBody.address)
                ? "SUCCESS" : "DISABLED",
              isVeteran: !_.isEqual(currentPassenger.isVeteran, httpResponseBody.isVeteran)
                ? "SUCCESS" : "DISABLED",
            };

            Store.reduce({
              type: constants.passengers.editResponse,
              payload: {
                results: results,
                resultsStatus: resultsStatus
              },
            });
          }
        }
      );
    } else {
      Store.reduce({
        type: constants.passengers.editResponse,
        payload: {
          results: "N/A",
          status: "DISABLED"
        },
      });
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

  static onFindBy(searchTerms, filters) {

    const activeFilters = {};
    if(searchTerms) activeFilters.searchTerms = searchTerms;
    if(filters) {
      if(filters.id) activeFilters.passengerId = filters.id;
      if(filters.passengerId) activeFilters.passengerId = filters.passenegerId;
      if(filters.bookingId) activeFilters.bookingId = filters.bookingId;
      if(filters.passportId) activeFilters.passportId = filters.passportId;
    }

    Store.reduce({ type: constants.passengers.request });
    Orchestration.createRequestWithBody(
      constants.httpRequest.post,
      "/passengers/search",
      activeFilters,
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

  static onPromptCreate() {
    Store.reduce({type: constants.passengers.createPrompt});
  }

  static onPromptDelete(passengerId) {
    PassengersDispatcher.onSelect(passengerId, 
    onError => Store.reduce({type: constants.passengers.deleteError, payload: onError}),
    onSuccess => Store.reduce({type: constants.passengers.deletePrompt, payload: onSuccess}));
  }

  static onPromptEdit(passengerId) {
    PassengersDispatcher.onSelect(passengerId, 
      onError => Store.reduce({type: constants.passengers.editError, payload: onError}),
      onSuccess => Store.reduce({type: constants.passengers.editPrompt, payload: onSuccess}));
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