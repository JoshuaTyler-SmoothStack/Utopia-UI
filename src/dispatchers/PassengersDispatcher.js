import BaseDispatcher from "./BaseDispatcher";


class PassengersDispatcher extends BaseDispatcher{}
export default PassengersDispatcher;

// const results = {
//   id: httpResponseBody.id,
//   bookingId: !_.isEqual(currentPassenger.bookingId, httpResponseBody.bookingId)
//     ? "Updated to Booking ID: " + httpResponseBody.bookingId + "." 
//     : "N/A",
//   passportId: !_.isEqual(currentPassenger.passportId, httpResponseBody.passportId)
//     ? "Updated to Passport ID: " + httpResponseBody.passportId + "." 
//     : "N/A",
//   firstName: !_.isEqual(currentPassenger.firstName, httpResponseBody.firstName)
//     ? "Updated to First Name: " + httpResponseBody.firstName + "." 
//     : "N/A",
//   lastName: !_.isEqual(currentPassenger.lastName, httpResponseBody.lastName)
//     ? "Updated to Last Name: " + httpResponseBody.lastName + "." 
//     : "N/A",
//   dateOfBirth: !_.isEqual(currentPassenger.dateOfBirth, httpResponseBody.dateOfBirth)
//     ? "Updated to Date Of Birth: " + httpResponseBody.dateOfBirth + "." 
//     : "N/A",
//   sex: !_.isEqual(currentPassenger.sex, httpResponseBody.sex)
//     ? "Updated to Sex: " + httpResponseBody.sex + "." 
//     : "N/A",
//   address: !_.isEqual(currentPassenger.address, httpResponseBody.address)
//     ? "Updated to Address: " + httpResponseBody.address + "." 
//     : "N/A",
//   isVeteran: !_.isEqual(currentPassenger.isVeteran, httpResponseBody.isVeteran)
//     ? "Updated to U.S. Military Active Duty / Veteran: " + httpResponseBody.isVeteran + "." 
//     : "N/A"
// };

// const resultsStatus = {
//   bookingId: !_.isEqual(currentPassenger.bookingId, httpResponseBody.bookingId)
//     ? "SUCCESS" : "DISABLED",
//   passportId: !_.isEqual(currentPassenger.passportId, httpResponseBody.passportId)
//     ? "SUCCESS" : "DISABLED",
//   firstName: !_.isEqual(currentPassenger.firstName, httpResponseBody.firstName)
//     ? "SUCCESS" : "DISABLED",
//   lastName: !_.isEqual(currentPassenger.lastName, httpResponseBody.lastName)
//     ? "SUCCESS" : "DISABLED",
//   dateOfBirth: !_.isEqual(currentPassenger.dateOfBirth, httpResponseBody.dateOfBirth)
//     ? "SUCCESS" : "DISABLED",
//   sex: !_.isEqual(currentPassenger.sex, httpResponseBody.sex)
//     ? "SUCCESS" : "DISABLED",
//   address: !_.isEqual(currentPassenger.address, httpResponseBody.address)
//     ? "SUCCESS" : "DISABLED",
//   isVeteran: !_.isEqual(currentPassenger.isVeteran, httpResponseBody.isVeteran)
//     ? "SUCCESS" : "DISABLED",
// };
