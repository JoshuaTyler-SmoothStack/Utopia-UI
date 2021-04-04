// Libraries
import _ from "lodash";
import React, { useState } from 'react';
import Store from '../../../../reducers/Store';
import AirplanesDispatcher from "../../../../dispatchers/AirplanesDispatcher";
import KitUtils from '../../../../kitutils/KitUtils';

// Components
import ChangeOperationReadout from '../ChangeOperationReadout';
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";


const EditView = (props) => {

  const { airplanes } = Store.getState();
  const selectedAirplane = airplanes.selected;

  const [airplaneTypeId, setTypeId] = useState(selectedAirplane.airplaneTypeId);
  const [isReverted, setIsReverted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const results = airplanes.edit.results
  const resultsStatus = airplanes.edit.resultsStatus;
  const status = airplanes.edit.status;
  
  const airplaneTypeIdChanged = results
    ? selectedAirplane.airplaneTypeId !== results.airplaneTypeId
    : true;

  const resultsPending = resultsStatus === "PENDING";
  const noChangesMade = _.isEqual(selectedAirplane, results);

  const handleValidate = () => {
    setIsSubmitted(true);
    if(!airplaneTypeId || isNaN(airplaneTypeId) || airplaneTypeId === 0) return false;
    return true;
  };

  const handleSubmit = () => {
    if(!handleValidate()) return;
    const newAirplane = {
      airplaneId: selectedAirplane.airplaneId,
      airplaneTypeId: airplaneTypeId,
    };
    if(!_.isEqual(selectedAirplane, newAirplane)) {
      AirplanesDispatcher.onEdit(null, newAirplane);
    } else {
      AirplanesDispatcher.onEditFake(newAirplane);
    }
  };

  return (
    <FlexColumn>

      {(status === "PENDING" || status === "ERROR") && 
      <FlexColumn className="mt-5">
        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Airplane" 
          result={results ? results.airplaneTypeId : ". . ."}
          status={airplaneTypeIdChanged ? resultsStatus : "DISABLED"} 
        />

        <FlexRow>
            <button className="btn btn-light m-3"
              onClick={() => {
                AirplanesDispatcher.onCancel();
                AirplanesDispatcher.onRequest();
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
                    AirplanesDispatcher.onEdit(null, selectedAirplane);
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
      {/* Airplane */}
      <FlexColumn>
        <FlexRow>
          <div className="mt-3" style={{width:"14rem"}}>
            <label className="form-label">Airplane ID</label>
            <input 
              className="form-control" 
              readOnly 
              type="text" 
              value={selectedAirplane.airplaneId}/>
          </div>
          <div className="mt-3 ml-3" style={{width:"14rem"}}>
            <label className="form-label">Type ID</label>
            <input 
              className={"form-control " +  (isSubmitted ? !airplaneTypeId ? "is-invalid" : "is-valid" : "")}
              defaultValue={airplaneTypeId}
              min="1" 
              type="number" 
              onChange={(e) => setTypeId(e.target.value)}
            />
          </div>
        </FlexRow>
        <hr className="w-100"></hr>
      </FlexColumn>     


      {/* Buttons */}
      <FlexRow>
        <button className="btn btn-light m-3"
          onClick={() => AirplanesDispatcher.onCancel()}
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