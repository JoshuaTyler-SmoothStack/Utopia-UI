// Libraries
import React, { Component } from "react";
import constants from "../../resources/constants.json"

// Images
import gifEarthSpinning from "../../images/EarthWithHotAirBalloon.gif";

class StartupPage extends Component {
  constructor(props) {
    super(props);
    // @PROP: state.sizing - obj{}

    this.state = {
      loadingText: "Tap anywhere to continue"
    };
  }

  handleLoadingProgressCheck() {
    // const { loadingProgress } = this.state;
    // if(loadingProgress === 100) {
    // 
    // }
    window.location.href = "http://localhost:3000/home";
  }

  render() {
    const { sizing } = this.props.state;
    const { loadingText } = this.state;

    let utopiaShadowSizer = "";
    if (sizing.breakInt < 1) {
      utopiaShadowSizer = "-xsm";
    } else if (sizing.breakInt < 2) {
      utopiaShadowSizer = "-sm";
    }

    return (
      <div
        className="gradient-red flex-column no-user"
        style={{
          position: "absolute",
          height: "100vh",
          width: "100vw",
        }}
        onClick={() => this.handleLoadingProgressCheck()}
      >
        {/* Utopia Header */}
        <div
          className={"cursive color-cream text-shadow-custom" + utopiaShadowSizer}
          style={{ 
            fontSize: sizing.title + "px",
            marginTop: "auto",
          }}
        >
          {"Utopia"}
        </div>

        {/* Spinning Earth & Hot Air Balloon */}
        <img
          src={gifEarthSpinning}
          alt=""
          style={{
            borderRadius: "50%",
            height: sizing.title * 2 + "px",
          }}
        />

        {/* Loading Bar */}
        <div
          className="border-radius-sm border-shadow flex-row"
          style={{
            height: sizing.screenbarSmall + "px",
            width: "66%",
            maxWidth: sizing.screenbar * 10 + "px",
            overflow: "hidden",
            marginTop: sizing.screenbarSmall + "px",
          }}
        >
          <div
            className="gradient-lightgrey gradient-animated-fast-infinite"
            style={{ height: "100%", width: "100%" }}
          />
        </div>

        {/* Loading Text */}
        <div 
          className="color-cream text-shadow-light" 
          style={{
            fontSize:sizing.h1+"px", 
            marginBottom: "auto",
            textAlign:"center"
          }}
        >
          {loadingText}
        </div>

        {/* Copyright */}
        <div className="flex-column">
          <a href="https://github.com/JoshuaTyler-SmoothStack/Utopia-UI" 
            style={{
              fontSize: sizing.h2+"px",
              marginBottom: sizing.screenbarSmall + "px",
            }}
          >
            {"©2021 Utopia Airlines"}
          </a>
        </div>
      </div>
    );
  }
}
export default StartupPage;
