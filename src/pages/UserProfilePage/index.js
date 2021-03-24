// Libraries
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import Constants from "../../resources/constants.json";
import Store from "../../reducers/Store";
import AuthenticationDispatcher from '../../dispatchers/AuthenticationDispatcher';

// Components
import NavBar from "../../componentgroups/NavBar";
import FlexRow from "../../components/FlexRow";
import FlexColumn from "../../components/FlexColumn";
import EditUserProfile from "./UpdateAccount";
import DeleteProfile from "./DeleteProfile";

const STYLE_INPUTTEXT = "form-control mb-2 ";

const UserProfilePage = (props) => {

  const { authentication, users } = Store.getState();
  const history = useHistory();
  if (!localStorage.getItem("JSON_WEB_TOKEN")) {
    history.push(Constants.pagePaths.home);
  }

  const [isEditModalTrue, setIsEditModalTrue] = useState(false);
  const [isDeleteModalTrue, setIsDeleteModalTrue] = useState(false);
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isProfileUpdating, setIsProfileUpdating] = useState(true);

  useEffect((e) => {
    if (isProfileUpdating && users.status !== "PENDING") {
      AuthenticationDispatcher.getUserById(authentication.userId)
        .then(res => {
          setUserFirstName(res.data.userFirstName);
          setUserLastName(res.data.userLastName);
          setUserEmail(res.data.userEmail);
          setUserPhone(res.data.userPhone);
        }, error => {
          console.log("error: " + error.response);
        });
    }
  }, [isProfileUpdating, users]);

  return (
    <div className="container-fluid" style={{ minHeight: "100vh" }}>
      <div className="row">

        {/* Navbar */}
        <NavBar className="col-12" />

        {/* Pending */}
        {!authentication.userId && <div className="spinner-border" />}

        {/* Body */}
        {authentication.userId &&
          <div className="col-12">
            <div className="row">

              {/* User Information */}
              <FlexRow className="col-12 col-md-8 col-lg-6 p-3" justify="start">
                <div className="row">

                  {/* Firstname */}
                  <FlexColumn className="col-12 col-sm-6 mb-3" justify="start" style={{ maxWidth: "20rem" }}>
                    <h5 className="mr-auto">First Name</h5>
                    <input
                      className={STYLE_INPUTTEXT}
                      readOnly
                      value={userFirstName}
                    />
                  </FlexColumn>

                  {/* Lastname */}
                  <FlexColumn className="col-12 col-sm-6 mb-3" justify="start" style={{ maxWidth: "20rem" }}>
                    <h5 className="mr-auto">Last Name</h5>
                    <input
                      className={STYLE_INPUTTEXT}
                      readOnly
                      value={userLastName}
                    />
                  </FlexColumn>

                  {/* Email */}
                  <FlexColumn className="col-12 col-sm-6 mb-3" justify="start" style={{ maxWidth: "20rem" }}>
                    <h5 className="mr-auto">Email</h5>
                    <input
                      className={STYLE_INPUTTEXT}
                      readOnly
                      value={userEmail}
                    />
                  </FlexColumn>

                  {/* Phone */}
                  <FlexColumn className="col-12 col-sm-6 mb-3" justify="start" style={{ maxWidth: "20rem" }}>
                    <h5 className="mr-auto">Phone</h5>
                    <input
                      className={STYLE_INPUTTEXT}
                      readOnly
                      value={userPhone}
                    />
                  </FlexColumn>
                </div>
              </FlexRow>

              {/* User Miles */}
              <FlexRow className="col-10 col-md-4 ml-auto mr-auto m-md-auto" style={{ height: "15rem" }}>
                <FlexColumn className="p-2 rounded kit-bg-blue kit-border-shadow">
                  <h1 className="text-center kit-cursive text-white kit-text-shadow-sm">
                    {"User Miles"}
                  </h1>
                  <h5 className="text-center text-white w-75">You've got XXX miles!</h5>
                </FlexColumn>
                <FlexRow >
                  <button className="btn btn-info w-100 p-2 mb-1" onClick={() => setIsEditModalTrue(true)}> Edit account</button>
                  <button className="btn btn-primary w-100 p-2 mb-1" onClick={() => setIsDeleteModalTrue(true)}> Delete account</button>
                </FlexRow>
              </FlexRow>
            </div>
          </div>} {/* Body-End */}

        {/*Modals*/}
        {isEditModalTrue &&
          <EditUserProfile
            className="col-11 col-sm-10 col-md-8 col-lg-7 bg-info p-2 m-auto rounded kit-border-shadow"
            disableCloseButton={true}
            userFirstName={userFirstName}
            userLastName={userLastName}
            userEmail={userEmail}
            userPhone={userPhone}
            onUserFirstName={(value) => setUserFirstName(value)}
            onUserLastName={(value) => setUserLastName(value)}
            onUserEmail={(value) => setUserEmail(value)}
            onUserPhone={(value) => setUserPhone(value)}
            onClose={() => {
              setIsEditModalTrue(false);
              setIsProfileUpdating(true);
            }}

          />
        }

        {isDeleteModalTrue &&
          <DeleteProfile
            className="col-11 col-sm-10 col-md-8 col-lg-7 bg-info p-2 m-auto rounded kit-border-shadow"
            disableCloseButton={true}
            onClose={() => setIsDeleteModalTrue(false)}
          />
        }
      </div>
    </div>
  );
};
export default UserProfilePage;
