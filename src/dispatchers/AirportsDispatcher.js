import constants from "../resources/constants.json";
import Orchestration from "../Orchestration";
import Store from "../reducers/Store";

class AirportsDispatcher {

  static onCancel() {
    Store.reduce({ type: constants.airports.cancel });
  }

  static onCreate(iataId, city) {
    Store.reduce({ type: constants.airports.createRequest });
    Orchestration.createRequestWithBody(
      constants.httpRequest.post,
      "/airports",
      {iataId: iataId, city: city},
      (httpError) => {
        Store.reduce({
          type: constants.airports.error,
          payload: httpError,
        });
      },
      (httpResponseBody) => {
        if (httpResponseBody.error) {
          Store.reduce({
            type: constants.airports.error,
            payload: httpResponseBody.error,
          });
        } else {
          Store.reduce({
            type: constants.airports.createResponse,
            payload: httpResponseBody,
          });
        }
      }
    );
  }

  static onDelete(airportId) {
    Store.reduce({ type: constants.airports.deleteRequest });
    Orchestration.createRequest(
      constants.httpRequest.delete,
      "/airports/" + airportId,
      (httpError) => {
        Store.reduce({
          type: constants.airports.error,
          payload: httpError,
        });
      },
      (httpResponseBody) => {
        if (httpResponseBody.error) {
          Store.reduce({
            type: constants.airports.error,
            payload: httpResponseBody.error,
          });
        } else {
          Store.reduce({
            type: constants.airports.deleteResponse,
            payload: httpResponseBody,
          });
        }
      }
    );
  }

  static onEdit(airport, newCityName, isRevert) {
    Store.reduce({ type: constants.airports.editRequest });
    if(airport.city !== newCityName || isRevert) {
      Orchestration.createRequestWithBody(
        constants.httpRequest.put,
        "/airports/" + airport.iataId,
        newCityName,
        (httpError) => {
          Store.reduce({
            type: constants.airports.error,
            payload: httpError,
          });
        },
        (httpResponseBody) => {
          if (httpResponseBody.error) {
            Store.reduce({
              type: constants.airports.error,
              payload: httpResponseBody.error,
            });
          } else {
            Store.reduce({
              type: constants.airports.editResponse,
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
        type: constants.airports.editResponse,
        payload: {
          results: airport,
          status: "DISABLED"
        },
      });
    }
  }

  static onError(message) {
    Store.reduce({
      type: constants.airports.error,
      payload: message,
    });
  }

  static onFakeAPICall() {
    Store.reduce({ type: constants.airports.request });
    setTimeout(() => {
      const { airports } = Store.getState();
      Store.reduce({
        type: constants.airports.response,
        payload: airports.search.results,
      });
    }, 1500);
  }

  static onRequest() {
    Store.reduce({ type: constants.airports.request });

    Orchestration.createRequest(
      constants.httpRequest.get,
      "/airports",
      (httpError) => {
        Store.reduce({
          type: constants.airports.error,
          payload: "Service temporarily unavailable.",
        });
      },
      (httpResponseBody) => {
        if (httpResponseBody.error) {
          Store.reduce({
            type: constants.airports.error,
            payload: httpResponseBody.error,
          });
        } else {
          Store.reduce({
            type: constants.airports.response,
            payload: httpResponseBody,
          });
        }
      }
    );
  }

  static onSearchAndFilter(searchText) {
    
    if (!searchText || searchText.trim() === "") {
      AirportsDispatcher.onRequest();
      return;
    }


    const formattedText = searchText.toLowerCase();
    if (!formattedText.includes("iata=") && !formattedText.includes("city=")) {
      Store.reduce({
        type: constants.airports.error,
        payload: "Invalid search term!",
      });
      return;
    }

    let searchPath = formattedText.split("iata=")[1];
    if (formattedText.includes("city=")) {
      const typeId = formattedText.split("city=")[1];
      searchPath = "/search?city=" + typeId;
    }

    Store.reduce({ type: constants.airports.request });
    Orchestration.createRequest(
      constants.httpRequest.get,
      "/airports/" + searchPath,
      (httpError) => {
        Store.reduce({
          type: constants.airports.error,
          payload: "Service temporarily unavailable.",
        });
      },
      (httpResponseBody) => {
        if (httpResponseBody.error) {
          Store.reduce({
            type: constants.airports.error,
            payload: httpResponseBody.error,
          });
        } else {
          Store.reduce({
            type: constants.airports.response,
            payload: httpResponseBody,
          });
        }
      }
    );
  }

  static onPromptCreate() {
    Store.reduce({type: constants.airports.createPrompt});
  }

  static onPromptDelete(airport) {
    Store.reduce({
      type: constants.airports.deletePrompt,
      payload: airport
    });
  }

  static onPromptEdit(airport) {
    Store.reduce({
      type: constants.airports.editPrompt,
      payload: airport
    });
  }

  static onSelectResultsPage(resultsPage) {
    Store.reduce({
      type: constants.airports.searchResultsPage,
      payload: resultsPage,
    });
  }

  static onSelectResultsPerPage(resultsPerPage) {
    Store.reduce({
      type: constants.airports.searchResultsPerPage,
      payload: resultsPerPage,
    });
  }
}
export default AirportsDispatcher;