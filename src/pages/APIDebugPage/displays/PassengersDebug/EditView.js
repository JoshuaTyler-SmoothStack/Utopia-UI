// Libraries
import _ from "lodash";
import React, { useState } from 'react';
import Store from '../../../../reducers/Store';
import PassengersDispatcher from "../../../../dispatchers/PassengersDispatcher";
import KitUtils from '../../../../kitutils/KitUtils_v1.0.0';

// Components
import ChangeOperationReadout from '../ChangeOperationReadout';
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";
import DropDown from '../../../../components/DropDown';

const EditView = (props) => {
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

  const [isReverted, setIsReverted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const results = passengers.edit.results;
  const resultsStatus = passengers.edit.resultsStatus;
  const status = passengers.edit.status;

  const bookingIdChanged = results
    ? selectedPassenger.bookingId !== results.bookingId
    : true;

  const passportIdChanged = results
    ? selectedPassenger.passportId !== results.passportId
    : true;

  const firstNameChanged = results
    ? selectedPassenger.firstName !== results.firstName
    : true;

  const lastNameChanged = results
    ? selectedPassenger.lastName !== results.lastName
    : true;

  const dateOfBirthChanged = results
    ? selectedPassenger.dateOfBirth !== results.dateOfBirth
    : true;

  const sexChanged = results
    ? selectedPassenger.sex !== results.sex
    : true;

  const addressChanged = results
    ? selectedPassenger.address !== results.address
    : true;

  const isVeteranChanged = results
    ? selectedPassenger.isVeteran !== results.isVeteran
    : true;
  
  const resultsPending = resultsStatus === "PENDING";
  const noChangesMade = _.isEqual(selectedPassenger, results);

  const handleValidate = () => {
    setIsSubmitted(true);
    if(!passportId) return false;
    if(!firstName) return false;
    if(!lastName) return false;
    if(!dateOfBirth) return false;
    if(!address) return false;
    return true;
  };

  const handleSubmit = () => {
    if(!handleValidate()) return;
    const newPassenger = {
      id: selectedPassenger.id,
      bookingId: bookingId,
      passportId: passportId,
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      sex: sex,
      address: address,
      isVeteran: isVeteran
    };
    if(!_.isEqual(selectedPassenger, newPassenger)) {
      PassengersDispatcher.onEdit(null, newPassenger);
    } else {
      PassengersDispatcher.onEditFake(newPassenger);
    }
  };

  return (
    <FlexColumn>

      {(status === "PENDING" || status === "ERROR") && 
      <FlexColumn className="mt-5">
        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Booking ID" 
          result={results ? results.bookingId : ". . ."}
          status={bookingIdChanged ? resultsStatus : "DISABLED"} 
        />

        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Passport ID" 
          result={results ? results.passportId : ". . ."}
          status={passportIdChanged ? resultsStatus : "DISABLED"} 
        />

        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="First Name" 
          result={results ? results.firstName : ". . ."}
          status={firstNameChanged ? resultsStatus : "DISABLED"} 
        />

        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Last Name" 
          result={results ? results.lastName : ". . ."}
          status={lastNameChanged ? resultsStatus : "DISABLED"} 
        />

        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Date Of Birth" 
          result={results ? results.dateOfBirth : ". . ."}
          status={dateOfBirthChanged ? resultsStatus : "DISABLED"} 
        />
        
        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Sex" 
          result={results ? results.sex : ". . ."}
          status={sexChanged ? resultsStatus : "DISABLED"} 
        />

        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Address" 
          result={results ? results.address : ". . ."}
          status={addressChanged ? resultsStatus : "DISABLED"} 
        />

        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="U.S. Military Active Duty / Veteran" 
          result={results ? (results.isVeteran ? "YES" : "NO") : ". . ."}
          status={isVeteranChanged ? resultsStatus : "DISABLED"} 
        />

        <FlexRow>
          <button className="btn btn-light m-3"
            onClick={() => {
              PassengersDispatcher.onCancel();
              PassengersDispatcher.onRequest();
            }}
          >
            Close
          </button>
          
          {(status !== "ERROR" && noChangesMade && !isReverted) &&
            <button className={"btn btn-danger m-3 disabled"}
              onClick={() => KitUtils.soundAlert()}
            >
              {"Revert Changes (no changes made)"}
            </button>}

          {(status !== "ERROR" && !noChangesMade && !isReverted) &&
            <button className={"btn btn-danger m-3" + (!resultsPending || " disabled")}
              onClick={resultsPending 
                ? () => KitUtils.soundSuccess() 
                : () => {
                  PassengersDispatcher.onEdit(null, selectedPassenger); 
                  setIsReverted(true);
                }
              }
            >
              {resultsPending ? "Revert Changes (please wait)" : "Revert Changes"}
            </button>
          }
        </FlexRow>
      </FlexColumn>}

      {(status !== "ERROR" && status !== "PENDING") &&
      <FlexColumn>

        {/* Passenger IDs */}
        <FlexColumn className="w-100">
          <FlexRow className="w-100 mt-3">

            {/* ID */}
            <div className="mr-auto">
              <label className="form-label">Passenger ID</label>
              <input 
                className="form-control" 
                readOnly 
                type="text" 
                value={selectedPassenger.id}
              />
            </div>

            {/* Booking ID */}
            <div className="ml-3">
              <label className="form-label">Booking ID</label>
              <input 
                className={"form-control " +  (isSubmitted ? !bookingId ? "is-invalid" : "is-valid" : "")}
                min="1" 
                type="number" 
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
              />
            </div>
          </FlexRow>

          {/* Passport ID */}
          <div className="mt-3 w-100">
            <label className="form-label">Passport ID</label>
            <input
              className={"form-control " +  (isSubmitted ? !passportId ? "is-invalid" : "is-valid" : "")}
              placeholder={"31195855"}
              type="text"
              value={passportId}
              onChange={(e) => setPassportId(e.target.value)}
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
              className={"form-control " +  (isSubmitted ? !firstName ? "is-invalid" : "is-valid" : "")}
              placeholder={"John"}
              type="text" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div className="ml-3">
            <label className="form-label">Last Name</label>
            <input 
              className={"form-control " +  (isSubmitted ? !lastName ? "is-invalid" : "is-valid" : "")}
              placeholder={"Smith"}
              type="text" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
                className={"form-control " +  (isSubmitted ? !dateOfBirth ? "is-invalid" : "is-valid" : "")}
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </FlexColumn>

            {/* Sex */}
            <FlexColumn className="ml-3 w-50">
              <label className="form-label mr-auto">Sex</label>
              <DropDown
                align="right"
                buttonClassName="btn-info"
                className="w-100"
                options={["female", "male", "prefer not to answer"]}
                selection={sex}
                onSelect={(value) => setSex(value)}
              />
            </FlexColumn>
          </FlexRow>
          
          {/* Row 2 */}
          <FlexRow className="mt-3 w-100">
            {/* Address */}
            <div className="w-100">
              <label className="form-label">Address</label>
              <input 
                className={"form-control " +  (isSubmitted ? !address ? "is-invalid" : "is-valid" : "")}
                placeholder={"1600 Pennsylvania Avenue NW, Washington, DC 20500"} 
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
                type="checkbox" 
                checked={isVeteran}
                onChange={(e) => setIsVeteran(!isVeteran)}
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
          <button className="btn btn-danger m-3"
            onClick={() => handleSubmit()}
          >
            Save Changes
          </button>
        </FlexRow>
      </FlexColumn>}
    </FlexColumn>
  );
}
export default EditView;