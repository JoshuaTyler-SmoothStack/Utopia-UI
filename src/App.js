// Libraries
import _ from "lodash";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Store from "./reducers/Store";
import AuthenticationDispatcher from "./dispatchers/AuthenticationDispatcher";

// Components
import LoginModal from "./componentgroups/LoginModal";

// Pages
import APIDebugPage from "./pages/APIDebugPage";
import BootPage from "./pages/BootPage";
import CreateAccountPage from "./pages/CreateAccountPage/CreateAccountPage";
import LandingPage from "./pages/LandingPage";
import FlightSearchPage from "./pages/FlightSearchPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import PasswordRecoveryPage from "./pages/PasswordRecoveryPage/PasswordRecoveryPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";

// Styles
import "./styles/UtopiaBootstrap.css";
import "./styles/UtopiaKit.css";

class App extends Component {
  constructor(props) {
    super(props);

    // State Management
    Store.initialize(
      () => this.state,
      (e) => this.setState(e)
    );
    this.state = {
      ...Store.getCombinedDefaultReducerStates(),
      breakPoint: "xx_small",
      isAppStateMounted: false,
    };

    // Window Resize throttling
    const minimumResizeMilliseconds = 100;
    this.handleResize = _.throttle(this.handleResize.bind(this), minimumResizeMilliseconds);
  }

  render() {
    const { authentication } = this.state;
    const isActive_LoginModal = authentication.isActive_LoginUI;

    return (
      <main>
        {/* Pages */}
        <Router>
          <Switch>
            {/* API Debug Page */}
            <Route path="/debug">
              <APIDebugPage />
            </Route>

            {/* Boot Page */}
            <Route exact path="/">
              <BootPage />
            </Route>

            {/* Landing Page */}
            <Route path="/home">
              <LandingPage />
            </Route>

            {/* Create Account Page */}
            <Route path="/createaccount">
              <CreateAccountPage />
            </Route>

            {/* Flight Search Page */}
            <Route path="/flights">
              <FlightSearchPage />
            </Route>

            {/* Forgot Password Page */}
            <Route path="/forgotpassword">
              {authentication.userId ? <ForgotPasswordPage /> : <LandingPage />}
            </Route>

            {/* Password Recovery Page */}
            <Route path="/password-recovery/**">
              {authentication.userId ? (
                <PasswordRecoveryPage />
              ) : (
                <LandingPage />
              )}
            </Route>

            {/* Profile Page */}
            <Route path="/profile">
              {authentication.userId ? <UserProfilePage /> : <LandingPage />}
            </Route>
          </Switch>

          {/* Login Modal - zIndex 2 */}
          {isActive_LoginModal && <LoginModal />}
        </Router>
      </main>
    );
  }

  componentDidMount() {
    AuthenticationDispatcher.onLoginWithToken();
    this.setState({ isAppStateMounted: true });
    this.handleResize();
    window.addEventListener("resize", () => this.handleResize());
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  handleResize = () => {
    const { breakPoint } = this.state;

    const x_small = 375;
    const small = 576;
    const medium = 768;
    const large = 992;
    const x_large = 1200;
    const xx_large = 1400;

    let newSize = "xx_small";
    if (window.innerWidth > x_small) newSize = "x_small";
    if (window.innerWidth >= small) newSize = "small";
    if (window.innerWidth >= medium) newSize = "medium";
    if (window.innerWidth >= large) newSize = "large";
    if (window.innerWidth >= x_large) newSize = "x_large";
    if (window.innerWidth >= xx_large) newSize = "xx_large";

    if (breakPoint !== newSize) {
      console.log(newSize);
      this.setState({ breakPoint: newSize });
    }
  };
}
export default App;
