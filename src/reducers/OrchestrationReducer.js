import constants from "../constants.json"

const OrchestrationReducer = (action) => {
  const orchestration = constants.orchestration;
  switch(action.type) {
    case orchestration.start:
      return {
        error: "",
        ready: false,
        status: "inactive"
      };
    
    case orchestration.ready:
      return {
        error: "",
        ready: true,
        status: "active"
      };
  }
};
export default OrchestrationReducer;

export const defaultOrchestrationState = {
  error: "",
  ready: false,
  status: "inactive"
};