// Libraries
import AirplanesDispatcher from "../dispatchers/AirplanesDispatcher";
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
  AirplanesDispatcher.onCancel();
  const { airplanes } = Store.getState();
  expect(airplanes.create.isActive).toBe(false);
  expect(airplanes.delete.isActive).toBe(false);
  expect(airplanes.edit.isActive).toBe(false);
  expect(airplanes.search.resultsPage).toBe(1);
  expect(airplanes.error).toBe("");
  expect(airplanes.status).toBe("SUCCESS");
});

// onError_expectErrorMessageAndErrorStatus()
test("onError sets error to the error message & status to error", 
() => { 
  const errorMessage = "[ERROR]: 404 - Not Found!";
  AirplanesDispatcher.onError(errorMessage);
  const { airplanes } = Store.getState();
  expect(airplanes.error).toBe(errorMessage);
  expect(airplanes.status).toBe("ERROR");
});

// onSearchResults_WithValidResults_exceptSearchResultsAndNoErrorAndStatusSuccess()
test("onFindAll with valid response sets searchresults to airplanes returned, has no error, and has status SUCCESS", 
() => {
  const sampleResults = {
    "0": {
      "id": 1,
      "typeId": 3
    },
    "1": {
      "id": 2,
      "typeId": 2
    },
    "2": {
      "id": 5,
      "typeId": 1
    }
  };
  jest.mock("../Orchestration", () => ({
    createRequest: (requestType, requestPath, onError, onSuccess) => {
      onSuccess(sampleResults);
    }
  }));
  AirplanesDispatcher.onFindAll();
  setTimeout(() => {
    const { airplanes } = Store.getState();
    expect(airplanes.search.results).toBe(sampleResults);
    expect(airplanes.error).toBe("");
    expect(airplanes.status).toBe("SUCCESS");
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
  AirplanesDispatcher.onFindAll();
  setTimeout(() => {
    const { airplanes } = Store.getState();
    expect(airplanes.error).toBe(errorMessage);
    expect(airplanes.status).toBe("ERROR");
  }, 100);
});

// onPromptCreate_expectCreateViewIsActive()
test("onPromptCreate() sets the create view active, sets the delete and error views as inactive.", 
() => { 
  AirplanesDispatcher.onPromptCreate();
  setTimeout(() => {
    const { airplanes } = Store.getState();
    expect(airplanes.create.isActive).toBe(true);
    expect(airplanes.delete.isActive).toBe(false);
    expect(airplanes.edit.isActive).toBe(false);
  }, 100);
});

// onPromptDelete_expectDeleteViewIsActive()
test("onPromptDelete() sets the delete view active, sets the create and error views as inactive.", 
() => { 
  AirplanesDispatcher.onPromptDelete();
  setTimeout(() => {
    const { airplanes } = Store.getState();
    expect(airplanes.create.isActive).toBe(false);
    expect(airplanes.delete.isActive).toBe(true);
    expect(airplanes.edit.isActive).toBe(false);
  }, 100);
});

// onPromptEdit_expectEditViewIsActive()
test("onPromptEdit() sets the edit view active, sets the create and delete views as inactive.", 
() => { 
  AirplanesDispatcher.onPromptEdit();
  setTimeout(() => {
    const { airplanes } = Store.getState();
    expect(airplanes.create.isActive).toBe(false);
    expect(airplanes.delete.isActive).toBe(false);
    expect(airplanes.edit.isActive).toBe(true);
  }, 100);
});

// onResultsPage_expectCorrectPageValue()
test("onResultsPage(pageValue) sets the search.resultsPage to the passed value.", 
() => { 
  const pageValue = 789;
  AirplanesDispatcher.onResultsPage(pageValue);
  setTimeout(() => {
    const { airplanes } = Store.getState();
    expect(airplanes.search.resultsPage).toBe(pageValue);
  }, 100);
});

// onResultsPerPage_expectCorrectPageValue()
test("onResultsPerPage(perPageValue) sets the search.resultsPerPage to the passed value.", 
() => { 
  const perPageValue = 75;
  AirplanesDispatcher.onResultsPerPage(perPageValue);
  setTimeout(() => {
    const { airplanes } = Store.getState();
    expect(airplanes.search.resultsPerPage).toBe(perPageValue);
  }, 100);
});

// onCreate_withValidAirplane_expectResponseAsSelectedAirplaneAndNoErrorAndStatusSuccess()
test("onCreate(airplane) with valid airplane sets the airplane.selected to the created airplane, has no error, and status to SUCCESS.", 
() => { 
  const sampleAirplane = {
    "id": 1,
    "status": 0,
    "confirmationCode": "1BB2233"
  };
  jest.mock("../Orchestration", () => ({
    createRequestWithBody: (requestType, requestPath, payload, onError, onSuccess) => {
      onSuccess(sampleAirplane);
    }
  }));
  AirplanesDispatcher.onCreate(sampleAirplane);
  setTimeout(() => {
    const { airplanes } = Store.getState();
    expect(airplanes.selected).toEqual(sampleAirplane);
    expect(airplanes.error).toBe("");
    expect(airplanes.status).toBe("SUCCESS");
  }, 100);
});

// onCreate_withInvalidAirplane_expectResponseAsErrorAndStatusError()
test("onCreate(airplane) with invalid airplane sets the airplane.error to an error message and status to ERROR.", 
() => { 
  const errorMessage = "Test Error Message";
  jest.mock("../Orchestration", () => ({
    createRequest: (requestType, requestPath, onError, onSuccess) => {
      onError(errorMessage);
    }
  }));
  AirplanesDispatcher.onCreate({});
  setTimeout(() => {
    const { airplanes } = Store.getState();
    console.log(airplanes.error);
    console.log(airplanes.create.error);
    expect(airplanes.error).toBe(errorMessage);
    expect(airplanes.status).toBe("ERROR");
  }, 100);
});