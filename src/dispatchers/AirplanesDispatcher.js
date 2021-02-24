import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import RootReducer from "../reducers/RootReducer";

class AirplanesDispatcher {

  static onFindAll() {
    RootReducer.reduce({type: constants.airplanes.request});

    Orchestration.createRequest(
      constants.httpRequest.get,
      "airplanes",
      onError => {
        RootReducer.reduce({
          type: constants.airplanes.error,
          payload: onError
        });
      }, 
      httpResponseBody => {
        RootReducer.reduce({
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
      RootReducer.reduce({
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
      RootReducer.reduce({
        type: constants.airplanes.searchError,
        payload: "Invalid search term!",
      });
      return;
    }
    
    RootReducer.reduce({ type: constants.airplanes.request });
    Orchestration.createRequest(
      constants.httpRequest.get,
      "/airplanes/" + searchPath,
      (httpError) => {
        RootReducer.reduce({
          type: constants.airplanes.error,
          payload: "Connection failed.",
        });
      },
      (httpResponseBody) => {
        if(httpResponseBody.error) {
          RootReducer.reduce({
            type: constants.airplanes.error,
            payload: httpResponseBody.error,
          });
        } else {
          RootReducer.reduce({
            type: constants.airplanes.response,
            payload: httpResponseBody,
          });
        }
      }
    );
  }
}
export default AirplanesDispatcher;