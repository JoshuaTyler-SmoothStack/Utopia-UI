import constants from "../resources/constants.json";
import Orchestration from "../Orchestration";
import Store from "../reducers/Store";
import axios from 'axios';


const API_URL = 'http://localhost:8080/users/';

class UsersDispatcher {



  static createAccount(newUser) {
    return axios.post(API_URL, JSON.stringify(newUser),
      { headers: { 'Content-Type': 'application/json; charset=UTF-8' } });
  };

  static forgotPassword(email) {
    return axios.post(API_URL + 'forgot-password', JSON.stringify(email),
      { headers: { 'Content-Type': 'application/json; charset=UTF-8' } });
  };

  static verifyPasswordRecoveryToken(token) {
    return axios.post(API_URL + 'forgot-password/verify-token', JSON.stringify(token),
      { headers: { 'Content-Type': 'application/json; charset=UTF-8' } });
  };

  static changePassword(data) {
    return axios.post(API_URL + 'forgot-password/recover', JSON.stringify(data),
      { headers: { 'Content-Type': 'application/json; charset=UTF-8' } });
  }



  static onCancel() {
    Store.reduce({ type: constants.users.cancel });
  }

  static onCreate(iataId, city) {
    Store.reduce({ type: constants.users.createRequest });
  }

  static onDelete(userId) {
    Store.reduce({ type: constants.users.deleteRequest });
  }

  static onError(message) {
    Store.reduce({
      type: constants.users.error,
      payload: message,
    });
  }

  static onFakeAPICall() {
    Store.reduce({ type: constants.users.request });
    setTimeout(() => {
      const { users } = Store.getState();
      Store.reduce({
        type: constants.users.response,
        payload: users.search.results,
      });
    }, 1500);
  }


  static onRequest() {
    Store.reduce({ type: constants.users.request });

    Orchestration.createRequest(
    constants.httpRequest.get,
    "/users",

    onError => {
      Store.reduce({
        type: constants.users.error,
        payload: onError
      });
    },
    httpResponseBody => {
      Store.reduce({
        type: constants.users.response,
        payload: httpResponseBody
      });
    });
  }

  static onSearchAndFilter(searchText) {
    
    if (!searchText || searchText.trim() === "") {
      UsersDispatcher.onRequest();
      return;
    }


    const formattedText = searchText.toLowerCase();
    if (!formattedText.includes("iata=") && !formattedText.includes("city=")) {
      Store.reduce({
        type: constants.users.error,
        payload: "Invalid search term!",
      });
      return;
    }

    let searchPath = formattedText.split("iata=")[1];
    if (formattedText.includes("city=")) {
      const typeId = formattedText.split("city=")[1];
      searchPath = "/search?city=" + typeId;
    }

    Store.reduce({ type: constants.users.request });
    Orchestration.createRequest(
      constants.httpRequest.get,
      "/users/" + searchPath,
      (httpError) => {
        Store.reduce({
          type: constants.users.error,
          payload: "Service temporarily unavailable.",
        });
      },
      (httpResponseBody) => {
        if (httpResponseBody.error) {
          Store.reduce({
            type: constants.users.error,
            payload: httpResponseBody.error,
          });
        } else {
          Store.reduce({
            type: constants.users.response,
            payload: httpResponseBody,
          });
        }
      }
    );
  }

  static onPromptCreate() {
    Store.reduce({type: constants.users.createPrompt});
  }

  static onPromptDelete(user) {
    Store.reduce({
      type: constants.users.deletePrompt,
      payload: user
    });
  }

  static onSelectResultsPage(resultsPage) {
    Store.reduce({
      type: constants.users.searchResultsPage,
      payload: resultsPage,
    });
  }

  static onSelectResultsPerPage(resultsPerPage) {
    Store.reduce({
      type: constants.users.searchResultsPerPage,
      payload: resultsPerPage,
    });

  }

  // static createAccount() {
  //   const newUser = {
  //     firstName: "what",
  //     lastName: "how",
  //     email: "yoyo@gmail.com",
  //     password: "wyeasfhjl",
  //     phone: "59987453",
  //   };

  //   Store.reduce({ type: constants.authentication.createAccountRequest });

  //   Orchestration.createRequestWithBody(
  //     constants.httpRequest.post,
  //     "/users",
  //     newUser,
  //     onError => {
  //       Store.reduce({
  //         type: constants.authentication.createAccountError,
  //         payload: onError
  //       });
  //     },
  //     httpResponseBody => {
  //       Store.reduce({
  //         type: constants.authentication.createAccountSuccess,
  //         payload: httpResponseBody
  //       });
  //     });

}
export default UsersDispatcher;