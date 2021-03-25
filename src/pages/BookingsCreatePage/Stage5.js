import React, { useEffect } from 'react';
import Store from '../../reducers/Store';

// Components
import FlexColumn from "../../components/FlexColumn";
import BookingsDispatcher from '../../dispatchers/BookingsDispatcher';

const Stage5 = (props) => {

  const { bookings, passengers } = Store.getState();
  const isBookingCreated = props.isBookingCreated || false;
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
  const userId = props.isVeteran || 0;

  // handleSubmitBooking = () => {
  //   if(userId || (email && phone)) {

  //   } else {
      
  //   }
  // };

  // useEffect(() => {
  //   if(!isBookingCreated) {
  //     const newBooking = {};
  //     if(userId) {
  //       newBooking.bookingUserId = userId;
  //     } 
  //     BookingsDispatcher.onCreate();
  //   }
    
  // }, [bookings, passengers]);

  return (
    <FlexColumn className={props.className || ""} justify="around" style={props.style}>
      <h3 className="w-100 m-5">Booking Confirmation + Email Confirmation</h3>
      <a href="https://smoothstack-utopia-airlines.atlassian.net/jira/software/projects/UA/boards/1/backlog?selectedIssue=UA-49"
        className="kit-link"
      >
        https://smoothstack-utopia-airlines.atlassian.net/jira/software/projects/UA/boards/1/backlog?selectedIssue=UA-49
      </a>
    </FlexColumn>
  );
};
export default Stage5;
