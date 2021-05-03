import React, { useEffect, useState } from "react";
import Constants from "../../resources/constants.json";
import Store from "../../reducers/Store";

// Components
import BookingsDispatcher from "../../dispatchers/BookingsDispatcher";
import ErrorMessage from "../../components/ErrorMessage";
import FlexColumn from "../../components/FlexColumn";
import FlexRow from "../../components/FlexRow";
import { Redirect } from "react-router";
import DropDown from "../../components/DropDown";

const STYLE_INPUTTEXT = "form-control mb-2 ";
const STYLE_INVALID = "is-invalid";
const STYLE_VALID = "is-valid";

const Stage5 = (props) => {
  const { authentication, bookings, passengers } = Store.getState();
  const address = props.address || "";
  const dateOfBirth = props.dateOfBirth || "";
  const lastName = props.lastName || "";
  const email = props.email || "";
  const firstName = props.firstName || "";
  const flightId = props.flightId || 0;
  const passportId = props.passportId || "";
  const phone = props.phone || "";
  const isVeteran = props.isVeteran || false;
  const sex = props.sex || "Unselected";

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [redirectToHome, setRedirectToHome] = useState(false);

  const [validAddress, setValidAddress] = useState("");
  const [validDateOfBirth, setValidDateOfBirth] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const [validFirstName, setValidFirstName] = useState("");
  const [validFlightId, setValidFlightId] = useState("");
  const [validLastName, setValidLastName] = useState("");
  const [validPassportId, setValidPassportId] = useState("");
  const [validPhone, setValidPhone] = useState("");

  useEffect(() => {
    BookingsDispatcher.onCancel();
  }, []);

  // Address
  const validateAndSetAddress = (value) => {
    props.onAddress(value);
    if (value.trim().length === 0) {
      setErrorMessage("Address cannot be empty.");
      setValidAddress("FALSE");
    } else {
      setErrorMessage("");
      setValidAddress("TRUE");
    }
  };

  // DateOfBirth
  const validateAndSetDateOfBirth = (value) => {
    props.onDateOfBirth(value);
    if (value.trim().length === 0) {
      setErrorMessage("Date Of Birth cannot be empty.");
      setValidDateOfBirth("FALSE");
    } else {
      setErrorMessage("");
      setValidDateOfBirth("TRUE");
    }
  };

  // First Name
  const validateAndSetFirstName = (value) => {
    props.onFirstName(value);
    if (value.trim().length === 0) {
      setErrorMessage("First name cannot be empty.");
      setValidFirstName("FALSE");
    } else if (value.length > 100) {
      setErrorMessage("First name cannot be longer than 100 characters.");
      setValidFirstName("FALSE");
    } else {
      setErrorMessage("");
      setValidFirstName("TRUE");
    }
  };

  // FlightId
  const validateAndSetFlightId = (value) => {
    props.onFlightId(value);
    if (value === 0) {
      setErrorMessage("FlightId cannot be 0.");
      setValidFlightId("FALSE");
    } else {
      setErrorMessage("");
      setValidFlightId("TRUE");
    }
  };

  // Last Name
  const validateAndSetLastName = (value) => {
    props.onLastName(value);
    if (value.trim().length === 0) {
      setErrorMessage("Last name cannot be empty.");
      setValidLastName("FALSE");
    } else if (value.length > 100) {
      setErrorMessage("Last name cannot be longer than 100 characters.");
      setValidLastName("FALSE");
    } else {
      setErrorMessage("");
      setValidLastName("TRUE");
    }
  };

  // Email
  const validateAndSetEmail = (value) => {
    props.onEmail(value);
    if (value.trim().length === 0) {
      setErrorMessage("Email cannot be empty.");
      setValidEmail("FALSE");
    } else if (!new RegExp("^(.+)@(.+)$").test(value)) {
      setErrorMessage("Invalid Email Address.");
      setValidEmail("FALSE");
    } else {
      setErrorMessage("");
      setValidEmail("TRUE");
    }
  };

  // PassportId
  const validateAndSetPassportId = (value) => {
    props.onPassportId(value);
    if (value.trim().length === 0) {
      setErrorMessage("PassportId cannot be empty.");
      setValidPassportId("FALSE");
    } else {
      setErrorMessage("");
      setValidPassportId("TRUE");
    }
  };

  // Phone
  const validateAndSetPhone = (value) => {
    props.onPhone(value);
    if (value.trim().length === 0) {
      setErrorMessage("Phone cannot be empty.");
      setValidPhone("FALSE");
    } else if (
      !new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$").test(value)
    ) {
      setErrorMessage("Invalid Phone Number.");
      setValidPhone("FALSE");
    } else {
      setErrorMessage("");
      setValidPhone("TRUE");
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    validateAndSetAddress(address);
    validateAndSetDateOfBirth(dateOfBirth);
    validateAndSetEmail(email);
    validateAndSetFirstName(firstName);
    validateAndSetFlightId(flightId);
    validateAndSetLastName(lastName);
    validateAndSetPassportId(passportId);
    validateAndSetPhone(phone);

    const validBookingInformation =
      authentication.userId || (validEmail && validPhone);
    if (!validBookingInformation) {
      setErrorMessage(
        "You must login or provide a valid email & phone number."
      );
    }

    if (
      validBookingInformation &&
      validAddress === "TRUE" &&
      validDateOfBirth === "TRUE" &&
      validFirstName === "TRUE" &&
      validLastName === "TRUE" &&
      validPassportId === "TRUE"
    ) {
      const newBooking = {};
      if (authentication.userId)
        newBooking.bookingUserId = authentication.userId;
      if (validEmail && validPhone) {
        newBooking.bookingGuestEmail = email;
        newBooking.bookingGuestPhone = phone;
      }
      BookingsDispatcher.onCreate("", newBooking);
    }
  };

  return (
    <div className={props.className || ""} justify="around" style={props.style}>
      <div className="row">
        {/* Card */}
        <div className="w-100 card p-2 mt-3 ml-auto mr-auto">
          {/* Header */}
          <h2 className="card-title">Confirm Booking</h2>
          <hr className="w-100 mt-0"></hr>

          {/* Body */}
          <div className="card-body">
            {/* Error */}
            {(errorMessage || bookings.create.results.error) && (
              <ErrorMessage className="bg-warning mb-3 p-2 text-white rounded">
                {errorMessage || bookings.create.results.error}
              </ErrorMessage>
            )}

            {/* Pending */}
            {bookings.create.resultsStatus === "PENDING" && (
              <FlexColumn>
                <h3 className="text-dark kit-text-shadow-dark">
                  Verifying Booking . . .
                </h3>
                <FlexRow>
                  <div className="spinner-border ml-2" />
                </FlexRow>
              </FlexColumn>
            )}

            {/* Success */}
            {bookings.create.resultsStatus === "SUCCESS" && (
              <FlexColumn>
                <h3 className="text-success kit-text-shadow-dark">
                  Booking Confirmed!
                </h3>
                <FlexRow>
                  <h5>{bookings.create.results.bookingConfirmationCode}</h5>
                </FlexRow>

                {/* Close Button */}
                <FlexRow className="w-100">
                  <button
                    className="btn btn-dark btn-lg"
                    onClick={() => setRedirectToHome(true)}
                  >
                    Close
                  </button>
                </FlexRow>
              </FlexColumn>
            )}

            {/* Default */}
            {bookings.create.resultsStatus !== "SUCCESS" && (
              <div className="row">
                {/* FirstName */}
                <div className="col-12 col-sm-6">
                  <label className="form-label">First Name</label>
                  <input
                    className={
                      STYLE_INPUTTEXT +
                      (validFirstName === "TRUE" && STYLE_VALID) +
                      " " +
                      (validFirstName === "FALSE" && STYLE_INVALID)
                    }
                    type="text"
                    value={firstName}
                    onChange={(e) => validateAndSetFirstName(e.target.value)}
                  />
                </div>

                {/* LastName */}
                <div className="col-12 col-sm-6">
                  <label className="form-label">Last Name</label>
                  <input
                    className={
                      STYLE_INPUTTEXT +
                      (validLastName === "TRUE" && STYLE_VALID) +
                      " " +
                      (validLastName === "FALSE" && STYLE_INVALID)
                    }
                    type="text"
                    value={lastName}
                    onChange={(e) => validateAndSetLastName(e.target.value)}
                  />
                </div>

                {/* Email */}
                <div className="col-12 col-sm-6">
                  <label className="form-label">Email</label>
                  <input
                    className={
                      STYLE_INPUTTEXT +
                      (validEmail === "TRUE" && STYLE_VALID) +
                      " " +
                      (validFirstName === "FALSE" && STYLE_INVALID)
                    }
                    type="text"
                    value={email}
                    onChange={(e) => validateAndSetEmail(e.target.value)}
                  />
                </div>

                {/* Phone */}
                <div className="col-12 col-sm-6">
                  <label className="form-label">Phone</label>
                  <input
                    className={
                      STYLE_INPUTTEXT +
                      (validEmail === "TRUE" && STYLE_VALID) +
                      " " +
                      (validFirstName === "FALSE" && STYLE_INVALID)
                    }
                    type="text"
                    value={phone}
                    onChange={(e) => validateAndSetPhone(e.target.value)}
                  />
                </div>

                {/* PassportID */}
                <div className="col-12 col-sm-6">
                  <label className="form-label">Passport ID</label>
                  <input
                    className={
                      STYLE_INPUTTEXT +
                      (validEmail === "TRUE" && STYLE_VALID) +
                      " " +
                      (validFirstName === "FALSE" && STYLE_INVALID)
                    }
                    type="text"
                    value={passportId}
                    onChange={(e) => validateAndSetPassportId(e.target.value)}
                  />
                </div>

                {/* Address */}
                <div className="col-12 col-sm-6">
                  <label className="form-label">Address</label>
                  <input
                    className={
                      STYLE_INPUTTEXT +
                      (validEmail === "TRUE" && STYLE_VALID) +
                      " " +
                      (validFirstName === "FALSE" && STYLE_INVALID)
                    }
                    type="text"
                    value={address}
                    onChange={(e) => validateAndSetAddress(e.target.value)}
                  />
                </div>

                {/* Date Of Birth */}
                <div className="col-12 col-sm-6">
                  <label className="form-label mr-auto">Date Of Birth</label>
                  <input
                    className={"form-control"}
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => validateAndSetDateOfBirth(e.target.value)}
                  />
                </div>

                {/* Sex */}
                <div className="col-12 col-sm-6">
                  <label className="form-label mr-auto">Sex</label>
                  <DropDown
                    align="right"
                    buttonClassName="btn-info"
                    className="w-100"
                    options={["female", "male", "prefer not to answer"]}
                    selection={sex}
                    onSelect={(value) => props.onSex(value)}
                  />
                </div>

                {/* Veteran Status */}
                <FlexRow className="col-12 mt-4" wrap="no-wrap">
                  <FlexRow justify="start" style={{ width: "2rem" }}>
                    <input
                      className="form-check-input ml-1"
                      style={{ height: "1.5rem", width: "1.5rem" }}
                      type="checkbox"
                      checked={isVeteran}
                      onChange={() => props.onIsVeteran(!isVeteran)}
                    />
                  </FlexRow>
                  <span className="ml-1">
                    U.S. Military Active Duty / Veteran.
                  </span>
                </FlexRow>

                {/* Divider */}
                <hr className="w-100 m-3"></hr>

                {/* Confirm Button */}
                <FlexRow className="w-100">
                  <button
                    className="btn btn-success btn-lg text-white kit-border-shadow-thin"
                    onClick={() => handleSubmit()}
                  >
                    Confirm
                  </button>
                </FlexRow>
              </div>
            )}
          </div>
        </div>{" "}
        {/* Card End */}
        {/* Redirects */}
        {redirectToHome && <Redirect to={Constants.pagePaths.home} />}
      </div>
    </div>
  );
};
export default Stage5;
