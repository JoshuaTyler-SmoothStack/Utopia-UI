// Libraries
import React, { Component } from "react";
import AuthenticationDispatcher from "../../dispatchers/AuthenticationDispatcher";
import KitUtils from "../../kitutils/KitUtils_v1.0.0";

// Components
import InputText from "../../components/InputText_0.0.1";

// Images
import gifWorldBalloon from "../../images/EarthWithHotAirBalloon.gif";

// Styles
import "../../styles/KitStyles.css";

class Login extends Component {
  constructor(props) {
    super(props);
    // @PROP: reduce - f()
    // @PROP: state - obj{}

    this.state = {
      email: "",
      password: "",
      warning: "",
    };
  }

  render() {
    const { reduce, state } = this.props;
    const { sizing } = state;
    const { warning } = this.state;

    return (
      <div
        className="bg-smoke-light flex-column"
        style={{
          position: "absolute",
          height: "100vh",
          width: "100vw",
          top: "0",
        }}
      >
        <div
          className="gradient-smoke border-radius-sm border-shadow flex-column-start"
          style={{
            height: sizing.screenbarLarge * 6 + "px",
            width: sizing.screenbarLarge * 5 + "px",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            className="gradient-red border-shadow mb-2 flex-row"
            style={{
              height: sizing.button * 1.5 + "px",
              width: "100%",
            }}
          >
            {/* Icon - Back  */}
            <svg 
              className="ml-2 mr-auto icon-light" 
              height={sizing.button} 
              width={sizing.button} 
              fill={"white"}
              viewBox="0 0 16 16"
              onClick={() => AuthenticationDispatcher.onCancel(reduce)}
            >
              <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
            </svg>

            {/* Utopia WorldBalloonGif */}
            <img src={gifWorldBalloon} alt=""
              className="mr-2"
              style={{
                height: sizing.button * 1.25 +"px",
                borderRadius: "50%"
              }}
            />
          </div>

          {/* Body */}
          <div
            className="flex-column-around"
            style={{
              height: "75%",
              width: "100%"
            }}
          >
            {/* Label */}
            <div
              className="bg-blue color-cream border-radius-sm border-shadow m-2 flex-column"
              style={{
                height: sizing.button * 1.5 + "px",
                width: sizing.button * 8 + "px",
                fontSize: sizing.h1+"px",
                textAlign: "center",
              }}
            >
              <div>{"Login or create an account."}</div>
              {warning !== "" && <div className="color-custom-red shake">{warning}</div>}
            </div>

            {/* Email */}
            <div
              className="border-radius-sm border-shadow m-2"
              style={{
                height: sizing.button * 1.25 + "px",
                width: sizing.button * 6 + "px",
                overflow: "hidden",
              }}
            >
              <InputText
                label={"Email"}
                fontSize={sizing.h2}
                onChange={(e) => this.setState({ email: e })}
              />
            </div>

            {/* Password */}
            <div
              className="border-radius-sm border-shadow m-2"
              style={{
                height: sizing.button * 1.25 + "px",
                width: sizing.button * 6 + "px",
                overflow: "hidden",
              }}
            >
              <InputText
                label={"Password"}
                fontSize={sizing.h2}
                isHidden={true}
                onChange={(e) => this.setState({ password: e })}
              />
            </div>

            {/* Actions */}
            <div
              className="bg-grey m-2 flex-row-around"
              style={{
                height: sizing.button * 2 + "px",
                width: "100%",
              }}
            >
              {/* Login */}
              <button
                className="btn bg-green color-cream border-radius-sm border-shadow-hover text-shadow-thin"
                style={{
                  height: sizing.button * 1.25 + "px",
                  width: sizing.button * 3 + "px",
                  fontSize: sizing.h2 + "px"
                }}
                onClick={() => this.handleLogin()}
              >
                {"Login"}
              </button>

              {/* Request Account */}
              <button
                className="btn bg-cream border-radius-sm border-shadow-hover"
                style={{
                  height: sizing.button * 1.25 + "px",
                  width: sizing.button * 3 + "px",
                  fontSize: sizing.font + "px"
                }}
                onClick={() => this.handleRequestAccount()}
              >
                {"Create An Account"}
              </button>

              {/* Reset Password */}
              <button
                className="btn bg-cream border-radius-sm border-shadow-hover"
                style={{
                  height: sizing.button * 1.25 + "px",
                  width: sizing.button * 3 + "px",
                  fontSize: sizing.font + "px"
                }}
                onClick={() => this.handleForgotPassword()}
              >
                {"Forgot Password?"}
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  handleLogin = () => {
    const { email, password } = this.state;


    // DatabaseManager.signIn(email, password, 
    // onError => {
    //   KitUtils.soundAlert();
    //   this.setState({warning: "Incorrect username or password."});
    // }, onSuccess => {
    //   KitUtils.soundSuccess();
    //   this.props.onClose();
    // });
  }

  handleForgotPassword= () => {
    const { email } = this.state;


    // DatabaseManager.requestNewUserPassword(email, 
    // onError => {
    //   KitUtils.soundAlert();
    //   this.setState({warning: "No user found with email: " + email});
    // }, onSuccess => {
    //   KitUtils.soundSuccess();
    //   this.setState({warning: "Password reset sent, check inbox for: " + email});
    // });
  }

  handleRequestAccount = () => {
    const { email } = this.state;
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email)) {
      KitUtils.soundSuccess();
      // write to request account
    } else {
      KitUtils.soundAlert();
      this.setState({warning: email + " is not a valid email address."});
    }
  }
}
export default Login;