import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";

class OrchestrationDispatcher {
  
  static onContentNegotiation(reduce, payload) {
    reduce({
      type: constants.orchestration.contentNegotiation, 
      payload: payload
    });
  }

  static onServices(reduce) {
    reduce({
      type: constants.orchestration.services,
      payload: {
        list: [],
        status: "PENDING"
      }
    });

    Orchestration.findActiveServices(
      onError => {
        reduce({
          type: constants.orchestration.services,
          payload: {
            list: [],
            status: "ERROR"
          }
        });
      }, 
      onSuccess => {
        reduce({
          type: constants.orchestration.services,
          payload: {
            list: onSuccess,
            status: "REGISTERED"
          }
        });
    });
  }

  static onStart(reduce) {
    reduce({type: constants.orchestration.start});
    Orchestration.validate(
      onError => {
      reduce({
        type: constants.orchestration.error, 
        payload: onError
      });
    }, onSuccess => {
      reduce({
        type: constants.orchestration.ready, 
        payload: onSuccess
      });
    });
  }

  static onStop(reduce) {
    reduce({type: constants.orchestration.stop});
  }
}
export default OrchestrationDispatcher;