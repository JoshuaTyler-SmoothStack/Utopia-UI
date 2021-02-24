import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import Store from "../reducers/Store";

class OrchestrationDispatcher {
  
  static onContentNegotiation(payload) {
   Store.reduce({
      type: constants.orchestration.contentNegotiation, 
      payload: payload
    });
  }

  static onServices() {
   Store.reduce({
      type: constants.orchestration.services,
      payload: {
        list: [],
        status: "PENDING"
      }
    });

    Orchestration.findActiveServices(
      onError => {
       Store.reduce({
          type: constants.orchestration.services,
          payload: {
            list: [],
            status: "ERROR"
          }
        });
      }, 
      httpResponseBody => {
       Store.reduce({
          type: constants.orchestration.services,
          payload: {
            list: httpResponseBody,
            status: "REGISTERED"
          }
        });
    });
  }

  static onStart() {
   Store.reduce({type: constants.orchestration.start});
    Orchestration.validate(
      onError => {
     Store.reduce({
        type: constants.orchestration.error, 
        payload: onError
      });
    }, httpResponseBody => {
     Store.reduce({
        type: constants.orchestration.ready, 
        payload: httpResponseBody
      });
    });
  }

  static onStop() {
   Store.reduce({type: constants.orchestration.stop});
  }
}
export default OrchestrationDispatcher;