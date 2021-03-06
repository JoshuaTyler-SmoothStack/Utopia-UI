// Libraries
import React from 'react';
import Store from '../../../../reducers/Store';
import BookingsDispatcher from "../../../../dispatchers/BookingsDispatcher";

// Components
import ChangeOperationReadout from '../ChangeOperationReadout';
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";


const EditView = (props) => {
  const { bookings } = Store.getState();
  // const results = bookings.delete.results
  const resultsStatus = bookings.delete.resultsStatus;
  // const resultsPending = resultsStatus === "PENDING";
  const selectedBooking = bookings.selected;
  const status = bookings.delete.status;

  const bookingId = selectedBooking.bookingId || "ERROR - INVALID";
  const bookingConfirmationCode = selectedBooking.bookingConfirmationCode || "ERROR - INVALID";
  const bookingPassengerId = selectedBooking.passengerId || "unkown";
  const bookingStatus = (selectedBooking.bookingStatus || "INACTIVE");
  const bookingFlightId = (selectedBooking.bookingFlightId || "unkown");
  const bookingUserId = (selectedBooking.bookingUserId || "unkown");
  const bookingGuestEmail = (selectedBooking.bookingGuestEmail || "unkown");
  const bookingGuestPhone = (selectedBooking.bookingGuestPhone || "unkown");

  return (
    <FlexColumn>
      {(status === "PENDING" || status === "ERROR") && 
      <FlexColumn className="mt-5">
        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Booking" 
          result={resultsStatus === "SUCCESS" ? "Successfully Deleted" : "Failed To Delete"}
          status={resultsStatus}
        />
        
        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Flights" 
          result={resultsStatus === "SUCCESS" ? "Successfully Deleted" : "Failed To Delete"}
          status={resultsStatus}
        />
        
        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Guest Contact" 
          result={resultsStatus === "SUCCESS" ? "Successfully Deleted" : "Failed To Delete"}
          status={resultsStatus}
        />
        
        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Passengers" 
          result={"N/A"}
          status={"DISABLED"} 
        />

        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Users" 
          result={resultsStatus === "SUCCESS" ? "Successfully Deleted" : "Failed To Delete"}
          status={resultsStatus}
        />

        <FlexRow>
          <button className="btn btn-light m-3"
            onClick={() => {
              BookingsDispatcher.onCancel();
              BookingsDispatcher.onRequest();
            }}
          >
            Close
          </button>
        </FlexRow>
      </FlexColumn>}


      {(status !== "ERROR" && status !== "PENDING") &&
        <FlexColumn className="form-group row w-100">
          {/* Booking */}
          <div className="col-12 col-md-8">
            <FlexRow className="w-100 mt-3" wrap="no-wrap">
              <div style={{width:"47.5%"}}>
                <label className="form-label">Booking ID</label>
                <input 
                  className="form-control" 
                  readOnly 
                  type="text"
                  value={bookingId}
                />
              </div>
              <div className="ml-auto" style={{width:"47.5%"}}>
                <label className="form-label">Status</label>
                <input 
                  className="form-control" 
                  readOnly 
                  type="text" 
                  value={bookingStatus}
                />
              </div>
            </FlexRow>
            <div className="w-100 mt-3">
              <label className="form-label">Confirmation Code</label>
              <input 
                className="form-control" 
                readOnly 
                type="text" 
                value={bookingConfirmationCode}
              />
            </div>
            <hr className="w-100"></hr>
          </div>

          
          {/* Flight / Passenger */}
          <FlexRow className="col-12 col-md-8 mt-3">
            <div style={{width:"47.5%"}}>
              <label className="form-label form-label-success">Flight ID</label>
              <input 
                className={"form-control"}
                readOnly
                type="number" 
                value={bookingFlightId}
              />
            </div>
            <div className="ml-auto" style={{width:"47.5%"}}>
              <label className="form-label">Passenger ID</label>
              <input 
                className={"form-control"}
                readOnly
                type="text" 
                value={bookingPassengerId}
              />
            </div>
            <hr className="w-100"></hr>
          </FlexRow>
          

          {/* User / Guest */}
          <FlexRow className="col-12 col-md-8 mt-3" align="start">
            <div style={{width:"47.5%"}}>
              <label className="form-label">User ID</label>
              <input 
                className={"form-control"}
                readOnly
                type="number" 
                value={bookingUserId}
              />
            </div>
            <FlexColumn className="ml-auto" style={{width:"47.5%"}}>
              <div>
                <label className="form-label">Guest Email</label>
                <input 
                  className={"form-control"}
                  readOnly
                  type="email"
                  value={bookingGuestEmail}
                />
              </div>
              <div className="mt-3">
                <label className="form-label">Guest Phone</label>
                <input 
                  className={"form-control"}
                  readOnly
                  type="phone" 
                  value={bookingGuestPhone}
                />
              </div>
            </FlexColumn>
            <hr className="w-100"></hr>
          </FlexRow>
          
          {/* Buttons */}
          <FlexRow>
            <button className="btn btn-light m-3"
              onClick={() => BookingsDispatcher.onCancel()}
            >
              Cancel
            </button>
            <button className="btn btn-primary m-3"
              onClick={() => BookingsDispatcher.onDelete("/" + selectedBooking.bookingId)}
            >
              Confirm Delete (cannot be undone)
            </button>
          </FlexRow>
        </FlexColumn>}
  </FlexColumn>
  );
}
export default EditView;