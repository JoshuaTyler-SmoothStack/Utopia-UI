// Libraries
import React, { useState } from 'react';
import Store from '../../../../reducers/Store';
import FlightsDispatcher from "../../../../dispatchers/FlightsDispatcher";
import moment from 'moment';

// Components
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";
import ChangeOperationReadout from '../ChangeOperationReadout';
import KitUtils from '../../../../kitutils/KitUtils_v1.0.0';

const CreateView = (props) => {
  const dateTimeNow = moment().utc().format("YYYY-MM-DDTHH:mm");
  
  const [flightAirplaneId, setAirplaneId] = useState(1);
  const [flightSeatingId, setSeatingId] = useState(1);
  const [flightRouteId, setRouteId] = useState(1);
  const [flightDepartureTime, setDateTime] = useState(dateTimeNow);
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { flights } = Store.getState();
  const results = flights.create.results
  const resultsStatus = flights.create.resultsStatus;
  const resultsPending = resultsStatus === "PENDING";
  const status = flights.create.status;

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
    var formattedDate = moment(flightDepartureTime).format('YYYY-MM-DD HH:mm:ss');
    
    const newFlight = {
      flightAirplaneId : flightAirplaneId,
      flightSeatingId : flightSeatingId,
      flightRouteId : flightRouteId,
      flightDepartureTime : formattedDate,
      flightDuration : flightDuration,
      flightStatus: "INACTIVE"
    };

    FlightsDispatcher.onCreate(null, newFlight);
  };

  return (
    <FlexColumn>
      {(status === "PENDING" || status === "ERROR") && 
        <FlexColumn className="mt-5">
          {/* Operation Readout */}
          <ChangeOperationReadout 
            className="m-1" 
            style={{minHeight: "4rem"}} 
            name="Flight"
            result={flights.create.resultsStatus !== "ERROR"
              ? "Created Flight with Airplane ID: " + flightAirplaneId + " and RouteId: " + flightRouteId + "."
              : flights.create.results.error
            }
            status={resultsStatus || "DISABLED"}
          />
          
          {/* Divider */}
          <hr className="w-100"></hr>

          {/* Buttons */}
          <FlexRow>
            <button className="btn btn-light m-3"
              onClick={() => {
                FlightsDispatcher.onCancel();
                FlightsDispatcher.onRequest();
              }}
            >
              Close
            </button>
            {status !== "ERROR" &&
            <button className={"btn btn-info m-3" + (!resultsPending || " disabled")}
              onClick={!resultsPending 
                ? () => FlightsDispatcher.onPromptEdit("/" + results.flightId)
                : () => {KitUtils.soundAlert()
              }}
            >
              {resultsPending ? "Edit (please wait)" : "Edit"}
            </button>}
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
                  placeholder="Auto-generated"
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
                  className={"form-control " +  (isSubmitted ? flightSeatingId < 1 ? "is-invalid" : "is-valid" : "")} 
                  defaultValue={flightSeatingId}
                  min="1"
                  placeholder="Number"
                  type="number" 
                  onChange={(e) => setSeatingId(e.target.value)}
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
                  type="datetime-local"
                  defaultValue={dateTimeNow}
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
                  defaultValue={hours}
                  min="1"
                  placeholder="Hours"
                  type="number" 
                  onInput={(e) => setHours(e.target.value)}
                />
                <input 
                  className={"form-control " +  (isSubmitted ? minutes < 0 ? "is-invalid" : "is-valid" : "")} 
                  defaultValue={minutes}
                  placeholder="Minutes"
                  step="10"
                  min="0"
                  type="number"
                  max = "60" 
                  onInput={(e) => setMinutes(e.target.value)}
                />
              </div>

              <div className="mt-3 ml-3" style={{width:"14rem"}}>
                <label className="form-label">Status</label>
                <input 
                  className={"form-control"}
                  placeholder="Inactive"
                  type="number"
                  readOnly
                />
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
            <button className="btn btn-success text-white m-3"
              onClick={() => handleSubmit()}
            >
              + Create New Flight
            </button>
          </FlexRow>
        </FlexColumn>
      }
    </FlexColumn>
  );
}
export default CreateView;