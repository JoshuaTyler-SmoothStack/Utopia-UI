// Libraries
import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthenticationDispatcher from "../../dispatchers/AuthenticationDispatcher";
import KitUtils from "../../kitutils/KitUtils_v1.0.0";
import Store from "../../reducers/Store";

// Components
import InputText from "../../components/InputText";
import FlexColumn from "../../components/FlexColumn";
import FlexRow from "../../components/FlexRow";

// Images
import gifWorldBalloon from "../../images/EarthWithHotAirBalloon.gif";

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      warning: "",
    };
  }

  render() {
    const { authentication } = Store.getState();
    const { warning } = this.state;

    return (
      // zIndex: 6
      <FlexColumn
        className={
          "kit-bg-smoke-light kit-no-user " +
          (this.props.className || "")
        }
        style={{
          position: "absolute",
          height: "100vh",
          width: "100vw",
          top: "0",
          left: "0",
          zIndex: "6",
          ...this.props.style
        }}
      >
        <FlexColumn
          className="kit-gradient-smoke rounded kit-border-shadow"
          justify={"start"}
          style={{ width: "30rem", overflow: "hidden" }}
          wrap={"no-wrap"}
        >
          {/* Header */}
          <FlexRow
            className="kit-gradient-red kit-border-shadow mb-2"
            style={{ height: "5rem", width: "100%" }}
          >
            {/* Icon - Back  */}
            <svg
              className="ml-2 mr-auto kit-icon-light"
              height={"66%"}
              fill={"white"}
              viewBox="0 0 16 16"
              onClick={() => AuthenticationDispatcher.onCancel()}
            >
              <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
            </svg>

            {/* Utopia WorldBalloonGif */}
            <img src={gifWorldBalloon} alt=""
              className="mr-2 rounded-circle"
              style={{ height: "4.5rem" }}
            />
          </FlexRow>

          {/* Body */}
          <FlexColumn style={{ height: "30rem", width: "100%" }}>
            {/* Loading Spinner */}
            {authentication.status === "PENDING" &&
              <FlexColumn
                justify={"around"}
                style={{ height: "100%", width: "100%" }}
                wrap={"no-wrap"}
              >
                <div className="spinner-border" />
              </FlexColumn>}

            {/* Error */}
            {authentication.status === "ERROR" &&
              <FlexColumn
                justify={"around"}
                style={{ height: "100%", width: "100%" }}
                wrap={"no-wrap"}
              >
                <div className="text-danger">
                  {authentication.error}
                </div>
              </FlexColumn>}

            {/* Login Successful */}
            {authentication.status === "ACTIVE" &&
              <FlexColumn
                justify={"around"}
                style={{ height: "100%", width: "100%" }}
                wrap={"no-wrap"}
              >
                <div className="text-success">
                  {"login success!"}
                </div>
              </FlexColumn>}

            {/* Login UI */}
            {authentication.status === "INACTIVE" &&
              <FlexColumn
                justify={"around"}
                style={{ height: "100%", width: "100%" }}
                wrap={"no-wrap"}
              >
                {/* Label */}
                <FlexColumn
                  className="card text-white bg-dark mt-5 mb-3"
                  style={{ width: "75%" }}
                >
                  <FlexRow style={{ minHeight: "3rem" }}>
                    <div className="h5">{"Login or create an account."}</div>
                    {warning !== "" && <div className="text-warning kit-shake">{warning}</div>}
                  </FlexRow>
                </FlexColumn>

                {/* Inputs */}
                <FlexColumn
                  className="mb-auto"
                  style={{ width: "100%" }}
                  wrap={"no-wrap"}
                >

                  {/* Email */}
                  <InputText
                    className="rounded kit-border-shadow m-3"
                    label={"Email"}
                    labelClassName={"text-info"}
                    fontClass={"h4"}
                    style={{
                      height: "4rem",
                      width: "66%"
                    }}
                    onChange={(e) => this.setState({ email: e })}
                  />

                  {/* Password */}
                  <InputText
                    className="rounded kit-border-shadow m-3"
                    label={"Password"}
                    labelClassName={"text-info"}
                    fontClass={"h4"}
                    isHidden={true}
                    style={{
                      height: "4rem",
                      width: "66%"
                    }}
                    onChange={(e) => this.setState({ password: e })}
                  />
                </FlexColumn>

                {/* Actions */}
                <FlexRow
                  className="bg-light mb-2"
                  justify={"around"}
                  style={{ height: "5rem", width: "100%" }}
                >
                  {/* Create Account */}
                  <Link to="/createaccount">
                    <button className="btn btn-secondary"
                      onClick={() => AuthenticationDispatcher.onCancel()}
                    >
                      {"Create Account"}
                    </button>
                  </Link>

                  {/* Reset Password */}
                  <Link to="/forgotpassword">
                    <button className="btn btn-secondary"
                      onClick={() => AuthenticationDispatcher.onCancel()}
                    >
                      {"Forgot Password"}
                    </button>
                  </Link>

                  {/* Login */}
                  <button
                    className="btn btn-success btn-lg text-white kit-text-shadow-thin"
                    onClick={() => this.handleLogin()}
                    style={{ width: "33%" }}
                  >
                    {"Login"}
                  </button>

                </FlexRow>
              </FlexColumn>}
          </FlexColumn>
        </FlexColumn>
      </FlexColumn>
    );
  }

  handleLogin = () => {
    const { email, password } = this.state;

    console.log(email, password)

    if (this.validateEmail(email)) {
      AuthenticationDispatcher.onLogin(email, password);

    } else {
      KitUtils.soundAlert();
      this.setState({
        warning: email
          ? "\"" + email + "\" is not a valid email address."
          : "Email address cannot be empty."
      });
    }
  }

  validateEmail = (email) => {
    const regexEmailValidation = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,15}/g);
    return regexEmailValidation.test(email);

  };
}

export default LoginModal;