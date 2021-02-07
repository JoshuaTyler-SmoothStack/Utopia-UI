// Libraries
import React, { Component } from "react";

// Images
import gifEarthSpinning from "../../images/EarthWithHotAirBalloon.gif";

// Styles
import "../../styles_v0.0.1/KitStyles.css";

class StartupPage extends Component {
  constructor(props) {
    super(props);
    // @PROP: sizing - obj{}
    // @PROP: onSelectPage - f()

    this.state = {
      animationXOffset: 0,
      animationYOffset: 0,
      loadingText: "Tap anywhere to continue"
    };
  }

  componentDidMount() {
    this.handleRegisterOrchestratorService();
  }

  handleRegisterOrchestratorService() {}

  handleLoadingProgressCheck() {
    // const { loadingProgress } = this.state;
    // if(loadingProgress === 100) {
    //   this.props.onSelectPage("LANDINGPAGE");
    // }
    this.props.onSelectPage("LANDINGPAGE");
  }

  render() {
    const { sizing } = this.props;
    const { animationXOffset, animationYOffset, loadingText } = this.state;

    const pageClasses =
      "gradient-red no-user d-flex flex-column justify-content-center align-items-center";
    const pageStyle = {
      position: "absolute",
      height: "100vh",
      width: "100vw",
      left: animationXOffset + "px",
      top: animationYOffset + "px",
    };

    let utopiaHeaderClasses =
      "mt-auto cursive color-custom-cream text-align-center text-shadow-custom";
    if (sizing.breakInt < 1) {
      utopiaHeaderClasses += "-xsm";
    } else if (sizing.breakInt < 2) {
      utopiaHeaderClasses += "-sm";
    }

    return (
      <div 
        className={pageClasses} 
        style={pageStyle}
        onClick={() => this.handleLoadingProgressCheck()}
      >
        {/* Utopia Header */}
        <div
          style={{ fontSize: sizing.title + "px" }}
          className={utopiaHeaderClasses}
        >
          Utopia
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
          className="bg-custom-grey border-radius-sm mt-5 d-flex flex-row justify-content-center align-items-center"
          style={{
            height: sizing.screenbarSmall + "px",
            width: "66%",
            maxWidth: sizing.screenbar * 10 + "px",
            overflow: "hidden"
          }}
        >
          <div
            className="gradient-lightgrey gradient-animated-fast-infinite"
            style={{ height: "100%", width: "100%" }}
          />
        </div>

        {/* Loading Text */}
        <div 
          className="mt-1 mb-auto color-custom-cream text-shadow-light" 
          style={{fontSize:sizing.h1+"px", textAlign:"center"}}
        >
          {loadingText}
        </div>

        {/* Copyright */}
        <div className="mb-1 d-flex flex-column justify-content-end align-items-center">
          <a href="https://github.com/JoshuaTyler-SmoothStack/Utopia-UI" 
            style={{fontSize: sizing.h2+"px"}}
          >
            ©2021 Utopia Airlines
          </a>
        </div>
      </div>
    );
  }
}
export default StartupPage;
