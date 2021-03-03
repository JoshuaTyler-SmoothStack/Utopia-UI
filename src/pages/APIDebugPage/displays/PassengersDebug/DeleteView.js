// Libraries
import PassengersDispatcher from "../../../../dispatchers/PassengersDispatcher";
import Store from "../../../../reducers/Store";

// Components
import ChangeOperationReadout from "../ChangeOperationReadout";
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";

const DeleteView = () => {
  const { passengers } = Store.getState();

  const results = passengers.delete.results
  const resultsStatus = passengers.delete.resultsStatus;
  const selectedPassenger = passengers.selected;
  const status = passengers.delete.status;

  return(
    <FlexColumn>
      {status === "PENDING" && 
        <FlexColumn className="mt-5">
          <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
          name="Passenger" status={resultsStatus.passenger} result={results.passenger}/>
          
          <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
          name="Flights" status={resultsStatus.flights} result={results.flights}/>
          
          <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
          name="Guests" status={resultsStatus.guests} result={results.guests}/>
          
          <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
          name="Passengers" status={resultsStatus.passengers} result={results.passengers}/>

          <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
          name="Users" status={resultsStatus.users} result={results.users}/>
          <FlexRow>
            <button className="btn btn-light m-3"
              onClick={() => PassengersDispatcher.onCancel()}
            >
              Close
            </button>
          </FlexRow>
        </FlexColumn>
      }

      {status !== "PENDING" &&
        <FlexColumn>
          {/* Passenger */}
          <FlexColumn>
            <FlexRow>
              <div className="mt-3">
                <label className="form-label">Passenger ID</label>
                <input type="text" readOnly className="form-control" value={selectedPassenger.id}/>
              </div>
              <div className="mt-3 ml-3">
                <label className="form-label">Status</label>
                <input type="text" readOnly className="form-control" value={selectedPassenger.status}/>
              </div>
            </FlexRow>
              <div className="mt-3 w-100">
                <label className="form-label">Confirmation Code</label>
                <input type="text" readOnly className="form-control" value={selectedPassenger.confirmationCode}/>
              </div>
              <hr className="w-100"></hr>
          </FlexColumn>
          
          {/* Flight / Passenger */}
          <FlexRow className="mt-3">
            <div>
              <label className="form-label">Flight ID</label>
              <input type="text" readOnly className="form-control" value={selectedPassenger.flightId}/>
            </div>
            <div className="ml-3">
              <label className="form-label">Passenger ID</label>
              <input type="text" readOnly className="form-control" value={selectedPassenger.passengerId}/>
            </div>
            <hr className="w-100"></hr>
          </FlexRow>
          

          {/* User / Guest */}
          <FlexColumn>
            <FlexRow align={"start"} className="mt-3">
              <div className="mr-3">
                <label className="form-label">User ID</label>
                <input type="text" readOnly className="form-control" value={selectedPassenger.userId || "Not a user"}/>
              </div>
              <FlexColumn>
                <div>
                  <label className="form-label">Guest Email</label>
                  <input type="text" readOnly className="form-control" value={selectedPassenger.guestEmail || "No guests email available."}/>
                </div>
                <div className="mt-3">
                  <label className="form-label">Guest Phone</label>
                  <input type="text" readOnly className="form-control" value={selectedPassenger.guestPhone || "No guests phone available."}/>
                </div>
              </FlexColumn>
            </FlexRow>
            <hr className="w-100"></hr>
          </FlexColumn>
          

          {/* Buttons */}
          <FlexRow>
            <button className="btn btn-light m-3"
              onClick={() => PassengersDispatcher.onCancel()}
            >
              Cancel
            </button>
            <button className="btn btn-primary m-3"
              onClick={() => PassengersDispatcher.onDelete(selectedPassenger.id)}
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