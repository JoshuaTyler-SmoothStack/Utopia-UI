import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import Store from "../reducers/Store";

class BaseDispatcher {
  static apiPath = null;
  static constantsParent = null;

  static initialize(constantsParent, dispatcherAPIPath) {
    this.apiPath = dispatcherAPIPath;
    this.constantsParent = constantsParent;
  }

  static onCancel() {
    Store.reduce({ type: this.constantsParent.cancel });
  }

  static onCreate(httpPath, httpBody) {
    Store.reduce({ type: this.constantsParent.requestCreate });
    Orchestration.createRequestWithBody(
      constants.httpRequest.post,
      this.apiPath + (httpPath || ""),
      httpBody,
      (httpError) => {
        Store.reduce({
          type: this.constantsParent.error,
          payload: httpError,
        });
      },
      (httpResponseBody) => {
        if (httpResponseBody.error) {
          Store.reduce({
            type: this.constantsParent.responseCreate,
            payload: {
              results: httpResponseBody,
              resultsStatus: "ERROR"
            }
          });
        } else {
          Store.reduce({
            type: this.constantsParent.responseCreate,
            payload: {
              results: httpResponseBody,
              resultsStatus: "SUCCESS"
            }
          });
        }
      }
    );
  }

  static onDelete(httpPath) {
    Store.reduce({ type: this.constantsParent.requestDelete });
    Orchestration.createRequest(
      constants.httpRequest.delete,
      this.apiPath + (httpPath || ""),
      (httpError) => {
        Store.reduce({
          type: this.constantsParent.error,
          payload: httpError,
        });
      },
      (httpResponseBody) => {
        if (httpResponseBody.error) {
          Store.reduce({
            type: this.constantsParent.responseDelete,
            payload: {
              results: httpResponseBody,
              resultsStatus: "ERROR"
            }
          });
        } else {
          Store.reduce({
            type: this.constantsParent.responseDelete,
            payload: {
              results: httpResponseBody,
              resultsStatus: "SUCCESS"
            }
          });
        }
      }
    );
  }

  static onEdit(httpPath, httpBody) {
    Store.reduce({ type: this.constantsParent.requestEdit });
    console.log(this.apiPath + (httpPath || ""));
    Orchestration.createRequestWithBody(
      constants.httpRequest.put,
      this.apiPath + (httpPath || ""),
      httpBody,
      (httpError) => {
        Store.reduce({
          type: this.constantsParent.error,
          payload: httpError,
        });
      },
      (httpResponseBody) => {
        if (httpResponseBody.error) {
          Store.reduce({
            type: this.constantsParent.responseEdit,
            payload: {
              results: httpResponseBody,
              resultsStatus: "ERROR"
            }
          });
        } else {
          Store.reduce({
            type: this.constantsParent.responseEdit,
            payload: {
              results: httpResponseBody,
              resultsStatus: "SUCCESS"
            }
          });
        }
      }
    );
  }

  static onEditFake(httpBody) {
    Store.reduce({ type: this.constantsParent.requestEdit });
    Store.reduce({
      type: this.constantsParent.responseEdit,
      payload: {
        results: httpBody,
        resultsStatus: "SUCCESS"
      }
    });
  }

  static onError(message) {
    Store.reduce({
      type: this.constantsParent.error,
      payload: message,
    });
  }

  static onFakeAPICall(httpBody) {
    Store.reduce({ type: this.constantsParent.request });
    setTimeout(() => {
      Store.reduce({
        type: this.constantsParent.response,
        payload: httpBody
      });
    }, 1500);
  }

  static onRequest(httpPath) {
    Store.reduce({ type: this.constantsParent.request });
    Orchestration.createRequest(
      constants.httpRequest.get,
      this.apiPath + (httpPath || ""),
      (httpError) => {
        Store.reduce({
          type: this.constantsParent.error,
          payload: httpError,
        });
      },
      (httpResponseBody) => {
        if(httpResponseBody.error) {
          Store.reduce({
            type: this.constantsParent.error,
            payload: httpResponseBody.error,
          });
        } else {
          Store.reduce({
            type: this.constantsParent.response,
            payload: httpResponseBody,
          });
        }
      }
    );
  }

  static onRequestThenCallback(httpPath, onError, onSuccess) {
    Store.reduce({ type: this.constantsParent.request });
    Orchestration.createRequest(
      constants.httpRequest.get,
      this.apiPath + (httpPath || ""),
      (httpError) => onError(httpError),
      (httpResponseBody) => {
        if(httpResponseBody.error) onError(httpResponseBody.error);
        else onSuccess(httpResponseBody);
      }
    );
  }

  static onSearchAndFilter(httpPath, searchTermsString, filtersObject) {

    const activeFilters = {};
    if(searchTermsString) activeFilters.searchTerms = searchTermsString;
    if(filtersObject) {
      for(const key in filtersObject) {
        if(filtersObject[key] !== null && filtersObject[key] !== undefined) {
          activeFilters[key] = filtersObject[key];
        }
      }
    }

    Store.reduce({ type: this.constantsParent.request });
    console.log("activeFilters -> ", activeFilters);
    Orchestration.createRequestWithBody(
      constants.httpRequest.post,
      this.apiPath + httpPath,
      activeFilters,
      (httpError) => {
        Store.reduce({
          type: this.constantsParent.error,
          payload: httpError,
        });
      },
      (httpResponseBody) => {
        if(httpResponseBody.error) {
          Store.reduce({
            type: this.constantsParent.error,
            payload: httpResponseBody.error,
          });
        } else {
          Store.reduce({
            type: this.constantsParent.response,
            payload: httpResponseBody,
          });
        }
      }
    );
  }

  static onPromptCreate() {
    Store.reduce({ type: this.constantsParent.promptCreate });
  }

  static onPromptDelete(requestPath) {
    this.onRequestThenCallback(
      requestPath, 
      onError => Store.reduce({type: this.constantsParent.error, payload: onError}),
      onSuccess => Store.reduce({type: this.constantsParent.promptDelete, payload: onSuccess})
    );
  }

  static onPromptEdit(requestPath) {
    this.onRequestThenCallback(
      requestPath, 
      onError => Store.reduce({type: this.constantsParent.error, payload: onError}),
      onSuccess => Store.reduce({type: this.constantsParent.promptEdit, payload: onSuccess})
    );
  }

  static onSelectResultsPage(resultsPage) {
    Store.reduce({
      type: this.constantsParent.searchResultsPage,
      payload: resultsPage,
    });
  }

  static onSelectResultsPerPage(resultsPerPage) {
    Store.reduce({
      type: this.constantsParent.searchResultsPerPage,
      payload: resultsPerPage,
    });
  }
}
export default BaseDispatcher;