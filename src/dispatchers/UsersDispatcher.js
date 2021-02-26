import constants from "../resources/constants.json"
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

}

// static onFindAll() {
//  Store.reduce({type: constants.users.request});

//   Orchestration.createRequest(
//     constants.httpRequest.get,
//     "/users",
//     onError => {
//      Store.reduce({
//         type: constants.users.error,
//         payload: onError
//       });
//     }, 
//     httpResponseBody => {
//      Store.reduce({
//         type: constants.users.response,
//         payload: httpResponseBody
//       });
//   });
// }

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
// }

export default UsersDispatcher;