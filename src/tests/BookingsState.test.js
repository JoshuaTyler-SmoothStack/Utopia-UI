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

// onPromptCreate_expectCreateViewIsActive()
test("onPromptCreate() sets the create view active, sets the delete and error views as inactive.", 
() => { 
  BookingsDispatcher.onPromptCreate();
  setTimeout(() => {
    const { bookings } = Store.getState();
    expect(bookings.create.isActive).toBe(true);
    expect(bookings.delete.isActive).toBe(false);
    expect(bookings.edit.isActive).toBe(false);
  }, 100);
});

// onPromptDelete_expectDeleteViewIsActive()
test("onPromptDelete() sets the delete view active, sets the create and error views as inactive.", 
() => { 
  BookingsDispatcher.onPromptDelete();
  setTimeout(() => {
    const { bookings } = Store.getState();
    expect(bookings.create.isActive).toBe(false);
    expect(bookings.delete.isActive).toBe(true);
    expect(bookings.edit.isActive).toBe(false);
  }, 100);
});

// onPromptEdit_expectEditViewIsActive()
test("onPromptEdit() sets the edit view active, sets the create and delete views as inactive.", 
() => { 
  BookingsDispatcher.onPromptEdit();
  setTimeout(() => {
    const { bookings } = Store.getState();
    expect(bookings.create.isActive).toBe(false);
    expect(bookings.delete.isActive).toBe(false);
    expect(bookings.edit.isActive).toBe(true);
  }, 100);
});

// onResultsPage_expectCorrectPageValue()
test("onResultsPage(pageValue) sets the search.resultsPage to the passed value.", 
() => { 
  const pageValue = 789;
  BookingsDispatcher.onResultsPage(pageValue);
  setTimeout(() => {
    const { bookings } = Store.getState();
    expect(bookings.search.resultsPage).toBe(pageValue);
  }, 100);
});

// onResultsPerPage_expectCorrectPageValue()
test("onResultsPerPage(perPageValue) sets the search.resultsPerPage to the passed value.", 
() => { 
  const perPageValue = 75;
  BookingsDispatcher.onResultsPerPage(perPageValue);
  setTimeout(() => {
    const { bookings } = Store.getState();
    expect(bookings.search.resultsPerPage).toBe(perPageValue);
  }, 100);
});

// onCreate_withValidBooking_expectResponseAsSelectedBookingAndNoErrorAndStatusSuccess()
test("onCreate(booking) with valid booking sets the booking.selected to the created booking, has no error, and status to SUCCESS.", 
() => { 
  const sampleBooking = {
    "id": 1,
    "status": 0,
    "confirmationCode": "1BB2233"
  };
  jest.mock("../Orchestration", () => ({
    createRequestWithBody: (requestType, requestPath, payload, onError, onSuccess) => {
      onSuccess(sampleBooking);
    }
  }));
  BookingsDispatcher.onCreate(sampleBooking);
  setTimeout(() => {
    const { bookings } = Store.getState();
    expect(bookings.selected).toEqual(sampleBooking);
    expect(bookings.error).toBe("");
    expect(bookings.status).toBe("SUCCESS");
  }, 100);
});

// onCreate_withInvalidBooking_expectResponseAsErrorAndStatusError()
test("onCreate(booking) with invalid booking sets the booking.error to an error message and status to ERROR.", 
() => { 
  const errorMessage = "Test Error Message";
  jest.mock("../Orchestration", () => ({
    createRequest: (requestType, requestPath, onError, onSuccess) => {
      onError(errorMessage);
    }
  }));
  BookingsDispatcher.onCreate({});
  setTimeout(() => {
    const { bookings } = Store.getState();
    console.log(bookings.error);
    console.log(bookings.create.error);
    expect(bookings.error).toBe(errorMessage);
    expect(bookings.status).toBe("ERROR");
  }, 100);
});