// Libraries
import React, { Component } from 'react';
import Store from '../../../../reducers/Store';
import AirportsDispatcher from "../../../../dispatchers/AirportsDispatcher";
import KitUtils from '../../../../kitutils/KitUtils_v1.0.0';

// Components
import ChangeOperationReadout from '../ChangeOperationReadout';
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";

class EditView extends Component {
  constructor(props) {
    super(props);

    const { airports } = Store.getState();
    const selectedAirport = airports.selected;
    this.state = {
      iataId: selectedAirport.iataId,
      city: selectedAirport.city,
      reverted: false
    };
  }
  render() { 
    const { airports } = Store.getState();
    const { iataId, city, reverted } = this.state;

    const selectedAirport = airports.selected;
    const results = airports.edit.results
    const resultsStatus = airports.edit.resultsStatus;
    const status = airports.edit.status;
    
    const resultsPending = resultsStatus === "PENDING";
    const noChangesMade = results.city === selectedAirport.city;

    return (
      <FlexColumn>

        {(status === "PENDING" || status === "ERROR") && 
        <FlexColumn className="mt-5">
          <ChangeOperationReadout 
            className="m-1" 
            style={{minHeight: "4rem"}} 
            name="Airport" status={resultsStatus} 
            result={(!noChangesMade 
              ? "Updated Airport: " + results.iataId + 
                " city to: " + results.city + "."
              : "No changes made.")
            }
          />

          <FlexRow>
              <button className="btn btn-light m-3"
                onClick={() => AirportsDispatcher.onCancel()}
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
                      this.handleValidate(selectedAirport, selectedAirport.city, true);
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
        {/* Airport */}
        <FlexColumn>
          <FlexRow>
            <div className="mt-3" style={{width:"14rem"}}>
              <label className="form-label">Airport IATA ID</label>
              <input type="text" readOnly className="form-control" value={iataId}/>
            </div>
            <div className="mt-3 ml-3" style={{width:"14rem"}}>
              <label className="form-label">City</label>
              <input type="text" className="form-control" defaultValue={city}
                onChange={(e) => this.setState({city: e.target.value})}
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
            onClick={() => this.handleValidate(selectedAirport, city, false)}
          >
            Save Changes
          </button>
        </FlexRow>
      </FlexColumn>}
    </FlexColumn>
    );
  }

  handleValidate = (airport, newCityName, isRevert) => {
    // TODO validate pre-API call 
    // (though API does validate, this will provide 
    // a better UX with more responsive feedback);
    AirportsDispatcher.onEdit(airport, newCityName, isRevert);
  }
}
export default EditView;