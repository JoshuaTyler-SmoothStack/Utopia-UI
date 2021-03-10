// Libraries
import React, { useState } from 'react';
import Store from '../../../../reducers/Store';
import RoutesDispatcher from "../../../../dispatchers/RoutesDispatcher";

// Components
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";
import ChangeOperationReadout from '../ChangeOperationReadout';
import KitUtils from '../../../../kitutils/KitUtils_v1.0.0';

const CreateView = (props) => {
  const [routeOriginIataId, setRouteOriginIataId] = useState("");
  const [routeDestinationIataId, setRouteDestinationIataId] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { routes } = Store.getState();
  const results = routes.create.results
  const resultsStatus = routes.create.resultsStatus;
  const resultsPending = resultsStatus === "PENDING";
  const status = routes.create.status;

  const handleValidate = () => {
    setIsSubmitted(true);
    if(!routeOriginIataId) return false;
    if(!routeDestinationIataId) return false;
    return true;
  };

  const handleSubmit = () => {
    if(!handleValidate()) return;
    const newRoute = {
      routeOriginIataId: routeOriginIataId,
      routeDestinationIataId: routeDestinationIataId,
    };
    RoutesDispatcher.onCreate(null, newRoute);
  };

  return (
    <FlexColumn>
      {(status === "PENDING" || status === "ERROR") && 
        <FlexColumn className="mt-5">
          {/* Operation Readout */}
          <ChangeOperationReadout 
            className="m-1" 
            style={{minHeight: "4rem"}} 
            name="Route"
            result={"Created Route with RouteOriginIata ID: " + results.routeOriginIataId + 
            " and RouteDestinationIata ID: " + results.routeDestinationIataId + "."}
            status={resultsStatus || "DISABLED"}
          />
          
          {/* Divider */}
          <hr className="w-100"></hr>

          {/* Buttons */}
          <FlexRow>
            <button className="btn btn-light m-3"
              onClick={() => {
                RoutesDispatcher.onCancel();
                RoutesDispatcher.onRequest();
              }}
            >
              Close
            </button>
            {status !== "ERROR" &&
            <button className={"btn btn-info m-3" + (!resultsPending || " disabled")}
              onClick={!resultsPending 
                ? () => RoutesDispatcher.onPromptEdit("/" + results.routeId)
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
          {/* Route */}
          <FlexColumn>
            <FlexRow>
              <div className="mt-3" style={{width:"14rem"}}>
                <label className="form-label">Origin Iata ID</label>
                <input 
                  className={"form-control " +  (isSubmitted ? !routeOriginIataId ? "is-invalid" : "is-valid" : "")}
                  defaultValue={routeOriginIataId}
                  placeholder="JFK"
                  type="text" 
                  onChange={(e) => setRouteOriginIataId(e.target.value)}
                />
              </div>
              <div className="mt-3 ml-3" style={{width:"14rem"}}>
                <label className="form-label">Destination Iata ID</label>
                <input 
                  className={"form-control " +  (isSubmitted ? !routeDestinationIataId ? "is-invalid" : "is-valid" : "")} 
                  defaultValue={routeDestinationIataId}
                  placeholder="MIA"
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
            <button className="btn btn-success text-white m-3"
              onClick={() => handleSubmit()}
            >
              + Create New Route
            </button>
          </FlexRow>
        </FlexColumn>
      }
    </FlexColumn>
  );
}
export default CreateView;