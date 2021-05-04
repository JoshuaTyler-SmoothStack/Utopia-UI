// Libraries
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Components
import CheckoutForm from "./CheckoutForm";

const STRIPE = loadStripe("pk_test_51IlDnLC4LjXYE5oBrqv2zF2V4tCoubGV2b0JdpUCyqqN0cgk1gy094f3uMDnyhU1C7fsfV7iauD9pCsZfIdhLuka00MMzRrNSk");

const Stage4 = (props) => {
  // @props: cardAddress - string
  // @props: cardHolderName - string
  // @props: passenegerAddress - string
  // @props: paymentAmount - string
  // @props: paymentConfirmation - string
  // @props: paymentTitle - string
  // @props: onCardAddress - f(value)
  // @props: onCardHolderName - f(value)
  // @props: onPaymentConfirmation - f(value)

  const { cardAddress, cardHolderName, passengerAddress, paymentAmount, paymentConfirmation, paymentTitle } = props;

  return (
    <div className={props.className || ""} justify={"around"} style={props.style}>
      <div className={"row"}>

        {/* Card */}
        <div className={"w-100 card p-2 mt-3 ml-auto mr-auto"}>
          {/* Header */}
          <h2 className={"card-title"}>{"Payment"}</h2>
          <hr className={"w-100 mt-0"}></hr>

          {/* Body */}
          <div className={"card-body"}>

            {/* Default */}
            <div className={"row"}>
              {/* Stripe */}
              <Elements stripe={STRIPE}>
                <CheckoutForm
                  className={"col-12 p-2"}
                  cardAddress={cardAddress}
                  cardHolderName={cardHolderName}
                  passengerAddress={passengerAddress}
                  paymentAmount={paymentAmount}
                  paymentComplete={paymentConfirmation}
                  paymentTitle={paymentTitle}
                  onCardAddress={props.onCardAddress}
                  onCardHolderName={props.onCardHolderName}
                  onPaymentConfirmation={props.onPaymentConfirmation}
                />
              </Elements>
            </div>
          </div>
        </div>
        {/* Card End */}

      </div>
    </div>
  );
};
export default Stage4;
