// Libraries
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';
import Constants from "../../resources/constants.json";
import Store from '../../reducers/Store';
import AuthenticationDispatcher from '../../dispatchers/AuthenticationDispatcher';

// Components
import NavBar from '../../componentgroups/NavBar';
import FlexColumn from '../../components/FlexColumn';
import FlexRow from '../../components/FlexRow';

// Styles
import './style.css';
import ErrorMessage from '../../components/ErrorMessage';

const ForgotPasswordPage = (props) => {

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [validateEmail, setValidateEmail] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const history = useHistory();
  if (localStorage.getItem("JSON_WEB_TOKEN")) {
    console.log("I AM IN STORAGE");
    history.push("/home");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setErrorMessage("");
    if (!email) {
      setErrorMessage("An email is required.");
      return;
    }
    const regexEmailValidation = new RegExp(/[a-z0-9A-Z._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);

    if (!regexEmailValidation.test(email)) {
      return setValidateEmail(false);
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
  }

  return (
    <div className="container-fluid kit-bg-blue" style={{minHeight:"100vh"}}>
      <div class="row">
        
        {/* Navbar */}
        <NavBar className="col-12"/>

        {/* Body */}
        <div className="col-12">
          <div className="row">

            {/* Card */}
            <div className="col-12 col-md-8 col-lg-6 card p-2 mt-3 ml-auto mr-auto">

              {/* Header */}
              <h2 className="card-title">Forgot Password</h2>
              <hr className="w-100 mt-0"></hr>

                {/* Body */}
                <div className="card-body">

                  {/* Error */}
                  {errorMessage &&
                  <ErrorMessage className="bg-warning p-2 text-white rounded">
                    {errorMessage}
                  </ErrorMessage>
                  }

                  {/* Pending */}
                  {loading &&
                    <FlexColumn>
                      <h3 className="text-dark kit-text-shadow-thin">
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
                      <h3 className="text-success kit-text-shadow-thin">
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
                  <form name="form" onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="email">Email address{submitted && !email &&
                      <span className="required"> is required</span>
                    } {submitted && email && !validateEmail &&
                      <span className="required"> invalid email format </span>}
                    </label>
                    <input type="text" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <div className="form-group">
                      <button className="btn btn-lg btn-primary btn-block btn-signin form-submit-button btn-submit"> Reset Password </button>
                    </div>
                    <div className="form-group">
                      <a href='/home' className="btn btn-lg btn-secondary btn-block btn-signin form-submit-button btn-submit btn-cancel-local" >Cancel</a>
                    </div>
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
