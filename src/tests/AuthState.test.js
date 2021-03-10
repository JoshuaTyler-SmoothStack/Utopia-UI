import AuthenticationDispatcher from "../dispatchers/AuthenticationDispatcher"
import { render } from '@testing-library/react';
import Store from "../reducers/Store";

import App from '../App';

beforeEach(() => {
  jest.clearAllMocks();
  render(<App />);
  while (!Store.getState().isAppStateMounted) {/* do nothing */ }
});

test("onLogin validates email/password to authenticate a user",
  () => {
    const user = {
      id: "1",
      firstName: "Test",
      lastName: "React",
      email: "testReact@gmail.com",
      password: "testPWD001",
      token: "null"
    }
    const userData = {
      email: "testReact@gmail.com",
      password: "testPWD001"
    };
    AuthenticationDispatcher.onLogin(userData);
    setTimeout(() => {
      const { authentication } = Store.getState();
      expect(authentication.userToken).toBe(user.token);
    }, 100);
  });

test("onLogin ERROR invalid email/password to authenticate a user",
  () => {
    const userData = {
      email: "testReact@gmail.com",
      password: "testPWD001"
    };
    AuthenticationDispatcher.onLogin(userData);
    setTimeout(() => {
      const { authentication } = Store.getState();
      expect(authentication.error).toBe("Invalid username or password");
    }, 100);
  });

test("onLoginWithToken validates if JWT stored in localStorage",
  () => {
    AuthenticationDispatcher.onLoginWithToken();
    setTimeout(() => {
      const { authentication } = Store.getState();
      expect(authentication.userToken).toBe("fahkfjdhakj/fajfdahkjf38ionkl");
    }, 100);
  });

test("onLoginWithToken ERROR while validating JWT stored in localStorage",
  () => {
    AuthenticationDispatcher.onLoginWithToken();
    setTimeout(() => {
      const { authentication } = Store.getState();
      expect(authentication.userToken).not.toBe("fahkfjdhakj/fajfdahkjf38ionkl");
    }, 100);
  });

test("onLogout, successfully log out user and remove JWT from localStorage",
  () => {
    AuthenticationDispatcher.onLogout();
    setTimeout(() => {
      const { authentication } = Store.getState();
      expect(authentication.status).toBe("INACTIVE");
    }, 100);
  });


test("onDeleteAccount, successfully deletes user account",
  () => {
    const userId = 1;
    AuthenticationDispatcher.onDeleteAccount(userId);
    setTimeout(() => {
      const { authentication } = Store.getState();
      expect(authentication.status).toBe("INACTIVE");
    }, 100);
  });

