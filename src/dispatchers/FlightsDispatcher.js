import constants from "../resources/constants.json"
import Orchestration from "../Orchestration";
import RootReducer from "../reducers/RootReducer";

class FlightsDispatcher {
  static onFindAll() {
   RootReducer.reduce({type: constants.flights.request});

   setTimeout(() => {

    Orchestration.createRequest(
      constants.httpRequest.get,
      "flights",
      onError => {
       RootReducer.reduce({
          type: constants.flights.error,
          payload: onError
        });
      }, 
      httpResponseBody => {
       RootReducer.reduce({
          type: constants.flights.response,
          payload: httpResponseBody
        });
    });
  }, 500);
  }

  static onSearchFlights(payload) {
    RootReducer.reduce({
       type: constants.flights.request,
       payload: payload
     });
 
     Orchestration.createRequestWithBody(
       constants.httpRequest.put, 
       "flights/search", 
       payload,
       onError => {
        RootReducer.reduce({
           type: constants.flights.error,
         });
       }, 
       httpResponseBody => {
        if(httpResponseBody.error)
        {
          RootReducer.reduce({
            type: constants.flights.error,
            });
        }
        else{

        RootReducer.reduce({
           type: constants.flights.response,
           payload: {
             list: httpResponseBody,
             status: "SUCCESS"
           }
         });
        }
     });
  }



}
export default FlightsDispatcher;