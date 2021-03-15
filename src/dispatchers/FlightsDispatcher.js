import BaseDispatcher from "./BaseDispatcher";
import constants from "../resources/constants.json"
import Store from "../reducers/Store";
import Orchestration from "../Orchestration";

class FlightsDispatcher extends BaseDispatcher {
  static apiPath = constants.flights.apiPath;
  static constantsParent = constants.flights;

  static onSearchAndFilter(httpPath, searchTermsString, filtersObject) {
    filtersObject = {
      "flightRouteDestinationIataId": filtersObject.destination.split(":")[0],
      "flightRouteOriginIataId": filtersObject.origin.split(":")[0],
    };
    
    const activeFilters = {};
    if(searchTermsString) activeFilters.searchTerms = searchTermsString;
    if(filtersObject) {
      for(const key in filtersObject) {
        if(filtersObject[key] !== null && filtersObject[key] !== undefined) {
          activeFilters[key] = filtersObject[key];
        }
      }
    }

    Store.reduce({ type: this.getConstantsParent().request });
    Orchestration.createRequestWithBody(
      constants.httpRequest.post,
      this.getApiPath() + httpPath,
      activeFilters,
      (httpError) => {
        Store.reduce({
          type: this.getConstantsParent().error,
          payload: httpError,
        });
      },
      (httpResponseBody) => {
        if(httpResponseBody.error) {
          Store.reduce({
            type: this.getConstantsParent().error,
            payload: httpResponseBody.error,
          });
        } else {
          Store.reduce({
            type: this.getConstantsParent().response,
            payload: httpResponseBody,
          });
        }
      }
    );
  }
}
export default FlightsDispatcher;