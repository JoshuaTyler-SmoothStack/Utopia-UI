import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import Store from "../reducers/Store";

class FlightsDispatcher {
  static onCancel() {
    Store.reduce({ type: constants.flights.cancel });
  }

  static onFindAll() {
   Store.reduce({type: constants.flights.request});

   Orchestration.createRequest(
    constants.httpRequest.get,
    "flights",
    (httpError) => {
      Store.reduce({
        type: constants.flights.error,
        payload: "Service temporarily unavailable.",
      });
    },
    (httpResponseBody) => {
      if (httpResponseBody.error) {
        Store.reduce({
          type: constants.flights.error,
          payload: httpResponseBody.error,
        });
      } else {
        Store.reduce({
          type: constants.flights.response,
          payload: httpResponseBody,
        });
      }
    }
  );
  }

  static onError(message) {
    Store.reduce({
      type: constants.flights.error,
      payload: message,
    });
  }

  static onFakeAPICall() {
    Store.reduce({ type: constants.flights.request });
    setTimeout(() => {
      const { flights } = Store.getState();
      Store.reduce({
        type: constants.flights.response,
        payload: flights.search.all.results,
      });
    }, 1500);
  }

  static onSearchOneWayFlights(destination, destinationDate, 
    origin, originDate, adults, seniors, children) {

    const travelerCount = (Number(adults) + Number(seniors) + Number(children)).toString();

    const filters = {};
    if(destination) filters.destination = destination;
    if(destinationDate) filters.destinationDate = destinationDate;
    if(originDate) filters.originDate = originDate;
    if(travelerCount) filters.travelerCount = travelerCount;

    console.log(filters);

    Store.reduce({type: constants.flights.request});
    Orchestration.createRequestWithBody(
    constants.httpRequest.post,
    "flights/search",
    filters,
    httpError => {
      Store.reduce({
        type: constants.flights.error,
        payload: httpError
      });
    }, 
    httpResponseBody => {
      if(httpResponseBody.error) {
        Store.reduce({
          type: constants.flights.error,
          payload: httpResponseBody.error
        });
      } else {
        Store.reduce({
          type: constants.flights.response,
          payload: httpResponseBody || []
        });
      }
    });
  }

  static onSearchRoundTripFlights(payload) {
    
    let paramOrig = "?orig=" + payload.origin;
    let paramDest = "&dest=" + payload.destination;
    let paramDate = "&date=" + payload.date;
    let paramTravelers = "&travelers=" + (parseInt(payload.adultSelect) + parseInt(payload.childrenSelect) + parseInt(payload.seniorSelect));
    Store.reduce({type: constants.flights.request});
  
     Orchestration.createRequest(
      constants.httpRequest.get,
      "flights/search" + paramOrig + paramDest + paramDate + paramTravelers,
      httpError => {
       Store.reduce({
          type: constants.flights.error,
          payload: httpError
        });
      }, 
      httpResponseBody => {
        if(httpResponseBody.error) {
          Store.reduce({
            type: constants.flights.error,
            payload: httpResponseBody.error
          });
        } else {
          Store.reduce({
            type: constants.flights.response,
            payload: httpResponseBody || []
          });
        }
    });


   //Return Flights
    var dayAfter = new Date(payload.date)
    dayAfter.setDate(dayAfter.getDate() + 1);
    paramOrig = "?orig=" + payload.destination;
    paramDest = "&dest=" + payload.origin;
    if(payload.dateReturn === "")
      paramDate = "&date=" + dayAfter.toISOString().split('T')[0];
    else{
      paramDate = "&date=" + payload.dateReturn;
    }

    paramTravelers = "&travelers=" + (parseInt(payload.adultSelect) + parseInt(payload.childrenSelect) + parseInt(payload.seniorSelect));
    Store.reduce({type: constants.flights.requestReturn});

     Orchestration.createRequest(
      constants.httpRequest.get,
      "flights/search" + paramOrig + paramDest + paramDate + paramTravelers,
      httpError => {
       Store.reduce({
          type: constants.flights.error,
          payload: httpError
        });
      }, 
      httpResponseBody => {
        Store.reduce({
          type: constants.flights.returnFlightResponse,
          payload : httpResponseBody
        });
    });
  }

  static onSelect(path, onError, onSuccess) {
    Store.reduce({ type: constants.bookings.request });
    Orchestration.createRequest(
      constants.httpRequest.get,
      "/flights/" + path,
      (httpError) => onError("Service temporarily unavailable."),
      (httpResponseBody) => {
        if(httpResponseBody.error) onError(httpResponseBody.error);
        else onSuccess(httpResponseBody);
      }
    );
  }

  static onPromptCreate(){
    Store.reduce({type: constants.flights.createPrompt});
  }

  static onPromptDelete(flightId){
    FlightsDispatcher.onSelect(flightId, 
    onError => Store.reduce({type: constants.flights.deleteError, payload: onError}),
    onSuccess => Store.reduce({type: constants.flights.deletePrompt}));
  }

  static onPromptEdit(flightId) {
    FlightsDispatcher.onSelect(flightId, 
      onError => Store.reduce({type: constants.flights.editError, payload: onError}),
      onSuccess => Store.reduce({type: constants.flights.editPrompt}));
    }

  static onResultsPage(resultsPage) {
    Store.reduce({
      type: constants.flights.searchResultsPage,
      payload: resultsPage,
    });
  }

  static onResultsPerPage(resultsPerPage) {
    Store.reduce({
      type: constants.flights.searchResultsPerPage,
      payload: resultsPerPage,
    });
  }

}
export default FlightsDispatcher;