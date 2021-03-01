// Libraries
import BookingsDispatcher from "../dispatchers/BookingsDispatcher";
import { render } from '@testing-library/react';
import Store from "../reducers/Store";

// Components
import App from '../App';

beforeEach(() => {
  jest.clearAllMocks();
  render(<App/>);
  while(!Store.getState().isAppStateMounted)
  {/* do nothing */}
});

// onCancel_expectAllActiveStatesFalseAndSearchResultsPage1AndNoErrorAndStatusSuccess()
test("onCancel sets CRUD isActive bools to false, searchResultsPage to 1, error to none, and status to SUCCESS.",
() => {
  BookingsDispatcher.onCancel();
  const { bookings } = Store.getState();
  expect(bookings.create.isActive).toBe(false);
  expect(bookings.delete.isActive).toBe(false);
  expect(bookings.edit.isActive).toBe(false);
  expect(bookings.search.resultsPage).toBe(1);
  expect(bookings.error).toBe("");
  expect(bookings.status).toBe("SUCCESS");
});

// onError_expectErrorMessageAndErrorStatus()
test("onError sets error to the error message & status to error", 
() => { 
  const errorMessage = "[ERROR]: 404 - Not Found!";
  BookingsDispatcher.onError(errorMessage);
  const { bookings } = Store.getState();
  expect(bookings.error).toBe(errorMessage);
  expect(bookings.status).toBe("ERROR");
});

// onSearchResults_WithValidResults_exceptSearchResultsAndNoErrorAndStatusSuccess()
test("onFindAll with valid response sets searchresults to bookings returned, has no error, and has status SUCCESS", 
() => {
  const sampleResults = {
    "0": {
      "id": 1,
      "status": 3,
      "confirmationCode": "1BB2233"
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
  BookingsDispatcher.onFindAll();
  setTimeout(() => {
    const { bookings } = Store.getState();
    expect(bookings.search.results).toBe(sampleResults);
    expect(bookings.error).toBe("");
    expect(bookings.status).toBe("SUCCESS");
  }, 100);
});

// onSearchResults_WithInvalidResults_expectErrorAndStatusError()
test("onSearchResults with invalid response has error and has status ERROR", 
() => { 
  const errorMessage = "Test Error Message";
  jest.mock("../Orchestration", () => ({
    createRequest: (requestType, requestPath, onError, onSuccess) => {
      onError(errorMessage);
    }
  }));
  BookingsDispatcher.onFindAll();
  setTimeout(() => {
    const { bookings } = Store.getState();
    expect(bookings.error).toBe(errorMessage);
    expect(bookings.status).toBe("ERROR");
  }, 100);
});