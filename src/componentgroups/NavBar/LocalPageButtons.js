// Libraries
import React from "react";
import Constants from "../../resources/constants.json";
import { Link } from 'react-router-dom';

// Components
import FlexColumn from "../../components/FlexColumn";

const LocalPageButtons = (props) => {
  const buttonClassName = "btn btn-secondary m-1";
  const buttonStyle = {width: "12rem"};

  return (
    <FlexColumn
      align={"start"}
      className={"h-100 pl-1 pr-1 " + (props.className || "")}
      justify={"around"}
      style={props.style}
    >
      {/* Boot Page */}
      <Link to={Constants.pagePaths.boot}>
        <button className={buttonClassName} style={buttonStyle}>
          {"Boot Page"}
        </button>
      </Link>
      
      {/* Create Account Page */}
      <Link to={Constants.pagePaths.createAccount}>
        <button className={buttonClassName} style={buttonStyle}>
          {"Create Account Page"}
        </button>
      </Link>

      {/* Debug Page */}
      <Link to={Constants.pagePaths.debug}>
        <button className={buttonClassName} style={buttonStyle}>
          {"Debug MS Page"}
        </button>
      </Link>

      {/* Flight Search Page */}
      <Link to={Constants.pagePaths.flightSearch}>
        <button className={buttonClassName} style={buttonStyle}>
          {"Flight Search Page"}
        </button>
      </Link>

      {/* Forgot Password Page */}
      <Link to={Constants.pagePaths.forgotPassword}>
        <button className={buttonClassName} style={buttonStyle}>
          {"Forgot Password Page"}
        </button>
      </Link>

      {/* Home Page */}
      <Link to={Constants.pagePaths.home}>
        <button className={buttonClassName} style={buttonStyle}>
          {"Landing Page"}
        </button>
      </Link>
    </FlexColumn>
  );
};
export default LocalPageButtons;