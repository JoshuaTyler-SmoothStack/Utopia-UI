import React, { useState } from "react";

// Components
import ErrorMessage from "../../components/ErrorMessage";

const EMPTY_ADDRESS = "";
const FORM_LABEL = "form-label";
const STYLE_INPUTTEXT = "form-control mb-2 ";
const STYLE_INVALID = "is-invalid";
const STYLE_VALID = "is-valid";

const Stage4 = (props) => {
  // @props: passengerAddress - string
  // @props: onCardAddress - f(value)
  // @props: onCardExpiration - f(value)
  // @props: onCardHolderName - f(value)
  // @props: onCardNumber - f(value)
  // @props: onCardSecurityCode - f(value)

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const cardAddress = props.cardAddress || "";
  const cardExpiration = props.cardExpiration || "";
  const cardHolderName = props.cardHolderName || "";
  const cardNumber = props.cardNumber || "";
  const cardSecurityCode = props.cardSecurityCode || "";
  const passengerAddress = props.passengerAddress || EMPTY_ADDRESS;
  const [usePassengerAddressAsCardAddress, setUsePassengerAddressAsCardAddress] = useState(false);
  const [validCardNumber, setValidCardNumber] = useState("");
  const [validCardExpiration, setValidCardExpiration] = useState("");
  const [validCardSecurityCode, setValidCardSecurityCode] = useState("");
  const [validCardHolderName, setValidCardHolderName] = useState("");
  const [validCardAddress, setValidCardAddress] = useState("");

  // Card Address
  const validateAndSetCardAddress = (value) => {
    console.log(value, passengerAddress);
    props.onCardAddress(value);
    if (value.trim().length === 0) {
      setErrorMessage("Address cannot be empty.");
      setValidCardAddress("FALSE");
    } else {
      if(value === passengerAddress) {
        setUsePassengerAddressAsCardAddress(true);
      } else {
        setUsePassengerAddressAsCardAddress(false);
      }
      setErrorMessage("");
      setValidCardAddress("TRUE");
    }
  };

  // Card Expiration
  const validateAndSetCardExpiration = (value) => {
    props.onCardExpiration(value);
    if (value.trim().length === 0) {
      setErrorMessage("Expiration date cannot be empty.");
      setValidCardExpiration("FALSE");
    } else {
      let validValue = true;
      const splitValue = value.split("/");
      if(splitValue.length !== 2) {
        validValue = false;
      }
      if(splitValue[0].replaceAll("[^0-9]").length !== splitValue[0]) {
        validValue = false;
      }
      if(splitValue[1].replaceAll("[^0-9]").length !== splitValue[0]) {
        validValue = false;
      }

      if(!validValue) {
        setErrorMessage("Expiration date must be valid. (MM/YY)");
        setValidCardExpiration("FALSE");
      } else {
        setErrorMessage("");
        setValidCardExpiration("TRUE");
      }
    }
  };

  // Card Holder Name
  const validateAndSetCardHolderName = (value) => {
    props.onCardHolderName(value);
    if (value.trim().length === 0) {
      setErrorMessage("Card holder name cannot be empty.");
      setValidCardHolderName("FALSE");
    } else if (value.length > 100) {
      setErrorMessage("Card holder name cannot be longer than 100 characters.");
      setValidCardHolderName("FALSE");
    } else {
      setErrorMessage("");
      setValidCardHolderName("TRUE");
    }
  };

  // Card Number
  const validateAndSetCardNumber = (value) => {
    props.onCardNumber(value);
    if (value.trim().length === 0) {
      setErrorMessage("Card number cannot be empty.");
      setValidCardNumber("FALSE");
    } else if (value.length !== 16) {
      setErrorMessage("Card number must be 16 numbers.");
      setValidCardNumber("FALSE");
    } else if(value.replace("[^0-9]").length !== value.length) {
      setErrorMessage("Card number must only contain numbers.");
      setValidCardNumber("FALSE");
    }  else {
      setErrorMessage("");
      setValidCardNumber("TRUE");
    }
  };

  // Card Security Code
  const validateAndSetCardSecurityCode = (value) => {
    props.onCardSecurityCode(value);
    if (value.trim().length === 0) {
      setErrorMessage("Security code cannot be empty.");
      setValidCardSecurityCode("FALSE");
    } else if(value.length < 3) {
      setErrorMessage("Security code must be at least 3 numbers.");
      setValidCardSecurityCode("FALSE");
    } else if(value.length > 5) {
      setErrorMessage("Security code must be at most 5 numbers.");
      setValidCardSecurityCode("FALSE");
    } else if(value.replace("[^0-9]").length !== value.length) {
      setErrorMessage("Security code must only contain numbers.");
      setValidCardSecurityCode("FALSE");
    } else {
      setErrorMessage("");
      setValidCardSecurityCode("TRUE");
    }
  };

  return (
    <div className={props.className || ""} justify="around" style={props.style}>
      <div className="row">

        {/* Card */}
        <div className="w-100 card p-2 mt-3 ml-auto mr-auto">
          {/* Header */}
          <h2 className="card-title">Payment</h2>
          <hr className="w-100 mt-0"></hr>

          {/* Body */}
          <div className="card-body">
            {/* Error */}
            {errorMessage &&
              <ErrorMessage className="bg-warning mb-3 p-2 text-white rounded">
                {errorMessage}
              </ErrorMessage>
            }

            {/* Default */}
            <div className={"row"}>
              {/* Card Number */}
              <div className={"col-12"}>
                <label className={FORM_LABEL}>{"Card Number"}</label>
                <input
                  className={`${STYLE_INPUTTEXT} ${cardNumber ? (validCardNumber ? STYLE_VALID : STYLE_INVALID) : ""}`}
                  type={"text"}
                  value={cardNumber}
                  placeholder={"XXXX-XXXX-XXXX-XXXX"}
                  onChange={(e) => validateAndSetCardNumber(e.target.value)}
                />
              </div>

              {/* Card Expiration */}
              <div className={"col-6"}>
                <label className={FORM_LABEL}>{"Expiration"}</label>
                <input
                  className={`${STYLE_INPUTTEXT} ${cardExpiration ? (validCardExpiration ? STYLE_VALID : STYLE_INVALID) : ""}`}
                  type={"text"}
                  value={cardExpiration}
                  placeholder={"MM/YY"}
                  onChange={(e) => validateAndSetCardExpiration(e.target.value)}
                />
              </div>

              {/* Card Security Code */}
              <div className={"col-6"}>
                <label className={FORM_LABEL}>{"Security Code"}</label>
                <input
                  className={`${STYLE_INPUTTEXT} ${cardSecurityCode ? (validCardSecurityCode ? STYLE_VALID : STYLE_INVALID) : ""}`}
                  type={"text"}
                  value={cardSecurityCode}
                  onChange={(e) => validateAndSetCardSecurityCode(e.target.value)}
                />
              </div>

              {/* Card Holder Name */}
              <div className={"col-12"}>
                <label className={FORM_LABEL}>{"Card Holder"}</label>
                <input
                  className={`${STYLE_INPUTTEXT} ${cardHolderName ? (validCardHolderName ? STYLE_VALID : STYLE_INVALID) : ""}`}
                  type={"text"}
                  value={cardHolderName}
                  onChange={(e) => validateAndSetCardHolderName(e.target.value)}
                />
              </div>

              {/* Card Address */}
              <div className={"col-10"}>
                <label className={FORM_LABEL}>{"Address"}</label>
                <input
                  className={`${STYLE_INPUTTEXT} ${cardAddress ? (validCardAddress ? STYLE_VALID : STYLE_INVALID) : ""}`}
                  type={"text"}
                  value={cardAddress}
                  onChange={(e) => validateAndSetCardAddress(e.target.value)}
                />
              </div>

              {/* Card Address */}
              <div className={"col-2"}>
                <label className={`${FORM_LABEL} text-center`}>{"Use Passenger Address"}</label>
                <input
                  className={`${STYLE_INPUTTEXT}`}
                  type={"checkbox"}
                  value={usePassengerAddressAsCardAddress}
                  onChange={() => !usePassengerAddressAsCardAddress && validateAndSetCardAddress(passengerAddress)}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Card End */}

      </div>
    </div>
  );
};
export default Stage4;
