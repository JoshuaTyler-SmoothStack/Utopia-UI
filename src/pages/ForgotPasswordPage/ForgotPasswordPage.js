// Libraries
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import AuthenticationDispatcher from '../../dispatchers/AuthenticationDispatcher';
import { useHistory } from 'react-router-dom';
import Store from '../../reducers/Store';

// Components
import NavBar from '../../componentgroups/NavBar';
import LogoGif from '../../components/LogoGif';
import FlexColumn from '../../components/FlexColumn';
import FlexRow from '../../components/FlexRow';

// Styles
import './style.css';

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
    history.push("/home")
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true)
    if (!email) {
      return;
    }
    const regexEmailValidation = new RegExp(/[a-z0-9A-Z._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g)

    if (!regexEmailValidation.test(email)) {
      return setValidateEmail(false)
    }

    setLoading(true);
    AuthenticationDispatcher.forgotPassword({ userEmail: email })
      .then(data => {
        setIsSuccess(true);
        setTimeout(() => { setRedirect(true) }, 3400);
        setLoading(false);
        console.log(data)
      }, error => { setErrorMessage(error.response ? error.response.data.error : "Unexpected error occured") });
  }

  return (
    <div>

      <NavBar />

      <FlexColumn className={"kit-bg-blue"} style={{ position: "absolute", height: "100vh", width: "100vw" }}>

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
            {!isSuccess &&
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
              </form>
            }
          </div>
        </div>


        {loading &&
          <div className="col-md-12 col-md-12-local">
            <FlexRow className="fp-card-local p-0">
              <div className="spinner-border ml-2" />
            </FlexRow>
          </div>
        }

        {isSuccess &&
          <div className="col-md-12 col-md-12-local">
            <div className="card fp-card-local" >
              <p className='sent-success-msg'>Email sent</p>
              <p className='sent-success-msg'>Redirecting... </p>
            </div>
            <Redirect to="/home" />
          </div>
        }

        {(isSuccess || redirect) &&
          <Redirect to="/home" />
        }

      </FlexColumn>
    </div >
  );
}
export default ForgotPasswordPage;