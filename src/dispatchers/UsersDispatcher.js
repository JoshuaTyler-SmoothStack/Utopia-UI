import BaseDispatcher from "./BaseDispatcher";
import constants from "../resources/constants.json"

class UsersDispatcher extends BaseDispatcher {
  static apiPath = constants.users.apiPath;
  static constantsParent = constants.users;
}
export default UsersDispatcher;