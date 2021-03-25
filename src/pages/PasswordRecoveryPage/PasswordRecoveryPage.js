// Libraries
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Constants from "../../resources/constants.json";
import AuthenticationDispatcher from '../../dispatchers/AuthenticationDispatcher';

// Components
import { Redirect } from 'react-router';
import ErrorMessage from '../../components/ErrorMessage';
import NavBar from '../../componentgroups/NavBar';
import LogoGif from '../../components/LogoGif';
import FlexColumn from '../../components/FlexColumn';
import FlexRow from '../../components/FlexRow';

const STYLE_INPUTTEXT = "form-control mb-2 ";
const STYLE_INVALID = "is-invalid";
const STYLE_VALID = "is-valid";

const PasswordRecoveryPage = (props) => {

  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [redirectToHome, setRedirect] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyToken, setVerifyToken] = useState(true);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validPassword, setValidPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState("");

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const recoveryCode = params.get('reset');

  useEffect(() => {
    if (!loading && !verifyToken) {
      AuthenticationDispatcher.onRequestThenCallback(
        "forgot-password/recover/" + recoveryCode,
        (httpError) => {
          setLoading(false);
          setTimeout(() => setRedirect(true), 3400);
        },
        (httpResponseBody) => {
          setLoading(false);
          setVerifyToken(true);
        }
      );
    }
  }, [recoveryCode, loading, verifyToken, setLoading, setVerifyToken, setRedirect]);

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
    if(value !== password) {
      setErrorMessage("Passwords do not match.");
      setValidConfirmPassword("FALSE");
    } else {
      setErrorMessage("");
      setValidConfirmPassword("TRUE");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    validateAndSetPassword(password);
    validateAndSetConfirmPassword(confirmPassword);

    if (validPassword === "TRUE" && validConfirmPassword === "TRUE") {
      setLoading(true);
      AuthenticationDispatcher.changePassword({ recoveryCode, password })
        .then(data => {
          setSuccess(true);
          setLoading(false);
          setPasswordChanged(true);
          setTimeout(() => setRedirect(true), 3700);
        }, error => {
          setLoading(false);
          setErrorMessage(error.response ? error.response.data.error : "Unexpected error occured");
        }
      );
    }
  };

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
            <h2 className="card-title">Change Password</h2>
            <hr className="w-100 mt-0"></hr>

            {/* Body */}
            <div className="card-body">

              {/* Error */}
              {errorMessage &&
                <ErrorMessage className="bg-warning h5 text-center text-white mb-3 p-2 rounded">
                  {errorMessage}
                </ErrorMessage>
              }

              {/* Pending */}
              {loading && <LogoGif style={{ width: "100%" }} />}

              {/* Success */}
              {success &&
                <FlexColumn>
                  <h3 className="text-success kit-text-shadow-thin">
                    Password Updated!
                  </h3>
                  <FlexRow>
                    <h5>Redirecting . . .</h5>
                    <div className="spinner-border ml-2" />
                  </FlexRow>
                </FlexColumn>
              }

              {/* Default */}
              {!success &&
              <form name="form">

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
                {!success &&
                <button className="btn btn-success text-white kit-text-shadow-thin"
                  onClick={(e) => handleSubmit(e)}
                >
                  + Save Password
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

  // return (
  //   <div>
  //     <NavBar />

  //     <FlexColumn className={"kit-bg-blue"} style={{ position: "absolute", height: "100vh", width: "100vw" }}>

  //       {!loading && verifyToken && !passwordChanged &&
  //         <div className="col-md-12 col-md-12-local">
  //           <div className="card fp-card-local">
  //             <h2 className="createAccount">Create a new password</h2>
  //             <div className="errorContainer">
  //               {errorMessage &&
  //                 <div id="header" className="alert alert-warning text-white" role="alert">
  //                   <strong>Error! </strong> {errorMessage}
  //                 </div>
  //               }

  //             </div>

  //             <form name="form" onSubmit={(e) => handleSubmit(e)}>

  //               <label htmlFor="password">Password {submitted && !password &&
  //                 <span className="required"> is required</span>
  //               } {submitted && password && !validatePassword &&
  //                 <span className="required"> at least 1 lowercase, 1 uppercase, 1 numneric and one special character {'>'}= 8 </span>}
  //               </label>
  //               <input type="password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

  //               <label htmlFor="confirmPassword">Confirm Password {submitted && !confirmPassword &&
  //                 <span className="required"> is required</span>
  //               } {submitted && confirmPassword && !passwordMatch && <span className="required"> does't match</span>}
  //               </label>
  //               <input type="password" className="form-control" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

  //               <div className="form-group">
  //                 <button className="btn btn-lg btn-primary btn-block btn-signin form-submit-button btn-submit" >Chnage my Password</button>
  //               </div>
  //               <div className="form-group">
  //                 <a href='/home' className="btn btn-lg btn-secondary btn-block btn-signin form-submit-button btn-submit btn-cancel-local" >Cancel</a>
  //               </div>
  //             </form>
  //           </div>
  //         </div>
  //       }

  //       {passwordChanged && !loading &&
  //         <FlexColumn>
  //           <h3 className="text-success kit-text-shadow-thin">
  //             Password Successfully changed!
  //                   </h3>
  //           <h5>Redirecting . . .</h5>
  //           <div className="spinner-border ml-2" />
  //         </FlexColumn>
  //       }

  //       {redirectToHome && <Redirect to="/home" />}

  //       {loading &&
  //         <div className="col-md-12 col-md-12-local">
  //           <FlexRow className="fp-card-local p-0">
  //             <LogoGif className="m-auto" style={{ width: "75%" }} />
  //           </FlexRow>
  //         </div>
  //       }


  //       {!verifyToken &&
  //         <h4 className="error-expired-link">Expired or unavailable link. Please request a new one. Redirecting...</h4>
  //       }

  //     </FlexColumn>
  //   </div>
  // );
};
export default PasswordRecoveryPage;
