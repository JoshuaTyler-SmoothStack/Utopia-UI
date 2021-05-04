// Libraries
import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import Constants from "../../resources/constants.json";
import Orchestration from "../../Orchestration";

// Components
import ErrorMessage from "../../components/ErrorMessage";
import FlexRow from "../../components/FlexRow";

const EMPTY_ADDRESS = "";
const FORM_LABEL = "form-label ml-2";
const STYLE_INPUTTEXT = "form-control mb-2 ";
const STYLE_INVALID = "is-invalid";
const STYLE_VALID = "is-valid";

const CheckoutForm = (props) => {
  // @props: cardAddress - string
  // @props: cardHolderName - string
  // @props: passengerAddress - string
  // @props: paymentAmount - string
  // @props: paymentConfirmation - string
  // @props: paymentTitle - string
  // @props: onCardAddress - f(value)
  // @props: onCardExpiration - f(value)
  // @props: onCardHolderName - f(value)
  // @props: onCardNumber - f(value)
  // @props: onCardSecurityCode - f(value)
  // @props: onPaymentConfirmation - f(value)

  const cardAddress = props.cardAddress || "";
  const cardHolderName = props.cardHolderName || "";
  const [clientSecret, setClientSecret] = useState("");
  const elements = useElements();
  const [error, setError] = useState(props.paymentTitle ? "" : "[Error] No payment selected.");
  const passengerAddress = props.passengerAddress || EMPTY_ADDRESS;
  const paymentAmount = props.paymentAmount || "$0.00";
  const paymentTitle = props.paymentTitle || "Invalid Selection";
  const [processing, setProcessing] = useState("");
  const stripe = useStripe();
  const [succeeded, setSucceeded] = useState(false);
  const [usePassengerAddressAsCardAddress, setUsePassengerAddressAsCardAddress] = useState(false);
  const [validCardHolderName, setValidCardHolderName] = useState("");
  const [validCardAddress, setValidCardAddress] = useState("");

  useEffect(() => {
    if(!clientSecret) {
      const payload = {};
      Orchestration.createRequestWithBody(
        Constants.httpRequest.post,
        "/payments/create-payment-session",
        payload,
        (httpError) => setError(httpError),
        (httpResponse) => {
          if(httpResponse.error) {
            setError(httpResponse.error);
          }
          else {
            setClientSecret(httpResponse.clientSecret);
          }
        }
      );
    }
  }, []);

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    if(!validateAndSetCardAddress(cardAddress)) return;
    if(!validateAndSetCardHolderName(cardHolderName)) return;

    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (payload.error) {
      setError(`[Payment Failed]: ${payload.error.message}\nPlease refresh the page.`);
      setProcessing(false);
      setSucceeded(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      if(props.onPaymentConfirmation) {
        props.onPaymentConfirmation(payload.paymentIntent.client_secret);
      }
    }
  };

  // Card Address
  const validateAndSetCardAddress = (value) => {
    if(props.onCardAddress) {
      props.onCardAddress(value);
    }

    if (value.trim().length === 0) {
      setError("Address cannot be empty.");
      setValidCardAddress("FALSE");
      return false;
    } else {
      if(value === passengerAddress) {
        setUsePassengerAddressAsCardAddress(true);
      } else {
        setUsePassengerAddressAsCardAddress(false);
      }
      setError("");
      setValidCardAddress("TRUE");
      return true;
    }
  };

  // Card Holder Name
  const validateAndSetCardHolderName = (value) => {
    if(props.onCardHolderName) {
      props.onCardHolderName(value);
    }

    if (value.trim().length === 0) {
      setError("Card holder name cannot be empty.");
      setValidCardHolderName("FALSE");
      return false;
    } else if (value.length > 100) {
      setError("Card holder name cannot be longer than 100 characters.");
      setValidCardHolderName("FALSE");
      return false;
    } else {
      setError("");
      setValidCardHolderName("TRUE");
      return true;
    }
  };

  return (
    <div className={"w-100"}>
      {/* Error */}
      {error &&
        <ErrorMessage className={"bg-warning mb-3 p-2 text-white rounded"}>
          {error}
        </ErrorMessage>
      }

      {/* Success */}
      {succeeded && (
        <p className={"result-message bg-success"}>
          {"Payment succeeded, see the result in your"}
          <a
            href={`https://dashboard.stripe.com/test/payments`}
          >
            {" Stripe dashboard."}
          </a>
        </p>
      )}

      {/* Payment Display */}
      <div>
        {props.paymentDisplay || (
          <FlexRow className={"w-100 bg-success rounded p-2 kit-border-shadow-sm"} justify={"start"}>
            <div className={"mr-auto"}>
              <div className={"bg-white rounded p-2"}>
                {paymentTitle}
              </div>
            </div>
            <div className={"ml-auto"}>
              <div className={"bg-white rounded p-2"}>
                {paymentAmount}
              </div>
            </div>
          </FlexRow>
        )}
      </div>

      {/* Payment Information */}
      <div id={"payment-form"} className={props.className || ""}>

        {/* Card Holder Name & Checkbox */}
        <FlexRow>
          {/* Name */}
          <div className={"w-75"}>
            <label className={FORM_LABEL}>{"Name (as appears on card)"}</label>
            <input
              className={`${STYLE_INPUTTEXT} ${cardHolderName ? (validCardHolderName ? STYLE_VALID : STYLE_INVALID) : ""}`}
              type={"text"}
              value={cardHolderName}
              onChange={(e) => validateAndSetCardHolderName(e.target.value)}
            />
          </div>

          {/* Checkbox */}
          <div className={"w-25"}>
            <label className={`${FORM_LABEL} text-center`}>{"Use Passenger Address"}</label>
            <input
              className={`${STYLE_INPUTTEXT}`}
              type={"checkbox"}
              value={usePassengerAddressAsCardAddress}
              onChange={() => !usePassengerAddressAsCardAddress && validateAndSetCardAddress(passengerAddress)}
            />
          </div>
        </FlexRow>


        {/* Card Address */}
        <div className={"w-100"}>
          <label className={FORM_LABEL}>{"Address"}</label>
          <input
            className={`${STYLE_INPUTTEXT} ${cardAddress ? (validCardAddress ? STYLE_VALID : STYLE_INVALID) : ""}`}
            type={"text"}
            value={cardAddress}
            onChange={(e) => validateAndSetCardAddress(e.target.value)}
          />
        </div>

        {/* Card Information */}
        <div className={"w-100 mt-3"}>
          <label className={FORM_LABEL}>{"Card"}</label>
          <CardElement
            className={"rounded kit-border-shadow-sm p-2"}
            id={"card-element"}
            options={{style: {
              base: {
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                  color: "#32325d"
                }
              },
              invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
              }
            }}}
            onChange={(e) => handleChange(e)}
          />
        </div>

        {/* Pay Button */}
        <FlexRow className={"w-100 mt-4"} justify={"end"}>
          <button
            className={"btn btn-success btn-lg text-white kit-text-shadow-dark"}
            id={"submit"}
            onClick={() => handleSubmit()}
          >
            <span id="button-text">
              {processing ? (
                <div className="spinner-border" id="spinner"></div>
              ) : (
                "Pay now"
              )}
            </span>
          </button>
        </FlexRow>

      </div>
    </div>
  );
};
export default CheckoutForm;
