// Libraries
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { REGEX_EMAIL, REGEX_PHONE, REGEX_PASSWORD_STRONG } from '../../resources/regex';
import AuthenticationDispatcher from '../../dispatchers/AuthenticationDispatcher';
import Store from '../../reducers/Store';
import Constants from "../../resources/constants.json";

// Components
import ErrorMessage from '../../components/ErrorMessage';
import FlexColumn from '../../components/FlexColumn';
import FlexRow from '../../components/FlexRow';
import LogoGif from '../../components/LogoGif';
import NavBar from '../../componentgroups/NavBar';

const STYLE_INPUTTEXT = "form-control mb-2 ";
const STYLE_INVALID = "is-invalid";
const STYLE_VALID = "is-valid";

const CreateAccountPage = (props) => {

  const { authentication } = Store.getState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validFirstName, setValidFirstName] = useState("");
  const [validLastName, setValidLastName] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const [validPhone, setValidPhone] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState("");

  // First Name
  const validateAndSetFirstName = (value) => {
    setFirstName(value);
    if(value.trim().length === 0) {
      setErrorMessage("First name cannot be empty.");
      setValidFirstName("FALSE");
    } else if(value.length > 100) {
      setErrorMessage("First name cannot be longer than 100 characters.");
      setValidFirstName("FALSE");
    } else {
      setErrorMessage("");
      setValidFirstName("TRUE");
    }
  };

  // Last Name
  const validateAndSetLastName = (value) => {
    setLastName(value);
    if(value.trim().length === 0) {
      setErrorMessage("Last name cannot be empty.");
      setValidLastName("FALSE");
    } else if(value.length > 100) {
      setErrorMessage("Last name cannot be longer than 100 characters.");
      setValidLastName("FALSE");
    } else {
      setErrorMessage("");
      setValidLastName("TRUE");
    }
  };

  // Email
  const validateAndSetEmail = (value) => {
    setEmail(value);
    if(value.trim().length === 0) {
      setErrorMessage("Email cannot be empty.");
      setValidEmail("FALSE");
    } else if(!new RegExp("^(.+)@(.+)$").test(value)) {
      setErrorMessage("Invalid Email Address.");
      setValidEmail("FALSE");
    } else {
      setErrorMessage("");
      setValidEmail("TRUE");
    }
  };

  // Phone
  const validateAndSetPhone = (value) => {
    setPhone(value);
    if(value.trim().length === 0) {
      setErrorMessage("Phone cannot be empty.");
      setValidPhone("FALSE");
    } else if(!new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$").test(value)) {
      setErrorMessage("Invalid Phone Number.");
      setValidPhone("FALSE");
    } else {
      setErrorMessage("");
      setValidPhone("TRUE");
    }
  };

  // Password
  const validateAndSetPassword = (value) => {
    setPassword(value);
    if(value.trim().length === 0) {
      setErrorMessage("Password cannot be empty.");
      setValidPassword("FALSE");
    } else if(value < 8) {
      setErrorMessage(
        "Password must be 8 characters minimum" +
        "and contain at least 1 uppercase, lowercase, " +
        "number, and special character (!@#$%^&*)."
      );
      setValidPassword("FALSE");
    } else {
      setErrorMessage("");
      setValidPassword("TRUE");
    }
  };

  // Confirm Password
  const validateAndSetConfirmPassword = (value) => {
    setConfirmPassword(value);
    if(!value === password) {
      setErrorMessage("Passwords do not match.");
      setValidConfirmPassword("FALSE");
    } else {
      setErrorMessage("");
      setValidConfirmPassword("TRUE");
    }
  };

  const handleSubmit = () => {
    validateAndSetFirstName(firstName);
    validateAndSetLastName(lastName);
    validateAndSetEmail(email);
    validateAndSetPhone(phone);
    validateAndSetPassword(password);
    validateAndSetConfirmPassword(confirmPassword);
    if(validFirstName === "TRUE" &&
       validLastName === "TRUE" &&
       validEmail  === "TRUE" &&
       validPhone  === "TRUE" &&
       validPassword === "TRUE") {
      AuthenticationDispatcher.onCreateAccount(firstName, lastName, email, phone, password);
    }
  };

  if(authentication.userId && !redirectToHome) {
    setTimeout(() => {
      setRedirectToHome(true);
    }, 3000);
  }

  return (
    <div className="container-fluid kit-bg-blue" style={{ height: "100vh", width: "100vw" }}>
      <div className="row">

        {/* Navbar */}
        <NavBar className="col-12" />

        {/* Content */}
        <div className={"col-12 col-sm-10 col-md-8 col-lg-6 m-auto"}>

          {/* Card */}
          <div className="card p-2 mt-3 ml-auto mr-auto">

            {/* Header */}
            <h2 className="card-title">Create Account</h2>
            <hr className="w-100 mt-0"></hr>

            {/* Body */}
            <div className="card-body">

              {/* Error */}
              {(errorMessage || authentication.status === "ERROR") &&
                <ErrorMessage>{errorMessage || authentication.error}</ErrorMessage>
              }

              {/* Pending */}
              {authentication.status === "PENDING" && <LogoGif style={{ width: "100%" }} />}

              {/* Success */}
              {authentication.userId &&
                <FlexColumn>
                  <h3 className="text-success kit-text-shadow-thin">
                    Account Created!
                  </h3>
                  <FlexRow>
                    <h5>Redirecting . . .</h5>
                    <div className="spinner-border ml-2" />
                  </FlexRow>
                </FlexColumn>
              }

              {/* Default */}
              {(authentication.status === "INACTIVE" || authentication.status === "ERROR") &&
              <form name="form">

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
                    value={firstName}
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
                    value={lastName}
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
                    value={email}
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
                    value={phone}
                    onChange={(e) => validateAndSetPhone(e.target.value)}
                  />
                </div>

                {/* Password */}
                <div className="mr-auto">
                  <label className="form-label">Password</label>
                  <input
                    className={
                      STYLE_INPUTTEXT +
                      (validPassword === "TRUE" && STYLE_VALID) + " " +
                      (validPassword === "FALSE" && STYLE_INVALID)
                    }
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => validateAndSetPassword(e.target.value)}
                  />
                </div>

                {/* Confirm Password */}
                <div className="mr-auto">
                  <label className="form-label">Confirm Password</label>
                  <input
                    className={
                      STYLE_INPUTTEXT +
                      (validConfirmPassword === "TRUE" && STYLE_VALID) + " " +
                      (validConfirmPassword === "FALSE" && STYLE_INVALID)
                    }
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => validateAndSetConfirmPassword(e.target.value)}
                  />
                </div>
              </form>}

              {/* Buttons */}
              <FlexRow className="mt-4" justify="around">

                {/* Cancel */}
                <Link to={Constants.pagePaths.home}>
                  <button className="btn btn-secondary">Cancel</button>
                </Link>

                {/* Submit */}
                {(authentication.status === "INACTIVE" || authentication.status === "ERROR") &&
                <button className="btn btn-success text-white kit-text-shadow-thin"
                  onClick={() => handleSubmit()}
                >
                  + Create Account
                </button>}
              </FlexRow>
            </div>
          </div>
        </div>
      </div>

      {/* Redirects */}
      {(redirectToHome) && <Redirect to={Constants.pagePaths.home} />}

    </div>
  );
};
export default CreateAccountPage;
