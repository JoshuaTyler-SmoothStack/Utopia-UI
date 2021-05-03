// Libraries
import _ from "lodash";
import React, { useState } from 'react';
import Store from '../../../../reducers/Store';
import AirportsDispatcher from "../../../../dispatchers/AirportsDispatcher";
import KitUtils from '../../../../kitutils/KitUtils';

// Components
import ChangeOperationReadout from '../ChangeOperationReadout';
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";


const EditView = (props) => {

  const { airports } = Store.getState();
  const selectedAirport = airports.selected;

  const [airportCityName, setAirportCityName] = useState(selectedAirport.airportCityName);
  const [isReverted, setIsReverted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const results = airports.edit.results
  const resultsStatus = airports.edit.resultsStatus;
  const status = airports.edit.status;
  
  const airportCityNameChanged = results
    ? selectedAirport.airportCityName !== results.airportCityName
    : true;

  const resultsPending = resultsStatus === "PENDING";
  const noChangesMade = _.isEqual(selectedAirport, results);

  const handleValidate = () => {
    setIsSubmitted(true);
    if(!airportCityName) return false;
    return true;
  };

  const handleSubmit = () => {
    if(!handleValidate()) return;
    const newAirport = {
      airportIataId: selectedAirport.airportIataId,
      airportCityName: airportCityName,
    };
    if(!_.isEqual(selectedAirport, newAirport)) {
      AirportsDispatcher.onEdit(null, newAirport);
    } else {
      AirportsDispatcher.onEditFake(newAirport);
    }
  };

  return (
    <FlexColumn>

      {(status === "PENDING" || status === "ERROR") && 
      <FlexColumn className="mt-5">
        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Airport" 
          result={results ? results.airportCityName : ". . ."}
          status={airportCityNameChanged ? resultsStatus : "DISABLED"} 
        />

        <FlexRow>
            <button className="btn btn-light m-3"
              onClick={() => {
                AirportsDispatcher.onCancel();
                AirportsDispatcher.onRequest();
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
                    AirportsDispatcher.onEdit(null, selectedAirport);
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
      {/* Airport */}
      <FlexColumn>
        <FlexRow>
          <div className="mt-3" style={{width:"14rem"}}>
            <label className="form-label">IATA ID</label>
            <input 
              className="form-control" 
              readOnly 
              type="text" 
              value={selectedAirport.airportIataId}/>
          </div>
          <div className="mt-3 ml-3" style={{width:"14rem"}}>
            <label className="form-label">City</label>
            <input 
              className={"form-control " +  (isSubmitted ? !airportCityName ? "is-invalid" : "is-valid" : "")}
              defaultValue={airportCityName}
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