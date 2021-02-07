class Orchestration {
  
  static contentType = "json";

  static createRequest(requestPath, onError, onSuccess) {
    fetch("http://localhost:8080/" + requestPath, {
      headers: {
        "Accept": "application/" + Orchestration.contentType,
        "Content-Type": "application/" + Orchestration.contentType,
      },
    })
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      console.error("[ERROR]: " + err);
      onError(err);
    });
  }

  static validate(onError, onSuccess) {
    Orchestration.createRequest("actuator/health", onError2 => {
      console.error("[ERROR] could not validate Orchestrator Service!");
      onError(onError2);
    }, onSuccess2 => {
      console.log("[INCOMING FROM SPRING] status: " + onSuccess2["status"]);
      onSuccess(onSuccess2);
    });
  }

  static findActiveServices(onError, onSuccess) {
    Orchestration.createRequest("services", onError2 => {
      onError(onError2);
    }, onSuccess2 => {
      console.log("[INCOMING FROM SPRING] services:\n" + onSuccess2);
      onSuccess(onSuccess2);
    });
  }

  static setContentType(contentType) {
    Orchestration.contentType = contentType;
  }

  // Airports
  static findAllAirports(onError, onSuccess) {
    Orchestration.createRequest("airports", onError2 => {
      onError(onError2);
    }, onSuccess2 => {
      onSuccess(onSuccess2);
    });
  }

  static findAirportByIataId(iataId, onError, onSuccess) {
    Orchestration.createRequest("airports/" + iataId, onError2 => {
      onError(onError2);
    }, onSuccess2 => {
      onSuccess(onSuccess2);
    });
  }

  // Routes
  static findAllRoutes(onError, onSuccess) {
    Orchestration.createRequest("routes", onError2 => {
      onError(onError2);
    }, onSuccess2 => {
      onSuccess(onSuccess2);
    });
  }

  // Users
  static findAllUsers(onError, onSuccess) {
    Orchestration.createRequest("users", onError2 => {
      onError(onError2);
    }, onSuccess2 => {
      onSuccess(onSuccess2);
    });
  }
} 
export default Orchestration;