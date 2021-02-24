// Libraries
import axios from 'axios';
import React, { useState } from 'react';
import NavBar from '../../componentgroups/NavBar_v0.0.1';
import { Redirect } from 'react-router'

import FlexColumn from '../../components/FlexColumn';


// Components

import LoadingAnime from '../../componentgroups/loading/index'


// Custom CSS
import './createAccountPage.css'


const CreateAccountPage = (props) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [validatePassword, setValidatePassword] = useState(true)
  const [validatePhoneNumber, setValidatePhoneNumber] = useState(true)
  const [validateEmail, serValidateEmail] = useState(true)
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false)
  const [redirect, setRedirect] = useState(false);


  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true)
    if (!firstName || !lastName || !email || !password || !confirmPassword || !phone) {
      return;
    }
    const strongRegexPasswordValidation = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const regexPhoneNumberValidation = new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$")
    const regexEmailValidation = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g)
    // password validation

    // phone number validation////email match validation// // password validation
    if (!regexPhoneNumberValidation.test(phone)) {
      return setValidatePhoneNumber(false)
    } else if (!strongRegexPasswordValidation.test(password)) {
      return setValidatePassword(false)
    } else if (password != confirmPassword) {
      return setPasswordMatch(false)
    } else if (!regexEmailValidation.test(email)) {
      return serValidateEmail(false)
    }

    setValidatePhoneNumber(true);
    setValidatePassword(true);
    setPasswordMatch(true)
    serValidateEmail(true)

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: password
    }

    setLoading(true)
    axios.post('http://localhost:8080/users', newUser)
      .then(data => {
        setSuccess(true)
        setLoading(false)
        setTimeout(() => setRedirect(true), 3400)
      }, error => {
        if (error.response.status === 409) {
          setErrorMessage(error.response.data)
        } else {
          setErrorMessage('Unexpected error occured')
        }
        setLoading(false)

      })


  }

  return (
    <div>

      <NavBar />

      <FlexColumn className={"kit-bg-blue"} style={{ position: "absolute", height: "100vh", width: "100vw" }}>

        {!success && !loading &&

          <div className="col-md-12 ca-col-md-12-local">
            <div className="card ca-card-local">
              <h2 className="createAccount">Create an account</h2>
              <div className="errorContainer">
                {errorMessage &&
                  <div id="header" className="alert alert-warning text-white" role="alert">
                    <strong>Error! </strong> {errorMessage}
                  </div>
                }

              </div>

              <form name="form" onSubmit={(e) => handleSubmit(e)}>

                <label htmlFor="firstName">First Name{submitted && !firstName &&
                  <span className="required"> is required</span>
                }</label>
                <input type="text" className="form-control" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                <label htmlFor="lastName">Last name{submitted && !lastName &&
                  <span className="required"> is required</span>
                }</label>
                <input type="text" className="form-control" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />

                <label htmlFor="email">Email address{submitted && !email &&
                  <span className="required"> is required</span>
                } {submitted && email && !validateEmail &&
                  <span className="required"> invalid email format </span>}
                </label>
                <input type="text" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="phone">Phone number{submitted && !phone &&
                  <span className="required"> is required</span>}
                  {submitted && phone && !validatePhoneNumber &&
                    <span className="required"> invalid phone number </span>}
                </label>
                <input type="phone" className="form-control" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

                <label htmlFor="password">Password {submitted && !password &&
                  <span className="required"> is required</span>
                } {submitted && password && !validatePassword &&
                  <span className="required"> at least 1 lowercase, 1 uppercase, 1 numneric and one special character {'>'}= 8 </span>}
                </label>
                <input type="password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <label htmlFor="confirmPassword">Confirm Password {submitted && !confirmPassword &&
                  <span className="required"> is required</span>
                } {submitted && !passwordMatch && <span className="required"> does't match</span>}
                </label>
                <input type="password" className="form-control" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                <div className="form-group">
                  <button className="btn btn-lg btn-primary btn-block btn-signin form-submit-button btn-submit" >Create Account</button>
                </div>
              </form>
            </div>
          </div>
        }

        {loading &&

          <div className="col-md-12 ca-col-md-12-local">
            <div className="card ca-card-local">

              <p className="margin-for-anime"> </p>
              <LoadingAnime />


            </div>
          </div>
        }

        {!loading && success &&

          <div className="col-md-12 ca-col-md-12-local successfull-registration-container">
            <div className="card ca-card-local successfull-registration">
              <p>Successful registration</p>
              <p>Redirecting... </p>

            </div>
          </div>
        }

        {redirect &&
          <div>
            <Redirect to="/home" />
          </div>
        }

      </FlexColumn>
    </div>
  );



}

export default CreateAccountPage;