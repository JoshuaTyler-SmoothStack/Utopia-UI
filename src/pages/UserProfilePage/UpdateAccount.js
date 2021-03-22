// Libraries
import React, { useState } from "react";
import Store from "../../reducers/Store";

// Components
import Modal from "../../components/Modal";
import FlexRow from "../../components/FlexRow";
import InputText from "../../components/InputText";
import UsersDispatcher from '../../dispatchers/UsersDispatcher';


const ZINDEX_DEFAULT = 2;

const UpdateUserProfile = (props) => {


  const { users } = Store.getState();
  console.log(users.selected);
  const [firstName, setFirstName] = useState(users.selected.userFirstName);
  const [lastName, setLastName] = useState(users.selected.userLastName);
  const [email, setEmail] = useState(users.selected.userEmail);
  const [phone, setPhone] = useState(users.selected.userPhone);
  const [validatePhone, setValidatePhone] = useState(false);
  const [validateEmail, setValidateEmail] = useState(false);
  // const [isSubmitted, setSubmitted] = useState(false);

  const align = props.align || "center";
  const background = props.background || "kit-bg-smoke-light";
  const zIndex = props.zIndex || ZINDEX_DEFAULT;

  function handleValidate(currentEmail, currentPhone,) {
    const regexEmailValidation = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,15}/g);
    const regexPhoneNumberValidation = new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$");
    setValidateEmail(regexEmailValidation.test(currentEmail));
    setValidatePhone(regexPhoneNumberValidation.test(currentPhone));
  }


  function handleSubmit(e) {
    e.preventDefault();
    if (!firstName || !lastName || !email ||
      !phone) {
      return;
    }

    const newUser = {
      userFirstName: firstName,
      userLastName: lastName,
      userEmail: email,
      userPhone: phone,
    }
    console.log(newUser)

    UsersDispatcher.onEdit(
      `/${users.selected.userId}`, newUser
    );
    props.onClose();

  }

  return (
    <Modal
      align={align}
      background={background}
      disableCloseButton={true}
      zIndex={zIndex}
      onClose={props.onClose}
    >
      <div className="container-fluid">
        <div className="row">
          <div className={props.className || ""} style={props.style}>
            <div className="row">

              {/* Close Button */}
              <FlexRow>
                <button
                  className="btn btn-dark"
                  style={{
                    position: "absolute",
                    top: "-2rem",
                    right: "1rem",
                    zIndex: Number(zIndex) + 1,
                  }}
                  onClick={() => props.onClose()}
                >
                  <svg
                    className="kit-icon-light kit-svg-white"
                    height="2rem"
                    width="2rem"
                    viewBox="4 4 8 8"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </button>
              </FlexRow>

              {/* Header */}
              <div className="col-12 bg-white rounded p-2 kit-border-shadow">
                <FlexRow className="h-100 row d-flex justify-content-center" justify="start">
                  <h3>Update account information</h3>
                </FlexRow>
              </div>

              {/* Body */}
              <FlexRow className="col-12 mt-2">
                <div className="row bg-white rounded d-flex justify-content-center" wrap="no-wrap">
                  <InputText
                    className="col-12 col-md-6 rounded kit-border-shadow m-3"

                    label={"First Name"}
                    labelClassName={"text-warning"}
                    fontClass={"h4"}
                    style={{
                      height: "4rem",
                      width: "66%",
                    }}
                    value={firstName}
                    onChange={(e) => setFirstName(e)}
                  />
                  <InputText
                    className="col-12 col-md-6 rounded kit-border-shadow m-3 "
                    label={"Last Name"}
                    labelClassName={"text-warning"}
                    fontClass={"h4"}
                    style={{
                      height: "4rem",
                      width: "66%",
                    }}
                    value={lastName}
                    onChange={(e) => { setLastName(e); console.log(e) }}
                  />
                  <InputText
                    className="col-12 col-md-6 rounded kit-border-shadow m-3"
                    label={"Email"}
                    labelClassName={"text-warning"}
                    // error={(isSubmitted && validateEmail) ? "Invalid email address" : ""}
                    fontClass={"h4"}
                    style={{
                      height: "4rem",
                      width: "66%",
                    }}
                    value={email}
                    onChange={(e) => setEmail(e)}
                  />
                  <InputText
                    className="col-12 col-md-6 rounded kit-border-shadow m-3"
                    label={"Phone"}
                    labelClassName={"text-warning"}
                    fontClass={"h4"}
                    // error={(isSubmitted && validatePhone) ? "Invalid phone number" : ""}
                    style={{
                      height: "4rem",
                      width: "66%",
                    }}
                    value={phone}
                    onChange={(e) => setPhone(e)}
                  />
                </div>
              </FlexRow>

              {/* Buttons */}
              <FlexRow className="col-12 p-2 d-flex justify-content-center" justify="start">
                {/* Save */}
                <button className="btn btn-success ml-2 text-black " onClick={(e) => handleSubmit(e)}>
                  Save
                </button>
              </FlexRow>

            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};


export default UpdateUserProfile;
