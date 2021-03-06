import BaseDispatcher from "./BaseDispatcher";
import constants from "../resources/constants.json"

class FlightsDispatcher extends BaseDispatcher {
  static apiPath = constants.flights.apiPath;
  static constantsParent = constants.flights;
}
export default FlightsDispatcher;