import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import Store from "../reducers/Store";

class BaseDispatcher {
  static apiPath = null;
  static constantsParent = null;

  static getApiPath() {
    if(this.apiPath === null) console.error(
      "Attempting to utilize an unset API Path. " +
      "The Dispatcher will not know how to process this. " + 
      "Check the Dispatcher setup being utilized."
    );
    return this.apiPath;
  }

  static getConstantsParent() {
    if(!this.constantsParent === null) console.error(
      "Attempting to utilize an unset ConstantsParent. " +
      "The Reducer will not know how to process this. " + 
      "Check the Dispatcher setup being utilized."
    );
    return this.constantsParent;
  }

  static onCancel() {
    Store.reduce({ type: this.getConstantsParent().cancel });
  }

  static onCreate(httpPath, httpBody) {
    Store.reduce({ type: this.getConstantsParent().requestCreate });
    Orchestration.createRequestWithBody(
      constants.httpRequest.post,
      this.getApiPath() + (httpPath || ""),
      httpBody,
      (httpError) => {
        Store.reduce({
          type: this.getConstantsParent().error,
          payload: httpError,
        });
      },
      (httpResponseBody) => {
        if (httpResponseBody.error) {
          Store.reduce({
            type: this.getConstantsParent().responseCreate,
            payload: {
              results: httpResponseBody,
              resultsStatus: "ERROR"
            }
          });
        } else {
          Store.reduce({
            type: this.getConstantsParent().responseCreate,
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
    Store.reduce({ type: this.getConstantsParent().requestDelete });
    Orchestration.createRequest(
      constants.httpRequest.delete,
      this.getApiPath() + (httpPath || ""),
      (httpError) => {
        Store.reduce({
          type: this.getConstantsParent().error,
          payload: httpError,
        });
      },
      (httpResponseBody) => {
        if (httpResponseBody.error) {
          Store.reduce({
            type: this.getConstantsParent().responseDelete,
            payload: {
              results: httpResponseBody,
              resultsStatus: "ERROR"
            }
          });
        } else {
          Store.reduce({
            type: this.getConstantsParent().responseDelete,
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
    Store.reduce({ type: this.getConstantsParent().requestEdit });
    Orchestration.createRequestWithBody(
      constants.httpRequest.put,
      this.getApiPath() + (httpPath || ""),
      httpBody,
      (httpError) => {
        Store.reduce({
          type: this.getConstantsParent().error,
          payload: httpError,
        });
      },
      (httpResponseBody) => {
        if (httpResponseBody.error) {
          Store.reduce({
            type: this.getConstantsParent().responseEdit,
            payload: {
              results: httpResponseBody,
              resultsStatus: "ERROR"
            }
          });
        } else {
          Store.reduce({
            type: this.getConstantsParent().responseEdit,
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
    Store.reduce({ type: this.getConstantsParent().requestEdit });
    Store.reduce({
      type: this.getConstantsParent().responseEdit,
      payload: {
        results: httpBody,
        resultsStatus: "SUCCESS"
      }
    });
  }

  static onError(message) {
    Store.reduce({
      type: this.getConstantsParent().error,
      payload: message,
    });
  }

  static onFakeAPICall(httpBody) {
    Store.reduce({ type: this.getConstantsParent().request });
    setTimeout(() => {
      Store.reduce({
        type: this.getConstantsParent().response,
        payload: httpBody
      });
    }, 1500);
  }

  static onRequest(httpPath) {
    Store.reduce({ type: this.getConstantsParent().request });
    Orchestration.createRequest(
      constants.httpRequest.get,
      this.getApiPath() + (httpPath || ""),
      (httpError) => {
        Store.reduce({
          type: this.getConstantsParent().error,
          payload: httpError,
        });
      },
      (httpResponseBody) => {
        if(httpResponseBody.error) {
          Store.reduce({
            type: this.getConstantsParent().error,
            payload: httpResponseBody.error,
          });
        } else {
          Store.reduce({
            type: this.getConstantsParent().response,
            payload: httpResponseBody,
          });
        }
      }
    );
  }

  static onRequestThenCallback(httpPath, onError, onSuccess) {
    Store.reduce({ type: this.getConstantsParent().request });
    Orchestration.createRequest(
      constants.httpRequest.get,
      this.getApiPath() + (httpPath || ""),
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

    Store.reduce({ type: this.getConstantsParent().request });
    console.log("activeFilters -> ", activeFilters);
    Orchestration.createRequestWithBody(
      constants.httpRequest.post,
      this.getApiPath() + httpPath,
      activeFilters,
      (httpError) => {
        Store.reduce({
          type: this.getConstantsParent().error,
          payload: httpError,
        });
      },
      (httpResponseBody) => {
        if(httpResponseBody.error) {
          Store.reduce({
            type: this.getConstantsParent().error,
            payload: httpResponseBody.error,
          });
        } else {
          Store.reduce({
            type: this.getConstantsParent().response,
            payload: httpResponseBody,
          });
        }
      }
    );
  }

  static onPromptCreate() {
    Store.reduce({ type: this.getConstantsParent().promptCreate });
  }

  static onPromptDelete(requestPath) {
    this.onRequestThenCallback(
      requestPath, 
      onError => Store.reduce({type: this.getConstantsParent().error, payload: onError}),
      onSuccess => Store.reduce({type: this.getConstantsParent().promptDelete, payload: onSuccess})
    );
  }

  static onPromptEdit(requestPath) {
    this.onRequestThenCallback(
      requestPath, 
      onError => Store.reduce({type: this.getConstantsParent().error, payload: onError}),
      onSuccess => Store.reduce({type: this.getConstantsParent().promptEdit, payload: onSuccess})
    );
  }

  static onSelectItem(item) {
    Store.reduce({
      type: this.getConstantsParent().selectItem,
      payload: item,
    });
  }

  static onSelectItemsPage(itemsPage) {
    Store.reduce({
      type: this.getConstantsParent().selectItemsPage,
      payload: itemsPage,
    });
  }

  static onSelectItemsPerPage(itemsPerPage) {
    Store.reduce({
      type: this.getConstantsParent().selectItemsPerPage,
      payload: itemsPerPage,
    });
  }

  static onSetFilter(filterName, filterValue) {
    Store.reduce({
      type: this.getConstantsParent().selectFilter,
      payload: { [filterName]: filterValue }
    });
  }
}
export default BaseDispatcher;