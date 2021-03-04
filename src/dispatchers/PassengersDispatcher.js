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
          Store.reduce({
            type: constants.passengers.deleteResponse,
            payload: httpResponseBody,
          });
        }
      }
    );
  }

  static onEdit(passenger, newCityName, isRevert) {
    Store.reduce({ type: constants.passengers.editRequest });
    if(passenger.city !== newCityName || isRevert) {
      Orchestration.createRequestWithBody(
        constants.httpRequest.put,
        "/passengers/" + passenger.iataId,
        newCityName,
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
              type: constants.passengers.editResponse,
              payload: {
                results: httpResponseBody,
                status: "SUCCESS"
              },
            });
          }
        }
      );
    } else {
      Store.reduce({
        type: constants.passengers.editResponse,
        payload: {
          results: passenger,
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
    onSuccess => Store.reduce({type: constants.passengers.deletePrompt}));
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