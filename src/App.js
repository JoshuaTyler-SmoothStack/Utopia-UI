// Libraries
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

// Pages
import BootPage from "./pages/BootPage_v0.0.1";
import CreateAccountPage from "./pages/CreateAccountPage_v0.0.1";
import LandingPage from "./pages/LandingPage_v0.0.1";
import ForgotPasswordPage from "./pages/ForgotPasswordPage_v0.0.1";
import OrchestrationPage from "./pages/OrchestrationPage_v0.0.1";


// Styles
import "./styles/UtopiaBootstrap.css";
import "./styles/UtopiaKit.css";
import RootReducer from "./reducers/RootReducer";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    RootReducer.setState = (e) => this.setState(e);
    RootReducer.getState = () => this.state;
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

          </Switch>
        </Router>
      </main>
    );
  }

  componentDidMount() {
    RootReducer.synchronizeReducers();
  }

  componentDidUpdate() {
    console.log(this.state);
  }
}
export default App;