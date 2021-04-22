// Libraries
import UsersDispatcher from "../../../../dispatchers/UsersDispatcher";
import Store from "../../../../reducers/Store";

// Components
import ChangeOperationReadout from "../ChangeOperationReadout";
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";

const DeleteView = () => {
  const { users } = Store.getState();

  const resultsStatus = users.delete.resultsStatus;
  const selectedUser = users.selected;
  const status = users.delete.status;

  return(
    <FlexColumn>
      {status === "PENDING" && 
        <FlexColumn className="mt-5">
          {/* Change Readout */}
          <ChangeOperationReadout 
            className="m-1" 
            style={{minHeight: "4rem"}} 
            name="User" 
            result={resultsStatus === "SUCCESS" ? "Successfully Deleted" : "Failed To Delete"}
            status={resultsStatus}
          />

          {/* Divider */}
          <hr className="w-100"></hr>

          {/* Button */}
          <FlexRow>
            <button className="btn btn-light m-3"
              onClick={() => {
                UsersDispatcher.onCancel();
                UsersDispatcher.onRequest();
              }}
            >
              Close
            </button>
          </FlexRow>
        </FlexColumn>
      }

      {status !== "PENDING" &&
        <FlexColumn>
          {/* User */}
          <FlexColumn>
            <FlexRow>
              <div className="mt-3">
                <label className="form-label">User ID</label>
                <input type="text" readOnly className="form-control" value={selectedUser.userId}/>
              </div>
              <div className="mt-3 ml-3">
                <label className="form-label">Email</label>
                <input type="text" readOnly className="form-control" value={selectedUser.userEmail}/>
              </div>
            </FlexRow>
            <FlexRow>
              <div className="mt-3">
                <label className="form-label">First Name</label>
                <input type="text" readOnly className="form-control" value={selectedUser.userFirstName}/>
              </div>
              <div className="mt-3 ml-3">
                <label className="form-label">Last Name</label>
                <input type="text" readOnly className="form-control" value={selectedUser.userLastName}/>
              </div>
            </FlexRow>
          </FlexColumn>
          

          {/* Buttons */}
          <FlexRow>
            <button className="btn btn-light m-3"
              onClick={() => UsersDispatcher.onCancel()}
            >
              Cancel
            </button>
            <button className="btn btn-primary m-3"
              onClick={() => UsersDispatcher.onDelete("/" + selectedUser.userId)}
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