// Libraries
import React from "react";
import PaymentsDispatcher from "../../../../dispatchers/PaymentsDispatcher";
import Store from "../../../../reducers/Store";

// Components
import ChangeOperationReadout from "../ChangeOperationReadout";
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";

const DeleteView = () => {
  const { payments } = Store.getState();
  const selectedPayment = payments.selected;

  const paymentBookingUuid = selectedPayment.paymentBookingUuid || "error";
  const paymentStripeUuid = selectedPayment.paymentStripeUuid || "error";
  const paymentStatus = selectedPayment.paymentStatus || "error";
  const { resultsStatus, status } = payments.delete;

  return (
    <FlexColumn>
      {status === "PENDING" && (
        <FlexColumn className="mt-5">
          <ChangeOperationReadout
            className="m-1"
            style={{ minHeight: "4rem" }}
            name="Payment"
            status={resultsStatus}
            result={`Payment with ID: ${selectedPayment.paymentId} successfully deleted.`}
          />

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
          </FlexRow>
        </FlexColumn>
      )}

      {status !== "PENDING" && (
        <FlexColumn>
          {/* Payment IDs & Status */}
          <FlexColumn>
            <FlexRow>
              {/* ID */}
              <div>
                <label className="form-label">Payment ID</label>
                <input
                  className={"form-control"}
                  readOnly
                  type={"text"}
                  value={"Auto-generated"}
                />
              </div>

              <FlexColumn className={"ml-3"}>
                <label className={"form-label mr-auto"}>Status</label>
                <input
                  className={"form-control"}
                  readOnly
                  type={"text"}
                  value={paymentStatus}
                />
              </FlexColumn>
            </FlexRow>

            {/* Booking Uuid */}
            <div className="mt-3 w-100">
              <label className="form-label">Booking UUID</label>
              <input
                className={"form-control"}
                readOnly
                type={"text"}
                value={paymentBookingUuid}
              />
            </div>
            <hr className="w-100"></hr>

            {/* Stripe Uuid */}
            <div className="mt-3 w-100">
              <label className="form-label">Stripe UUID</label>
              <input
                className={"form-control"}
                readOnly
                type={"text"}
                value={paymentStripeUuid}
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
              className="btn btn-primary m-3"
              onClick={() =>
                PaymentsDispatcher.onDelete("/" + selectedPayment.paymentId)
              }
            >
              Confirm Delete (cannot be undone)
            </button>
          </FlexRow>
        </FlexColumn>
      )}
    </FlexColumn>
  );
};
export default DeleteView;
