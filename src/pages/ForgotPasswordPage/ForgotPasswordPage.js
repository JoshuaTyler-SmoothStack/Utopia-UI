// Libraries
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import Constants from "../../resources/constants.json";
import AuthenticationDispatcher from '../../dispatchers/AuthenticationDispatcher';

// Components
import NavBar from '../../componentgroups/NavBar';
import FlexColumn from '../../components/FlexColumn';
import FlexRow from '../../components/FlexRow';
import ErrorMessage from '../../components/ErrorMessage';

const ForgotPasswordPage = (props) => {

  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const history = useHistory();
  if (localStorage.getItem("JSON_WEB_TOKEN")) {
    history.push(Constants.pagePaths.home);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!email) {
      setErrorMessage("An email is required.");
      return;
    }
    const regexEmailValidation = new RegExp(/[a-z0-9A-Z._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);

    if (!regexEmailValidation.test(email)) {
      setErrorMessage("");
      setErrorMessage("Invalid Email format");
      return;
    }

    setLoading(true);
    AuthenticationDispatcher.forgotPassword({ userEmail: email })
      .then(data => {
        setLoading(false);
        setIsSuccess(true);
        setTimeout(() => setRedirect(true), 3400);
        console.log(data);
      }, error => {
        setLoading(false);
        setErrorMessage(
          error.response
            ? error.response.data.error
            : "Unexpected error occured"
        );
      });
  };

  return (
    <div className="container-fluid kit-bg-blue" style={{minHeight: "100vh", maxWidth:"1400px"}}>
      <div class="row">

        {/* Navbar */}
        <NavBar className="col-12" />

        {/* Body */}
        <div className="col-12">
          <div className="row">

            {/* Card */}
            <div className="col-12 col-md-8 col-lg-6 card p-2 mt-3 ml-auto mr-auto">

              {/* Header */}
              <h2 className="card-title d-flex justify-content-center">Forgot Password</h2>
              <hr className="w-100 mt-0"></hr>

              {/* Body */}
              <div className="card-body">

                {/* Error */}
                {errorMessage &&
                  <ErrorMessage className="bg-warning mb-3 p-2 text-white rounded">
                    {errorMessage}
                  </ErrorMessage>
                }

                {/* Pending */}
                {loading &&
                  <FlexColumn>
                    <h3 className="text-dark kit-text-shadow-dark">
                      Sending email . . .
                      </h3>
                    <FlexRow>
                      <div className="spinner-border ml-2" />
                    </FlexRow>
                  </FlexColumn>
                }

                {/* Success */}
                {isSuccess &&
                  <FlexColumn>
                    <h3 className="text-success kit-text-shadow-dark">
                      Email Sent!
                      </h3>
                    <FlexRow>
                      <h5>Redirecting . . .</h5>
                      <div className="spinner-border ml-2" />
                    </FlexRow>
                  </FlexColumn>
                }

                {/* Default */}
                {(!isSuccess && !loading) &&
                  <form name="form">
                    <label className="h5 text-dark" htmlFor="email">Email address
                    </label>
                    <input type="text" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    {/* Buttons */}
                    <FlexRow className="mt-3 w-100" justify="around">
                      {/* Cancel */}
                      <Link to={Constants.pagePaths.home}>
                        <button className="btn btn-dark btn-lg">
                          Cancel
                        </button>
                      </Link>

                      {/* Submit */}
                      <button className="btn btn-primary btn-lg"
                        onClick={(e) => handleSubmit(e)}
                      >
                        Reset Password
                      </button>
                    </FlexRow>
                  </form>}
              </div>

            </div> {/* Card End */}

          </div>
        </div> {/* Body End */}

        {/* Redirects */}
        {(isSuccess && redirect) &&
          <Redirect to={Constants.pagePaths.home} />
        }

      </div>
    </div>
  );
};
export default ForgotPasswordPage;
