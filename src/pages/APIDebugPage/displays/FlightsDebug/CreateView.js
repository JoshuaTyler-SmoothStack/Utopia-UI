// Libraries
import React, { useState } from 'react';
import Store from '../../../../reducers/Store';
import FlightsDispatcher from "../../../../dispatchers/FlightsDispatcher";

// Components
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";
import ChangeOperationReadout from '../ChangeOperationReadout';
import KitUtils from '../../../../kitutils/KitUtils_v1.0.0';

const CreateView = (props) => {
  const [airplaneId, setAirplaneId] = useState("");
  const [seatingId, setSeatingId] = useState("");
  const [routeId, setRouteId] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { flights } = Store.getState();
  const results = flights.create.results
  const resultsStatus = flights.create.resultsStatus;
  const resultsPending = resultsStatus === "PENDING";
  const status = flights.create.status;

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
      airplaneId : airplaneId,
      seatingId : seatingId,
      routeId : routeId,
      dateTime : departure[0]+" "+departure[1]+":00",
      duration : duration,
      status: "INACTIVE"
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
            result={"Created Flight with Airplane ID: " + results.airplaneId + 
            " and RouteId: " + results.routeId + "."}
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
                  placeholder="Auto-generated"
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
                  defaultValue={hours}
                  placeholder="Hours"
                  type="number" 
                  onInput={(e) => setHours(e.target.value)}
                />
                <input 
                  className={"form-control " +  (isSubmitted ? !minutes ? "is-invalid" : "is-valid" : "")} 
                  defaultValue={minutes}
                  placeholder="Minutes"
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