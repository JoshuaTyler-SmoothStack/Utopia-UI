// Libraries
import BookingsDispatcher from "../../../../dispatchers/BookingsDispatcher";
import BookingsDebugDispatcher from "../../../../dispatchers/BookingsDebugDispatcher";
import Store from "../../../../reducers/Store";

// Components
import ChangeOperationReadout from "../ChangeOperationReadout";
import ErrorMessage from "../../../../components/ErrorMessage";
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";

const DeleteView = () => {
  const { bookings } = Store.getState();

  const error = bookings
    ? bookings.error
    : "Failed to read Booking state.";

  const selectedBooking = bookings
    ? bookings.selected
    : null;

  const results = bookings
    ? bookings.deleteResults
    : null;

  const resultsStatus = bookings
    ? bookings.deleteResultsStatus
    : null;

  const status = bookings
    ? bookings.deleteStatus
    : "ERROR";

  const wut = {
    booking: "PENDING",
    flights: "PENDING",
    guests: "PENDING",
    passengers: "PENDING",
    payments: "PENDING",
    users: "PENDING"
  };

  return(
    <FlexColumn>
      {status === "PENDING" && 
        <FlexColumn className="mt-5">
          <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
          name="Booking" status={resultsStatus.booking} result={results.booking}/>
          
          <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
          name="Flights" status={resultsStatus.flights} result={results.flights}/>
          
          <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
          name="Guests" status={resultsStatus.guests} result={results.guests}/>
          
          <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
          name="Passengers" status={resultsStatus.passengers} result={results.passengers}/>
          
          <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
          name="Payments" status={resultsStatus.payments} result={results.payments}/>

          <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
          name="Users" status={resultsStatus.users} result={results.users}/>
          <FlexRow>
            <button className="btn btn-light m-3"
              onClick={() => BookingsDispatcher.onCancel()}
            >
              Close
            </button>
            <button className="btn btn-danger m-3"
              onClick={() => {}}
            >
              Revert Changes (N.Y.I.)
            </button>
          </FlexRow>
        </FlexColumn>
      }

      {status !== "PENDING" && 
        <FlexColumn>
          {/* Booking */}
          <FlexColumn>
            <FlexRow>
              <div className="mt-3">
                <label className="form-label">Booking ID</label>
                <input type="text" readOnly className="form-control" value={selectedBooking.id}/>
              </div>
              <div className="mt-3 ml-3">
                <label className="form-label">Status</label>
                <input type="text" readOnly className="form-control" value={selectedBooking.status}/>
              </div>
            </FlexRow>
              <div className="mt-3 w-100">
                <label className="form-label">Confirmation Code</label>
                <input type="text" readOnly className="form-control" value={selectedBooking.confirmationCode}/>
              </div>
              <hr className="w-100"></hr>
          </FlexColumn>
          
          {/* Flight / Passenger */}
          <FlexRow className="mt-3">
            <div>
              <label className="form-label">Flight ID</label>
              <input type="text" readOnly className="form-control" value={selectedBooking.flightId}/>
            </div>
            <div className="ml-3">
              <label className="form-label">Passenger ID</label>
              <input type="text" readOnly className="form-control" value={selectedBooking.passengerId}/>
            </div>
            <hr className="w-100"></hr>
          </FlexRow>
          

          {/* User / Guest */}
          <FlexColumn>
            <FlexRow align={"start"} className="mt-3">
              <div className="mr-3">
                <label className="form-label">User ID</label>
                <input type="text" readOnly className="form-control" value={selectedBooking.userId || "Not a user"}/>
              </div>
              <FlexColumn>
                <div>
                  <label className="form-label">Guest Email</label>
                  <input type="text" readOnly className="form-control" value={selectedBooking.guestEmail || "No guest email available."}/>
                </div>
                <div className="mt-3">
                  <label className="form-label">Guest Phone</label>
                  <input type="text" readOnly className="form-control" value={selectedBooking.guestPhone || "No guest phone available."}/>
                </div>
              </FlexColumn>
            </FlexRow>
            <hr className="w-100"></hr>
          </FlexColumn>
          

          {/* Buttons */}
          <FlexRow>
            <button className="btn btn-light m-3"
              onClick={() => BookingsDispatcher.onCancel()}
            >
              Cancel
            </button>
            <button className="btn btn-info m-3"
              onClick={() => BookingsDebugDispatcher.onDeleteFake()}
            >
              Fake Delete
            </button>
            <button className="btn btn-primary m-3"
              onClick={() => BookingsDispatcher.onDelete(selectedBooking.id)}
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