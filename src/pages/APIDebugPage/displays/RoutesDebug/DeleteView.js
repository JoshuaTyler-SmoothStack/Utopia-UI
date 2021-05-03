// Libraries
import RoutesDispatcher from "../../../../dispatchers/RoutesDispatcher";
import Store from "../../../../reducers/Store";

// Components
import ChangeOperationReadout from "../ChangeOperationReadout";
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";

const DeleteView = () => {
  const { routes } = Store.getState();

  const { resultsStatus, status } = routes.delete;
  const selectedRoute = routes.selected;

  return (
    <FlexColumn>
      {status === "PENDING" && (
        <FlexColumn className="mt-5">
          {/* Change Readout */}
          <ChangeOperationReadout
            className="m-1"
            style={{ minHeight: "4rem" }}
            name="Route"
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
                RoutesDispatcher.onCancel();
                RoutesDispatcher.onRequest();
              }}
            >
              Close
            </button>
          </FlexRow>
        </FlexColumn>
      )}

      {status !== "PENDING" && (
        <FlexColumn>
          {/* Route */}
          <FlexColumn>
            <FlexRow>
              <div className="mt-3">
                <label className="form-label">Route ID</label>
                <input
                  type="text"
                  readOnly
                  className="form-control"
                  value={selectedRoute.routeId}
                />
              </div>
              <div className="mt-3 ml-3">
                <label className="form-label">Origin Iata ID</label>
                <input
                  type="text"
                  readOnly
                  className="form-control"
                  value={selectedRoute.routeOrigin.airportIataId}
                />
              </div>
              <div className="mt-3 ml-3">
                <label className="form-label">Destination Iata ID</label>
                <input
                  type="text"
                  readOnly
                  className="form-control"
                  value={selectedRoute.routeDestination.airportIataId}
                />
              </div>
            </FlexRow>
          </FlexColumn>

          {/* Buttons */}
          <FlexRow>
            <button
              className="btn btn-light m-3"
              onClick={() => RoutesDispatcher.onCancel()}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary m-3"
              onClick={() =>
                RoutesDispatcher.onDelete(`/${selectedRoute.routeId}`)
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
