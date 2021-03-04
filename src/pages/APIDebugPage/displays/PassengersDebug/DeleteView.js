// Libraries
import React, { useState } from 'react';
import PassengersDispatcher from "../../../../dispatchers/PassengersDispatcher";
import Store from "../../../../reducers/Store";

// Components
import ChangeOperationReadout from "../ChangeOperationReadout";
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";

const DeleteView = () => {
  const { passengers } = Store.getState();
  const selectedPassenger = passengers.selected;

  const [bookingId, setBookingId] = useState(selectedPassenger.bookingId || 1);
  const [passportId, setPassportId] = useState(selectedPassenger.passportId || "");
  const [firstName, setFirstName] = useState(selectedPassenger.firstName || "");
  const [lastName, setLastName] = useState(selectedPassenger.lastName || "");
  const [dateOfBirth, setDateOfBirth] = useState(selectedPassenger.dateOfBirth || "");
  const [sex, setSex] = useState(selectedPassenger.sex || "prefer not to answer");
  const [address, setAddress] = useState(selectedPassenger.address || "");
  const [isVeteran, setIsVeteran] = useState(selectedPassenger.isVeteran || false);

  const results = passengers.delete.results
  const resultsStatus = passengers.delete.resultsStatus;
  const status = passengers.delete.status;

  return(
    <FlexColumn>
      {status === "PENDING" && 
        <FlexColumn className="mt-5">
          <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
          name="Passenger" status={resultsStatus} result={"Passenger with ID: " + selectedPassenger.id + " successfully deleted."}/>
          
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

        {/* Passenger IDs */}
        <FlexColumn className="w-100">
          <FlexRow className="w-100 mt-3">

            {/* ID */}
            <div className="mr-auto">
              <label className="form-label">Passenger ID</label>
              <input type="text" readOnly className="form-control" value={selectedPassenger.id}/>
            </div>

            {/* Booking ID */}
            <div className="ml-3">
              <label className="form-label">Booking ID</label>
              <input 
                className="form-control" 
                readOnly
                type="number" 
                value={bookingId}
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
              value={passportId}
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
              value={firstName}
            />
          </div>

          {/* Last Name */}
          <div className="ml-3">
            <label className="form-label">Last Name</label>
            <input 
              className={"form-control"}
              readOnly
              type="text" 
              value={lastName}
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
                value={dateOfBirth}
              />
            </FlexColumn>

            {/* Sex */}
            <FlexColumn className="ml-3 w-50">
              <label className="form-label mr-auto">Sex</label>
              <input 
                className={"form-control"}
                readOnly
                type="text"
                value={sex}
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
                value={address}
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
                checked={isVeteran}
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
            onClick={() => PassengersDispatcher.onDelete(selectedPassenger.id)}
          >
            Confirm Delete (cannot be undone)
          </button>
        </FlexRow>
      </FlexColumn>}
    </FlexColumn>
  );
}
export default DeleteView;