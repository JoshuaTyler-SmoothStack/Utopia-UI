import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import Store from "../reducers/Store";

class AirplanesDispatcher {

  static onFindAll() {
    Store.reduce({type: constants.airplanes.request});

    Orchestration.createRequest(
      constants.httpRequest.get,
      "airplanes",
      onError => {
        Store.reduce({
          type: constants.airplanes.error,
          payload: onError
        });
      }, 
      httpResponseBody => {
        Store.reduce({
          type: constants.airplanes.response,
          payload: httpResponseBody
        });
    });
  }

  static onFindBy(searchText) {
    
    if(!searchText || searchText.trim() === "") {
      AirplanesDispatcher.onFindAll();
      return;
    }
    
    const formattedText = searchText.toLowerCase();
    if(!formattedText.includes("id=") && !formattedText.includes("type=")){
      Store.reduce({
        type: constants.airplanes.searchError,
        payload: "Invalid search term!",
      });
      return;
    }

    let searchPath = formattedText.split("id=")[1];
    if(formattedText.includes("type=")) {
      searchPath = "type/" +
      formattedText.split("type=")[1];
    } else if(isNaN(parseInt(searchPath))) {
      Store.reduce({
        type: constants.airplanes.searchError,
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
          payload: "Connection failed.",
        });
      },
      (httpResponseBody) => {
        if(httpResponseBody.error) {
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
}
export default AirplanesDispatcher;