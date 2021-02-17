import constants from "../resources/constants.json"

const OrchestrationReducer = (action) => {
  const orchestration = constants.orchestration;
  switch(action.type) {    
    case orchestration.contentNegotiation:
      return {
        contentNegotiation: action.payload || "JSON"
      };

    case orchestration.error:
      return {
        error: action.payload || "[ERROR]: 404 - Not Found!",
        ready: false,
        status: "INACTIVE"
      };

    case orchestration.ready:
      return {
        error: "",
        ready: true,
        status: "ACTIVE"
      };

    case orchestration.services:
      return {
        services: {
          list: action.payload.list,
          status: action.payload.status
        }
      };

    case orchestration.start:
      return {
        error: "",
        ready: false,
        status: "PENDING"
      };

    case orchestration.stop:
      return defaultOrchestrationState;
  }
};
export default OrchestrationReducer;

export const defaultOrchestrationState = {
  contentNegotiation: "JSON",
  error: "",
  ready: false,
  services: {
    list: [],
    status: "UNKNOWN",
  },
  status: "INACTIVE"
};