// Libraries
import React, { Component } from 'react';
import Store from '../../../../reducers/Store';
import AirportsDispatcher from "../../../../dispatchers/AirportsDispatcher";

// Components
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";
import ChangeOperationReadout from '../ChangeOperationReadout';
import KitUtils from '../../../../kitutils/KitUtils_v1.0.0';

class CreateView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      iataId: "",
      city: "",
    };
  }

  render() { 
    const { airports } = Store.getState();
    const { iataId, city } = this.state;

    const results = airports.create.results
    const resultsStatus = airports.create.resultsStatus;
    const resultsPending = resultsStatus === "PENDING";
    const status = airports.create.status;

    return (
      <FlexColumn>
        {(status === "PENDING" || status === "ERROR") && 
          <FlexColumn className="mt-5">
            {/* Operation Readout */}
            <ChangeOperationReadout 
              className="m-1" 
              style={{minHeight: "4rem"}} 
              name="Airport" status={resultsStatus} 
              result={"Created Airport with IATA ID: " + results.iataId + 
              " in City: " + results.city + "."}
            />
            
            {/* Divider */}
            <hr className="w-100"></hr>

            {/* Buttons */}
            <FlexRow>
              <button className="btn btn-light m-3"
                onClick={() => AirportsDispatcher.onCancel()}
              >
                Close
              </button>
              {status !== "ERROR" &&
              <button className={"btn btn-info m-3" + (!resultsPending || " disabled")}
                onClick={!resultsPending ? () => AirportsDispatcher.onPromptEdit(airports.selected.iataId) : () => {KitUtils.soundAlert()}}
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
                  <label className="form-label">Airport IATA ID</label>
                  <input type="text" className="form-control" defaultValue={iataId} placeholder={"ORD"}
                    onChange={(e) => this.setState({iataId: e.target.value})}
                  />
                </div>
                <div className="mt-3 ml-3" style={{width:"14rem"}}>
                  <label className="form-label">City</label>
                  <input type="text" className="form-control" defaultValue={city} placeholder={"Chicago"}
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
              <button className="btn btn-success text-white kit-text-shadow-thin m-3"
                onClick={() => this.handleValidate(iataId, city)}
              >
                + Create New Airport
              </button>
            </FlexRow>
          </FlexColumn>
        }
      </FlexColumn>
    );
  }

  handleValidate = (iataId, city) => {
    // TODO validate pre-API call 
    // (though API does validate, this will provide 
    // a better UX with more responsive feedback);
    AirportsDispatcher.onCreate(iataId, city);
  }
}
export default CreateView;