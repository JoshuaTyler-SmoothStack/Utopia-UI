// Libraries
import React, { useState } from 'react';
import Store from '../../../../reducers/Store';
import PassengersDispatcher from "../../../../dispatchers/PassengersDispatcher";

// Components
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";
import ChangeOperationReadout from '../ChangeOperationReadout';
import KitUtils from '../../../../kitutils/KitUtils_v1.0.0';



const CreateView = (props) => {
  const [bookingId, setBookingId] = useState("");
  const [passportId, setPassportId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [sex, setSex] = useState("");
  const [address, setAddress] = useState("");
  const [isVeteran, setIsVeteran] = useState(false);

  const { passengers } = Store.getState();
  const results = passengers.create.results
  const resultsStatus = passengers.create.resultsStatus;
  const resultsPending = JSON.stringify(resultsStatus).includes("PENDING");
  const status = passengers.create.status;

  return (
    <FlexColumn>
      {(status === "PENDING" || status === "ERROR") && 
        <FlexColumn className="mt-5">
          <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
          name="Passenger" status={resultsStatus.passenger} result={results.passenger}/>
          
          <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
          name="Flights" status={resultsStatus.flights} result={results.flights}/>
          
          <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
          name="Guest Contact" status={resultsStatus.guests} result={results.guests}/>
          
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
            {status !== "ERROR" &&
            <button className={"btn btn-info m-3" + (!resultsPending || " disabled")}
              onClick={!resultsPending ? () => PassengersDispatcher.onPromptEdit(passengers.selected.id) : () => {KitUtils.soundAlert()}}
            >
              {resultsPending ? "Edit (please wait)" : "Edit"}
            </button>}
          </FlexRow>
        </FlexColumn>
      }

      {(status !== "ERROR" && status !== "PENDING") &&
        <FlexColumn>
          {/* Passenger IDs */}
          <FlexColumn>
            <FlexRow>
              <div className="mt-3" style={{width:"14rem"}}>
                <label className="form-label">Passenger ID</label>
                <input type="text" readOnly className="form-control" value={"Auto-generated"}/>
              </div>
              <div className="mt-3 ml-3" style={{width:"14rem"}}>
                <label className="form-label">Booking ID</label>
                <input type="number" min="1" className="form-control" defaultValue={1}/>
              </div>
            </FlexRow>
              <div className="mt-3 w-100">
                <label className="form-label">Passport ID</label>
                <input type="text" className="form-control" placeholder={"31195855"}/>
              </div>
              <hr className="w-100"></hr>
          </FlexColumn>

          
          {/* Passenger Name */}
          <FlexRow className="mt-3">
            <div style={{width:"14rem"}}>
              <label className="form-label form-label-success">First Name</label>
              <input type="text" className="form-control" placeholder={"John"}
                onChange={(e) => this.setFirstName(e.target.value)}
              />
            </div>
            <div className="ml-3" style={{width:"14rem"}}>
              <label className="form-label">Last Name</label>
              <input type="text" className="form-control" placeholder={"Smith"}
                onChange={(e) => this.setLastName(e.target.value)}
              />
            </div>
            <hr className="w-100"></hr>
          </FlexRow>
          

          {/* Passenger Information */}
          <FlexColumn>

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
              onClick={() => PassengersDispatcher.onCreate(
                bookingId, passportId, firstName, lastName, dateOfBirth, sex, address, isVeteran
              )}
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