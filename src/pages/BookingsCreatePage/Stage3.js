import React from 'react';

// Components
import FlexColumn from "../../components/FlexColumn";
import FlexRow from "../../components/FlexRow";

// images
import imageNoDangerousItems from "../../images/NoDangerousItems.png";

const Stage3 = (props) => {
  const isAgreement = props.isAgreement || false;
  const onIsAgreement = props.onIsAgreement || null;

  return (
    <FlexColumn className={props.className || ""} justify="around" style={props.style}>

      {/* No Dangerous Items */}
      <img src={imageNoDangerousItems} alt=""
        className={"rounded kit-border-shadow"}
        style={{maxHeight:"50vh", maxWidth:"100vw"}}
      />

      {/* Agreement to Terms */}
      <FlexRow className="w-100 mt-3" wrap="no-wrap">
        <FlexRow justify="start" style={{width:"2rem"}}>
          <input
            className="form-check-input ml-1"
            style={{height:"1.5rem", width:"1.5rem"}}
            type="checkbox"
            checked={isAgreement}
            onChange={() => onIsAgreement(!isAgreement)}
          />
        </FlexRow>
        <h5 className="ml-1 mt-auto mb-auto">I agree to the terms and conditions.</h5>
      </FlexRow>
    </FlexColumn>
  );
};
export default Stage3;
