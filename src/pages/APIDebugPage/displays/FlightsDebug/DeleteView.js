// Libraries
import FlightsDispatcher from "../../../../dispatchers/FlightsDispatcher";
import Store from "../../../../reducers/Store";

// Components
import ChangeOperationReadout from "../ChangeOperationReadout";
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";

const DeleteView = () => {
  const { flights } = Store.getState();

  const resultsStatus = flights.delete.resultsStatus;
  const selectedFlight = flights.selected;
  const status = flights.delete.status;

  return(
    <FlexColumn>
      {status === "PENDING" && 
        <FlexColumn className="mt-5">
          {/* Change Readout */}
          <ChangeOperationReadout 
            className="m-1" 
            style={{minHeight: "4rem"}} 
            name="Flight" 
            result={resultsStatus === "SUCCESS" ? "Successfully Deleted" : "Failed To Delete"}
            status={resultsStatus}
          />

          {/* Divider */}
          <hr className="w-100"></hr>

          {/* Button */}
          <FlexRow>
            <button className="btn btn-light m-3"
              onClick={() => {
                FlightsDispatcher.onCancel();
                FlightsDispatcher.onRequest();
              }}
            >
              Close
            </button>
          </FlexRow>
        </FlexColumn>
      }

      {status !== "PENDING" &&
        <FlexColumn>
          {/* Flight */}
          <FlexColumn>
            <FlexRow>
              <div className="mt-3">
                <label className="form-label">Flight ID</label>
                <input type="text" readOnly className="form-control" value={selectedFlight.flightId}/>
              </div>
              <div className="mt-3 ml-3">
                <label className="form-label">Airplane ID</label>
                <input type="text" readOnly className="form-control" value={selectedFlight.flightAirplane.airplaneId}/>
              </div>
            </FlexRow>
            <FlexRow>
              <div className="mt-3">
                <label className="form-label">Route ID</label>
                <input type="text" readOnly className="form-control" value={selectedFlight.flightRoute.routeId}/>
              </div>
              <div className="mt-3 ml-3">
                <label className="form-label">Departure</label>
                <input type="text" readOnly className="form-control" value={selectedFlight.flightDepartureTime}/>
              </div>
            </FlexRow>
            <FlexRow>
              <div className="mt-3">
                <label className="form-label">Origin</label>
                <input type="text" readOnly className="form-control" value={selectedFlight.flightRoute.routeOrigin.airportIataId}/>
              </div>
              <div className="mt-3 ml-3">
                <label className="form-label">Destination</label>
                <input type="text" readOnly className="form-control" value={selectedFlight.flightRoute.routeDestination.airportIataId}/>
              </div>
            </FlexRow>
          </FlexColumn>
          

          {/* Buttons */}
          <FlexRow>
            <button className="btn btn-light m-3"
              onClick={() => FlightsDispatcher.onCancel()}
            >
              Cancel
            </button>
            <button className="btn btn-primary m-3"
              onClick={() => FlightsDispatcher.onDelete("/" + selectedFlight.flightId)}
            >
              Confirm Delete (cannot be undone)
            </button>
          </FlexRow>
        </FlexColumn>
      }
    </FlexColumn>
  );
}
export default DeleteView;