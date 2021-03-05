import PassengerDispatcher from "../dispatchers/PassengersDispatcher";
import { render } from '@testing-library/react';
import Store from "../reducers/Store";

// Components
import App from '../App';

beforeEach(() => {
  jest.clearAllMocks();
  render(<App />);
  while (!Store.getState().isAppStateMounted) {/* do nothing */ }
});

test("onRequest with valid response sets searchresults to passengers returned, has no error, and has status SUCCESS",
() => {
  const sampleResults = {
    "0": {
      "id": "1",
      "bookingId": "3",
      "passportId": "1BB2233",
      "firstName": "Tural",
      "lastName": "Hasanli",
      "dateOfBirth": "1990-11-23",
      "sex": "male",
      "address": "400 W 50TH Street, NY, NY10019",
      "isVeteran": "false"
    },
    "1": {
      "id": "2",
      "bookingId": "9",
      "passportId": "1HY86879",
      "firstName": "Rob",
      "lastName": "Williams",
      "dateOfBirth": "1980-1-15",
      "sex": "male",
      "address": "6 Old Shore Avenue, NY, NY10019",
      "isVeteran": "true"
    },
    "2": {
      "id": "3",
      "bookingId": "7",
      "passportId": "SIFJKD963498",
      "firstName": "Jessica",
      "lastName": "Michaels",
      "dateOfBirth": "2011-6-18",
      "sex": "female",
      "address": "84558 Novick Center, NY, NY10019",
      "isVeteran": "false"
    }
  };
  jest.mock("../Orchestration", () => ({
    createRequest: (requestType, requestPath, onError, onSuccess) => {
      onSuccess(sampleResults);
    }
  }));
  PassengerDispatcher
    .onRequest();
  setTimeout(() => {
    const { passengers } = Store.getState();
    expect(passengers.search.results).toBe(sampleResults);
    expect(passengers.error).toBe("");
    expect(passengers.status).toBe("SUCCESS");
  }, 100);
});