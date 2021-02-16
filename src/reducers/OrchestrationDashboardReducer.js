import constants from "../constants.json";

const OrchestrationDashboardReducer = (action) => {
  const orchestrationDashboard = constants.orchestrationDashboard;
  switch (action.type) {
    case orchestrationDashboard.start:
      return {
        orchestrationDashboard: {
          error: "",
          ready: false,
          status: "inactive",
        },
      };

    case orchestrationDashboard.ready:
      break;
  }
};
export default OrchestrationDashboardReducer;

export const defaultOrchestrationDashboardState = {
  orchestratorMS: {
    error: "",
    isActive: false,
    location: "Not connected.",
    status: "inactive",
  },

  airplaneMS: {
    error: "",
    isActive: false,
    location: "Not connected.",
    status: "inactive",
  },

  airportMS: {
    error: "",
    isActive: false,
    location: "Not connected.",
    status: "inactive",
  },

  authenticationMS: {
    error: "",
    isActive: false,
    location: "Not connected.",
    status: "inactive",
  },

  bookingMS: {
    error: "",
    isActive: false,
    location: "Not connected.",
    status: "inactive",
  },

  flightMS: {
    error: "",
    isActive: false,
    location: "Not connected.",
    status: "inactive",
  },

  paymentMS: {
    error: "",
    isActive: false,
    location: "Not connected.",
    status: "inactive",
  },

  routeMS: {
    error: "",
    isActive: false,
    location: "Not connected.",
    status: "inactive",
  },

  userMS: {
    error: "",
    isActive: false,
    location: "Not connected.",
    status: "inactive",
  },
};