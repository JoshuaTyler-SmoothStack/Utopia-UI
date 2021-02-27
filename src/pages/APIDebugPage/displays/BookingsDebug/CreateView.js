// Libraries
import React, { Component } from 'react';
import Store from '../../../../reducers/Store';
import BookingsDispatcher from "../../../../dispatchers/BookingsDispatcher";

// Components
import ErrorMessage from "../../../../components/ErrorMessage";
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";
import ChangeOperationReadout from '../ChangeOperationReadout';
import KitUtils from '../../../../kitutils/KitUtils_v1.0.0';

class CreateView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editingValues: {
        status: 0,
        flightId: 0,
        passengerId: 0,
        userId: 0,
        guestEmail: "",
        guestPhone: ""
      }
    };
  }
  render() { 
    const { bookings } = Store.getState();
    const { editingValues } = this.state;

    const results = bookings.create.results
    const resultsStatus = bookings.create.resultsStatus;
    const resultsPending = JSON.stringify(resultsStatus).includes("PENDING");
    const status = bookings.create.status;

    return (
      <FlexColumn>
        {(status === "PENDING" || status === "ERROR") && 
          <FlexColumn className="mt-5">
            <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
            name="Booking" status={resultsStatus.booking} result={results.booking}/>
            
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
                onClick={() => BookingsDispatcher.onCancel()}
              >
                Close
              </button>
              {status !== "ERROR" &&
              <button className={"btn btn-info m-3" + (!resultsPending || " disabled")}
                onClick={!resultsPending ? () => BookingsDispatcher.onPromptEdit(bookings.selected.id) : () => {KitUtils.soundAlert()}}
              >
                {resultsPending ? "Edit (please wait)" : "Edit"}
              </button>}
            </FlexRow>
          </FlexColumn>
        }

        {(status !== "ERROR" && status !== "PENDING") &&
          <FlexColumn>
            {/* Booking */}
            <FlexColumn>
              <FlexRow>
                <div className="mt-3" style={{width:"14rem"}}>
                  <label className="form-label">Booking ID</label>
                  <input type="text" readOnly className="form-control" value={"Auto-generated"}/>
                </div>
                <div className="mt-3 ml-3" style={{width:"14rem"}}>
                  <label className="form-label">Status</label>
                  <input type="text" readOnly className="form-control" value={"INACTIVE"}/>
                </div>
              </FlexRow>
                <div className="mt-3 w-100">
                  <label className="form-label">Confirmation Code</label>
                  <input type="text" readOnly className="form-control" value={"Auto-generated"}/>
                </div>
                <hr className="w-100"></hr>
            </FlexColumn>

            
            {/* Flight / Passenger */}
            <FlexRow className="mt-3">
              <div style={{width:"14rem"}}>
                <label className="form-label form-label-success">Flight ID</label>
                <input type="number" min="1" className="form-control" defaultValue={editingValues.flightId}
                  onChange={(e) => this.setState({editingValues: {...editingValues, flightId: e.target.value}})}
                />
              </div>
              <div className="ml-3" style={{width:"14rem"}}>
                <label className="form-label">Passenger ID</label>
                <input type="number" min="1" className="form-control" defaultValue={editingValues.passengerId}
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
                    defaultValue={editingValues.userId || ""}
                    placeholder={editingValues.userId ? undefined : "Not a user"}
                    onChange={(e) => this.setState({editingValues: {...editingValues, userId: e.target.value}})}
                  />
                </div>
                <FlexColumn>
                  <div style={{width:"14rem"}}>
                    <label className="form-label">Guest Email</label>
                    <input type="email" className="form-control" 
                      defaultValue={editingValues.guestEmail || ""}
                      placeholder={!editingValues.guestEmail ? undefined : "No guests email available."}
                      onChange={(e) => this.setState({editingValues: {...editingValues, guestEmail: e.target.value}})}
                    />
                  </div>
                  <div className="mt-3" style={{width:"14rem"}}>
                    <label className="form-label">Guest Phone</label>
                    <input type="phone" className="form-control" 
                      defaultValue={editingValues.guestPhone || ""}
                      placeholder={!editingValues.guestPhone ? undefined : "No guests phone available."}
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
              <button className="btn btn-success text-white m-3"
                onClick={() => BookingsDispatcher.onCreate(editingValues)}
              >
                + Create New Booking
              </button>
            </FlexRow>
          </FlexColumn>
        }
      </FlexColumn>
    );
  }
}
export default CreateView;