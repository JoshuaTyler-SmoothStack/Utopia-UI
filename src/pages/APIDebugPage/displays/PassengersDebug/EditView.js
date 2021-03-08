// Libraries
import React, { Component } from 'react';
import Store from '../../../../reducers/Store';
import PassengersDispatcher from "../../../../dispatchers/PassengersDispatcher";
import KitUtils from '../../../../kitutils/KitUtils_v1.0.0';

// Components
import ChangeOperationReadout from '../ChangeOperationReadout';
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";

class EditView extends Component {
  constructor(props) {
    super(props);

    const { passengers } = Store.getState();
    const selectedPassenger = passengers.selected;
    this.state = {
      editingValues: {
        status: selectedPassenger.status,
        flightId: selectedPassenger.flightId,
        passengerId: selectedPassenger.passengerId,
        userId: selectedPassenger.userId,
        guestEmail: selectedPassenger.guestEmail,
        guestPhone: selectedPassenger.guestPhone
      },
      reverted: false
    };
  }
  render() { 
    const { passengers } = Store.getState();
    const { editingValues, reverted } = this.state;

    const selectedPassenger = passengers.selected;
    const results = passengers.edit.results
    const resultsStatus = passengers.edit.resultsStatus;
    const status = passengers.edit.status;
    
    const resultsPending = JSON.stringify(resultsStatus).includes("PENDING");
    const noChangesMade = 
      results.passenger === "N/A" &&
      results.flights === "N/A" &&
      results.guests === "N/A" &&
      results.passengers === "N/A" &&
      results.users === "N/A";

    return (
      <FlexColumn>

        {(status === "PENDING" || status === "ERROR") && 
        <FlexColumn className="mt-5">
          <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
          name="Passenger" status={resultsStatus.passenger} result={results.passenger}/>
          
          <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
          name="Flights" status={resultsStatus.flights} result={results.flights}/>
          
          <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
          name="Guests" status={resultsStatus.guests} result={results.guests}/>
          
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
              
              {(status !== "ERROR" && noChangesMade && !reverted) &&
                <button className={"btn btn-danger m-3 disabled"}
                  onClick={() => KitUtils.soundAlert()}
                >
                  {"Revert Changes (no changes made)"}
                </button>}

              {(status !== "ERROR" && !noChangesMade && !reverted) &&
                <button className={"btn btn-danger m-3" + (!resultsPending || " disabled")}
                  onClick={resultsPending 
                    ? () => KitUtils.soundSuccess() 
                    : () => {PassengersDispatcher.onEdit(
                      {
                        ...editingValues, 
                        id: selectedPassenger.id, 
                        confirmationCode: selectedPassenger.confirmationCode
                      },
                      selectedPassenger
                    ); this.setState({reverted: true});}
                  }
                >
                  {resultsPending ? "Revert Changes (please wait)" : "Revert Changes"}
                </button>
              }
          </FlexRow>
        </FlexColumn>
      }

      {(status !== "ERROR" && status !== "PENDING") &&
      <FlexColumn>
        {/* Passenger */}
        <FlexColumn>
          <FlexRow>
            <div className="mt-3" style={{width:"14rem"}}>
              <label className="form-label">Passenger ID</label>
              <input type="text" readOnly className="form-control" value={selectedPassenger.id}/>
            </div>
            <div className="mt-3 ml-3" style={{width:"14rem"}}>
              <label className="form-label">Status</label>
              <input type="number" min="0" max="4" className="form-control" defaultValue={selectedPassenger.status}
                onChange={(e) => this.setState({editingValues: {...editingValues, status: e.target.value}})}
              />
            </div>
          </FlexRow>
            <div className="mt-3 w-100">
              <label className="form-label">Confirmation Code</label>
              <input type="text" readOnly className="form-control" value={selectedPassenger.confirmationCode}/>
            </div>
            <hr className="w-100"></hr>
        </FlexColumn>

        
        {/* Flight / Passenger */}
        <FlexRow className="mt-3">
          <div style={{width:"14rem"}}>
            <label className="form-label">Flight ID</label>
            <input type="number" min="1" className="form-control" defaultValue={selectedPassenger.flightId}
              onChange={(e) => this.setState({editingValues: {...editingValues, flightId: e.target.value}})}
            />
          </div>
          <div className="ml-3" style={{width:"14rem"}}>
            <label className="form-label">Passenger ID</label>
            <input type="number" min="1" className="form-control" defaultValue={selectedPassenger.passengerId}
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
                defaultValue={selectedPassenger.userId || ""}
                placeholder={selectedPassenger.userId ? undefined : "Not a user"}
                onChange={(e) => this.setState({editingValues: {...editingValues, userId: e.target.value}})}
              />
            </div>
            <FlexColumn>
              <div style={{width:"14rem"}}>
                <label className="form-label">Guest Email</label>
                <input type="email" className="form-control" 
                  defaultValue={selectedPassenger.guestEmail || ""}
                  placeholder={!selectedPassenger.guestEmail ? undefined : "No guests email available."}
                  onChange={(e) => this.setState({editingValues: {...editingValues, guestEmail: e.target.value}})}
                />
              </div>
              <div className="mt-3" style={{width:"14rem"}}>
                <label className="form-label">Guest Phone</label>
                <input type="phone" className="form-control" 
                  defaultValue={selectedPassenger.guestPhone || ""}
                  placeholder={!selectedPassenger.guestPhone ? undefined : "No guests phone available."}
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
            onClick={() => PassengersDispatcher.onCancel()}
          >
            Cancel
          </button>
          <button className="btn btn-danger m-3"
            onClick={() => PassengersDispatcher.onEdit(selectedPassenger, editingValues)}
          >
            Save Changes
          </button>
        </FlexRow>
      </FlexColumn>}
    </FlexColumn>
    );
  }
}
export default EditView;