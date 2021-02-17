import constants from "../constants.json"
import Orchestration from "../Orchestration";

class AirportsDispatcher {

  static onFindAll(reduce) {
    console.log("called");
    reduce({
      type: constants.orchestration.airports,
      payload: {
        list: [],
        status: "PENDING"
      }
    });

    Orchestration.findAllAirports(
      onError => {
        reduce({
          type: constants.orchestration.airports,
          payload: {
            list: [],
            status: "ERROR"
          }
        });
      }, 
      onSuccess => {
        reduce({
          type: constants.orchestration.airports,
          payload: {
            list: onSuccess,
            status: "REGISTERED"
          }
        });
    });
  }
}
export default AirportsDispatcher;