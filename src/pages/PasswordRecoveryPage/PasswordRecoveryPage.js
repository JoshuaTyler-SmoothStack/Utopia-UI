// Libraries
import React, { useState } from 'react';
import NavBar from '../../componentgroups/NavBar';
import { Redirect } from 'react-router'

// Components

import axios from 'axios';

import LogoGif from '../../components/LogoGif';
import FlexColumn from '../../components/FlexColumn';

import './style.css';
import FlexRow from '../../components/FlexRow';



const PasswordRecoveryPage = (props) => {

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [validatePassword, setValidatePassword] = useState(true);
  const [passwordChanged, setPasswordChanged] = useState(false);
  // const [loading, setLoading] = useState(true);

  const loading = true;
  const setLoading = ()=>{};

  const [verifyToken, setVerifyToken] = useState(false);


  let search = window.location.search;
  let params = new URLSearchParams(search);
  let recoveryCode = params.get('reset');

  // useEffect((e) => {
  //   axios.post("http://localhost:8080/users/forgot-password/verify-token", {
  //     recoveryCode: recoveryCode,
  //   })
  //     .then((res) => {
  //       setLoading(false)
  //       setVerifyToken(true)
  //     })
  //     .catch((err) => {
  //       setLoading(false)
  //       setTimeout(() => setRedirect(true), 3400)
  //     })
  // })



  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true)

    if (!password || !confirmPassword) {
      return
    }
    const strongRegexPasswordValidation = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if (!strongRegexPasswordValidation.test(password)) {
      return setValidatePassword(false)
    }

    if (password != confirmPassword) {
      setPasswordMatch(false)
      return
    }

    setLoading(true)
    setValidatePassword(true);
    setPasswordMatch(true);
    setLoading(true)
    axios.post('http://localhost:8080/users/forgot-password/recover',
      {
        recoveryCode: recoveryCode,
        password: password
      })
      .then(data => {
        console.log(data)
        setLoading(false)
        setPasswordChanged(true);
        setTimeout(() => setRedirect(true), 3700)
      }, error => {
        setLoading(false)
        setErrorMessage(error.response.data)
      }
      )
  }

  return (


    <div>
      <NavBar />

      <FlexColumn className={"kit-bg-blue"} style={{ position: "absolute", height: "100vh", width: "100vw" }}>

        {!loading && verifyToken && !passwordChanged &&
          <div className="col-md-12 col-md-12-local">
            <div className="card fp-card-local">
              <h2 className="createAccount">Create a new password</h2>
              <div className="errorContainer">
                {errorMessage &&
                  <div id="header" className="alert alert-warning text-white" role="alert">
                    <strong>Error! </strong> {errorMessage}
                  </div>
                }

              </div>

              <form name="form" onSubmit={(e) => handleSubmit(e)}>

                <label htmlFor="password">Password {submitted && !password &&
                  <span className="required"> is required</span>
                } {submitted && password && !validatePassword &&
                  <span className="required"> at least 1 lowercase, 1 uppercase, 1 numneric and one special character {'>'}= 8 </span>}
                </label>
                <input type="password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <label htmlFor="confirmPassword">Confirm Password {submitted && !confirmPassword &&
                  <span className="required"> is required</span>
                } {submitted && confirmPassword && !passwordMatch && <span className="required"> does't match</span>}
                </label>
                <input type="password" className="form-control" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                <div className="form-group">
                  <button className="btn btn-lg btn-primary btn-block btn-signin form-submit-button btn-submit" >Chnage my Password</button>
                </div>
              </form>
            </div>
          </div>
        }

        {passwordChanged && !loading &&
          <div className="col-md-12 col-md-12-local successfull-registration-container">
            <div className="card fp-card-local successfull-registration">
              <p>Password successfully changed! </p> <p>Redirecting...</p>
            </div>
          </div>
        }

        {redirect && <Redirect to="/home"/>}

        {loading &&
          <div className="col-md-12 col-md-12-local">
            <FlexRow className="fp-card-local p-0">
                <LogoGif className="m-auto" style={{width:"75%"}}/>
              </FlexRow>
          </div>
        }


        {!verifyToken && !loading &&
          <h4 className="error-expired-link">Expired or unavailable link. Please request a new one. Redirecting...</h4>
        }

      </FlexColumn>
    </div>

  )
}

export default PasswordRecoveryPage;