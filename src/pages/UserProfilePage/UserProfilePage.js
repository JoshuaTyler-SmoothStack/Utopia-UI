// Libraries
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import AuthenticationDispatcher from '../../dispatchers/AuthenticationDispatcher';
import UsersDispatcher from '../../dispatchers/UsersDispatcher';
import Store from '../../reducers/Store';

// Components
import NavBar from '../../componentgroups/NavBar';
import FlexColumn from '../../components/FlexColumn';

import FlexRow from '../../components/FlexRow';
import InputText from '../../components/InputText';
import Modal from '../../components/Modal';

const UserProfilePage = (props) => {

  const { authentication, users } = Store.getState();
  const [isActive_DeleteModal, setIsActive_DeleteModal] = useState(false);
  const [accountDeleted, setAccountDeleted] = useState(false);
  const history = useHistory();

  useEffect((e) => {
    UsersDispatcher.onRequestThenCallback(
    "/" + authentication.userId,
      httpError => {
        // handle error getting user here
    }, httpResponseBody => {
      UsersDispatcher.onSelectItem(httpResponseBody);
    });
  }, [!users.selected]);

  const deleteAccount = () => {
    AuthenticationDispatcher.onDeleteAccount(users.selected.userId);
    history.push("/home");
  }

  return (
    <div className="container-fluid kit-bg-blue" style={{ height: "100vh", width: "100vw"}}>
      <div className="row">

        {/* Navbar */}
        <NavBar className="col-12" hideSearchBar={true} />

        {/* Content */}
        <FlexColumn className={"bg-white col-12 h-100 "} justify="start">

          {/* PENDING */}
          {authentication.status === "PENDING" && <div className="spinner-border"/>}

          {/* SUCCESS */}
          {authentication.status === "SUCCESS" && 
          <div className="bg-white col-12">
            
            {/* Title */}
            <div className="h2 mt-3 mb-0">User Profile</div>
            <hr className="w-100 mt-2"></hr>

            {/* User Profile */}
            <div className="col-12">
              <div className="row">
                
                {/* Miles Display */}
                <div className="col-4">
                  <FlexRow className="p-2 kit-border-shadow">
                    <h4 className="text-light">11,000 Miles</h4>
                  </FlexRow>
                </div>

                {/* User Information */}
                <FlexColumn className="col-8" justify="around">
                  
                  {/* Names */}
                  <FlexRow className="w-100" justify="around">
                    <FlexColumn>
                      <label>First Name</label>
                      <h5 className="kit-border-shadow">{users.selected.userFirstName}</h5>
                    </FlexColumn>
                    
                    <FlexColumn>
                      <label>Last Name</label>
                      <h5 className="kit-border-shadow">{users.selected.userLastName}</h5>
                    </FlexColumn>
                  </FlexRow>

                  {/* Email & Phone */}
                  <FlexRow className="w-100" justify="around">
                    <FlexColumn>
                      <label>Email</label>
                      <h5 className="kit-border-shadow">{users.selected.userEmail}</h5>
                    </FlexColumn>
                    
                    <FlexColumn>
                      <label>Phone</label>
                      <h5 className="kit-border-shadow">{users.selected.userPhone}</h5>
                    </FlexColumn>
                  </FlexRow>
                </FlexColumn>

              </div>

            </div>
              
            {/* Buttons */}
            <FlexRow className="col-6 p-2 ml-auto" justify="around">
              {/* Delete Button */}
              <button className="btn btn-info">
                Edit Account
              </button>

              {/* Delete Button */}
              <button className="btn btn-primary"
                onClick={() => setIsActive_DeleteModal(true)}
              >
                Delete Account
              </button>
            </FlexRow>
          </div>}

        </FlexColumn>

        {/* Modals */}
        {/* Delete Account Modal */}
        {isActive_DeleteModal && 
          <Modal onClose={() => setIsActive_DeleteModal(false)}>
              {/* Cancel Button */}
              <button className="btn btn-secondary">
                Cancel
              </button>

              {/* Delete Button */}
              <button className="btn btn-primary">
                Yes I want to delete
              </button>
          </Modal>
        }

        {/* Redirects */}
        {authentication.status === "INACTIVE" && <Redirect to="/home" />}
      </div>
    </div>
  )

}

export default UserProfilePage;
