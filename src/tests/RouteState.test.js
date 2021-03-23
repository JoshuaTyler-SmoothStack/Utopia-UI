import RoutesDispatcher from "../dispatchers/RoutesDispatcher";
import { render } from '@testing-library/react';
import Store from "../reducers/Store";

// Components
import App from '../App';

beforeEach(() => {
  jest.clearAllMocks();
  render(<App />);
  while (!Store.getState().isAppStateMounted) {/* do nothing */ }
});

// onCancel_expectAllActiveStatesFalseAndSearchResultsPage1AndNoErrorAndStatusSuccess()
test("onCancel sets CRUD isActive bools to false, searchResultsPage to 1, error to none, and status to SUCCESS.",
() => {
  RoutesDispatcher.onCancel();
  const { routes } = Store.getState();
  expect(routes.create.isActive).toBe(false);
  expect(routes.delete.isActive).toBe(false);
  expect(routes.edit.isActive).toBe(false);
  expect(routes.search.resultsPage).toBe(1);
  expect(routes.error).toBe("");
  expect(routes.status).toBe("SUCCESS");
});

// onError_expectErrorMessageAndErrorStatus()
test("onError sets error to the error message & status to error", 
() => { 
  const errorMessage = "[ERROR]: 404 - Not Found!";
  RoutesDispatcher.onError(errorMessage);
  const { routes } = Store.getState();
  expect(routes.error).toBe(errorMessage);
  expect(routes.status).toBe("ERROR");
});

test("onRequest with valid response sets searchresults to routes returned, has no error, and has status SUCCESS",
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
  RoutesDispatcher
    .onRequest();
  setTimeout(() => {
    const { routes } = Store.getState();
    expect(routes.search.results).toBe(sampleResults);
    expect(routes.error).toBe("");
    expect(routes.status).toBe("SUCCESS");
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
  RoutesDispatcher.onRequest();
  setTimeout(() => {
    const { routes } = Store.getState();
    expect(routes.error).toBe(errorMessage);
    expect(routes.status).toBe("ERROR");
  }, 100);
});

// onPromptCreate_expectCreateViewIsActive()
test("onPromptCreate() sets the create view active, sets the delete and error views as inactive.", 
() => { 
  RoutesDispatcher.onPromptCreate();
  setTimeout(() => {
    const { routes } = Store.getState();
    expect(routes.create.isActive).toBe(true);
    expect(routes.delete.isActive).toBe(false);
    expect(routes.edit.isActive).toBe(false);
  }, 100);
});

// onPromptDelete_expectDeleteViewIsActive()
test("onPromptDelete() sets the delete view active, sets the create and error views as inactive.", 
() => { 
  RoutesDispatcher.onPromptDelete();
  setTimeout(() => {
    const { routes } = Store.getState();
    expect(routes.create.isActive).toBe(false);
    expect(routes.delete.isActive).toBe(true);
    expect(routes.edit.isActive).toBe(false);
  }, 100);
});

// onPromptEdit_expectEditViewIsActive()
test("onPromptEdit() sets the edit view active, sets the create and delete views as inactive.", 
() => { 
  RoutesDispatcher.onPromptEdit();
  setTimeout(() => {
    const { routes } = Store.getState();
    expect(routes.create.isActive).toBe(false);
    expect(routes.delete.isActive).toBe(false);
    expect(routes.edit.isActive).toBe(true);
  }, 100);
});

// onSelectItemsPage_expectCorrectPageValue()
test("onSelectItemsPage(pageValue) sets the search.resultsPage to the passed value.", 
() => { 
  const pageValue = 789;
  RoutesDispatcher.onSelectItemsPage(pageValue);
  setTimeout(() => {
    const { routes } = Store.getState();
    expect(routes.search.resultsPage).toBe(pageValue);
  }, 100);
});

// onSelectItemsPerPage_expectCorrectPageValue()
test("onSelectItemsPerPage(perPageValue) sets the search.resultsPerPage to the passed value.", 
() => { 
  const perPageValue = 75;
  RoutesDispatcher.onSelectItemsPerPage(perPageValue);
  setTimeout(() => {
    const { routes } = Store.getState();
    expect(routes.search.resultsPerPage).toBe(perPageValue);
  }, 100);
});