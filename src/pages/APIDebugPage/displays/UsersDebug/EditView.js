// Libraries
import _ from "lodash";
import React, { useState } from 'react';
import Store from '../../../../reducers/Store';
import UsersDispatcher from "../../../../dispatchers/UsersDispatcher";
import KitUtils from '../../../../kitutils/KitUtils';

// Components
import ChangeOperationReadout from '../ChangeOperationReadout';
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";


const EditView = (props) => {

  const { users } = Store.getState();
  const selectedUser = users.selected;

  const [userEmail, setUserEmail] = useState(selectedUser.userEmail);
  const [userFirstName, setUserFirstName] = useState(selectedUser.userFirstName);
  const [userLastName, setUserLastName] = useState(selectedUser.userLastName);
  const [userPhone, setUserPhone] = useState(selectedUser.userPhone);
  const [userRole, setUserRole] = useState(selectedUser.userRole);
  const [isReverted, setIsReverted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const results = users.edit.results
  const resultsStatus = users.edit.resultsStatus;
  const status = users.edit.status;
  
  const userEmailChanged = results
    ? selectedUser.userEmail !== results.userEmail
    : true;
  
  const userFirstNameChanged = results
    ? selectedUser.userFirstName !== results.userFirstName
    : true;
    
  const userLastNameChanged = results
    ? selectedUser.userLastName !== results.userLastName
    : true;
    
  const userPhoneChanged = results
    ? selectedUser.userPhone !== results.userPhone
    : true;

  const resultsPending = resultsStatus === "PENDING";
  const noChangesMade = _.isEqual(selectedUser, results);

  const handleValidate = () => {
    setIsSubmitted(true);
    if(!userEmail) return false;
    return true;
  };

  const handleSubmit = () => {
    if(!handleValidate()) return;
    const newUser = {
      userId: selectedUser.userId,
      userEmail: userEmail,
      userFirstName: userFirstName,
      userLastName: userLastName,
      userPhone: userPhone,
      userRole: userRole
    };
    if(!_.isEqual(selectedUser, newUser)) {
      UsersDispatcher.onEditManage(null, newUser);
    } else {
      UsersDispatcher.onEditFake(newUser);
    }
  };

  return (
    <FlexColumn>

      {(status === "PENDING" || status === "ERROR") && 
      <FlexColumn className="mt-5">
        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="User" 
          result={results ? results.userEmail : ". . ."}
          status={userEmailChanged ? resultsStatus : "DISABLED"} 
        />

        <FlexRow>
            <button className="btn btn-light m-3"
              onClick={() => {
                UsersDispatcher.onCancel();
                UsersDispatcher.onRequest();
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
                    UsersDispatcher.onEditManage(null, selectedUser);
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
      {/* User */}
      <FlexColumn>
        <FlexRow>
          <div className="mt-3" style={{width:"14rem"}}>
            <label className="form-label">User Id</label>
            <input 
              className="form-control" 
              readOnly 
              type="text" 
              value={selectedUser.userId}/>
          </div>
          <div className="mt-3 ml-3" style={{width:"14rem"}}>
            <label className="form-label">Email</label>
            <input 
              className={"form-control " +  (isSubmitted ? !userEmail ? "is-invalid" : "is-valid" : "")}
              defaultValue={selectedUser.userEmail}
              type="text" 
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
        </FlexRow>
        <FlexRow>
        <div className="mt-3 ml-3" style={{width:"14rem"}}>
            <label className="form-label">First Name</label>
            <input 
              className={"form-control " +  (isSubmitted ? !userFirstName ? "is-invalid" : "is-valid" : "")}
              defaultValue={selectedUser.userFirstName}
              type="text" 
              onChange={(e) => setUserFirstName(e.target.value)}
            />
          </div>
          <div className="mt-3 ml-3" style={{width:"14rem"}}>
            <label className="form-label">Last Name</label>
            <input 
              className={"form-control " +  (isSubmitted ? !userLastName ? "is-invalid" : "is-valid" : "")}
              defaultValue={selectedUser.userLastName}
              type="text" 
              onChange={(e) => setUserLastName(e.target.value)}
            />
          </div>
        </FlexRow>
        <FlexRow>
        <div className="mt-3 ml-3" style={{width:"14rem"}}>
            <label className="form-label">Phone</label>
            <input 
              className={"form-control " +  (isSubmitted ? !userPhone ? "is-invalid" : "is-valid" : "")}
              defaultValue={selectedUser.userPhone}
              type="text" 
              onChange={(e) => setUserFirstName(e.target.value)}
            />
          </div>
          <div className="mt-3 ml-3" style={{width:"14rem"}}>
            <label className="form-label">Phone</label>
            <input 
              className={"form-control " +  (isSubmitted ? !userRole ? "is-invalid" : "is-valid" : "")}
              defaultValue={selectedUser.userRole}
              type="text" 
              onChange={(e) => setUserFirstName(e.target.value)}
            />
          </div>
        </FlexRow>
        <hr className="w-100"></hr>
      </FlexColumn>     


      {/* Buttons */}
      <FlexRow>
        <button className="btn btn-light m-3"
          onClick={() => UsersDispatcher.onCancel()}
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