// Libraries
import AirportsDispatcher from "../../../../dispatchers/AirportsDispatcher";
import Store from "../../../../reducers/Store";

// Components
import ChangeOperationReadout from "../ChangeOperationReadout";
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";

const DeleteView = () => {
  const { airports } = Store.getState();

  const resultsStatus = airports.delete.resultsStatus;
  const selectedAirport = airports.selected;
  const status = airports.delete.status;

  return(
    <FlexColumn>
      {status === "PENDING" && 
        <FlexColumn className="mt-5">
          {/* Change Readout */}
          <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
          name="Airport" status={resultsStatus} result={"Successfully Deleted"}/>

          {/* Divider */}
          <hr className="w-100"></hr>

          {/* Button */}
          <FlexRow>
            <button className="btn btn-light m-3"
              onClick={() => AirportsDispatcher.onCancel()}
            >
              Close
            </button>
          </FlexRow>
        </FlexColumn>
      }

      {status !== "PENDING" &&
        <FlexColumn>
          {/* Airport */}
          <FlexColumn>
            <FlexRow>
              <div className="mt-3">
                <label className="form-label">Airport IATA ID</label>
                <input type="text" readOnly className="form-control" value={selectedAirport.iataId}/>
              </div>
              <div className="mt-3 ml-3">
                <label className="form-label">City</label>
                <input type="text" readOnly className="form-control" value={selectedAirport.city}/>
              </div>
            </FlexRow>
          </FlexColumn>
          

          {/* Buttons */}
          <FlexRow>
            <button className="btn btn-light m-3"
              onClick={() => AirportsDispatcher.onCancel()}
            >
              Cancel
            </button>
            <button className="btn btn-primary m-3"
              onClick={() => AirportsDispatcher.onDelete(selectedAirport.iataId)}
            >
              Confirm Delete (cannot be undone)
            </button>
          </FlexRow>
        </FlexColumn>
      }
    </FlexColumn>
  );
}
export default DeleteView;