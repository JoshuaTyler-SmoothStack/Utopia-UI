// Libraries
import React, { useState } from "react";
import Store from "../../../../reducers/Store";
import PaymentsDispatcher from "../../../../dispatchers/PaymentsDispatcher";

// Components
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";
import ChangeOperationReadout from "../ChangeOperationReadout";
import KitUtils from "../../../../kitutils/KitUtils";
import DropDown from "../../../../components/DropDown";

const CreateView = (props) => {
  const [paymentBookingUuid, setPaymentBookingUuid] = useState(1);
  const [paymentStripeUuid, setPaymentStripeUuid] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("PENDING");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { payments } = Store.getState();
  const { results, resultsStatus, status } = payments.create;
  const resultsPending = resultsStatus === "PENDING";

  const handleValidate = () => {
    setIsSubmitted(true);
    if (!paymentBookingUuid) return false;
    if (!paymentStripeUuid) return false;
    if (!paymentStatus) return false;
    return true;
  };

  const handleSubmit = () => {
    if (!handleValidate()) return;
    const newPayment = {
      paymentBookingUuid,
      paymentStripeUuid,
      paymentStatus,
    };
    PaymentsDispatcher.onCreate(null, newPayment);
  };

  return (
    <FlexColumn>
      {(status === "PENDING" || status === "ERROR") && (
        <FlexColumn className="mt-5">

          {/* Change Readout */}
          <ChangeOperationReadout
            className="m-1"
            style={{ minHeight: "4rem" }}
            name="Payment"
            status={resultsStatus}
            result={`Payment with ID: ${results.paymentId} successfully created.`}
          />

          {/* Buttons */}
          <FlexRow>
            <button
              className="btn btn-light m-3"
              onClick={() => {
                PaymentsDispatcher.onCancel();
                PaymentsDispatcher.onRequest();
              }}
            >
              Close
            </button>
            {status !== "ERROR" && (
              <button
                className={
                  "btn btn-info m-3" + (!resultsPending || " disabled")
                }
                onClick={
                  !resultsPending
                    ? () =>
                        PaymentsDispatcher.onPromptEdit(`/${results.paymentId}`)
                    : () => KitUtils.soundAlert()
                }
              >
                {resultsPending ? "Edit (please wait)" : "Edit"}
              </button>
            )}
          </FlexRow>
        </FlexColumn>
      )}

      {/* Form Body */}
      {status !== "ERROR" && status !== "PENDING" && (
        <FlexColumn className={"p-3"}>

          {/* Payment IDs & Status */}
          <FlexColumn>
            <FlexRow>
              {/* ID */}
              <div>
                <label className="form-label">Payment ID</label>
                <input
                  type="text"
                  readOnly
                  className="form-control"
                  value={"Auto-generated"}
                />
              </div>

              <FlexColumn className={"ml-3"}>
                <label className={"form-label mr-auto"}>Status</label>
                <DropDown
                  buttonClassName={"btn-dark"}
                  options={["PENDING", "APPROVED", "CONFIRMED", "REJECTED"]}
                  selection={paymentStatus}
                  onSelect={(value) => setPaymentStatus(value)}
                />
              </FlexColumn>
            </FlexRow>

            {/* Booking Uuid */}
            <div className="mt-3 w-100">
              <label className="form-label">Booking UUID</label>
              <input
                className={
                  "form-control " +
                  (isSubmitted
                    ? !paymentStripeUuid
                      ? "is-invalid"
                      : "is-valid"
                    : "")
                }
                placeholder={"UUID"}
                type="text"
                onChange={(e) => setPaymentBookingUuid(e.target.value)}
              />
            </div>
            <hr className="w-100"></hr>

            {/* Stripe Uuid */}
            <div className="mt-3 w-100">
              <label className="form-label">Stripe UUID</label>
              <input
                className={
                  "form-control " +
                  (isSubmitted
                    ? !paymentStripeUuid
                      ? "is-invalid"
                      : "is-valid"
                    : "")
                }
                placeholder={"UUID"}
                type="text"
                onChange={(e) => setPaymentStripeUuid(e.target.value)}
              />
            </div>
            <hr className="w-100"></hr>
          </FlexColumn>

          {/* Buttons */}
          <FlexRow>
            <button
              className="btn btn-light m-3"
              onClick={() => PaymentsDispatcher.onCancel()}
            >
              Cancel
            </button>
            <button
              className="btn btn-success text-white m-3"
              onClick={() => handleSubmit()}
            >
              + Create New Payment
            </button>
          </FlexRow>
        </FlexColumn>
      )}
    </FlexColumn>
  );
};
export default CreateView;
