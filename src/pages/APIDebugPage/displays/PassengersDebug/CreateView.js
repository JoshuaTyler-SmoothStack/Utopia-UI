// Libraries
import React, { useState } from 'react';
import Store from '../../../../reducers/Store';
import PassengersDispatcher from "../../../../dispatchers/PassengersDispatcher";

// Components
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";
import ChangeOperationReadout from '../ChangeOperationReadout';
import KitUtils from '../../../../kitutils/KitUtils_v1.0.0';
import DropDown from '../../../../components/DropDown';



const CreateView = (props) => {
  const [passengerBookingId, setBookingId] = useState(1);
  const [passengerPassportId, setPassportId] = useState("");
  const [passengerFirstName, setFirstName] = useState("");
  const [passengerLastName, setLastName] = useState("");
  const [passengerDateOfBirth, setDateOfBirth] = useState("");
  const [passengerSex, setSex] = useState("female");
  const [passengerAddress, setAddress] = useState("");
  const [passengerIsVeteran, setIsVeteran] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { passengers } = Store.getState();
  const results = passengers.create.results
  const resultsStatus = passengers.create.resultsStatus;
  const resultsPending = resultsStatus === "PENDING";
  const status = passengers.create.status;

  const handleValidate = () => {
    setIsSubmitted(true);
    if(!passengerPassportId) return false;
    if(!passengerFirstName) return false;
    if(!passengerLastName) return false;
    if(!passengerDateOfBirth) return false;
    if(!passengerAddress) return false;
    return true;
  };

  const handleSubmit = () => {
    if(!handleValidate()) return;
    const newPassenger = {
      passengerBookingId: passengerBookingId,
      passengerPassportId: passengerPassportId,
      passengerFirstName: passengerFirstName,
      passengerLastName: passengerLastName,
      passengerDateOfBirth: passengerDateOfBirth,
      passengerSex: passengerSex,
      passengerAddress: passengerAddress,
      passengerIsVeteran: passengerIsVeteran
    };
    PassengersDispatcher.onCreate(null, newPassenger);
  }

  return (
    <FlexColumn>
      {(status === "PENDING" || status === "ERROR") && 
        <FlexColumn className="mt-5">
          <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
          name="Passenger" status={resultsStatus} result={"Passenger with ID: " + results.passengerId + " successfully created."}/>
          
          <FlexRow>
            <button className="btn btn-light m-3"
              onClick={() => {
                PassengersDispatcher.onCancel();
                PassengersDispatcher.onRequest();
              }}
            >
              Close
            </button>
            {status !== "ERROR" &&
            <button className={"btn btn-info m-3" + (!resultsPending || " disabled")}
              onClick={!resultsPending ? () => PassengersDispatcher.onPromptEdit("/" + results.passengerId) : () => {KitUtils.soundAlert()}}
            >
              {resultsPending ? "Edit (please wait)" : "Edit"}
            </button>}
          </FlexRow>
        </FlexColumn>
      }

      {(status !== "ERROR" && status !== "PENDING") &&
        <FlexColumn>

          {/* Passenger IDs */}
          <FlexColumn className="w-100">
            <FlexRow className="w-100 mt-3">

              {/* ID */}
              <div className="mr-auto">
                <label className="form-label">Passenger ID</label>
                <input type="text" readOnly className="form-control" value={"Auto-generated"}/>
              </div>

              {/* Booking ID */}
              <div className="ml-3">
                <label className="form-label">Booking ID</label>
                <input 
                  className={"form-control " + 
                  (isSubmitted 
                    ? !passengerBookingId
                      ? "is-invalid" 
                      : "is-valid" 
                    : ""
                  )}
                  min="1" 
                  type="number" 
                  defaultValue={1}
                  onChange={(e) => setBookingId(e.target.value)}
                />
              </div>
            </FlexRow>

              {/* Passport ID */}
              <div className="mt-3 w-100">
                <label className="form-label">Passport ID</label>
                <input 
                  className={"form-control " + 
                  (isSubmitted 
                    ? !passengerPassportId 
                      ? "is-invalid" 
                      : "is-valid" 
                    : ""
                  )}
                  placeholder={"31195855"}
                  type="text" 
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
                  className={"form-control " + 
                  (isSubmitted 
                    ? !passengerFirstName 
                      ? "is-invalid" 
                      : "is-valid" 
                    : ""
                  )}
                  placeholder={"John"}
                  type="text" 
                  onChange={(e) => setFirstName(e.target.value)}
                />
            </div>

            {/* Last Name */}
            <div className="ml-3">
              <label className="form-label">Last Name</label>
              <input 
                  className={"form-control " + 
                  (isSubmitted 
                    ? !passengerLastName 
                      ? "is-invalid" 
                      : "is-valid" 
                    : ""
                  )}
                  placeholder={"Smith"}
                  type="text" 
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
                  className={"form-control " + 
                  (isSubmitted 
                    ? !passengerDateOfBirth 
                      ? "is-invalid" 
                      : "is-valid" 
                    : ""
                  )}
                  type="date" 
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </FlexColumn>

              {/* Sex */}
              <FlexColumn className="ml-3 w-50">
                <label className="form-label mr-auto">Sex</label>
                <DropDown
                  align="right"
                  className="w-100"
                  options={["female", "male", "prefer not to answer"]}
                  selection={passengerSex}
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
                  className={"form-control " + 
                  (isSubmitted 
                    ? !passengerAddress 
                      ? "is-invalid" 
                      : "is-valid" 
                    : ""
                  )}
                  placeholder={"1600 Pennsylvania Avenue NW, Washington, DC 20500"}
                  type="text" 
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
                  onChange={(e) => setIsVeteran(!passengerIsVeteran)}
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
            <button className="btn btn-success text-white m-3"
              onClick={() => handleSubmit()}
            >
              + Create New Passenger
            </button>
          </FlexRow>
        </FlexColumn>
      }
    </FlexColumn>
  );
}
export default CreateView;