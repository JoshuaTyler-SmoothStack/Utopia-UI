// Libraries
import React, { useState, useEffect } from "react";
import Store from "../../reducers/Store";

// Components
import Modal from "../../components/Modal";
import FlexRow from "../../components/FlexRow";
import UsersDispatcher from '../../dispatchers/UsersDispatcher';
import ErrorMessage from '../../components/ErrorMessage';


const ZINDEX_DEFAULT = 2;

const UpdateUserProfile = (props) => {

  const userFirstName = props.userFirstName || "";
  const userLastName = props.userLastName || "";
  const userPhone = props.userPhone || "";
  const userEmail = props.userEmail || "";
  const [validFirstName, setValidFirstName] = useState("");
  const [validLastName, setValidLastName] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const [validPhone, setValidPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const STYLE_INPUTTEXT = "form-control mb-2 ";
  const STYLE_INVALID = "is-invalid";
  const STYLE_VALID = "is-valid";

  const { authentication, users } = Store.getState();


  const align = props.align || "center";
  const background = props.background || "kit-bg-smoke-light";
  const zIndex = props.zIndex || ZINDEX_DEFAULT;


  const validateAndSetFirstName = (value) => {
    props.onUserFirstName(value);
    if (value.trim().length === 0) {
      setErrorMessage("First name cannot be empty.");
      setValidFirstName("FALSE");
    } else if (value.length > 100) {
      setErrorMessage("First name cannot be longer than 100 characters.");
      setValidFirstName("FALSE");
    } else {
      setErrorMessage("");
      setValidFirstName("TRUE");
    }
  };

  // Last Name
  const validateAndSetLastName = (value) => {
    props.onUserLastName(value);
    if (value.trim().length === 0) {
      setErrorMessage("Last name cannot be empty.");
      setValidLastName("FALSE");
    } else if (value.length > 100) {
      setErrorMessage("Last name cannot be longer than 100 characters.");
      setValidLastName("FALSE");
    } else {
      setErrorMessage("");
      setValidLastName("TRUE");
    }
  };

  // Email
  const validateAndSetEmail = (value) => {
    props.onUserEmail(value);
    if (value.trim().length === 0) {
      setErrorMessage("Email cannot be empty.");
      setValidEmail("FALSE");
    } else if (!new RegExp("^(.+)@(.+)$").test(value)) {
      setErrorMessage("Invalid Email Address.");
      setValidEmail("FALSE");
    } else {
      setErrorMessage("");
      setValidEmail("TRUE");
    }
  };

  // Phone
  const validateAndSetPhone = (value) => {
    props.onUserPhone(value);
    if (value.trim().length === 0) {
      setErrorMessage("Phone cannot be empty.");
      setValidPhone("FALSE");
    } else if (!new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$").test(value)) {
      setErrorMessage("Invalid Phone Number.");
      setValidPhone("FALSE");
    } else {
      setErrorMessage("");
      setValidPhone("TRUE");
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    validateAndSetFirstName(userFirstName);
    validateAndSetLastName(userLastName);
    validateAndSetEmail(userEmail);
    validateAndSetPhone(userPhone);
    if (validFirstName === "TRUE" &&
      validLastName === "TRUE" &&
      validEmail === "TRUE" &&
      validPhone === "TRUE") {
      const newUser = {
        userFirstName: userFirstName,
        userLastName: userLastName,
        userEmail: userEmail,
        userPhone: userPhone,
      }

      UsersDispatcher.onEdit(
        `/${authentication.userId}`, newUser
      );
      props.onClose();
    }
  }

  return (
    <Modal
      align={align}
      background={background}
      disableCloseButton={true}
      zIndex={zIndex}
      onClose={props.onClose}
    >


      {/* Content */}
      <div className={"col-12 col-sm-10 col-md-8 col-lg-6 m-auto"}>

        {/* Card */}
        <div className="card p-2 mt-3 ml-auto mr-auto">
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
          <h2 className="card-title">Update Account Details</h2>
          <hr className="w-100 mt-0"></hr>

          {/* Body */}
          <div className="card-body">

            {/*eError*/}
            {errorMessage &&
              <ErrorMessage className="bg-warning h5 text-center text-white mb-3 p-2 rounded">
                {errorMessage}
              </ErrorMessage>
            }


            {/* Default */}
            <form name="form d-flex flex-column justify-content-center align-items-center">

              {/* First Name */}
              <div className="mr-auto">
                <label className="form-label">First Name</label>
                <input
                  className={
                    STYLE_INPUTTEXT +
                    (validFirstName === "TRUE" && STYLE_VALID) + " " +
                    (validFirstName === "FALSE" && STYLE_INVALID)
                  }
                  type="text"
                  value={userFirstName}
                  onChange={(e) => validateAndSetFirstName(e.target.value)}
                />
              </div>

              {/* Last Name */}
              <div className="mr-auto">
                <label className="form-label">Last Name</label>
                <input
                  className={
                    STYLE_INPUTTEXT +
                    (validLastName === "TRUE" && STYLE_VALID) + " " +
                    (validLastName === "FALSE" && STYLE_INVALID)
                  }
                  type="text"
                  value={userLastName}
                  onChange={(e) => validateAndSetLastName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="mr-auto">
                <label className="form-label">Email</label>
                <input
                  className={
                    STYLE_INPUTTEXT +
                    (validEmail === "TRUE" && STYLE_VALID) + " " +
                    (validEmail === "FALSE" && STYLE_INVALID)
                  }
                  type="email"
                  value={userEmail}
                  onChange={(e) => validateAndSetEmail(e.target.value)}
                />
              </div>

              {/* Phone */}
              <div className="mr-auto">
                <label className="form-label">Phone</label>
                <input
                  className={
                    STYLE_INPUTTEXT +
                    (validPhone === "TRUE" && STYLE_VALID) + " " +
                    (validPhone === "FALSE" && STYLE_INVALID)
                  }
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  value={userPhone}
                  onChange={(e) => validateAndSetPhone(e.target.value)}
                />
              </div>
              <FlexRow className="col-12 p-2">
                {/* Save */}
                <button className="btn btn-success ml-2 text-black " onClick={(e) => handleSubmit(e)}> Save</button>
              </FlexRow>
            </form>
            <FlexRow />
          </div>
        </div>
      </div>

    </Modal>
  );
};


export default UpdateUserProfile;

{/* <div className="container-fluid">
  <div className="row">
    <div className={props.className || ""} style={props.style}>
      <div className="row">

        {/* Close Button */}
        // <FlexRow>
        //   <button
        //     className="btn btn-dark"
        //     style={{
        //       position: "absolute",
        //       top: "-2rem",
        //       right: "1rem",
        //       zIndex: Number(zIndex) + 1,
        //     }}
        //     onClick={() => props.onClose()}
        //   >
        //     <svg
        //       className="kit-icon-light kit-svg-white"
        //       height="2rem"
        //       width="2rem"
        //       viewBox="4 4 8 8"
        //     >
        //       <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        //     </svg>
        //   </button>
        // </FlexRow>

        // {/* Header */}
        // <div className="col-12 bg-white rounded p-2 kit-border-shadow">
        //   <FlexRow className="h-100 row d-flex justify-content-center" justify="start">
        //     <h3>Update account information</h3>
        //   </FlexRow>
        // </div>

        // {/* Body */}
        // <FlexRow className="col-12 mt-2">


        //   {/* Pending */}
        //   {users.status === "PENDING" &&
        //     <FlexColumn>
        //       <h3 className="text-dark kit-text-shadow-thin">
        //         Updating Profile . . .
        //       </h3>
        //       <FlexRow>
        //         <div className="spinner-border ml-2" />
        //       </FlexRow>
        //     </FlexColumn>
        //   }

        //   {users.status !== "PENDING" &&
        //     <div className="row bg-white rounded d-flex justify-content-center" wrap="no-wrap">

        //       <InputText
        //         className="col-12 col-md-6 rounded kit-border-shadow m-3"

        //         label={"First Name"}
        //         labelClassName={"text-warning"}
        //         fontClass={"h4"}
        //         style={{
        //           height: "4rem",
        //           width: "66%",
        //         }}
        //         value={userFirstName}
        //         onChange={(e) => props.onUserFirstName(e)}
        //       />
        //       <InputText
        //         className="col-12 col-md-6 rounded kit-border-shadow m-3 "
        //         label={"Last Name"}
        //         labelClassName={"text-warning"}
        //         fontClass={"h4"}
        //         style={{
        //           height: "4rem",
        //           width: "66%",
        //         }}
        //         value={userLastName}
        //         onChange={(e) => props.onUserLastName(e)}
        //       />
        //       <InputText
        //         className="col-12 col-md-6 rounded kit-border-shadow m-3"
        //         label={"Email"}
        //         labelClassName={"text-warning"}
        //         // error={(isSubmitted && validateEmail) ? "Invalid email address" : ""}
        //         fontClass={"h4"}
        //         style={{
        //           height: "4rem",
        //           width: "66%",
        //         }}
        //         value={userEmail}
        //         onChange={(e) => props.onUserEmail(e)}
        //       />
        //       <InputText
        //         className="col-12 col-md-6 rounded kit-border-shadow m-3"
        //         label={"Phone"}
        //         labelClassName={"text-warning"}
        //         fontClass={"h4"}
        //         // error={(isSubmitted && validatePhone) ? "Invalid phone number" : ""}
        //         style={{
        //           height: "4rem",
        //           width: "66%",
        //         }}
        //         value={userPhone}
        //         onChange={(e) => props.onUserPhone(e)}
        //       />
        //     </div>
        //   }
        // </FlexRow>

        // {/* Buttons */}
//         <FlexRow className="col-12 p-2 d-flex justify-content-center" justify="start">
//           {/* Save */}
//           <button className="btn btn-success ml-2 text-black " onClick={(e) => handleSubmit(e)}>
//             Save
//         </button>
//         </FlexRow>

//       </div>
//     </div>
//   </div>
// </div> */}
