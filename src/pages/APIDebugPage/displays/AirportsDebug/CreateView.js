// Libraries
import React, { useState } from 'react';
import Store from '../../../../reducers/Store';
import AirportsDispatcher from "../../../../dispatchers/AirportsDispatcher";

// Components
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";
import ChangeOperationReadout from '../ChangeOperationReadout';
import KitUtils from '../../../../kitutils/KitUtils';

const CreateView = (props) => {
  const [airportIataId, setAirportIataId] = useState("");
  const [airportCityName, setAirportCityName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { airports } = Store.getState();
  const results = airports.create.results
  const resultsStatus = airports.create.resultsStatus;
  const resultsPending = resultsStatus === "PENDING";
  const status = airports.create.status;

  const handleValidate = () => {
    setIsSubmitted(true);
    if(!airportIataId) return false;
    if(!airportCityName) return false;
    return true;
  };

  const handleSubmit = () => {
    if(!handleValidate()) return;
    const newAirport = {
      airportIataId: airportIataId,
      airportCityName: airportCityName,
    };
    AirportsDispatcher.onCreate(null, newAirport);
  };

  return (
    <FlexColumn>
      {(status === "PENDING" || status === "ERROR") && 
        <FlexColumn className="mt-5">
          {/* Operation Readout */}
          <ChangeOperationReadout 
            className="m-1" 
            style={{minHeight: "4rem"}} 
            name="Airport"
            result={"Created Airport with IATA ID: " + results.airportIataId + 
            " and City: " + results.airportCityName + "."}
            status={resultsStatus || "DISABLED"}
          />
          
          {/* Divider */}
          <hr className="w-100"></hr>

          {/* Buttons */}
          <FlexRow>
            <button className="btn btn-light m-3"
              onClick={() => {
                AirportsDispatcher.onCancel();
                AirportsDispatcher.onRequest();
              }}
            >
              Close
            </button>
            {status !== "ERROR" &&
            <button className={"btn btn-info m-3" + (!resultsPending || " disabled")}
              onClick={!resultsPending 
                ? () => AirportsDispatcher.onPromptEdit("/" + results.airportIataId)
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
          {/* Airport */}
          <FlexColumn>
            <FlexRow>
              <div className="mt-3" style={{width:"14rem"}}>
                <label className="form-label">IATA ID</label>
                <input 
                  className={"form-control " +  (isSubmitted ? !airportIataId ? "is-invalid" : "is-valid" : "")}
                  defaultValue={airportIataId}
                  placeholder="ORD"
                  type="text" 
                  onChange={(e) => setAirportIataId(e.target.value)}
                />
              </div>
              <div className="mt-3 ml-3" style={{width:"14rem"}}>
                <label className="form-label">City</label>
                <input 
                  className={"form-control " +  (isSubmitted ? !airportCityName ? "is-invalid" : "is-valid" : "")} 
                  defaultValue={airportCityName}
                  placeholder="Chicago"
                  type="text" 
                  onChange={(e) => setAirportCityName(e.target.value)}
                />
              </div>
            </FlexRow>
            <hr className="w-100"></hr>
          </FlexColumn>
          

          {/* Buttons */}
          <FlexRow>
            <button className="btn btn-light m-3"
              onClick={() => AirportsDispatcher.onCancel()}
            >
              Cancel
            </button>
            <button className="btn btn-success text-white m-3"
              onClick={() => handleSubmit()}
            >
              + Create New Airport
            </button>
          </FlexRow>
        </FlexColumn>
      }
    </FlexColumn>
  );
}
export default CreateView;