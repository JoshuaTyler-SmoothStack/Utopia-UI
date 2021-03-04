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
  const [bookingId, setBookingId] = useState(1);
  const [passportId, setPassportId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [sex, setSex] = useState("female");
  const [address, setAddress] = useState("");
  const [isVeteran, setIsVeteran] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { passengers } = Store.getState();
  const results = passengers.create.results
  const resultsStatus = passengers.create.resultsStatus;
  const resultsPending = JSON.stringify(resultsStatus).includes("PENDING");
  const status = passengers.create.status;

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
    PassengersDispatcher.onCreate(
      bookingId, passportId, firstName, lastName, 
      dateOfBirth, sex, address, isVeteran
    );
  }

  return (
    <FlexColumn>
      {(status === "PENDING" || status === "ERROR") && 
        <FlexColumn className="mt-5">
          <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
          name="Passenger" status={resultsStatus} result={"Passenger with ID: " + results.id + " successfully created."}/>
          
          <FlexRow>
            <button className="btn btn-light m-3"
              onClick={() => PassengersDispatcher.onCancel()}
            >
              Close
            </button>
            {status !== "ERROR" &&
            <button className={"btn btn-info m-3" + (!resultsPending || " disabled")}
              onClick={!resultsPending ? () => PassengersDispatcher.onPromptEdit(results.id) : () => {KitUtils.soundAlert()}}
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
                <input type="number" min="1" className="form-control" defaultValue={1}/>
              </div>
            </FlexRow>

              {/* Passport ID */}
              <div className="mt-3 w-100">
                <label className="form-label">Passport ID</label>
                <input type="text" placeholder={"31195855"}
                  className={"form-control " +  (isSubmitted ? !passportId ? "is-invalid" : "is-valid" : "")}
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
              <input type="text" placeholder={"John"}
                className={"form-control " +  (isSubmitted ? !firstName ? "is-invalid" : "is-valid" : "")}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div className="ml-3">
              <label className="form-label">Last Name</label>
              <input type="text" placeholder={"Smith"}
                className={"form-control " +  (isSubmitted ? !lastName ? "is-invalid" : "is-valid" : "")}
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
                <input type="date"
                  className={"form-control " +  (isSubmitted ? !dateOfBirth ? "is-invalid" : "is-valid" : "")}
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
                <input type="text" placeholder={"1600 Pennsylvania Avenue NW, Washington, DC 20500"}
                  className={"form-control " +  (isSubmitted ? !address ? "is-invalid" : "is-valid" : "")}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </FlexRow>

            {/* Row 3 */}
            <FlexRow className="mt-3 w-100">
              {/* Veteran Status */}
              <FlexColumn>
                <input type="checkbox" className="form-check-input"
                  style={{height:"1.5rem", width:"1.5rem"}}
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