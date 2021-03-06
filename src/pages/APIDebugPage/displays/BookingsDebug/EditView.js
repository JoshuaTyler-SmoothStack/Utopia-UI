// Libraries
import _ from "lodash";
import React, { useState } from 'react';
import Store from '../../../../reducers/Store';
import BookingsDispatcher from "../../../../dispatchers/BookingsDispatcher";
import KitUtils from '../../../../kitutils/KitUtils_v1.0.0';

// Components
import ChangeOperationReadout from '../ChangeOperationReadout';
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";
import DropDown from "../../../../components/DropDown";


const EditView = (props) => {
  const bookingStatusOptions = ["ACTIVE", "CANCELLED", "INACTIVE", "ONHOLD"];

  const { bookings } = Store.getState();
  const results = bookings.edit.results
  const resultsStatus = bookings.edit.resultsStatus;
  const resultsPending = resultsStatus === "PENDING";
  const selectedBooking = bookings.selected;
  const status = bookings.edit.status;
  const noChangesMade = _.isEqual(selectedBooking, results);

  const bookingId = selectedBooking.bookingId || "ERROR - INVALID";
  const bookingConfirmationCode = selectedBooking.bookingConfirmationCode || "ERROR - INVALID";
  const bookingPassengerId = selectedBooking.passengerId || "unkown";
  const [bookingStatus, setBookingStatus] = useState(selectedBooking.bookingStatus || "INACTIVE");
  const [bookingFlightId, setBookingFlightId] = useState(selectedBooking.bookingFlightId || "unkown");
  const [bookingUserId, setBookingUserId] = useState(selectedBooking.bookingUserId || "unkown");
  const [bookingGuestEmail, setBookingGuestEmail] = useState(selectedBooking.bookingGuestEmail || "unkown");
  const [bookingGuestPhone, setBookingGuestPhone] = useState(selectedBooking.bookingGuestPhone || "unkown");

  const [bookingUserGuestValid, setBookingUserGuestValid] = useState(false)
  const [isReverted, setIsReverted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const bookingStatusChanged = results
    ? selectedBooking.bookingStatus !== results.bookingStatus
    : true;

  const bookingFlightIdChanged = results
    ? selectedBooking.bookingFlightId !== results.bookingFlightId
    : true;

  const bookingUserIdChanged = results
    ? selectedBooking.bookingUserId !== results.bookingUserId
    : true;

  const bookingGuestChanged = results
    ? (selectedBooking.bookingGuestEmail !== results.bookingGuestEmail) || 
      (selectedBooking.bookingGuestPhone !== results.bookingGuestPhone)
    : true;

  const handleBookingUserGuestValidation = (userId, email, phone) => {
    const regexEmailValidation = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,15}/g);
    const regexPhoneValidation = new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$");
    const validGuestEmail = regexEmailValidation.test(email);
    const validGuestPhone = regexPhoneValidation.test(phone);
    const isBookingUserGuestValid = (userId && !isNaN(userId)) || (validGuestEmail && validGuestPhone);
    setBookingUserGuestValid(isBookingUserGuestValid);
    return isBookingUserGuestValid;
  }

  const handleValidate = () => {
    if(!bookingStatusOptions.includes(bookingStatus)) return false;
    if(!bookingFlightId || isNaN(bookingFlightId)) return false;
    if(!handleBookingUserGuestValidation(bookingUserId, bookingGuestEmail, bookingGuestPhone)) return false; 
    return true;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    if(!handleValidate()) return;
    const newBooking = {
      bookingId: bookingId,
      bookingStatus: bookingStatus,
      bookingConfirmationCode: bookingConfirmationCode,
      bookingFlightId: bookingFlightId,
      bookingPassengerId: bookingPassengerId,
      bookingUserId: bookingUserId,
      bookingGuestEmail: bookingGuestEmail,
      bookingGuestPhone: bookingGuestPhone,
    };
    if(!_.isEqual(selectedBooking, newBooking)) {
      BookingsDispatcher.onEdit(null, newBooking);
    } else {
      BookingsDispatcher.onEditFake(newBooking);
    }
  };

  return (
    <FlexColumn>
      {(status === "PENDING" || status === "ERROR") && 
      <FlexColumn className="mt-5">
        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Booking" 
          result={bookingStatusChanged
            ? "Booking Status: " + results.bookingStatus + "."
            : "N/A"
          }
          status={bookingStatusChanged
            ? results.bookingStatus
              ? resultsStatus
              : "ERROR"
            : "DISABLED"
          } 
        />
        
        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Flights" 
          result={bookingFlightIdChanged
            ? "Flight ID: " + results.bookingFlightId + "."
            : "N/A"
          }
          status={bookingFlightIdChanged
            ? results.bookingFlightId
              ? resultsStatus
              : "ERROR"
            : "DISABLED"
          } 
        />
        
        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Guest Contact" 
          result={bookingGuestChanged
            ? "Email: " + results.bookingGuestEmail + ".\nPhone: " + results.bookingGuestPhone + "."
            : "N/A"
          }
          status={bookingGuestChanged
            ? results.bookingGuestEmail
              ? resultsStatus
              : "ERROR"
            : "DISABLED"
          } 
        />
        
        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Passengers" 
          result={"N/A"}
          status={"DISABLED"} 
        />

        <ChangeOperationReadout 
          className="m-1" 
          style={{minHeight: "4rem"}} 
          name="Users" 
          result={bookingUserIdChanged
            ? "User ID: " + results.bookingUserId + "."
            : "N/A"
          }
          status={bookingUserIdChanged
            ? results.bookingUserId
              ? resultsStatus
              : "ERROR"
            : "DISABLED"
          } 
        />

        <FlexRow>
          <button className="btn btn-light m-3"
            onClick={() => {
              BookingsDispatcher.onCancel();
              BookingsDispatcher.onRequest();
            }}
          >
            Close
          </button>
            
          {(status !== "ERROR" && noChangesMade && !isReverted) &&
            <button className={"btn btn-danger m-3 disabled"}
              onClick={() => KitUtils.soundAlert()}
            >
              {"Revert Changes (no changes made)"}
            </button>}

          {(status !== "ERROR" && !noChangesMade && !isReverted) &&
            <button className={"btn btn-danger m-3" + (!resultsPending || " disabled")}
              onClick={resultsPending 
                ? () => KitUtils.soundSuccess() 
                : () => {
                  BookingsDispatcher.onEdit(null, selectedBooking);
                  setIsReverted(true);
                }
              }
            >
              {resultsPending ? "Revert Changes (please wait)" : "Revert Changes"}
            </button>
          }
        </FlexRow>
      </FlexColumn>}


      {(status !== "ERROR" && status !== "PENDING") &&
        <FlexColumn className="form-group row w-100">
          {/* Booking */}
          <div className="col-12 col-md-8">
            <FlexRow className="w-100 mt-3" wrap="no-wrap">
              <div style={{width:"47.5%"}}>
                <label className="form-label">Booking ID</label>
                <input 
                  className="form-control" 
                  readOnly 
                  type="text"
                  value={bookingId}
                />
              </div>
              <div className="ml-auto" style={{width:"47.5%"}}>
                <label className="form-label">Status</label>
                <DropDown
                  align="right"
                  buttonClassName="btn-info"
                  className="w-100"
                  options={bookingStatusOptions}
                  selection={bookingStatus}
                  onSelect={(value) => setBookingStatus(value)}
                />
              </div>
            </FlexRow>
            <div className="w-100 mt-3">
              <label className="form-label">Confirmation Code</label>
              <input 
                className="form-control" 
                readOnly 
                type="text" 
                value={bookingConfirmationCode}
              />
            </div>
            <hr className="w-100"></hr>
          </div>

          
          {/* Flight / Passenger */}
          <FlexRow className="col-12 col-md-8 mt-3">
            <div style={{width:"47.5%"}}>
              <label className="form-label form-label-success">Flight ID</label>
              <input 
                className={"form-control " +  (isSubmitted ? !bookingFlightId ? "is-invalid" : "is-valid" : "")}
                defaultValue={bookingFlightId}
                min="0"
                type="number" 
                onChange={(e) => setBookingFlightId(e.target.value)}
              />
            </div>
            <div className="ml-auto" style={{width:"47.5%"}}>
              <label className="form-label">Passenger ID</label>
              <input 
                className={"form-control"}
                defaultValue={bookingPassengerId}
                readOnly
                type="text" 
              />
            </div>
            <hr className="w-100"></hr>
          </FlexRow>
          

          {/* User / Guest */}
          <FlexRow className="col-12 col-md-8 mt-3" align="start">
            <div style={{width:"47.5%"}}>
              <label className="form-label">User ID</label>
              <input 
                className={"form-control " +  (isSubmitted ? !bookingUserGuestValid ? "is-invalid" : "is-valid" : "")}
                defaultValue={bookingUserId}
                min="0"
                type="number" 
                onChange={(e) => {
                  setBookingUserId(e.target.value);
                  handleBookingUserGuestValidation(e.target.value, bookingGuestEmail, bookingGuestPhone); 
                }}
              />
            </div>
            <FlexColumn className="ml-auto" style={{width:"47.5%"}}>
              <div>
                <label className="form-label">Guest Email</label>
                <input 
                  className={"form-control " +  (isSubmitted ? !bookingUserGuestValid ? "is-invalid" : "is-valid" : "")}
                  defaultValue={bookingGuestEmail}
                  placeholder={!bookingGuestEmail ? "" : "No Guest Email available."}
                  type="email" 
                  onChange={(e) => {
                    setBookingGuestEmail(e.target.value);
                    handleBookingUserGuestValidation(bookingUserId, e.target.value, bookingGuestPhone);
                  }}
                />
              </div>
              <div className="mt-3">
                <label className="form-label">Guest Phone</label>
                <input 
                  className={"form-control " +  (isSubmitted ? !bookingUserGuestValid ? "is-invalid" : "is-valid" : "")}
                  defaultValue={bookingGuestPhone}
                  placeholder={!bookingGuestPhone ? "" : "No Guest Phone available."}
                  type="phone" 
                  onChange={(e) => {
                    setBookingGuestPhone(e.target.value);
                    handleBookingUserGuestValidation(bookingUserId, bookingGuestEmail, e.target.value); 
                  }}
                />
              </div>
            </FlexColumn>
            <hr className="w-100"></hr>
          </FlexRow>
          
          {/* Buttons */}
          <FlexRow>
            <button className="btn btn-light m-3"
              onClick={() => BookingsDispatcher.onCancel()}
            >
              Cancel
            </button>
            <button className="btn btn-danger m-3"
              onClick={() => handleSubmit()}
            >
              Save Changes
            </button>
          </FlexRow>
        </FlexColumn>}
  </FlexColumn>
  );
}
export default EditView;