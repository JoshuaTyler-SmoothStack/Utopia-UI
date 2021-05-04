import React from 'react';

// Components
import FlexColumn from "../../components/FlexColumn";
import FlexRow from "../../components/FlexRow";
import InputText from "../../components/InputText";
import AuthenticationDispatcher from '../../dispatchers/AuthenticationDispatcher';

const Stage1 = (props) => {

  const breakPoint = props.breakPoint || "";
  const firstName = props.firstName || "";
  const lastName = props.lastName || "";
  const email = props.email || "";
  const onFirstName = props.onFirstName || null;
  const onLastName = props.onLastName || null;
  const onEmail = props.onEmail || null;

  return (
    <div className={props.className || "row"} justify={"around"} wrap={"no-wrap"} style={props.style}>
      {/* User Login */}
      <FlexColumn className={"col-12 col-md-5 text-center"}>
        <h5>Already have an account?</h5>
        <button className="btn btn-primary"
          onClick={() => AuthenticationDispatcher.onPromptLogin()}
        >
          Login
        </button>
      </FlexColumn>

      {/* Divider */}
      {breakPoint.includes("small")
        ? <hr className="col-12 mt-2"></hr>
        : <div className="col-2">
            <div className="bg-light rounded" style={{minHeight:"20rem", width:"0.5rem"}}/>
          </div>
      }

      {/* Guest Information */}
      <FlexColumn
        className={"col-12 col-md-5 text-center"}
        wrap={"no-wrap"}
      >
        <h5>Create a booking as a guest</h5>

        {/* First Name */}
        <InputText
          className="rounded kit-border-shadow m-3"
          label={"First Name"}
          labelClassName={"text-info"}
          fontClass={"h4"}
          style={{
            height: "4rem",
            maxWidth:"30rem",
            width: "100%",
          }}
          value={firstName}
          onChange={(value) => onFirstName(value)}
        />

        {/* Last Name */}
        <InputText
          className="rounded kit-border-shadow m-3"
          label={"Last Name"}
          labelClassName={"text-info"}
          fontClass={"h4"}
          style={{
            height: "4rem",
            maxWidth:"30rem",
            width: "100%",
          }}
          value={lastName}
          onChange={(value) => onLastName(value)}
        />

        {/* Email */}
        <InputText
          className="rounded kit-border-shadow m-3"
          label={"Email"}
          labelClassName={"text-info"}
          fontClass={"h4"}
          style={{
            height: "4rem",
            maxWidth:"30rem",
            width: "100%",
          }}
          value={email}
          onChange={(value) => onEmail(value)}
        />
      </FlexColumn>
    </div>
  );
};
export default Stage1;
