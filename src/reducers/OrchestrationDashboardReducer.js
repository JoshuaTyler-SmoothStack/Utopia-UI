import constants from "../constants.json";

const OrchestrationDashboardReducer = (action) => {
  const orchestrationDashboard = constants.orchestrationDashboard;
  switch (action.type) {
    case orchestrationDashboard.start:
      return {
        orchestrationDashboard: {
          error: "",
          ready: false,
          status: "INACTIVE",
        },
      };

    case orchestrationDashboard.ready:
      break;
  }
};
export default OrchestrationDashboardReducer;

export const defaultOrchestrationDashboardState = {
  orchestratorMS: {
    location: "http://localhost:8080",
  },

  airplaneMS: {
    error: "",
    isActive: false,
    location: "Not connected.",
    status: "INACTIVE",
  },

  airportMS: {
    error: "",
    isActive: false,
    location: "Not connected.",
    status: "INACTIVE",
  },

  authenticationMS: {
    error: "",
    isActive: false,
    location: "Not connected.",
    status: "INACTIVE",
  },

  bookingMS: {
    error: "",
    isActive: false,
    location: "Not connected.",
    status: "INACTIVE",
  },

  flightMS: {
    error: "",
    isActive: false,
    location: "Not connected.",
    status: "INACTIVE",
  },

  paymentMS: {
    error: "",
    isActive: false,
    location: "Not connected.",
    status: "INACTIVE",
  },

  routeMS: {
    error: "",
    isActive: false,
    location: "Not connected.",
    status: "INACTIVE",
  },

  userMS: {
    error: "",
    isActive: false,
    location: "Not connected.",
    status: "INACTIVE",
  },
};