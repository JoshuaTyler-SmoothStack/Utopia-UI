import constants from "./resources/constants.json"

class Orchestration {
  
  static contentType = "json";

  static createRequest(requestType, requestPath, payload, onError, onSuccess) {
    fetch("http://localhost:8080/" + requestPath, {
      headers: {
        "Accept": "application/" + Orchestration.contentType,
        "Content-Type": "application/" + Orchestration.contentType,
      },
      body: requestType !== constants.httpRequest.get 
      ? { payload }
      : null,
      method: requestType
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

    // // Overload without HTTP Body Payload
    // static createRequest(requestType, requestPath, onError, onSuccess) {
    //   Orchestration.createRequest(requestType, requestPath, null, onError, onSuccess);
    // }

  static validate(onError, onSuccess) {
    Orchestration.createRequest(constants.httpRequest.get, "actuator/health", null, 
    onError2 => {
      console.error("[ERROR] could not validate Orchestrator Service!");
      onError(onError2);
    }, onSuccess2 => {
      console.log("[INCOMING FROM SPRING] status: " + onSuccess2["status"]);
      onSuccess(onSuccess2);
    });
  }

  static findActiveServices(onError, onSuccess) {
    Orchestration.createRequest(constants.httpRequest.get, "services", null,
    onError2 => {
      onError(onError2);
    }, onSuccess2 => {
      const data = onSuccess2;
      console.log("[INCOMING FROM SPRING] services:\n" + data);
      onSuccess(data);
    });
  }
} 
export default Orchestration;