import BaseDispatcher from "./BaseDispatcher";
import Constants from "../resources/constants.json";
import Store from "../reducers/Store";
import Orchestration from "../Orchestration";
import AuthenticationDispatcher from "./AuthenticationDispatcher";

class UsersDispatcher extends BaseDispatcher {
  static apiPath = Constants.users.apiPath;
  static apiPathManage = Constants.users.apiPathManage;
  static constantsParent = Constants.users;

  static onEdit(httpPath, httpBody) {
    Store.reduce({ type: this.getConstantsParent().requestEdit });
    Orchestration.createRequestWithBody(
      Constants.httpRequest.put,
      this.getApiPath() + (httpPath || ""),
      httpBody,
      (httpError) => this.onError(httpError),
      (httpResponseBody) => {
        if (httpResponseBody.error) {
          Store.reduce({
            type: this.getConstantsParent().responseEdit,
            payload: {
              results: httpResponseBody.error,
              resultsStatus: "ERROR",
            },
          });
        } else {
          Store.reduce({
            type: this.getConstantsParent().responseEdit,
            payload: {
              results: httpResponseBody,
              resultsStatus: "SUCCESS",
            },
          });
          AuthenticationDispatcher.onLoginWithToken(httpResponseBody.userToken);
        }
      }
    );
  }

  static onRequest(httpPath) {
    Store.reduce({ type: this.getConstantsParent().request });
    Orchestration.createRequest(
      Constants.httpRequest.get,
      this.apiPathManage + (httpPath || ""),
      (httpError) => this.onError(httpError),
      (httpResponseBody) => this.onResponse(httpResponseBody)
    );
  }

  static onRequestThenCallback(httpPath, onError, onSuccess) {
    Store.reduce({ type: this.getConstantsParent().request });
    Orchestration.createRequest(
      Constants.httpRequest.get,
      this.apiPathManage + (httpPath || ""),
      (httpError) => onError(httpError),
      (httpResponseBody) => {
        if (httpResponseBody.error) onError(httpResponseBody.error);
        else onSuccess(httpResponseBody);
      }
    );
  }

  static onHealth() {
    this.onRequestThenCallback(
      "/health",
      (/*onError*/) => {
        Store.reduce({
          type: Constants.users.health,
          payload: "UNHEALTHY",
        });
      },
      (/*onSuccess*/) => {
        Store.reduce({
          type: Constants.users.health,
          payload: "HEALTHY",
        });
      });
  }
}
export default UsersDispatcher;
