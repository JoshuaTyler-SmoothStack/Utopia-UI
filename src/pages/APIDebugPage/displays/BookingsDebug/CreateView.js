// Libraries
import React, { useState } from 'react';
import Store from '../../../../reducers/Store';
import BookingsDispatcher from "../../../../dispatchers/BookingsDispatcher";

// Components
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";
import ChangeOperationReadout from '../ChangeOperationReadout';
import KitUtils from '../../../../kitutils/KitUtils';

const CreateView = () => {
  const { bookings } = Store.getState();
  const results = bookings.create.results
  const resultsStatus = bookings.create.resultsStatus;
  const resultsPending = resultsStatus === "PENDING";
  const status = bookings.create.status;

  const bookingId = "Auto-generated";
  const bookingStatus = "INACTIVE";
  const bookingConfirmationCode = "Auto-generated";
  const bookingPassengerId = "Assigned after Booking is created.";
  const [bookingFlightId, setBookingFlightId] = useState(0);
  const [bookingUserId, setBookingUserId] = useState(0);
  const [bookingGuestEmail, setBookingGuestEmail] = useState("");
  const [bookingGuestPhone, setBookingGuestPhone] = useState("");

  const [bookingUserGuestValid, setBookingUserGuestValid] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    BookingsDispatcher.onCreate(null, newBooking);
  };

  return (
    <FlexColumn>
      {(status === "PENDING" || status === "ERROR") && 
        <FlexColumn className="mt-5">
          <ChangeOperationReadout 
            className="m-1" 
            style={{minHeight: "4rem"}} 
            name="Booking" 
            result={"Booking ID: " + results.bookingId + 
            "\nConfirmation Code: " + results.bookingConfirmationCode + "."}
            status={resultsStatus} 
          />
          
          <ChangeOperationReadout 
            className="m-1" 
            style={{minHeight: "4rem"}} 
            name="Flights" 
            result={results.bookingFlightId
              ? "Flight ID: " + results.bookingFlightId + "."
              : "Unable to create Flight Booking."
            }
            status={results.bookingFlightId
              ? resultsStatus
              : "ERROR"
            } 
          />
          
          <ChangeOperationReadout 
            className="m-1" 
            style={{minHeight: "4rem"}} 
            name="Guest Contact" 
            result={results.bookingGuestEmail
              ? "Email: " + results.bookingGuestEmail + " Phone: " + results.bookingGuestPhone + "."
              : bookingGuestEmail
                ? "Unable to create Booking Guest."
                : "N/A"
            }
            status={results.bookingGuestEmail
              ? resultsStatus
              : bookingGuestEmail 
                ? "ERROR" 
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
            result={results.bookingUserId
              ? "User ID: " + results.bookingUserId + "."
              : bookingUserId
                ? "Unabled to register Booking User."
                : "N/A"
            }
            status={results.bookingUserId
              ? resultsStatus
              : bookingUserId
                ? "ERROR"
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
            {status !== "ERROR" &&
            <button className={"btn btn-info m-3" + (!resultsPending || " disabled")}
              onClick={!resultsPending 
                ? () => BookingsDispatcher.onPromptEdit("/" + bookings.selected.id) 
                : () => KitUtils.soundAlert()
              }
            >
              {resultsPending ? "Edit (please wait)" : "Edit"}
            </button>}
          </FlexRow>
        </FlexColumn>
      }

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
                <input 
                  className="form-control" 
                  readOnly 
                  type="text" 
                  value={bookingStatus}
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
          <FlexRow className="col-12 cold-md-8">
            <button className="btn btn-light m-3"
              onClick={() => BookingsDispatcher.onCancel()}
            >
              Cancel
            </button>
            <button className="btn btn-success text-white m-3"
              onClick={() => handleSubmit()}
            >
              + Create New Booking
            </button>
          </FlexRow>
        </FlexColumn>}
    </FlexColumn>
  );
}
export default CreateView;