// Libraries
import AirplanesDispatcher from "../../../../dispatchers/AirplanesDispatcher";
import Store from "../../../../reducers/Store";

// Components
import ChangeOperationReadout from "../ChangeOperationReadout";
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";

const DeleteView = () => {
  const { airplanes } = Store.getState();

  const { resultsStatus, status } = airplanes.delete;
  const selectedAirplane = airplanes.selected;

  return (
    <FlexColumn>
      {status === "PENDING" && (
        <FlexColumn className="mt-5">
          {/* Change Readout */}
          <ChangeOperationReadout
            className="m-1"
            style={{ minHeight: "4rem" }}
            name="Airplane"
            result={
              resultsStatus === "SUCCESS"
                ? "Successfully Deleted"
                : "Failed To Delete"
            }
            status={resultsStatus}
          />

          {/* Divider */}
          <hr className="w-100"></hr>

          {/* Button */}
          <FlexRow>
            <button
              className="btn btn-light m-3"
              onClick={() => {
                AirplanesDispatcher.onCancel();
                AirplanesDispatcher.onRequest();
              }}
            >
              Close
            </button>
          </FlexRow>
        </FlexColumn>
      )}

      {status !== "PENDING" && (
        <FlexColumn>
          {/* Airplane */}
          <FlexColumn>
            <FlexRow>
              <div className="mt-3">
                <label className="form-label">Airplane ID</label>
                <input
                  type="text"
                  readOnly
                  className="form-control"
                  value={selectedAirplane.airplaneId}
                />
              </div>
              <div className="mt-3 ml-3">
                <label className="form-label">Type ID</label>
                <input
                  type="text"
                  readOnly
                  className="form-control"
                  value={selectedAirplane.airplaneType ? selectedAirplane.airplaneType.airplaneTypeId : "unkown"}
                />
              </div>
            </FlexRow>
          </FlexColumn>

          {/* Buttons */}
          <FlexRow>
            <button
              className="btn btn-light m-3"
              onClick={() => AirplanesDispatcher.onCancel()}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary m-3"
              onClick={() =>
                AirplanesDispatcher.onDelete("/" + selectedAirplane.airplaneId)
              }
            >
              Confirm Delete (cannot be undone)
            </button>
          </FlexRow>
        </FlexColumn>
      )}
    </FlexColumn>
  );
};
export default DeleteView;
