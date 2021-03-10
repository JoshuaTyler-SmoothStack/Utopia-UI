import React, { useEffect, useState } from 'react';
import FlexColumn from '../../components/FlexColumn';
import NavBar from '../../componentgroups/NavBar';
import './userProgileStyle.css'
import Store from '../../reducers/Store';
import axios from 'axios';
import { Redirect } from 'react-router';
import Modal from 'react-bootstrap/Modal'
import AuthenticationDispatcher from '../../dispatchers/AuthenticationDispatcher';
import { useHistory } from 'react-router-dom';


const UserProfilePage = (props) => {

  const { authentication } = Store.getState();
  const [user, setUser] = useState();
  const [show, setShow] = useState(false);
  const [accountDeleted, setAccountDeleted] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const history = useHistory();

  useEffect((e) => {
    const headers = {
      authorization: 'Bearer ' + authentication.userToken
    };

    axios.get("http://localhost:8080/auth/login", { headers: headers })
      .then(response => {
        setUser(response.data)
      }, error => {
        console.log(error)
      });
  }, []);

  const deleteAccount = () => {
    AuthenticationDispatcher.onDeleteAccount(user.id);
    history.push("/home");
  }

  return (

    <div className="container-fluid"
      style={{ height: "100vh", width: "100vw" }}
    >
      {/* Navbar */}
      <NavBar className="col-12" hideSearchBar={true} />

      <FlexColumn className={"kit-bg-blue col-12 h-100"}>

        {authentication.status === "INACTIVE" &&
          <Redirect to="/home" />

        }

        {!user &&
          <div class="container emp-profile">loading...</div>
        }

        {user &&
          <div class="container emp-profile">
            <div class="row">
              <div class="col-md-4">
                <div class="profile-img">
                  <h3>{user.firstName} {user.lastName} </h3>

                  <p class="proile-rating">Miles earned : <span>11, 000</span></p>

                </div>
              </div>
              <div class="col-md-6">
                <div class="profile-head">

                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
              </div>
              <div class="col-md-8">
                <div class="tab-content profile-tab" id="myTabContent">
                  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                    <div class="row">
                      <div class="col-md-6">
                        <label>Email</label>
                      </div>
                      <div class="col-md-6">
                        <p>{user.email}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label>Phone</label>
                      </div>
                      <div class="col-md-6">
                        <p>{user.phone}</p>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <button variant="primary" className="btn btn-primary" onClick={handleShow}>
                          Delete account </button>
                      </div>

                      <div class="col-md-6">
                        <a href='/home' className="btn btn-primary"> Edit profile</a>

                      </div>

                    </div>





                  </div>
                </div>
              </div>
            </div>
          </div>

        }

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
  )

}

export default UserProfilePage;
