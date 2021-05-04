import BaseDispatcher from "./BaseDispatcher";
import Constants from "../resources/constants.json";
import Store from "../reducers/Store";
import Orchestration from "../Orchestration";

class FlightsDispatcher extends BaseDispatcher {
  static apiPath = Constants.flights.apiPath;
  static constantsParent = Constants.flights;

  static onSearchAndFilter(httpPath, searchTermsString, filtersObject) {
    Store.reduce({ type: this.getConstantsParent().request });

    if(filtersObject.destination) {
      filtersObject.flightRouteDestinationIataId = filtersObject.destination.split(":")[0];
    }

    if(filtersObject.origin) {
      filtersObject.flightRouteOriginIataId = filtersObject.origin.split(":")[0];
    }

    if(filtersObject.departureTimeBefore) {
      filtersObject.flightDepartureTimeBefore = filtersObject.departureTimeBefore.replace("T", " ") + ":00";
    }

    if(filtersObject.departureTimeAfter) {
      filtersObject.flightDepartureTimeAfter = filtersObject.departureTimeAfter.replace("T", " ") + ":00";
    }

    const activeFilters = {};
    if(searchTermsString) activeFilters.searchTerms = searchTermsString;
    if(filtersObject) {
      for(const key in filtersObject) {
        if(filtersObject[key] !== null && filtersObject[key] !== undefined) {
          activeFilters[key] = filtersObject[key];
        }
      }
    }

    Orchestration.createRequestWithBody(
      Constants.httpRequest.post,
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
          this.onSelectItemsPage(1);
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
