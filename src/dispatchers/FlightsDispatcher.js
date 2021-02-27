import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import Store from "../reducers/Store";

class FlightsDispatcher {
  static onFindAll() {
   Store.reduce({type: constants.flights.request});

   setTimeout(() => {

    Orchestration.createRequest(
      constants.httpRequest.get,
      "flights",
      httpError => {
       Store.reduce({
          type: constants.flights.error,
          payload: httpError
        });
      }, 
      httpResponseBody => {
       Store.reduce({
          type: constants.flights.response,
          payload: httpResponseBody
        });
    });
  }, 500);
  }

  static onSearchOneWayFlights(payload) {
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
       Store.reduce({
          type: constants.flights.response,
          payload : httpResponseBody
        });
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
       Store.reduce({
          type: constants.flights.response,
          payload : httpResponseBody
        });
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

}
export default FlightsDispatcher;