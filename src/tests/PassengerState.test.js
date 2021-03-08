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



test("onFindAll with valid response sets searchresults to passengers returned, has no error, and has status SUCCESS",
  () => {
    const sampleResults = {
      "0": {
        "id": 1,
        "bookingId": 3,
        "passportId": "1BB2233",
        "firstName": "Tural",
        "lastName": "Hasanli",
      },
      "1": {
        "id": 2,
        "status": 0,
        "confirmationCode": "1BB2234"
      },
      "2": {
        "id": 5,
        "status": 1,
        "confirmationCode": "1BB2237"
      }
    };
    jest.mock("../Orchestration", () => ({
      createRequest: (requestType, requestPath, onError, onSuccess) => {
        onSuccess(sampleResults);
      }
    }));
    PassengerDispatcher
      .onFindAll();
    setTimeout(() => {
      const { passengers } = Store.getState();
      expect(passengers.search.results).toBe(sampleResults);
      expect(passengers.error).toBe("");
      expect(passengers.status).toBe("SUCCESS");
    }, 100);
  });