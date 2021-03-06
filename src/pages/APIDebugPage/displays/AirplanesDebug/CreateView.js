// Libraries
import React, { useState } from 'react';
import Store from '../../../../reducers/Store';
import AirplanesDispatcher from "../../../../dispatchers/AirplanesDispatcher";

// Components
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";
import ChangeOperationReadout from '../ChangeOperationReadout';
import KitUtils from '../../../../kitutils/KitUtils_v1.0.0';

const CreateView = (props) => {
  const [airplaneTypeId, setTypeId] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { airplanes } = Store.getState();
  const results = airplanes.create.results
  const resultsStatus = airplanes.create.resultsStatus;
  const resultsPending = resultsStatus === "PENDING";
  const status = airplanes.create.status;

  const handleValidate = () => {
    setIsSubmitted(true);
    if(!airplaneTypeId || isNaN(airplaneTypeId) || airplaneTypeId === 0) return false;
    return true;
  };

  const handleSubmit = () => {
    if(!handleValidate()) return;
    const newAirplane = {
      airplaneTypeId: airplaneTypeId,
    };
    AirplanesDispatcher.onCreate(null, newAirplane);
  };

  return (
    <FlexColumn>
      {(status === "PENDING" || status === "ERROR") && 
        <FlexColumn className="mt-5">
          {/* Operation Readout */}
          <ChangeOperationReadout 
            className="m-1" 
            style={{minHeight: "4rem"}} 
            name="Airplane"
            result={"Created Airplane with ID: " + results.airplaneId + 
            " and TypeID: " + results.airplaneTypeId + "."}
            status={(resultsStatus || "DISABLED")} 
          />
          
          {/* Divider */}
          <hr className="w-100"></hr>

          {/* Buttons */}
          <FlexRow>
            <button className="btn btn-light m-3"
              onClick={() => {
                AirplanesDispatcher.onCancel();
                AirplanesDispatcher.onRequest();
              }}
            >
              Close
            </button>
            {status !== "ERROR" &&
            <button className={"btn btn-info m-3" + (!resultsPending || " disabled")}
              onClick={!resultsPending 
                ? () => AirplanesDispatcher.onPromptEdit("/" + results.airplaneId)
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
          {/* Airplane */}
          <FlexColumn>
            <FlexRow>
              <div className="mt-3" style={{width:"14rem"}}>
                <label className="form-label">Airplane ID</label>
                <input 
                  className="form-control" 
                  readOnly 
                  type="text" 
                  value={"Auto-generated"}
                />
              </div>
              <div className="mt-3 ml-3" style={{width:"14rem"}}>
                <label className="form-label">Type ID</label>
                <input 
                  className={"form-control " +  (isSubmitted ? !airplaneTypeId ? "is-invalid" : "is-valid" : "")}
                  defaultValue={airplaneTypeId}
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
            <button className="btn btn-success text-white m-3"
              onClick={() => handleSubmit()}
            >
              + Create New Airplane
            </button>
          </FlexRow>
        </FlexColumn>
      }
    </FlexColumn>
  );
}
export default CreateView;