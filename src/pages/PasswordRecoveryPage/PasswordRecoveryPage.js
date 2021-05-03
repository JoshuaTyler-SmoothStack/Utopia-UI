// Libraries
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Constants from "../../resources/constants.json";
import AuthenticationDispatcher from "../../dispatchers/AuthenticationDispatcher";

// Components
import { Redirect } from "react-router";
import ErrorMessage from "../../components/ErrorMessage";
import NavBar from "../../componentgroups/NavBar";
import LogoGif from "../../components/LogoGif";
import FlexColumn from "../../components/FlexColumn";
import FlexRow from "../../components/FlexRow";

const STYLE_INPUTTEXT = "form-control mb-2 ";
const STYLE_INVALID = "is-invalid";
const STYLE_VALID = "is-valid";

const PasswordRecoveryPage = (props) => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [redirectToHome, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyToken, setVerifyToken] = useState(true);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  /* const [showPassword, setShowPassword] = useState(false); */ const showPassword = false;
  const [validPassword, setValidPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState("");

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const recoveryCode = params.get("reset");

  const history = useHistory();
  if (localStorage.getItem("JSON_WEB_TOKEN")) {
    history.push(Constants.pagePaths.home);
  }

  useEffect(() => {
    if (!loading && !verifyToken) {
      AuthenticationDispatcher.onRequestThenCallback(
        "forgot-password/recover/" + recoveryCode,
        (/*httpError*/) => {
          setLoading(false);
          setTimeout(() => setRedirect(true), 3400);
        },
        (/*httpResponseBody*/) => {
          setLoading(false);
          setVerifyToken(true);
        }
      );
    }
  }, [
    recoveryCode,
    loading,
    verifyToken,
    setLoading,
    setVerifyToken,
    setRedirect,
  ]);

  // Password
  const validateAndSetPassword = (value) => {
    setPassword(value);
    if (value.trim().length === 0) {
      setErrorMessage("Password cannot be empty.");
      setValidPassword("FALSE");
    } else if (value < 8) {
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
    if (value !== password) {
      setErrorMessage("Passwords do not match.");
      setValidConfirmPassword("FALSE");
    } else {
      setErrorMessage("");
      setValidConfirmPassword("TRUE");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateAndSetPassword(password);
    validateAndSetConfirmPassword(confirmPassword);

    if (validPassword === "TRUE" && validConfirmPassword === "TRUE") {
      setLoading(true);
      AuthenticationDispatcher.changePassword({ recoveryCode, password }).then(
        (data) => {
          setSuccess(true);
          setLoading(false);
          setTimeout(() => setRedirect(true), 3700);
        },
        (error) => {
          setLoading(false);
          setErrorMessage(
            error.response
              ? error.response.data.error
              : "Unexpected error occured"
          );
        }
      );
    }
  };

  return (
    <div
      className="container-fluid kit-bg-blue"
      style={{ height: "100vh", width: "100vw" }}
    >
      <div className="row">
        {/* Navbar */}
        <NavBar className="col-12" />

        {/* Content */}
        <div className={"col-12 col-sm-10 col-md-8 col-lg-6 m-auto"}>
          {/* Card */}
          <div className="card p-2 mt-3 ml-auto mr-auto">
            {/* Header */}
            <h2 className="card-title d-flex justify-content-center">
              Change Password
            </h2>
            <hr className="w-100 mt-0"></hr>

            {/* Body */}
            <div className="card-body">
              {/* Error */}
              {errorMessage && (
                <ErrorMessage className="bg-warning h5 text-center text-white mb-3 p-2 rounded">
                  {errorMessage}
                </ErrorMessage>
              )}

              {/* Pending */}
              {loading && <LogoGif style={{ width: "100%" }} />}

              {/* Success */}
              {success && (
                <FlexColumn>
                  <h3 className="text-success kit-text-shadow-dark">
                    Password Updated!
                  </h3>
                  <FlexRow>
                    <h5>Redirecting . . .</h5>
                    <div className="spinner-border ml-2" />
                  </FlexRow>
                </FlexColumn>
              )}

              {/* Default */}
              {!success && (
                <form name="form">
                  {/* Password */}
                  <div className="mr-auto">
                    <label className="form-label">Password</label>
                    <input
                      className={
                        STYLE_INPUTTEXT +
                        (validPassword === "TRUE" && STYLE_VALID) +
                        " " +
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
                        (validConfirmPassword === "TRUE" && STYLE_VALID) +
                        " " +
                        (validConfirmPassword === "FALSE" && STYLE_INVALID)
                      }
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) =>
                        validateAndSetConfirmPassword(e.target.value)
                      }
                    />
                  </div>
                </form>
              )}

              {/* Buttons */}
              <FlexRow className="mt-4" justify="around">
                {/* Cancel */}
                <Link to={Constants.pagePaths.home}>
                  <button className="btn btn-secondary">Cancel</button>
                </Link>

                {/* Submit */}
                {!success && (
                  <button
                    className="btn btn-success text-white kit-text-shadow-dark"
                    onClick={(e) => handleSubmit(e)}
                  >
                    + Save Password
                  </button>
                )}
              </FlexRow>
            </div>
          </div>
        </div>
      </div>

      {/* Redirects */}
      {redirectToHome && <Redirect to={Constants.pagePaths.home} />}
    </div>
  );
};
export default PasswordRecoveryPage;
