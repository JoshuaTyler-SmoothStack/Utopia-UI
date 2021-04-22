// Libraries
import _ from "lodash";
import React, { useState } from "react";
import Store from "../../../../reducers/Store";
import PaymentsDispatcher from "../../../../dispatchers/PaymentsDispatcher";
import KitUtils from "../../../../kitutils/KitUtils";

// Components
import ChangeOperationReadout from "../ChangeOperationReadout";
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";
import DropDown from "../../../../components/DropDown";

const EditView = (props) => {
  const { payments } = Store.getState();
  const selectedPayment = payments.selected;
  const { results, resultsStatus, status } = payments.edit;

  const paymentId = selectedPayment.paymentId;
  const [paymentBookingUuid, setPaymentBookingUuid] = useState(selectedPayment.paymentBookingUuid);
  const [paymentStripeUuid, setPaymentStripeUuid] = useState(selectedPayment.paymentStripeUuid);
  const [paymentStatus, setPaymentStatus] = useState(selectedPayment.paymentStatus);
  const [isReverted, setIsReverted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const paymentBookingUuidChanged = results
    ? selectedPayment.paymentBookingUuid !== results.paymentBookingUuid
    : true;

  const paymentStripeUuidChanged = results
    ? selectedPayment.paymentStripeUuid !== results.paymentStripeUuid
    : true;

  const paymentStatusChanged = results
    ? selectedPayment.paymentStatus !== results.paymentStatus
    : true;

  const resultsPending = resultsStatus === "PENDING";
  const noChangesMade = _.isEqual(selectedPayment, results);

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
      paymentId,
      paymentBookingUuid,
      paymentStripeUuid,
      paymentStatus,
    };
    if (!_.isEqual(selectedPayment, newPayment)) {
      PaymentsDispatcher.onEdit(null, newPayment);
    } else {
      PaymentsDispatcher.onEditFake(newPayment);
    }
  };

  return (
    <FlexColumn>
      {(status === "PENDING" || status === "ERROR") && (
        <FlexColumn className="mt-5">
          <ChangeOperationReadout
            className="m-1"
            style={{ minHeight: "4rem" }}
            name="Booking UUID"
            result={results ? results.paymentBookingUuid : ". . ."}
            status={paymentBookingUuidChanged ? resultsStatus : "DISABLED"}
          />

          <ChangeOperationReadout
            className="m-1"
            style={{ minHeight: "4rem" }}
            name="Stripe UUID"
            result={results ? results.paymentStripeUuid : ". . ."}
            status={paymentStripeUuidChanged ? resultsStatus : "DISABLED"}
          />

          <ChangeOperationReadout
            className="m-1"
            style={{ minHeight: "4rem" }}
            name="Status"
            result={results ? results.paymentStatus : ". . ."}
            status={paymentStatusChanged ? resultsStatus : "DISABLED"}
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

            {status !== "ERROR" && noChangesMade && !isReverted && (
              <button
                className={"btn btn-danger m-3 disabled"}
                onClick={() => KitUtils.soundAlert()}
              >
                {"Revert Changes (no changes made)"}
              </button>
            )}

            {status !== "ERROR" && !noChangesMade && !isReverted && (
              <button
                className={
                  "btn btn-danger m-3" + (!resultsPending || " disabled")
                }
                onClick={
                  resultsPending
                    ? () => KitUtils.soundSuccess()
                    : () => {
                        PaymentsDispatcher.onEdit(null, selectedPayment);
                        setIsReverted(true);
                      }
                }
              >
                {resultsPending
                  ? "Revert Changes (please wait)"
                  : "Revert Changes"}
              </button>
            )}
          </FlexRow>
        </FlexColumn>
      )}

      {status !== "ERROR" && status !== "PENDING" && (
        <FlexColumn>
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
                  value={paymentId}
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
                defaultValue={paymentBookingUuid}
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
                defaultValue={paymentStripeUuid}
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
              className="btn btn-danger m-3"
              onClick={() => handleSubmit()}
            >
              Save Changes
            </button>
          </FlexRow>
        </FlexColumn>
      )}
    </FlexColumn>
  );
};
export default EditView;
