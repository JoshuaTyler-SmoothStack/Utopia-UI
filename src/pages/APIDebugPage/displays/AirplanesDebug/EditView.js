// Libraries
import React, { Component } from 'react';
import Store from '../../../../reducers/Store';
import AirplanesDispatcher from "../../../../dispatchers/AirplanesDispatcher";
import KitUtils from '../../../../kitutils/KitUtils_v1.0.0';

// Components
import ChangeOperationReadout from '../ChangeOperationReadout';
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";


class EditView extends Component {
  constructor(props) {
    super(props);


    const { airplanes } = Store.getState();
    const selectedAirplane = airplanes.selected;
    this.state = {
      id: selectedAirplane.id,
      typeId: selectedAirplane.typeId,
      reverted: false
    };
  }
  render() { 
    const { airplanes } = Store.getState();
    const { id, typeId, reverted } = this.state;

    const selectedAirplane = airplanes.selected;
    const results = airplanes.edit.results
    const resultsStatus = airplanes.edit.resultsStatus;
    const status = airplanes.edit.status;
    
    const resultsPending = resultsStatus === "PENDING";
    const noChangesMade = results.typeId === selectedAirplane.typeId;


    return (
      <FlexColumn>

        {(status === "PENDING" || status === "ERROR") && 
        <FlexColumn className="mt-5">
          <ChangeOperationReadout 
            className="m-1" 
            style={{minHeight: "4rem"}} 
            name="Airplane" status={resultsStatus} 
            result={(!noChangesMade 
              ? "Updated Airplane: " + results.id + 
                " typeId to: " + results.typeId + "."
              : "No changes made.")
            }
          />

          <FlexRow>
              <button className="btn btn-light m-3"
                onClick={() => AirplanesDispatcher.onCancel()}
              >
                Close
              </button>
              
              {(status !== "ERROR" && noChangesMade && !reverted) &&
                <button className={"btn btn-danger m-3 disabled"}
                  onClick={() => KitUtils.soundAlert()}
                >
                  {"Revert Changes (no changes made)"}
                </button>}


              {(status !== "ERROR" && !noChangesMade && !reverted) &&
                <button className={"btn btn-danger m-3" + (!resultsPending || " disabled")}
                  onClick={resultsPending 
                    ? () => KitUtils.soundSuccess() 
                    : () => {
                      this.handleValidate(selectedAirplane, selectedAirplane.typeId, true);
                      this.setState({reverted: true});
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
              <input type="text" readOnly className="form-control" value={id}/>
            </div>
            <div className="mt-3 ml-3" style={{width:"14rem"}}>
              <label className="form-label">TypeId</label>
              <input type="number" min="1" className="form-control" defaultValue={typeId}
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
          <button className="btn btn-danger m-3"
            onClick={() => this.handleValidate(selectedAirplane, typeId, false)}
          >
            Save Changes
          </button>
        </FlexRow>
      </FlexColumn>}
    </FlexColumn>
    );
  }

  handleValidate = (id, typeId, isRevert) => {
    // TODO validate pre-API call 
    // (though API does validate, this will provide 
    // a better UX with more responsive feedback);
    AirplanesDispatcher.onEdit(id, typeId, isRevert);
  }
}
export default EditView;