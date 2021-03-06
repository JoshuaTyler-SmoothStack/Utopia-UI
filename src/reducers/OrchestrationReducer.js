import BaseReducer from "./BaseReducer";
import OrchestrationDispatcher from "../dispatchers/OrchestrationDispatcher";

class OrchestrationReducer extends BaseReducer {
  static initialize(constantsParent, dispatcherAPIPath) {
    OrchestrationDispatcher.initialize(constantsParent, dispatcherAPIPath);
    this.constantsParent = constantsParent;
    return this;
  }

  static getDefaultReducerState() {
    return defaultOrchestrationState;
  }

  static reduce(action, state) {
    switch(action.type) {    
      case this.constantsParent.contentNegotiation:
        return {
          contentNegotiation: action.payload || "JSON"
        };
  
      case this.constantsParent.ready:
        return {
          error: "",
          ready: true,
          status: "SUCCESS"
        };
  
      case this.constantsParent.request:
        return {
          services: action.payload || [],
          status: "SUCCESS"
        };

      case this.constantsParent.services:
        return {services: action.payload || []};
  
      case this.constantsParent.start:
        return {
          error: "",
          ready: false,
          status: "PENDING"
        };
  
      case this.constantsParent.stop:
        return defaultOrchestrationState;
  
      default:
        console.error("Invalid action.type!", action);
        return null;
    }
  }
}
export default OrchestrationReducer;

export const defaultOrchestrationState = {
  contentNegotiation: "JSON",
  error: "",
  ready: false,
  results: [],
  services: [],
  status: "INACTIVE"
};