// Libraries
import _ from "lodash";
import React, { useState } from 'react';
import Store from '../../../../reducers/Store';
import RoutesDispatcher from "../../../../dispatchers/RoutesDispatcher";
import KitUtils from '../../../../kitutils/KitUtils_v1.0.0';

// Components
import ChangeOperationReadout from '../ChangeOperationReadout';
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";


const EditView = (props) => {

  const { routes } = Store.getState();
  const selectedRoute = routes.selected;

  const [routeOriginIataId, setRouteOriginIataId] = useState(selectedRoute.routeOriginIataId);
  const [routeDestinationIataId, setRouteDestinationIataId] = useState(selectedRoute.routeDestinationIataId);
  const [isReverted, setIsReverted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const results = routes.edit.results
  const resultsStatus = routes.edit.resultsStatus;
  const status = routes.edit.status;
  
  const routeOriginIataIdChanged = results
    ? selectedRoute.routeOriginIataId !== results.routeOriginIataId
    : true;
  
  const routeDestinationIataIdChanged = results
    ? selectedRoute.routeDestinationIataId !== results.routeDestinationIataId
    : true;

  const resultsPending = resultsStatus === "PENDING";
  const noChangesMade = _.isEqual(selectedRoute, results);

  const handleValidate = () => {
    setIsSubmitted(true);
    if(!routeOriginIataId) return false;
    if(!routeDestinationIataId) return false;
    return true;
  };

  const handleSubmit = () => {
    if(!handleValidate()) return;
    const newRoute = {
      routeId : selectedRoute.routeId,
      routeOriginIataId: routeOriginIataId,
      routeDestinationIataId: routeDestinationIataId,
    };
    if(!_.isEqual(selectedRoute, newRoute)) {
      RoutesDispatcher.onEdit(null, newRoute);
    } else {
      RoutesDispatcher.onEditFake(newRoute);
    }
  };

  return (
    <FlexColumn>

      {(status === "PENDING" || status === "ERROR") && 
      <FlexColumn className="mt-5">
        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Origin Iata ID" 
          result={results ? results.routeOriginIataId : ". . ."}
          status={routeOriginIataIdChanged ? resultsStatus : "DISABLED"} 
        />

        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Destination Iata ID" 
          result={results ? results.routeDestinationIataId : ". . ."}
          status={routeDestinationIataId ? resultsStatus : "DISABLED"} 
        />

        <FlexRow>
            <button className="btn btn-light m-3"
              onClick={() => {
                RoutesDispatcher.onCancel();
                RoutesDispatcher.onRequest();
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
                    RoutesDispatcher.onEdit(null, selectedRoute);
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
      {/* Route */}
      <FlexColumn>
        <FlexRow>
          <div className="mt-3" style={{width:"14rem"}}>
            <label className="form-label">Route ID</label>
            <input 
              className="form-control" 
              readOnly 
              type="text" 
              value={selectedRoute.routeId}/>
          </div>
          <div className="mt-3 ml-3" style={{width:"14rem"}}>
            <label className="form-label">Origin Iata ID</label>
            <input 
              className={"form-control " +  (isSubmitted ? !routeOriginIataId ? "is-invalid" : "is-valid" : "")}
              defaultValue={routeOriginIataId}
              type="text" 
              onChange={(e) => setRouteOriginIataId(e.target.value)}
            />
          </div>
          <div className="mt-3 ml-3" style={{width:"14rem"}}>
            <label className="form-label">Destination Iata ID</label>
            <input 
              className={"form-control " +  (isSubmitted ? !routeDestinationIataId ? "is-invalid" : "is-valid" : "")}
              defaultValue={routeDestinationIataId}
              type="text" 
              onChange={(e) => setRouteDestinationIataId(e.target.value)}
            />
          </div>
        </FlexRow>
        <hr className="w-100"></hr>
      </FlexColumn>     


      {/* Buttons */}
      <FlexRow>
        <button className="btn btn-light m-3"
          onClick={() => RoutesDispatcher.onCancel()}
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