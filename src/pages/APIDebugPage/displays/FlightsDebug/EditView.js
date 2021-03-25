// Libraries
import _ from "lodash";
import React, { useState } from 'react';
import Store from '../../../../reducers/Store';
import FlightsDispatcher from "../../../../dispatchers/FlightsDispatcher";
import KitUtils from '../../../../kitutils/KitUtils_v1.0.0';
import moment from 'moment';

// Components
import ChangeOperationReadout from '../ChangeOperationReadout';
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";


const EditView = (props) => {

  const { flights } = Store.getState();
  const selectedFlight = flights.selected;

  const selectedHours = Math.floor(selectedFlight.flightDuration / 3600);
  const selectedMinutes = Math.floor(selectedFlight.flightDuration % 3600 / 60);
  const selectedDateTime = selectedFlight.flightDepartureTime.split('.')[0];
  
  const [flightAirplaneId, setAirplaneId] = useState(selectedFlight.flightAirplane.airplaneId);
  const [flightSeatingId, setSeatingId] = useState(selectedFlight.flightSeatingId);
  const [flightRouteId, setRouteId] = useState(selectedFlight.flightRoute.routeId);
  const [flightDepartureTime, setDateTime] = useState(selectedDateTime);
  const [hours, setHours] = useState(selectedHours);
  const [minutes, setMinutes] = useState(selectedMinutes);
  const [flightStatus, setFlightStatus] = useState(selectedFlight.flightStatus);
  const [isReverted, setIsReverted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const results = flights.edit.results
  const resultsStatus = flights.edit.resultsStatus;
  const status = flights.edit.status;

  const dateTimeNow = moment().utc().format("YYYY-MM-DDTHH:mm");

  const flightAirplaneIdChanged = results.flightId
    ? selectedFlight.flightAirplane.airplaneId !== results.flightAirplane.airplaneId
    : true;
  const flightSeatingIdChanged = results.flightId
    ? selectedFlight.flightSeatingId !== results.flightSeatingId
    : true;
  const flightRouteIdChanged = results.flightId
    ? selectedFlight.flightRoute.routeId !== results.flightRoute.routeId
    : true;
  const flightDurationChanged = results.flightId
    ? selectedFlight.flightDuration !== results.flightDuration
    : true;
  const flightDepartureTimeChanged = results.flightId
    ? selectedFlight.flightDepartureTime !== results.flightDepartureTime
    : true;
  const flightStatusChanged = results.flightId
    ? selectedFlight.flightStatus !== results.flightStatus
    : true;

  const resultsPending = resultsStatus === "PENDING";
  const noChangesMade = _.isEqual(selectedFlight, results);

  const handleValidate = () => {
    setIsSubmitted(true);
    if(flightAirplaneId <= 0) return false;
    if(flightSeatingId <= 0) return false;
    if(flightRouteId <= 0) return false;
    if(!flightDepartureTime) return false;
    if(hours <= 0) return false;
    if(minutes < 0) return false;
    return true;
  };

  const handleSubmit = () => {
    if(!handleValidate()) return;
    const flightDuration = (hours * 3600) + (minutes * 60) ;
    var formattedDate = moment(flightDepartureTime).format('YYYY-MM-DD HH:mm:ss').toString();
    
    const newFlight = {
      flightId: selectedFlight.flightId,
      flightAirplaneId : flightAirplaneId,
      flightSeatingId : flightSeatingId,
      flightRouteId : flightRouteId,
      flightDepartureTime : formattedDate,
      flightDuration : flightDuration,
      flightStatus: flightStatus
    };

    if(!_.isEqual(selectedFlight, newFlight)) {
      FlightsDispatcher.onEdit(null, newFlight);
    } else {
      FlightsDispatcher.onEditFake(newFlight);
    }
  };

  const handleRevert = () => {
      const origFlight = {
        flightId: selectedFlight.flightId,
        flightAirplaneId : selectedFlight.flightAirplane.airplaneId,
        flightSeatingId : selectedFlight.flightSeatingId,
        flightRouteId : selectedFlight.flightRoute.routeId,
        flightDepartureTime : selectedFlight.flightDepartureTime,
        flightDuration : selectedFlight.flightDuration,
        flightStatus: selectedFlight.flightStatus
      };
      FlightsDispatcher.onEdit(null, origFlight);
      setIsReverted(true);
  } 

  return (
    <FlexColumn>

      {(status === "PENDING" || status === "ERROR") && 
      <FlexColumn className="mt-5">
        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Airplane ID" 
          result={results.flightId ? results.flightAirplane.airplaneId : ". . ."}
          status={flightAirplaneIdChanged ? resultsStatus : "DISABLED"} 
        />

        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Seating ID" 
          result={results.flightId ? results.flightSeatingId : ". . ."}
          status={flightSeatingIdChanged ? resultsStatus : "DISABLED"} 
        />

        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Route ID" 
          result={results.flightId ? results.flightRoute.routeId : ". . ."}
          status={flightRouteIdChanged ? resultsStatus : "DISABLED"} 
        />

        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Duration" 
          result={results.flightId ? results.flightDuration : ". . ."}
          status={flightDurationChanged ? resultsStatus : "DISABLED"} 
        />

        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Departure" 
          result={results.flightId ? results.flightDepartureTime : ". . ."}
          status={flightDepartureTimeChanged ? resultsStatus : "DISABLED"} 
        />

        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Status" 
          result={results.flightId ? results.flightStatus : ". . ."}
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
                  : () => handleRevert()
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
                  value={selectedFlight.flightId}
                  type="number"
                  readOnly
                />
              </div>
              <div className="mt-3 ml-3" style={{width:"14rem"}}>
                <label className="form-label">Airplane ID</label>
                <input 
                  className={"form-control " +  (isSubmitted ? flightAirplaneId < 1 ? "is-invalid" : "is-valid" : "")} 
                  defaultValue={flightAirplaneId}
                  min="1"
                  placeholder="Number"
                  type="number" 
                  onInput={(e) => setAirplaneId(e.target.value)}
                />
              </div>

              <div className="mt-3 ml-3" style={{width:"14rem"}}>
                <label className="form-label">Seating ID</label>
                <input 
                  className={"form-control " +  (isSubmitted ? flightSeatingId < 1? "is-invalid" : "is-valid" : "")} 
                  defaultValue={flightSeatingId}
                  min="1"
                  placeholder="Number"
                  type="number" 
                  onInput={(e) => setSeatingId(e.target.value)}
                />
              </div>
            </FlexRow>

            <FlexRow>
              <div className="mt-3 ml-3" style={{width:"14rem"}}>
                <label className="form-label">Route ID</label>
                <input 
                  className={"form-control " +  (isSubmitted ? flightRouteId < 1 ? "is-invalid" : "is-valid" : "")} 
                  defaultValue={flightRouteId}
                  min="1"
                  placeholder="Number"
                  type="number" 
                  onInput={(e) => setRouteId(e.target.value)}
                />
              </div>

              <div className="mt-3 ml-3" style={{width:"20rem"}}>
                <label className="form-label">Departure (UTC)</label>
                <input 
                  className={"form-control"}
                  defaultValue={moment(selectedDateTime).format('YYYY-MM-DDTHH:mm').toString()}
                  type="datetime-local"
                  min={dateTimeNow}
                  onChange={(e) => setDateTime(e.target.value)}
                />
              </div>
        
            </FlexRow>

            <FlexRow>
              <div className="mt-3 ml-3" style={{width:"14rem"}}>
                <label className="form-label">Duration</label>
                <input 
                  className={"form-control " +  (isSubmitted ? hours < 1 ? "is-invalid" : "is-valid" : "")} 
                  defaultValue={selectedHours || 0}
                  type="number"
                  placeholder="Hours"
                  min="1"
                  onInput={(e) => setHours(e.target.value)}
                />
                <input 
                  className={"form-control " +  (isSubmitted ? minutes < 0 ? "is-invalid" : "is-valid" : "")} 
                  defaultValue={selectedMinutes}
                  placeholder="Minutes"
                  type="number"
                  min="1"
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
                  <option value="GROUNDED">GROUNDED</option>
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