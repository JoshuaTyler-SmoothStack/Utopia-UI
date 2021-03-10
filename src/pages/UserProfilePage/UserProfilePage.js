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

import Modal from 'react-bootstrap/Modal'
import FlexRow from '../../components/FlexRow';
import InputText from '../../components/InputText';

const UserProfilePage = (props) => {

  const { authentication, users } = Store.getState();
  const [user, setUser] = useState();
  const [show, setShow] = useState(false);
  const [accountDeleted, setAccountDeleted] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const history = useHistory();

  useEffect((e) => {
    UsersDispatcher.onRequestThenCallback(
    "/" + authentication.userId,
      httpError => {
        // handle error getting user here
    }, httpResponseBody => {
      
    });
  }, [!users.selected]);

  const deleteAccount = () => {
    AuthenticationDispatcher.onDeleteAccount(user.userId);
    history.push("/home");
  }

  return (
    <div className="container-fluid kit-bg-blue" style={{ height: "100vh", width: "100vw"}}>
      <div className="row">

        {/* Redirects */}
        {authentication.status === "INACTIVE" && <Redirect to="/home" />}

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
                <div className="col-4">
                  <InputText
                    className="h-100 rounded kit-border-shadow mb-0"
                    label={"First Name"}
                    labelClassName={"text-info"}
                    fontClass={"h4"}
                    name="firstName"
                    value={user.userFirstName}
                  />
                </div>
              </div>

            </div>
              
            {/* Buttons */}
            <FlexRow className="col-6 p-2 ml-auto" justify="around">
              {/* Delete Button */}
              <button className="btn btn-info">
                Edit Account
              </button>

              {/* Delete Button */}
              <button className="btn btn-primary">
                Delete Account
              </button>
            </FlexRow>
          </div>}

        </FlexColumn>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete account?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This action will permanently delete your flight history and earned loyalty points
          </Modal.Body>
          <Modal.Footer>
            <button variant="secondary" onClick={handleClose}>
              Cancel
            </button>
            <button variant="primary" onClick={deleteAccount} >Understood / Continue</button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )

}

export default UserProfilePage;
