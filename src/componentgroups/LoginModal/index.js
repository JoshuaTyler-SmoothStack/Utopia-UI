// Libraries
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import AuthenticationDispatcher from "../../dispatchers/AuthenticationDispatcher";
import Constants from "../../resources/constants.json";
import KitUtils from "../../kitutils/KitUtils_v1.0.0";
import Store from "../../reducers/Store";

// Components
import InputText from "../../components/InputText";
import FlexColumn from "../../components/FlexColumn";
import FlexRow from "../../components/FlexRow";
import Modal from "../../components/Modal";

// Images
import gifWorldBalloon from "../../images/EarthWithHotAirBalloon.gif";

const ZINDEX_DEFAULT = 3;

class LoginModal extends Component {
  constructor(props) {
    super(props);
    // @PROP: onClose - f()

    this.state = {
      email: "",
      password: "",
      warning: "",
    };

  }

  render() {
    const { authentication } = Store.getState();
    const align = this.props.align || "center";
    const background = this.props.background || "kit-bg-smoke-light";
    const zIndex = this.props.zIndex || ZINDEX_DEFAULT;
    const warning = this.state.warning || authentication.error;

    return (
      <Modal
        align={align}
        background={background}
        disableCloseButton={true}
        zIndex={zIndex}
        onClose={() => this.props.onClose}
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
            <button className="btn btn-primary mr-auto">
              <svg
                className="ml-2 kit-icon-light"
                height={"4rem"}
                fill={"white"}
                viewBox="0 0 16 16"
                onClick={() => AuthenticationDispatcher.onCancel()}
              >
                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
              </svg>
            </button>

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

            {authentication.status === "SUCCESS" &&
              <Redirect to="home" />
            }

            {/* Login UI */}
            {(authentication.status === "INACTIVE" || authentication.status === "ERROR") &&
              < FlexColumn
                justify={"around"}
                style={{ height: "100%", width: "100%" }}
                wrap={"no-wrap"}
              >
                {/* Label */}
                <FlexColumn
                  className="card text-white bg-dark mt-5 mb-3"
                  style={{ width: "75%" }}
                >
                  <FlexColumn style={{ minHeight: "3rem" }}>
                    <div className="h5">{"Login or create an account."}</div>
                    {warning !== "" && <div className="text-warning kit-shake">{String(warning)}</div>}
                  </FlexColumn>
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
                      width: "66%",
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
                      width: "66%",
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
                  <Link to={Constants.pagePaths.createAccount}>
                    <button className="btn btn-secondary"
                      onClick={() => AuthenticationDispatcher.onCancel()}
                    >
                      {"Create Account"}
                    </button>
                  </Link>

                  {/* Reset Password */}
                  <Link to={Constants.pagePaths.forgotPassword}>
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
      </Modal>
    );
  }

  handleLogin = () => {
    const { email, password } = this.state;

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
  };

  validateEmail = (email) => {
    const regexEmailValidation = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,15}/g);
    return regexEmailValidation.test(email);
  };
}
export default LoginModal;
