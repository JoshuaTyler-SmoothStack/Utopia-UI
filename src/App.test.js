// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';

// Components
import App from './App'

// Tests
import BookingsStateTests from "./tests/BookingsStateTests";
import Store from './reducers/Store';

// State Management Dispatcher & Reducer Tests
const stateManagementTests = () => {  
  // Create App State
  render(<App/>);
  while(!Store.getState().isAppStateMounted){/* do nothing */};
  
  // Begin Testings
  new BookingsStateTests().runAllTests();
};
stateManagementTests();