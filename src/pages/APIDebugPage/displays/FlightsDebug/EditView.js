// Libraries
import _ from "lodash";
import React, { useState } from 'react';
import Store from '../../../../reducers/Store';
import FlightsDispatcher from "../../../../dispatchers/FlightsDispatcher";
import KitUtils from '../../../../kitutils/KitUtils_v1.0.0';

// Components
import ChangeOperationReadout from '../ChangeOperationReadout';
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";


const EditView = (props) => {

  const { flights } = Store.getState();
  const selectedFlight = flights.selected;

  const selectedHours = Math.floor(selectedFlight.duration / 3600);
  const selectedMinutes = Math.floor(selectedFlight.duration % 3600 / 60);
  const selectedDateTime = selectedFlight.dateTime.split('.')[0];
  
  const [airplaneId, setAirplaneId] = useState(selectedFlight.airplaneId);
  const [seatingId, setSeatingId] = useState(selectedFlight.seatingId);
  const [routeId, setRouteId] = useState(selectedFlight.routeId);
  const [dateTime, setDateTime] = useState(selectedDateTime);
  const [hours, setHours] = useState(selectedHours);
  const [minutes, setMinutes] = useState(selectedMinutes);
  const [flightStatus, setFlightStatus] = useState(selectedFlight.status);
  const [isReverted, setIsReverted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const results = flights.edit.results
  const resultsStatus = flights.edit.resultsStatus;
  const status = flights.edit.status;

  const airplaneIdChanged = results
    ? selectedFlight.airplaneId !== results.airplaneId
    : true;
  const seatingIdChanged = results
    ? selectedFlight.seatingId !== results.seatingId
    : true;
  const routeIdChanged = results
    ? selectedFlight.routeId !== results.routeId
    : true;
  const dateTimeChanged = results
    ? selectedFlight.dateTime !== results.dateTime
    : true;
  const flightStatusChanged = results
    ? selectedFlight.status !== results.status
    : true;

  const resultsPending = resultsStatus === "PENDING";
  const noChangesMade = _.isEqual(selectedFlight, results);

  const handleValidate = () => {
    setIsSubmitted(true);
    if(!airplaneId) return false;
    if(!seatingId) return false;
    if(!routeId) return false;
    if(!dateTime) return false;
    if(!hours) return false;
    if(!minutes) return false;
    return true;
  };

  const handleSubmit = () => {
    if(!handleValidate()) return;
    const duration = (hours * 3600) + (minutes * 60) ;
    const departure = dateTime.split("T");

    const newFlight = {
      id: selectedFlight.id,
      airplaneId : airplaneId,
      seatingId : seatingId,
      routeId : routeId,
      dateTime : departure[0]+" "+departure[1]+":00",
      duration : duration,
      status: flightStatus
    };

    console.log(newFlight);
    if(!_.isEqual(selectedFlight, newFlight)) {
      FlightsDispatcher.onEdit(null, newFlight);
    } else {
      FlightsDispatcher.onEditFake(newFlight);
    }
  };

  return (
    <FlexColumn>

      {(status === "PENDING" || status === "ERROR") && 
      <FlexColumn className="mt-5">
        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Airplane ID" 
          result={results ? results.airplaneId : ". . ."}
          status={airplaneIdChanged ? resultsStatus : "DISABLED"} 
        />

        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Seating ID" 
          result={results ? results.seatingId : ". . ."}
          status={seatingIdChanged ? resultsStatus : "DISABLED"} 
        />

        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Route ID" 
          result={results ? results.routeId : ". . ."}
          status={routeIdChanged ? resultsStatus : "DISABLED"} 
        />

        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Departure" 
          result={results ? results.dateTime : ". . ."}
          status={dateTimeChanged ? resultsStatus : "DISABLED"} 
        />

        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Status" 
          result={results ? results.status : ". . ."}
          status={flightStatusChanged ? resultsStatus : "DISABLED"} 
        />

        <FlexRow>
            <button className="btn btn-light m-3"
              onClick={() => {
                FlightsDispatcher.onCancel();
                FlightsDispatcher.onRequest();
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
                    FlightsDispatcher.onEdit(null, selectedFlight);
                    setIsReverted(true);
                  }
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
      {/* Flight */}
      <FlexColumn>
      <FlexRow>
              <div className="mt-3" style={{width:"14rem"}}>
                <label className="form-label">Flight ID</label>
                <input 
                  className={"form-control"}
                  value={selectedFlight.id}
                  type="number"
                  readOnly
                />
              </div>
              <div className="mt-3 ml-3" style={{width:"14rem"}}>
                <label className="form-label">AirplaneId</label>
                <input 
                  className={"form-control " +  (isSubmitted ? !airplaneId ? "is-invalid" : "is-valid" : "")} 
                  defaultValue={airplaneId}
                  placeholder="Number"
                  type="number" 
                  onInput={(e) => setAirplaneId(e.target.value)}
                />
              </div>

              <div className="mt-3 ml-3" style={{width:"14rem"}}>
                <label className="form-label">SeatingId</label>
                <input 
                  className={"form-control " +  (isSubmitted ? !seatingId ? "is-invalid" : "is-valid" : "")} 
                  defaultValue={seatingId}
                  placeholder="Number"
                  type="number" 
                  onChange={(e) => setSeatingId(e.target.value)}
                />
              </div>
            </FlexRow>

            <FlexRow>
              <div className="mt-3 ml-3" style={{width:"14rem"}}>
                <label className="form-label">RouteId</label>
                <input 
                  className={"form-control " +  (isSubmitted ? !routeId ? "is-invalid" : "is-valid" : "")} 
                  defaultValue={routeId}
                  placeholder="Number"
                  type="number" 
                  onInput={(e) => setRouteId(e.target.value)}
                />
              </div>

              <div className="mt-3 ml-3" style={{width:"20rem"}}>
                <label className="form-label">Departure</label>
                <input 
                  className={"form-control"}
                  defaultValue={selectedDateTime}
                  type="datetime-local"
                  onChange={(e) => setDateTime(e.target.value)}
                />
              </div>
        
            </FlexRow>

            <FlexRow>
              <div className="mt-3 ml-3" style={{width:"14rem"}}>
                <label className="form-label">Duration</label>
                <input 
                  className={"form-control " +  (isSubmitted ? !hours ? "is-invalid" : "is-valid" : "")} 
                  defaultValue={selectedHours || 0}
                  type="number" 
                  onInput={(e) => setHours(e.target.value)}
                />
                <input 
                  className={"form-control " +  (isSubmitted ? !minutes ? "is-invalid" : "is-valid" : "")} 
                  defaultValue={selectedMinutes}
                  type="number"
                  max = "60" 
                  onInput={(e) => setMinutes(e.target.value)}
                />
              </div>

              <div className="mt-3 ml-3" style={{width:"14rem"}}>
                <label className="form-label">Status</label>
                <select 
                  className={"form-control"}
                  value={flightStatus}
                  onChange={(e) => setFlightStatus(e.target.value)}
                >
                  <option value="INACTIVE">INACTIVE</option>
                  <option value="ACTIVE">ACTIVE</option>
                </select>
              </div>
        
            </FlexRow>
            <hr className="w-100"></hr>
      </FlexColumn>     


      {/* Buttons */}
      <FlexRow>
        <button className="btn btn-light m-3"
          onClick={() => FlightsDispatcher.onCancel()}
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