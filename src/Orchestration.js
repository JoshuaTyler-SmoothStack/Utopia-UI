import Store from "./reducers/Store";
import constants from "./resources/constants.json";

class Orchestration {

  static contentType = "json";

  static httpRequest(requestType, requestPath, requestHeaders, requestBody, httpError, httpResponseBody) {

    const { authentication } = Store.getState();
    const authorization = (authentication.userToken || authentication.userLogin);

    // Content Negotiation
    const contentNegotiation = {
      "Accept": "application/" + Orchestration.contentType,
      "Content-Type": "application/" + Orchestration.contentType,
    };

    // Headers
    const headers = (!requestHeaders.hasOwnProperty("Authorization") && authorization)
      ? {Authorization: authorization, ...contentNegotiation, ...requestHeaders}
      : {...contentNegotiation, ...requestHeaders};

    // Body
    const body = (requestType !== constants.httpRequest.get 
      && requestType !== constants.httpRequest.delete)
      ? JSON.stringify(requestBody)
      : null;

    // Path
    const formattedRequestPath = requestPath.startsWith("/")
      ? requestPath 
      : "/" + requestPath;

    // Request
    fetch("https://hackzt9qgg.execute-api.us-east-1.amazonaws.com/dev" + formattedRequestPath, {
      headers,
      body,
      method: requestType,
    })
    .then((response) => {
      return Orchestration.contentType === "json"
        ? response.clone().json().catch(() => response.text())
        : response.text();
    })
    .then((data) => {
      httpResponseBody(data);
    })
    .catch((err) => {
      console.error("[ERROR]: " + err);
      httpError(err);
    });
  }

  static createRequest(requestType, requestPath, httpError, httpResponseBody) {
    Orchestration.httpRequest(requestType, requestPath, {}, {}, httpError, httpResponseBody);
  }

  static createRequestWithHeader(requestType, requestPath, requestHeader, httpError, httpResponseBody) {
    Orchestration.httpRequest(requestType, requestPath, requestHeader, {}, httpError, httpResponseBody);
  }

  static createRequestWithBody(requestType, requestPath, requestBody, httpError, httpResponseBody) {
    Orchestration.httpRequest(requestType, requestPath, {}, requestBody, httpError, httpResponseBody);
  }

  static validate(onError, onSuccess) {
    Orchestration.createRequest(constants.httpRequest.get, "actuator/health",
    onError2 => {
      console.error("[ERROR] could not validate Orchestrator Service!");
      onError(onError2);
    }, onSuccess2 => {
      console.log("[INCOMING FROM SPRING] status: " + onSuccess2["status"]);
      onSuccess(onSuccess2);
    });
  }
}
export default Orchestration;
