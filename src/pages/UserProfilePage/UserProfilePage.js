// Libraries
import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router';
// import AuthenticationDispatcher from '../../dispatchers/AuthenticationDispatcher';
import UsersDispatcher from '../../dispatchers/UsersDispatcher';
import Store from '../../reducers/Store';

// Components
import NavBar from '../../componentgroups/NavBar';
import FlexColumn from '../../components/FlexColumn';

import FlexRow from '../../components/FlexRow';
import Modal from '../../components/Modal';

const UserProfilePage = (props) => {

  const { authentication, users } = Store.getState();
  const [isActive_DeleteModal, setIsActive_DeleteModal] = useState(false);

  const [isActive_EditModal, setIsActive_EditModal] = useState(false)
  const [redirect, setRedirect] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [firstName, setFirstName] = useState(users.selected.userFirstName);
  const [lastName, setLastName] = useState(users.selected.userLastName);
  const [email, setEmail] = useState(users.selected.userEmail);
  const [phone, setPhone] = useState(users.selected.userPhone);
  const [validatePhone, setValidatePhone] = useState(false);
  const [validateEmail, setValidateEmail] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("JWT"));

  useEffect((e) => {
    UsersDispatcher.onRequestThenCallback(
      "/" + authentication.userId,
      httpError => {
        // handle error getting user here
      }, httpResponseBody => {
        UsersDispatcher.onSelectItem(httpResponseBody);
        setFirstName(httpResponseBody.userFirstName);
        setLastName(httpResponseBody.userLastName);
        setEmail(httpResponseBody.userEmail);
        setPhone(httpResponseBody.userPhone)
        AuthenticationDispatcher.onLoginWithToken(Store.getState().users.edit.results.userToken);
      });
  }, [users.edit.resultsStatus === "SUCCESS"]);

  const deleteAccount = () => {
    AuthenticationDispatcher.onDeleteAccount(users.selected.userId);
    setIsActive_DeleteModal(false);
    setIsDeleted(true);
    setTimeout(() => {
      setRedirect(true);
    }, 3500);

  }

  return (
    <div className="container-fluid kit-bg-white" style={{ height: "100vh", width: "100vw" }}>

      {/* Redirects */}
      {!isLoggedIn &&
        <Redirect to="/home" />
      }
      {redirect && <Redirect to="/home" />}
      <div className="row">

        {/* Navbar */}
        <NavBar className="col-12" hideSearchBar={true} />

        {/* Content */}
        <FlexColumn className={"bg-white col-12"} justify="start">

          {/* PENDING */}
          {authentication.status === "PENDING" && <div className="spinner-border" />}

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
                    <FlexRow className="p-2">
                      {/* Delete Button */}
                      <button className="btn btn-primary w-50"
                        onClick={() => setIsActive_DeleteModal(true)}
                      >
                        Delete Account
                     </button>
                    </FlexRow>
                    <FlexRow className="p-2">
                      <button className="btn btn-info w-50" onClick={() => setIsActive_EditModal(true)}>
                        Edit Account
                      </button>
                    </FlexRow>
                  </div>


                  {/* User Information */}
                  <FlexColumn className="col-8" justify="around">

                    {/* Names */}
                    <FlexRow className="w-100" justify="around">
                      <FlexColumn>
                        <label>First Name</label>
                        <h5 className="kit-border-shadow p-1">{users.selected.userFirstName}</h5>
                      </FlexColumn>

                      <FlexColumn>
                        <label>Last Name</label>
                        <h5 className="kit-border-shadow p-1">{users.selected.userLastName}</h5>
                      </FlexColumn>
                    </FlexRow>

                    {/* Email & Phone */}
                    <FlexRow className="w-100" justify="around">
                      <FlexColumn>
                        <label>Email</label>
                        <h5 className="kit-border-shadow p-1">{users.selected.userEmail}</h5>
                      </FlexColumn>

                      <FlexColumn>
                        <label>Phone</label>
                        <h5 className="kit-border-shadow p-1">{users.selected.userPhone}</h5>
                      </FlexColumn>
                    </FlexRow>
                  </FlexColumn>

                </div>

              </div>
            </div>}

        </FlexColumn>

        {/* Edit Account Modal */}
        {isActive_EditModal &&
          <Modal onClose={() => setIsActive_EditModal(false)} >
            <form name="form" onSubmit={(e) => handleSubmit(e)}>

              {/* Firstname */}
              {(isSubmitted && !firstName)
                ? <label className="text-danger kit-shake">First Name *</label>
                : <label>First Name</label>
              }
              <input type="text"
                className={"form-control mb-2 " +
                  (isSubmitted ? !firstName ? "is-invalid" : "is-valid" : "")
                }
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              {/* Lastname */}
              {(isSubmitted && !lastName)
                ? <label className="text-danger kit-shake">Last Name *</label>
                : <label>Last Name</label>
              }
              <input type="text"
                className={"form-control mb-2 " +
                  (isSubmitted ? !lastName ? "is-invalid" : "is-valid" : "")
                }
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              {/* Email */}
              {isSubmitted
                ? !email
                  ? <label className="text-danger kit-shake">Email *</label>
                  : !validateEmail
                    ? <label className="text-danger kit-shake">Invalid Email *</label>
                    : <label>Email</label>
                : <label>Email</label>
              }
              <input type="text"
                className={"form-control mb-2 " +
                  (email
                    ? !validateEmail ? "is-invalid" : "is-valid"
                    : isSubmitted ? "is-invalid" : ""
                  )}
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleValidate(e.target.value, phone);
                }}
              />

              {/* Phone */}
              {isSubmitted
                ? !phone
                  ? <label className="text-danger kit-shake">Phone *</label>
                  : !validatePhone
                    ? <label className="text-danger kit-shake">Invalid Phone *</label>
                    : <label>Phone</label>
                : <label>Phone</label>
              }
              <input type="phone"
                className={"form-control mb-2 " +
                  (phone
                    ? !validatePhone ? "is-invalid" : "is-valid"
                    : isSubmitted ? "is-invalid" : ""
                  )}
                name="phone" value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  handleValidate(email, e.target.value);
                }}
              />
              <div className="d-flex justify-content-between">
                <button className="btn btn-success text-white kit-text-shadow-thin" type="submit">Update</button>
                <a className="btn btn-secondary" onClick={(e) => setIsActive_EditModal(false)}> Cancel</a>

              </div>
            </form>

          </Modal>

        }


        {/* Modals */}
        {/* Delete Account Modal */}
        {isActive_DeleteModal &&
          <Modal onClose={() => setIsActive_DeleteModal(false)}>

            <div className="bg-white">

              <h3 className="mb-5 p-3">This action will permanently delete your flight history and earned loyalty points</h3>
              {/* Cancel Button */}

              <div className="d-flex justify-content-around">
                <button className="btn btn-secondary" onClick={() => setIsActive_DeleteModal(false)}>
                  Cancel
              </button>

                {/* Delete Button */}
                <button className="btn btn-primary" onClick={deleteAccount}>
                  Understood/ Yes I want to delete
              </button>

              </div>

            </div>
          </Modal>
        }

        {/* Deleted account confirmation Modal */}
        {authentication.status === "INACTIVE" && isDeleted &&

          <Modal>
            <h1>Account successfully deleted</h1>
            <FlexRow>
              <h5>Redirecting . . .</h5>
              <div className="spinner-border ml-2" />
            </FlexRow>
          </Modal>
        }

      </div>
    </div>
  )

  function handleSubmit(e) {
    e.preventDefault();
    handleValidate(email, phone);
    setSubmitted(true)
    if (!firstName || !lastName || !validateEmail ||
      !validatePhone) {
      return;
    }

    const newUser = {
      userFirstName: firstName,
      userLastName: lastName,
      userEmail: email,
      userPhone: phone,
    }
    setIsActive_EditModal(false);


    UsersDispatcher.onEdit(
      `/${users.selected.userId}`,
      newUser
    )



    //   axios.put(`http://localhost:8080/users/${authentication.userId}`, newUser)
    //     .then(data => {
    //       console.log(data)
    //     }, error => {
    //       console.log(error)
    //     })
  }

  function handleValidate(currentEmail, currentPhone,) {
    const regexEmailValidation = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,15}/g);
    const regexPhoneNumberValidation = new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$");

    setValidateEmail(regexEmailValidation.test(currentEmail));
    setValidatePhone(regexPhoneNumberValidation.test(currentPhone));
  }

}

export default UserProfilePage;
