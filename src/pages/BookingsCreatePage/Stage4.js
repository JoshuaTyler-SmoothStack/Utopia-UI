import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";

// Components
import ErrorMessage from "../../components/ErrorMessage";
import CheckoutForm from "./CheckoutForm";

const STRIPE = loadStripe("pk_test_51IlDnLC4LjXYE5oBrqv2zF2V4tCoubGV2b0JdpUCyqqN0cgk1gy094f3uMDnyhU1C7fsfV7iauD9pCsZfIdhLuka00MMzRrNSk");

const Stage4 = (props) => {
  // @props: onPayment - f({payment})

  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className={props.className || ""} justify="around" style={props.style}>
      <div className={"row"}>

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
              {/* Stripe */}
              <Elements stripe={STRIPE}>
                <CheckoutForm
                  className={"col-12 p-2"}
                  onError={(err) => setErrorMessage(err)}
                  onSuccess={(payment) => props.onPayment && props.onPayment(payment)}
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
