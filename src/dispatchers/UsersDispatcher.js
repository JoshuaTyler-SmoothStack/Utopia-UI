import constants from "../resources/constants.json";
import Orchestration from "../Orchestration";
import Store from "../reducers/Store";

class UsersDispatcher {

  static onCancel() {
    Store.reduce({ type: constants.users.cancel });
  }

  static onCreate(iataId, city) {
    Store.reduce({ type: constants.users.createRequest });
  }

  static onDelete(userId) {
    Store.reduce({ type: constants.users.deleteRequest });
  }

  static onError(message) {
    Store.reduce({
      type: constants.users.error,
      payload: message,
    });
  }

  static onFakeAPICall() {
    Store.reduce({ type: constants.users.request });
    setTimeout(() => {
      const { users } = Store.getState();
      Store.reduce({
        type: constants.users.response,
        payload: users.search.results,
      });
    }, 1500);
  }

  static onFindAll() {
    Store.reduce({ type: constants.users.request });

    Orchestration.createRequest(
      constants.httpRequest.get,
      "/users",
      (httpError) => {
        Store.reduce({
          type: constants.users.error,
          payload: "Service temporarily unavailable.",
        });
      },
      (httpResponseBody) => {
        if (httpResponseBody.error) {
          Store.reduce({
            type: constants.users.error,
            payload: httpResponseBody.error,
          });
        } else {
          Store.reduce({
            type: constants.users.response,
            payload: httpResponseBody,
          });
        }
      }
    );
  }

  static onFindBy(searchText) {
    
    if (!searchText || searchText.trim() === "") {
      UsersDispatcher.onFindAll();
      return;
    }


    const formattedText = searchText.toLowerCase();
    if (!formattedText.includes("iata=") && !formattedText.includes("city=")) {
      Store.reduce({
        type: constants.users.error,
        payload: "Invalid search term!",
      });
      return;
    }

    let searchPath = formattedText.split("iata=")[1];
    if (formattedText.includes("city=")) {
      const typeId = formattedText.split("city=")[1];
      searchPath = "/search?city=" + typeId;
    }

    Store.reduce({ type: constants.users.request });
    Orchestration.createRequest(
      constants.httpRequest.get,
      "/users/" + searchPath,
      (httpError) => {
        Store.reduce({
          type: constants.users.error,
          payload: "Service temporarily unavailable.",
        });
      },
      (httpResponseBody) => {
        if (httpResponseBody.error) {
          Store.reduce({
            type: constants.users.error,
            payload: httpResponseBody.error,
          });
        } else {
          Store.reduce({
            type: constants.users.response,
            payload: httpResponseBody,
          });
        }
      }
    );
  }

  static onPromptCreate() {
    Store.reduce({type: constants.users.createPrompt});
  }

  static onPromptDelete(user) {
    Store.reduce({
      type: constants.users.deletePrompt,
      payload: user
    });
  }

  static onResultsPage(resultsPage) {
    Store.reduce({
      type: constants.users.searchResultsPage,
      payload: resultsPage,
    });
  }

  static onResultsPerPage(resultsPerPage) {
    Store.reduce({
      type: constants.users.searchResultsPerPage,
      payload: resultsPerPage,
    });
  }
}
export default UsersDispatcher;