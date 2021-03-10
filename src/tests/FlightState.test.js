import FlightsDispatcher from "../dispatchers/FlightsDispatcher";
import { render } from '@testing-library/react';
import Store from "../reducers/Store";

// Components
import App from '../App';

beforeEach(() => {
  jest.clearAllMocks();
  render(<App />);
  while (!Store.getState().isAppStateMounted) {/* do nothing */ }
});

// onCancel_expectAllActiveStatesFalseAndselectItemsPage1AndNoErrorAndStatusSuccess()
test("onCancel sets CRUD isActive bools to false, selectItemsPage to 1, error to none, and status to SUCCESS.",
() => {
  FlightsDispatcher.onCancel();
  const { flights } = Store.getState();
  expect(flights.create.isActive).toBe(false);
  expect(flights.delete.isActive).toBe(false);
  expect(flights.edit.isActive).toBe(false);
  expect(flights.search.resultsPage).toBe(1);
  expect(flights.error).toBe("");
  expect(flights.status).toBe("SUCCESS");
});

// onError_expectErrorMessageAndErrorStatus()
test("onError sets error to the error message & status to error", 
() => { 
  const errorMessage = "[ERROR]: 404 - Not Found!";
  FlightsDispatcher.onError(errorMessage);
  const { flights } = Store.getState();
  expect(flights.error).toBe(errorMessage);
  expect(flights.status).toBe("ERROR");
});

test("onRequest with valid response sets searchresults to flights returned, has no error, and has status SUCCESS",
() => {
  const sampleResults = {
    "0": {
      "id": "1",
        "routeId": "4",
        "airplaneId": "2",
        "dateTime": "2021-02-26 21:04:00",
        "seatingId": "6",
        "duration": "59040",
        "status": "ACTIVE"
    },
    "1": {
      "id": "2",
        "routeId": "1",
        "airplaneId": "2",
        "dateTime": "2021-02-25 23:03:00",
        "seatingId": "3",
        "duration": "86520",
        "status": "INACTIVE"
    },
    "2": {
      "id": "3",
        "routeId": "1",
        "airplaneId": "3",
        "dateTime": "2021-02-13 01:00:00",
        "seatingId": "1",
        "duration": "86520",
        "status": "INACTIVE"
    }
  };
  jest.mock("../Orchestration", () => ({
    createRequest: (requestType, requestPath, onError, onSuccess) => {
      onSuccess(sampleResults);
    }
  }));
  FlightsDispatcher
    .onRequest();
  setTimeout(() => {
    const { flights } = Store.getState();
    expect(flights.search.results).toBe(sampleResults);
    expect(flights.error).toBe("");
    expect(flights.status).toBe("SUCCESS");
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
  FlightsDispatcher.onRequest();
  setTimeout(() => {
    const { flights } = Store.getState();
    expect(flights.error).toBe(errorMessage);
    expect(flights.status).toBe("ERROR");
  }, 100);
});

// onPromptCreate_expectCreateViewIsActive()
test("onPromptCreate() sets the create view active, sets the delete and error views as inactive.", 
() => { 
  FlightsDispatcher.onPromptCreate();
  setTimeout(() => {
    const { flights } = Store.getState();
    expect(flights.create.isActive).toBe(true);
    expect(flights.delete.isActive).toBe(false);
    expect(flights.edit.isActive).toBe(false);
  }, 100);
});

// onPromptDelete_expectDeleteViewIsActive()
test("onPromptDelete() sets the delete view active, sets the create and error views as inactive.", 
() => { 
  FlightsDispatcher.onPromptDelete();
  setTimeout(() => {
    const { flights } = Store.getState();
    expect(flights.create.isActive).toBe(false);
    expect(flights.delete.isActive).toBe(true);
    expect(flights.edit.isActive).toBe(false);
  }, 100);
});

// onPromptEdit_expectEditViewIsActive()
test("onPromptEdit() sets the edit view active, sets the create and delete views as inactive.", 
() => { 
  FlightsDispatcher.onPromptEdit();
  setTimeout(() => {
    const { flights } = Store.getState();
    expect(flights.create.isActive).toBe(false);
    expect(flights.delete.isActive).toBe(false);
    expect(flights.edit.isActive).toBe(true);
  }, 100);
});

// onSelectItemsPage_expectCorrectPageValue()
test("onSelectItemsPage(pageValue) sets the search.resultsPage to the passed value.", 
() => { 
  const pageValue = 789;
  FlightsDispatcher.onSelectItemsPage(pageValue);
  setTimeout(() => {
    const { flights } = Store.getState();
    expect(flights.search.resultsPage).toBe(pageValue);
  }, 100);
});

// onSelectItemsPerPage_expectCorrectPageValue()
test("onSelectItemsPerPage(perPageValue) sets the search.resultsPerPage to the passed value.", 
() => { 
  const perPageValue = 75;
  FlightsDispatcher.onSelectItemsPerPage(perPageValue);
  setTimeout(() => {
    const { flights } = Store.getState();
    expect(flights.search.resultsPerPage).toBe(perPageValue);
  }, 100);
});