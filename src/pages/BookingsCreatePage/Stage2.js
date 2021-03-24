import React from 'react';
import DropDown from '../../components/DropDown';

// Components
import FlexColumn from "../../components/FlexColumn";
import FlexRow from "../../components/FlexRow";
import InputText from "../../components/InputText";

const Stage2 = (props) => {
  const address = props.address || "";
  const dateOfBirth = props.dateOfBirth || "";
  const passportId = props.passportId || "";
  const sex = props.sex || "Unselected";
  const isVeteran = props.isVeteran || false;
  const onAddress = props.onAddress || null;
  const onDateOfBirth = props.onDateOfBirth || null;
  const onPassportId = props.onPassportId || null;
  const onSex = props.onSex || null;
  const onIsVeteran = props.onIsVeteran || null;

  return (
    <FlexRow className={props.className || ""} justify="around" style={props.style}>

      {/* Passport ID */}
      <FlexColumn className="w-100">
        <InputText
          className="rounded kit-border-shadow m-3"
          label={"Passport ID Number"}
          labelClassName={"text-info"}
          fontClass={"h4"}
          style={{
            height: "4rem",
            maxWidth:"30rem",
            width: "100%",
          }}
          value={passportId}
          onChange={(value) => onPassportId(value)}
        />
        <hr className="w-100"></hr>
      </FlexColumn>

      {/* Address */}
      <FlexRow className="w-100">
        {/* Address */}
        <InputText
          className="rounded kit-border-shadow m-3"
          label={"Address"}
          labelClassName={"text-info"}
          fontClass={"h4"}
          style={{
            height: "4rem",
            maxWidth:"30rem",
            width: "100%",
          }}
          value={address}
          onChange={(value) => onAddress(value)}
        />
      <hr className="w-100"></hr>
      </FlexRow>

      {/* Passenger Information */}
      <FlexColumn className="w-100">
        <FlexRow className="w-75">

          {/* Date Of Birth */}
          <FlexColumn className="mr-auto">
            <label className="form-label mr-auto">Date Of Birth</label>
            <input 
              className={"form-control"}
              type="date"
              value={dateOfBirth}
              onChange={(e) => onDateOfBirth(e.target.value)}
            />
          </FlexColumn>

          {/* Sex */}
          <FlexColumn className="ml-3 mr-5">
            <label className="form-label mr-auto">Sex</label>
            <DropDown
              align="right"
              buttonClassName="btn-info"
              className="w-100"
              options={["female", "male", "prefer not to answer"]}
              selection={sex}
              onSelect={(value) => onSex(value)}
            />
          </FlexColumn>
          <hr className="w-100"></hr>
        </FlexRow>

        {/* Veteran Status */}
        <FlexRow className="w-100" wrap="no-wrap">
          <FlexRow justify="start" style={{width:"2rem"}}>
            <input
              className="form-check-input ml-1"
              style={{height:"1.5rem", width:"1.5rem"}}
              type="checkbox"
              checked={isVeteran}
              onChange={() => onIsVeteran(!isVeteran)}
            />
          </FlexRow>
          <span className="ml-1">U.S. Military Active Duty / Veteran.</span>
        </FlexRow>
      </FlexColumn>
    </FlexRow>
  );
};
export default Stage2;
