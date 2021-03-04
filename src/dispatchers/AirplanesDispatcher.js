import constants from "../resources/constants.json";
import Orchestration from "../Orchestration";
import Store from "../reducers/Store";

class AirplanesDispatcher {

  static onCancel() {
    Store.reduce({ type: constants.airplanes.cancel });
  }

  static onCreate(typeId) {
    Store.reduce({ type: constants.airplanes.createRequest });
    Orchestration.createRequestWithBody(
      constants.httpRequest.post,
      "/airplanes",
      Number(typeId),
      (httpError) => {
        Store.reduce({
          type: constants.airplanes.error,
          payload: httpError,
        });
      },
      (httpResponseBody) => {
        if (httpResponseBody.error) {
          Store.reduce({
            type: constants.airplanes.error,
            payload: httpResponseBody.error,
          });
        } else {
          Store.reduce({
            type: constants.airplanes.createResponse,
            payload: httpResponseBody,
          });
        }
      }
    );
  }

  static onDelete(airplaneId) {
    Store.reduce({ type: constants.airplanes.deleteRequest });
    Orchestration.createRequest(
      constants.httpRequest.delete,
      "/airplanes/" + Number(airplaneId),
      (httpError) => {
        Store.reduce({
          type: constants.airplanes.error,
          payload: httpError,
        });
      },
      (httpResponseBody) => {
        if (httpResponseBody.error) {
          Store.reduce({
            type: constants.airplanes.error,
            payload: httpResponseBody.error,
          });
        } else {
          Store.reduce({
            type: constants.airplanes.deleteResponse,
            payload: httpResponseBody,
          });
        }
      }
    );
  }

  static onEdit(airplane, typeId, isRevert) {
    const newAirplane = {
      typeId : Number(typeId),
      id : Number(airplane.id)
    }

    Store.reduce({ type: constants.airplanes.editRequest });
    if(airplane.typeId !== typeId || isRevert) {
    Orchestration.createRequestWithBody(
      constants.httpRequest.put,
      "/airplanes",
      newAirplane,
      (httpError) => {
        Store.reduce({
          type: constants.airplanes.error,
          payload: httpError,
        });
      },
      (httpResponseBody) => {
        if (httpResponseBody.error) {
          Store.reduce({
            type: constants.airplanes.error,
            payload: httpResponseBody.error,
          });
        } else {
          Store.reduce({
            type: constants.airplanes.editResponse,
            payload: {
              results : httpResponseBody,
              resultsStatus : "SUCCESS"
            },
          });
        }
      }
    );} else {
      Store.reduce({
        type: constants.airplanes.editResponse,
        payload: {
          results : airplane,
          resultsStatus : "DISABLED"
        },
      });
    }
  }

  static onError(message) {
    Store.reduce({
      type: constants.airplanes.error,
      payload: message,
    });
  }

  static onFakeAPICall() {
    Store.reduce({ type: constants.airplanes.request });
    setTimeout(() => {
      const { airplanes } = Store.getState();
      Store.reduce({
        type: constants.airplanes.response,
        payload: airplanes.search.results,
      });
    }, 1500);
  }

  static onFindAll() {
    Store.reduce({ type: constants.airplanes.request });

    Orchestration.createRequest(
      constants.httpRequest.get,
      "/airplanes",
      (httpError) => {
        Store.reduce({
          type: constants.airplanes.error,
          payload: "Service temporarily unavailable.",
        });
      },
      (httpResponseBody) => {
        if (httpResponseBody.error) {
          Store.reduce({
            type: constants.airplanes.error,
            payload: httpResponseBody.error,
          });
        } else {
          Store.reduce({
            type: constants.airplanes.response,
            payload: httpResponseBody,
          });
        }
      }
    );
  }

  static onFindBy(searchText) {
    
    if (!searchText || searchText.trim() === "") {
      AirplanesDispatcher.onFindAll();
      return;
    }


    const formattedText = searchText.toLowerCase();
    if (!formattedText.includes("id=") && !formattedText.includes("type=")) {
      Store.reduce({
        type: constants.airplanes.error,
        payload: "Invalid search term!",
      });
      return;
    }

    let searchPath = formattedText.split("id=")[1];
    if (formattedText.includes("type=")) {
      const typeId = formattedText.split("type=")[1];
      searchPath = "type/" + typeId;
      if (isNaN(parseInt(typeId))) {
        Store.reduce({
          type: constants.airplanes.error,
          payload: "Invalid search term!",
        });
        return;
      }
    } else if (isNaN(parseInt(searchPath))) {
      Store.reduce({
        type: constants.airplanes.error,
        payload: "Invalid search term!",
      });
      return;
    }

    Store.reduce({ type: constants.airplanes.request });
    Orchestration.createRequest(
      constants.httpRequest.get,
      "/airplanes/" + searchPath,
      (httpError) => {
        Store.reduce({
          type: constants.airplanes.error,
          payload: "Service temporarily unavailable.",
        });
      },
      (httpResponseBody) => {
        if (httpResponseBody.error) {
          Store.reduce({
            type: constants.airplanes.error,
            payload: httpResponseBody.error,
          });
        } else {
          Store.reduce({
            type: constants.airplanes.response,
            payload: httpResponseBody,
          });
        }
      }
    );
  }

  static onPromptCreate() {
    Store.reduce({type: constants.airplanes.createPrompt});
  }

  static onPromptDelete(airplane) {
    Store.reduce({
      type: constants.airplanes.deletePrompt,
      payload: airplane
    });
  }

  static onPromptEdit(airplane) {
    Store.reduce({
      type: constants.airplanes.editPrompt,
      payload: airplane
    });
  }

  static onResultsPage(resultsPage) {
    Store.reduce({
      type: constants.airplanes.searchResultsPage,
      payload: resultsPage,
    });
  }

  static onResultsPerPage(resultsPerPage) {
    Store.reduce({
      type: constants.airplanes.searchResultsPerPage,
      payload: resultsPerPage,
    });
  }
}
export default AirplanesDispatcher;