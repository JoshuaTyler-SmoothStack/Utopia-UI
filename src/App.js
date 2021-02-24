// Libraries
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

// Pages
import APIDebugPage from "./pages/APIDebugPage_v0.0.1";
import BootPage from "./pages/BootPage_v0.0.1";
import CreateAccountPage from "./pages/CreateAccountPage_v0.0.1";
import LandingPage from "./pages/LandingPage_v0.0.1";
import ForgotPasswordPage from "./pages/ForgotPasswordPage_v0.0.1";
import OrchestrationPage from "./pages/OrchestrationPage_v0.0.1";

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

            {/* API Debug Page */}
            <Route path="/debug">
              <APIDebugPage/>
            </Route>

            {/* Boot Page */}
            <Route exact path="/">
              <BootPage/>
            </Route>

            {/* Create Account Page */}
            <Route path="/createaccount">
              <CreateAccountPage/>
            </Route>

            {/* Forgot Password Page */}
            <Route path="/forgotpassword">
              <ForgotPasswordPage/>
            </Route>

            {/* Landing Page */}
            <Route path="/home">
              <LandingPage/>
            </Route>

            {/* Orchestration Page */}
            <Route path="/orchestration">
              <OrchestrationPage/>
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