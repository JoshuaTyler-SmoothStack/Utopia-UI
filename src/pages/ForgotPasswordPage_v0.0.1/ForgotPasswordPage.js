// Libraries
import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../../componentgroups/NavBar_v0.0.1';
import FlexBox from '../../components/FlexBox';
import './style.css'

import LoadingPage from '../../componentgroups/loading/index'
import { Redirect } from 'react-router'

const ForgotPasswordPage = (props) => {

  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [validateEmail, setValidateEmail] = useState(true)
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false)
  const [redirect, setRedirect] = useState(false);


  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true)
    if (!email) {
      return;
    }
    const regexEmailValidation = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g)

    if (!regexEmailValidation.test(email)) {
      return setValidateEmail(false)
    }

    setLoading(true)
    axios.post('http://localhost:8080/users/forgot-password', { email: email })
      .then(data => {
        setSuccess(true)
        setLoading(false)
        setTimeout(() => setRedirect(true), 3400)
      }, error => {
        setLoading(false)
        setSubmitted(false)
        setErrorMessage(error.response.data)
      })

  }



  return (
    <div>
      <FlexBox className={"kit-bg-blue"} type={"column"} style={{ position: "absolute", height: "100vh", width: "100vw" }}>


        {!success && !loading &&
          <div className="col-md-12 col-md-12-local">
            <div className="card fp-card-local">
              <h2 className="fp-forgotPassordHeader">Forgot Password</h2>
              <div className="errorContainer">
                {errorMessage &&
                  <div id="header" className="alert alert-warning text-white" role="alert">
                    <strong>Error! </strong> {errorMessage}
                  </div>
                }

              </div>

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
              </form>
            </div>
          </div>
        }
        {loading &&

          <div className="col-md-12 col-md-12-local">
            <div className="card fp-card-local" >
              <LoadingPage />

            </div>
          </div>
        }

        {!loading && success &&

          <div className="col-md-12 col-md-12-local successfull-registration-container">
            <div className="card fp-card-local successfull-registration">
              <p>Email sent</p>
              <p>Redirecting... </p>

            </div>
          </div>
        }

        {redirect &&
          <div>
            <Redirect to="/home" />
          </div>
        }




      </FlexBox>
      <NavBar />
    </div>
  );
}
export default ForgotPasswordPage;