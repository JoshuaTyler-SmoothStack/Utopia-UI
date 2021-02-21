import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import RootReducer from "../reducers/RootReducer";

class OrchestrationDispatcher {
  
  static onContentNegotiation(payload) {
   RootReducer.reduce({
      type: constants.orchestration.contentNegotiation, 
      payload: payload
    });
  }

  static onServices() {
   RootReducer.reduce({
      type: constants.orchestration.services,
      payload: {
        list: [],
        status: "PENDING"
      }
    });

    Orchestration.findActiveServices(
      onError => {
       RootReducer.reduce({
          type: constants.orchestration.services,
          payload: {
            list: [],
            status: "ERROR"
          }
        });
      }, 
      httpResponseBody => {
       RootReducer.reduce({
          type: constants.orchestration.services,
          payload: {
            list: httpResponseBody,
            status: "REGISTERED"
          }
        });
    });
  }

  static onStart() {
   RootReducer.reduce({type: constants.orchestration.start});
    Orchestration.validate(
      onError => {
     RootReducer.reduce({
        type: constants.orchestration.error, 
        payload: onError
      });
    }, httpResponseBody => {
     RootReducer.reduce({
        type: constants.orchestration.ready, 
        payload: httpResponseBody
      });
    });
  }

  static onStop() {
   RootReducer.reduce({type: constants.orchestration.stop});
  }
}
export default OrchestrationDispatcher;