// Libraries
import BookingsDispatcher from "../../../../dispatchers/BookingsDispatcher";
import RootReducer from "../../../../reducers/RootReducer";

// Components
import ErrorMessage from "../../../../components/ErrorMessage";
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";

const DeleteView = () => {
  const { bookings } = RootReducer.getState();

  const error = bookings
    ? bookings.error
    : "Failed to read Booking state.";

  const selectedBooking = bookings
    ? bookings.selected
    : null;

  const status = bookings
    ? bookings.status
    : "ERROR";

  return (status === "ERROR"
    
    // Error
    ? <FlexColumn>
        <ErrorMessage>{error}</ErrorMessage>
      </FlexColumn>

    // Delete Preview
    : <FlexColumn>
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
          <button className="btn btn-primary m-3"
            onClick={() => BookingsDispatcher.onDelete(selectedBooking.id)}
          >
            Confirm Delete (cannot be undone)
          </button>
        </FlexRow>
      </FlexColumn>
  );
}
export default DeleteView;