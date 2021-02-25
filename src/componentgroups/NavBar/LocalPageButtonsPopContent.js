// Libraries
import React from "react";
import { Link } from 'react-router-dom';

// Components
import FlexColumn from "../../components/FlexColumn";

const LocalPageButtonsPopContent = (props) => {
  const buttonClassName = "btn btn-secondary m-1";
  const buttonStyle = {width: "12rem"};

  return (
    <FlexColumn
      align={"start"}
      className={"h-100"}
      justify={"around"}
      style={{width: "100%"}}
    >
      {/* Boot Page */}
      <Link to={"/"}>
        <button className={buttonClassName} style={buttonStyle}>
          {"Boot Page"}
        </button>
      </Link>
      
      {/* Create Account Page */}
      <Link to={"/createaccount"}>
        <button className={buttonClassName} style={buttonStyle}>
          {"Create Account Page"}
        </button>
      </Link> 

      {/* Debug Page */}
      <Link to={"/debug"}>
        <button className={buttonClassName} style={buttonStyle}>
          {"Debug MS Page"}
        </button>
      </Link> 

      {/* Forgot Password Page */}
      <Link to={"/forgotpassword"}>
        <button className={buttonClassName} style={buttonStyle}>
          {"Forgot Password Page"}
        </button>
      </Link> 

      {/* Landing Page */}
      <Link to={"/home"}>
        <button className={buttonClassName} style={buttonStyle}>
          {"Landing Page"}
        </button>
      </Link>  

      {/* Orchestration Page */}
      <Link to={"/orchestration"}>
        <button className={buttonClassName} style={buttonStyle}>
          {"Orchestration Page"}
        </button>
      </Link>    
    </FlexColumn>
  );
};
export default LocalPageButtonsPopContent;