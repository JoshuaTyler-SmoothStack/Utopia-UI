import BaseDispatcher from "./BaseDispatcher";
import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import Store from "../reducers/Store";

class OrchestrationDispatcher extends BaseDispatcher {

  static apiPath = constants.orchestration.apiPath;
  static constantsParent = constants.orchestration;

  static onContentNegotiation(payload) {
    Store.reduce({
      type: this.constantsParent.contentNegotiation,
      payload: payload,
    });
  }

  static onFindActiveServices() {
    OrchestrationDispatcher.onRequestThenCallback(
      "/services", 
      httpError => {
        Store.reduce({
          type: this.constantsParent.error,
          payload: httpError,
        });
      }, httpResponseBody => {
        console.log("[INCOMING FROM SPRING] services:\n" + httpResponseBody);
        Store.reduce({
          type: this.constantsParent.services,
          payload: httpResponseBody
        });
    });
  }

  static onStart() {
    Store.reduce({ type: this.constantsParent.start });
    Orchestration.validate(
      (httpError) => {
        Store.reduce({
          type: this.constantsParent.error,
          payload: httpError,
        });
      },
      (httpResponseBody) => {
        Store.reduce({
          type: this.constantsParent.ready,
          payload: httpResponseBody,
        });
      }
    );
  }

  static onStop() {
    Store.reduce({ type: this.constantsParent.stop });
  }
}
export default OrchestrationDispatcher;