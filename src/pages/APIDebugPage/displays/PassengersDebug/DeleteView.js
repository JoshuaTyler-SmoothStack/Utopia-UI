// Libraries
import React from 'react';
import PassengersDispatcher from "../../../../dispatchers/PassengersDispatcher";
import Store from "../../../../reducers/Store";

// Components
import ChangeOperationReadout from "../ChangeOperationReadout";
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";

const DeleteView = () => {
  const { passengers } = Store.getState();
  const selectedPassenger = passengers.selected;

  const passengerBookingId = (selectedPassenger.passengerBookingId || 1);
  const passengerPassportId = (selectedPassenger.passengerPassportId || "");
  const passengerFirstName = (selectedPassenger.passengerFirstName || "");
  const passengerLastName = (selectedPassenger.passengerLastName || "");
  const passengerDateOfBirth = (selectedPassenger.passengerDateOfBirth || "");
  const passengerSex = (selectedPassenger.passengerSex || "prefer not to answer");
  const passengerAddress = (selectedPassenger.passengerAddress || "");
  const passengerIsVeteran = (selectedPassenger.passengerIsVeteran || false);

  const resultsStatus = passengers.delete.resultsStatus;
  const status = passengers.delete.status;

  return(
    <FlexColumn>
      {status === "PENDING" && 
        <FlexColumn className="mt-5">
          <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
          name="Passenger" status={resultsStatus} result={"Passenger with ID: " + selectedPassenger.passengerId + " successfully deleted."}/>
          
          <FlexRow>
            <button className="btn btn-light m-3"
              onClick={() => {
                PassengersDispatcher.onCancel();
                PassengersDispatcher.onRequest();
              }}
            >
              Close
            </button>
          </FlexRow>
        </FlexColumn>
      }

      {status !== "PENDING" &&
        <FlexColumn>

        {/* Passenger IDs */}
        <FlexColumn className="w-100">
          <FlexRow className="w-100 mt-3">

            {/* ID */}
            <div className="mr-auto">
              <label className="form-label">Passenger ID</label>
              <input type="text" readOnly className="form-control" value={selectedPassenger.passengerId}/>
            </div>

            {/* Booking ID */}
            <div className="ml-3">
              <label className="form-label">Booking ID</label>
              <input 
                className="form-control" 
                readOnly
                type="number" 
                value={passengerBookingId}
              />
            </div>
          </FlexRow>

          {/* Passport ID */}
          <div className="mt-3 w-100">
            <label className="form-label">Passport ID</label>
            <input
              className={"form-control"}
              readOnly
              type="text"
              value={passengerPassportId}
            />
          </div>
          <hr className="w-100"></hr>
        </FlexColumn>
    
      
        {/* Passenger Name */}
        <FlexRow className="mt-3">

          {/* First Name */}
          <div className="mr-auto">
            <label className="form-label form-label">First Name</label>
            <input 
              className={"form-control"}
              readOnly
              type="text"
              value={passengerFirstName}
            />
          </div>

          {/* Last Name */}
          <div className="ml-3">
            <label className="form-label">Last Name</label>
            <input 
              className={"form-control"}
              readOnly
              type="text" 
              value={passengerLastName}
            />
          </div>
          <hr className="w-100"></hr>
        </FlexRow>
      

        {/* Passenger Information */}
        <FlexColumn className="mt-3 w-100">

          {/* Row 1 */}
          <FlexRow className="w-100">
            {/* Date Of Birth */}
            <FlexColumn className="mr-auto">
              <label className="form-label mr-auto">Date Of Birth</label>
              <input 
                className={"form-control"}
                readOnly
                type="date"
                value={passengerDateOfBirth}
              />
            </FlexColumn>

            {/* Sex */}
            <FlexColumn className="ml-3 w-50">
              <label className="form-label mr-auto">Sex</label>
              <input 
                className={"form-control"}
                readOnly
                type="text"
                value={passengerSex}
              />
            </FlexColumn>
          </FlexRow>
          
          {/* Row 2 */}
          <FlexRow className="mt-3 w-100">
            {/* Address */}
            <div className="w-100">
              <label className="form-label">Address</label>
              <input 
                className={"form-control"} 
                readOnly
                type="text" 
                value={passengerAddress}
              />
            </div>
          </FlexRow>

          {/* Row 3 */}
          <FlexRow className="mt-3 w-100">
            {/* Veteran Status */}
            <FlexColumn>
              <input 
                className="form-check-input"
                style={{height:"1.5rem", width:"1.5rem"}}
                readOnly
                type="checkbox" 
                checked={passengerIsVeteran}
              />
            </FlexColumn>
            <div className="ml-2">U.S. Military Active Duty / Veteran</div>
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
            onClick={() => PassengersDispatcher.onDelete("/" + selectedPassenger.passengerId)}
          >
            Confirm Delete (cannot be undone)
          </button>
        </FlexRow>
      </FlexColumn>}
    </FlexColumn>
  );
}
export default DeleteView;