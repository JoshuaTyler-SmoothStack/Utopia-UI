// Libraries
import _ from 'lodash';
import React from 'react';
import { render } from '@testing-library/react';

// Components
import App from './App'

// Tests
import Store from './reducers/Store';


test("App State successfully mounts", () => {
  // Create App State
  render(<App/>);
  while(!Store.getState().isAppStateMounted){/* do nothing */};
  const _stateWithoutBreakpoint = _.omit(Store.getState(), "breakPoint");
  expect(_stateWithoutBreakpoint).toEqual({
    ...Store.getCombinedDefaultReducerStates(),
    isAppStateMounted: true,
  });
});