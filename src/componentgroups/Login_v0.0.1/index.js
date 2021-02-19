// Libraries
import React, { Component } from "react";
import AuthenticationDispatcher from "../../dispatchers/AuthenticationDispatcher";
import KitUtils from "../../kitutils/KitUtils_v1.0.0";

// Components
import InputText from "../../components/InputText_0.0.1";
import RootReducer from "../../reducers/RootReducer";

// Images
import gifWorldBalloon from "../../images/EarthWithHotAirBalloon.gif";
import FlexBox from "../../components/FlexBox";

class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: "",
      password: "",
      warning: "",
    };
  }

  render() {
    const { authentication } = RootReducer.getState();
    const { warning } = this.state;

    return (
      <FlexBox
        className="kit-bg-smoke-light"
        style={{
          position: "absolute",
          height: "100vh",
          width: "100vw",
          top: "0",
        }}
        type={"column"}
      >
        <FlexBox
          className="kit-gradient-smoke rounded kitborder-shadow"
          justify={"start"}
          style={{width: "30rem", overflow: "hidden"}}
          type={"column"}
          wrap={"no-wrap"}
        >
          {/* Header */}
          <FlexBox
            className="kit-gradient-red kit-border-shadow mb-2"
            style={{height: "5rem", width: "100%"}}
          >
            {/* Icon - Back  */}
            <svg 
              className="ml-2 mr-auto kit-icon-light" 
              height={"66%"}
              fill={"white"}
              viewBox="0 0 16 16"
              onClick={() => AuthenticationDispatcher.onCancel()}
            >
              <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
            </svg>

            {/* Utopia WorldBalloonGif */}
            <img src={gifWorldBalloon} alt=""
              className="mr-2 rounded-circle"
              style={{ height: "4.5rem"}}
            />
          </FlexBox>

          {/* Body */}
            <FlexBox
              style={{height: "30rem", width: "100%"}}
              type={"column"}
            >
              {/* Loading Spinner */}
              {authentication.status === "PENDING" &&
              <FlexBox
                justify={"around"}
                style={{height: "100%", width: "100%"}}
                type={"column"}
                wrap={"no-wrap"}
              >
                <div className="spinner-border"/>
              </FlexBox>}

              {/* Error */}
              {authentication.status === "ERROR" &&
              <FlexBox
                justify={"around"}
                style={{height: "100%", width: "100%"}}
                type={"column"}
                wrap={"no-wrap"}
              >
                <div className="text-danger">
                  {authentication.error}
                </div>
              </FlexBox>}

              {/* Login Successful */}
              {authentication.status === "ACTIVE" &&
              <FlexBox
                justify={"around"}
                style={{height: "100%", width: "100%"}}
                type={"column"}
                wrap={"no-wrap"}
              >
                <div className="text-success">
                  {"login success!"}
                </div>
              </FlexBox>}

              {/* Login UI */}
              {authentication.status === "INACTIVE" &&
              <FlexBox
                justify={"around"}
                style={{height: "100%", width: "100%"}}
                type={"column"}
                wrap={"no-wrap"}
              >
                {/* Label */}
                <FlexBox
                  className="card text-white bg-dark mt-5 mb-3"
                  type={"column"}
                  style={{width: "75%"}}
                >
                  <FlexBox style={{minHeight:"3rem"}}>
                    <div className="h5">{"Login or create an account."}</div>
                    {warning !== "" && <div className="text-warning kit-shake">{warning}</div>}
                  </FlexBox>
                </FlexBox>

                {/* Inputs */}
                <FlexBox
                  className="mb-auto"
                  type={"column"}
                  style={{width: "100%"}}
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
                    onChange={(e) => this.setState({ email: e })}
                  />
                </FlexBox>

                {/* Actions */}
                <FlexBox
                  className="bg-light mb-2"
                  justify={"around"}
                  style={{height:"5rem", width: "100%"}}
                >
                  {/* Create Account */}
                  <button
                    className="btn btn-secondary"
                    onClick={() => this.handleCreateAccount()}
                  >
                    {"Create Account"}
                  </button>

                  {/* Reset Password */}
                  <button
                    className="btn btn-secondary"
                    onClick={() => this.handleForgotPassword()}
                  >
                    {"Forgot Password"}
                  </button>

                  {/* Login */}
                  <button
                    className="btn btn-success btn-lg"
                    onClick={() => this.handleLogin()}
                    style={{width: "33%"}}
                  >
                    {"Login"}
                  </button>

                </FlexBox>
              </FlexBox>}
            </FlexBox>
        </FlexBox>
      </FlexBox>
    );
  }

  handleCreateAccount = () => {
    const { email } = this.state;
    if (this.validateEmail(email)) {
      KitUtils.soundSuccess();
      AuthenticationDispatcher.onCreateAccount(email);

    } else {
      KitUtils.soundAlert();
      this.setState({
        warning: email
        ? "\"" + email + "\" is not a valid email address."
        : "Email address cannot be empty."
      });
    }
  }

  handleForgotPassword= () => {
    const { email } = this.state;
    if (this.validateEmail(email)) {
      KitUtils.soundSuccess();
      AuthenticationDispatcher.onForgotPassword(email);
    } else {
      KitUtils.soundAlert();
      this.setState({
        warning: email
        ? "\"" + email + "\" is not a valid email address."
        : "Email address cannot be empty."
      });
    }
  }

  handleLogin = () => {
    const { email, password } = this.state;
    AuthenticationDispatcher.onLogin(email, password);
  }

  validateEmail = (email) => {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email);
  }
}
export default Login;