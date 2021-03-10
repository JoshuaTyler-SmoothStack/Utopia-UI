// Libraries
import React, { useState } from 'react';
import NavBar from '../../componentgroups/NavBar';
import { Redirect } from 'react-router'
import AuthenticationDispatcher from '../../dispatchers/AuthenticationDispatcher'

// Components
import ErrorMessage from '../../components/ErrorMessage';
import FlexRow from '../../components/FlexRow';
import { Link } from 'react-router-dom';
import LogoGif from '../../components/LogoGif';
import FlexColumn from '../../components/FlexColumn';
import axios from 'axios';

const CreateAccountPage = (props) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setSubmitted] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [validatePassword, setValidatePassword] = useState(false)
  const [validatePhone, setValidatePhone] = useState(false)
  const [validateEmail, setValidateEmail] = useState(false)
  const [redirect, setRedirect] = useState(false);
  const [status, setStatus] = useState("DEFAULT");




  function handleSubmit(e) {
    e.preventDefault();
    handleValidate(email, phone, password, confirmPassword);
    setSubmitted(true)

    if (!firstName || !lastName || !validateEmail ||
      !validatePhone || !validatePassword || !passwordMatch) {
      return;
    }

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: password
    }

    setStatus("PENDING")
    axios.post("http://localhost:8080/users", newUser)
      .then(data => {
        console.log(data.status)
        setStatus("SUCCESS")
        setTimeout(() => setRedirect(true), 3400)
      }, error => {
        setErrorMessage(error.response ? error.response.data : "Unexpected error occured")
        setStatus("ERROR")
      });
  }

  function handleValidate(currentEmail, currentPhone, currentPassword, currentConfirmPassword) {
    const regexEmailValidation = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,15}/g);
    const regexPhoneNumberValidation = new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$");
    const strongRegexPasswordValidation = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

    setValidateEmail(regexEmailValidation.test(currentEmail));
    setValidatePhone(regexPhoneNumberValidation.test(currentPhone));
    setValidatePassword(strongRegexPasswordValidation.test(currentPassword));
    setPasswordMatch(password === currentConfirmPassword);
  }

  return (
    <div className="container-fluid kit-bg-blue" style={{ height: "100vh", width: "100vw" }}>
      {redirect && <Redirect to="/home" />}

      <div className="row">
        {/* Navbar */}
        <NavBar className="col-12" hideSearchBar={true} />

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
              {status === "ERROR" && <ErrorMessage>{errorMessage}</ErrorMessage>}

              {/* Pending */}
              {status === "PENDING" && <LogoGif style={{ width: "100%" }} />}

              {/* Success */}
              {status === "SUCCESS" &&
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
              {status === "DEFAULT" &&
                <form name="form" onSubmit={(e) => handleSubmit(e)}>

                  {/* Firstname */}
                  {(isSubmitted && !firstName)
                    ? <label className="text-danger kit-shake">First Name *</label>
                    : <label>First Name</label>
                  }
                  <input type="text"
                    className={"form-control mb-2 " +
                      (isSubmitted ? !firstName ? "is-invalid" : "is-valid" : "")
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
                    className={"form-control mb-2 " +
                      (isSubmitted ? !lastName ? "is-invalid" : "is-valid" : "")
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
                    className={"form-control mb-2 " +
                      (email
                        ? !validateEmail ? "is-invalid" : "is-valid"
                        : isSubmitted ? "is-invalid" : ""
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
                    className={"form-control mb-2 " +
                      (phone
                        ? !validatePhone ? "is-invalid" : "is-valid"
                        : isSubmitted ? "is-invalid" : ""
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
                    className={"form-control mb-2 " +
                      (password
                        ? !validatePassword ? "is-invalid" : "is-valid"
                        : isSubmitted ? "is-invalid" : ""
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
                    className={"form-control mb-2 " +
                      (confirmPassword
                        ? !passwordMatch ? "is-invalid" : "is-valid"
                        : isSubmitted ? "is-invalid" : ""
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
                    <Link to="/home">
                      <buton className="btn btn-secondary">Cancel</buton>
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
}
export default CreateAccountPage;