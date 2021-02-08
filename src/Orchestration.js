class Orchestration {
  
  static contentType = "json";

  static createRequest(requestPath, requestType, onError, onSuccess) {
    
    // Set requestType to Orchestration.contentType if not specified
    requestType = requestType || Orchestration.contentType;
    
    // Process the request
    fetch("http://localhost:8080/" + requestPath, {
      headers: {
        "Accept": "application/" + Orchestration.contentType,
        "Content-Type": "application/" + Orchestration.contentType,
      },
    })
    .then((response) => {
      if(Orchestration.contentType === "json") {
        return response.clone().json().catch(() => response.text());
      }
      return response.text();
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      console.error("[ERROR]: " + err);
      onError(err);
    });
  }

  static validate(onError, onSuccess) {
    Orchestration.createRequest("actuator/health", "json", onError2 => {
      console.error("[ERROR] could not validate Orchestrator Service!");
      onError(onError2);
    }, onSuccess2 => {
      console.log("[INCOMING FROM SPRING] status: " + onSuccess2["status"]);
      onSuccess(onSuccess2);
    });
  }

  static findActiveServices(onError, onSuccess) {
    Orchestration.createRequest("services", "text", onError2 => {
      onError(onError2);
    }, onSuccess2 => {
      const data = onSuccess2;
      console.log("[INCOMING FROM SPRING] services:\n" + data);
      onSuccess(data);
    });
  }

  static setContentType(contentType) {
    Orchestration.contentType = contentType;
  }

  // Airports
  static findAllAirports(onError, onSuccess) {
    Orchestration.createRequest("airports", null, onError2 => {
      onError(onError2);
    }, onSuccess2 => {
      onSuccess(onSuccess2);
    });
  }

  static findAirportByIataId(iataId, onError, onSuccess) {
    Orchestration.createRequest("airports/" + iataId, null, onError2 => {
      onError(onError2);
    }, onSuccess2 => {
      onSuccess(onSuccess2);
    });
  }

  // Routes
  static findAllRoutes(onError, onSuccess) {
    Orchestration.createRequest("routes", null, onError2 => {
      onError(onError2);
    }, onSuccess2 => {
      onSuccess(onSuccess2);
    });
  }

  // Users
  static findAllUsers(onError, onSuccess) {
    Orchestration.createRequest("users", null, onError2 => {
      onError(onError2);
    }, onSuccess2 => {
      onSuccess(onSuccess2);
    });
  }
} 
export default Orchestration;