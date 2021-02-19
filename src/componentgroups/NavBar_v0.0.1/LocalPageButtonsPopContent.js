// Libraries
import React from "react";
import { Link } from 'react-router-dom';

// Components
import FlexBox from '../../components/FlexBox';

const LocalPageButtonsPopContent = (props) => {
  return (
    <FlexBox
      align={"start"}
      className={"h-100"}
      justify={"around"}
      style={{width: "100%"}}
      type={"column"}
    >
      {/* Boot Page */}
      <Link to={"/"}>
        <button 
          className="btn btn-secondary m-1"
          style={{width: "12rem"}}
        >
          {"Boot Page"}
        </button>
      </Link>
      
      {/* Landing Page */}
      <Link to={"/home"}>
        <button 
          className="btn btn-secondary m-1"
          style={{width: "12rem"}}
        >
          {"Landing Page"}
        </button>
      </Link>  

      {/* Orchestration Page */}
      <Link to={"/orchestration"}>
        <button 
          className="btn btn-secondary m-1"
          style={{width: "12rem"}}
        >
          {"Orchestration Page"}
        </button>
      </Link>    
    </FlexBox>
  );
};
export default LocalPageButtonsPopContent;