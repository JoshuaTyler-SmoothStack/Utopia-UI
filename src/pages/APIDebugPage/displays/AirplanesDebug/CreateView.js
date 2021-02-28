// Libraries
import React, { Component } from 'react';
import Store from '../../../../reducers/Store';
import AirplanesDispatcher from "../../../../dispatchers/AirplanesDispatcher";

// Components
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";
import ChangeOperationReadout from '../ChangeOperationReadout';
import KitUtils from '../../../../kitutils/KitUtils_v1.0.0';

class CreateView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeId: 1,
    };
  }
  render() { 
    const { airplanes } = Store.getState();
    const { typeId } = this.state;

    const results = airplanes.create.results
    const resultsStatus = airplanes.create.resultsStatus;
    const resultsPending = resultsStatus === "PENDING";
    const status = airplanes.create.status;

    return (
      <FlexColumn>
        {(status === "PENDING" || status === "ERROR") && 
          <FlexColumn className="mt-5">
            {/* Operation Readout */}
            <ChangeOperationReadout 
              className="m-1" 
              style={{minHeight: "4rem"}} 
              name="Airplane" status={resultsStatus} 
              result={"Created Airplane with ID: " + results.id + 
              " and TypeID: " + results.typeId + "."}
            />
            
            {/* Divider */}
            <hr className="w-100"></hr>

            {/* Buttons */}
            <FlexRow>
              <button className="btn btn-light m-3"
                onClick={() => AirplanesDispatcher.onCancel()}
              >
                Close
              </button>
              {status !== "ERROR" &&
              <button className={"btn btn-info m-3" + (!resultsPending || " disabled")}
                onClick={!resultsPending ? () => AirplanesDispatcher.onPromptEdit(airplanes.selected.id) : () => {KitUtils.soundAlert()}}
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
                  <input type="text" readOnly className="form-control" value={"Auto-generated"}/>
                </div>
                <div className="mt-3 ml-3" style={{width:"14rem"}}>
                  <label className="form-label">Type ID</label>
                  <input type="number" className="form-control" defaultValue={typeId}
                  onChange={(e) => this.setState({typeId: e.target.value})}
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
                onClick={() => AirplanesDispatcher.onCreate(typeId)}
              >
                + Create New Airplane
              </button>
            </FlexRow>
          </FlexColumn>
        }
      </FlexColumn>
    );
  }
}
export default CreateView;