import Store from "./reducers/Store";
import constants from "./resources/constants.json"

class Orchestration {

  static contentType = "json";

  static httpRequest(requestType, requestPath, requestHeaders, requestBody, httpError, httpResponseBody) {

    const { authentication } = Store.getState();
    const authorization = { "Authorization": (authentication.userToken || authentication.userLogin) };

    const contentNegotiation = {
      "Accept": "application/" + Orchestration.contentType,
      "Content-Type": "application/" + Orchestration.contentType
    };

    const headers = requestHeaders.hasOwnProperty("Authorization")
      ? { ...contentNegotiation, ...requestHeaders }
      : { ...authorization, ...contentNegotiation, ...requestHeaders };

    console.log(headers)

    const body = (requestType !== constants.httpRequest.get && requestType !== constants.httpRequest.delete)
      ? JSON.stringify(requestBody)
      : null;

    const formattedRequestPath = requestPath.startsWith("/") ? requestPath : "/" + requestPath;
    fetch("http://localhost:8080" + formattedRequestPath, {
      headers: headers,
      body: body,
      method: requestType
    })
      .then((response) => {
        if (Orchestration.contentType === "json") {
          return response.clone().json().catch(() => response.text());
        }
        return response.text();
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