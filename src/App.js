// Libraries
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

// Pages
import BootPage from "./pages/BootPage";
import CreateAccountPage from "./pages/CreateAccountPage/CreateAccountPage";
import LandingPage from "./pages/LandingPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import OrchestrationPage from "./pages/OrchestrationPage";
import PasswordRecoveryPage from './pages/PasswordRecoveryPage/PasswordRecoveryPage'
import UserProfilePage from './pages/UserProfilePage/UserProfilePage'


// Styles
import "./styles/UtopiaBootstrap.css";
import "./styles/UtopiaKit.css";
import Store from "./reducers/Store";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = Store.getCombineDefaultReducerStates();
    Store.setState = (e) => this.setState(e);
    Store.getState = () => this.state;
  }

  render() {
    return (
      <main>
        {/* Pages */}
        <Router>
          <Switch>

            {/* Boot Page */}
            <Route exact path="/">
              <BootPage />
            </Route>

            {/* Landing Page */}
            <Route path="/home">
              <LandingPage />
            </Route>

            {/* Orchestration Page */}
            <Route path="/orchestration">
              <OrchestrationPage />
            </Route>

            {/* Create Account Page */}
            <Route path="/createaccount">
              <CreateAccountPage />
            </Route>

            {/* Forgot Password Page */}
            <Route path="/forgotpassword">
              <ForgotPasswordPage />
            </Route>

            <Route path="/password-recovery/**">
              <PasswordRecoveryPage />
            </Route>

            <Route path="/profile">
              <UserProfilePage />
            </Route>

          </Switch>
        </Router>
      </main>
    );
  }

  componentDidUpdate() {
    console.log(this.state);
  }
}
export default App;