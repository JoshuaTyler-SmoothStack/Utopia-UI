// Libraries
import React, { Component } from 'react';
import Store from '../../../../reducers/Store';
import BookingsDispatcher from "../../../../dispatchers/BookingsDispatcher";

// Components
import ErrorMessage from "../../../../components/ErrorMessage";
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";

class EditView extends Component {
  constructor(props) {
    super(props);

    const { bookings } = Store.getState();
    this.state = {

    };
  }
  render() { 
    const { bookings } = Store.getState();
    const { editingValues } = this.state;

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

    // Edit Preview
    : <FlexColumn>
        {/* Booking */}
        <FlexColumn>
          <FlexRow>
            <div className="mt-3" style={{width:"14rem"}}>
              <label className="form-label">Booking ID</label>
              <input type="text" readOnly className="form-control" value={selectedBooking.id}/>
            </div>
            <div className="mt-3 ml-3" style={{width:"14rem"}}>
              <label className="form-label">Status</label>
              <input type="number" min="0" max="4" className="form-control" defaultValue={selectedBooking.status}
                onChange={(e) => this.setState({editingValues: {...editingValues, status: e.target.value}})}
              />
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
          <div style={{width:"14rem"}}>
            <label className="form-label">Flight ID</label>
            <input type="number" min="1" className="form-control" defaultValue={selectedBooking.flightId}
              onChange={(e) => this.setState({editingValues: {...editingValues, flightId: e.target.value}})}
            />
          </div>
          <div className="ml-3" style={{width:"14rem"}}>
            <label className="form-label">Passenger ID</label>
            <input type="number" min="1" className="form-control" defaultValue={selectedBooking.passengerId}
              onChange={(e) => this.setState({editingValues: {...editingValues, passengerId: e.target.value}})}
            />
          </div>
          <hr className="w-100"></hr>
        </FlexRow>
        

        {/* User / Guest */}
        <FlexColumn>
          <FlexRow align={"start"} className="mt-3">
            <div className="mr-3" style={{width:"14rem"}}>
              <label className="form-label">User ID</label>
              <input type="number" min="1" className="form-control"
                defaultValue={selectedBooking.userId || ""}
                placeholder={selectedBooking.userId ? undefined : "Not a user"}
                onChange={(e) => this.setState({editingValues: {...editingValues, userId: e.target.value}})}
              />
            </div>
            <FlexColumn>
              <div style={{width:"14rem"}}>
                <label className="form-label">Guest Email</label>
                <input type="email" className="form-control" 
                  defaultValue={selectedBooking.guestEmail || ""}
                  placeholder={!selectedBooking.guestEmail ? undefined : "No guest email available."}
                  onChange={(e) => this.setState({editingValues: {...editingValues, guestEmail: e.target.value}})}
                />
              </div>
              <div className="mt-3" style={{width:"14rem"}}>
                <label className="form-label">Guest Phone</label>
                <input type="phone" className="form-control" 
                  defaultValue={selectedBooking.guestPhone || ""}
                  placeholder={!selectedBooking.guestPhone ? undefined : "No guest phone available."}
                  onChange={(e) => this.setState({editingValues: {...editingValues, guestPhone: e.target.value}})}
                />
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
          <button className="btn btn-danger m-3"
            onClick={() => BookingsDispatcher.onEdit(selectedBooking, editingValues)}
          >
            Save Changes
          </button>
        </FlexRow>
      </FlexColumn>
    );
  }
}
export default EditView;