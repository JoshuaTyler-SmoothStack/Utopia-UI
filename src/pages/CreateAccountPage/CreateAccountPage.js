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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitted, setSubmitted] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [validatePassword, setValidatePassword] = useState(false);
  const [validatePhone, setValidatePhone] = useState(false);
  const [validateEmail, setValidateEmail] = useState(false);

  const JSON_WEB_TOKEN = localStorage.getItem("JSON_WEB_TOKEN");


  function handleSubmit(e) {
    e.preventDefault();
    handleValidate(email, phone, password, confirmPassword);
    setSubmitted(true);

    if (!firstName || !lastName || !validateEmail ||
      !validatePhone || !validatePassword || !passwordMatch) {
      return;
    }

    AuthenticationDispatcher.onCreateAccount(firstName, lastName, email, phone, password);
  }

  function handleValidate(currentEmail, currentPhone, currentPassword, currentConfirmPassword) {
    setValidateEmail(REGEX_EMAIL.test(currentEmail));
    setValidatePhone(REGEX_PHONE.test(currentPhone));
    setValidatePassword(REGEX_PASSWORD_STRONG.test(currentPassword));
    setPasswordMatch(password === currentConfirmPassword);
  }

  return (
    <div className="container-fluid kit-bg-blue" style={{ height: "100vh", width: "100vw" }}>
      {(authentication.status === "SUCCESS" && !authentication.userId) && <Redirect to={Constants.pagePaths.home} />}
      {JSON_WEB_TOKEN && <Redirect to={Constants.pagePaths.profile} />}

      <div className="row">
        {/* Navbar */}
        <NavBar className="col-12"  />

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
              {authentication.status === "ERROR" && <ErrorMessage>{authentication.error}</ErrorMessage>}

              {/* Pending */}
              {authentication.status === "PENDING" && <LogoGif style={{ width: "100%" }} />}

              {/* Success */}
              {(authentication.status === "SUCCESS" && isSubmitted) &&
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
              {authentication.status === "INACTIVE" &&
                <form name="form" onSubmit={(e) => handleSubmit(e)}>

                  {/* Firstname */}
                  {(isSubmitted && !firstName)
                    ? <label className="text-danger kit-shake">First Name *</label>
                    : <label>First Name</label>
                  }
                  <input type="text"
                    className={STYLE_INPUTTEXT +
                      (isSubmitted ? (firstName ? STYLE_VALID : STYLE_INVALID) : "")
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
                    className={STYLE_INPUTTEXT +
                      (isSubmitted ? (lastName ? STYLE_VALID : STYLE_INVALID) : "")
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
                    className={STYLE_INPUTTEXT +
                      (email
                        ? !validateEmail ? STYLE_INVALID : STYLE_VALID
                        : isSubmitted ? STYLE_INVALID : ""
                      )}
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      handleValidate(e.target.value, phone, password, confirmPassword);
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
                    className={STYLE_INPUTTEXT +
                      (phone
                        ? !validatePhone ? STYLE_INVALID : STYLE_VALID
                        : isSubmitted ? STYLE_INVALID : ""
                      )}
                    name="phone" value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      handleValidate(email, e.target.value, password, confirmPassword);
                    }}
                  />

                  {/* Password */}
                  {isSubmitted
                    ? !password
                      ? <label className="text-danger kit-shake">Password *</label>
                      : !validatePassword
                        ? <label className="text-danger kit-shake">{"Minimun: 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special e.g. (!@#$%^&*)"}</label>
                        : <label>Password</label>
                    : <label>Password</label>
                  }
                  <input type="password"
                    className={STYLE_INPUTTEXT +
                      (password
                        ? !validatePassword ? STYLE_INVALID : STYLE_VALID
                        : isSubmitted ? STYLE_INVALID : ""
                      )}
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      handleValidate(email, phone, e.target.value, confirmPassword);
                    }}
                  />

                  {/* Password - Confirm */}
                  {isSubmitted
                    ? !confirmPassword
                      ? <label className="text-danger kit-shake">Confirm Password *</label>
                      : !passwordMatch
                        ? <label className="text-danger kit-shake">Passwords do not match *</label>
                        : <label>Confirm Password</label>
                    : <label>Confirm Password</label>
                  }
                  <input type="password"
                    className={STYLE_INPUTTEXT +
                      (confirmPassword
                        ? !passwordMatch ? STYLE_INVALID : STYLE_VALID
                        : isSubmitted ? STYLE_INVALID : ""
                      )}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      handleValidate(email, phone, password, e.target.value);
                    }}
                  />

                  {/* Buttons */}
                  <FlexRow className="form-group mt-4" justify="around">
                    <Link to={Constants.pagePaths.home}>
                      <button className="btn btn-secondary">Cancel</button>
                    </Link>
                    <button className="btn btn-success text-white kit-text-shadow-thin" type="submit">
                      + Create Account
                  </button>
                  </FlexRow>
                </form>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateAccountPage;
