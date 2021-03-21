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
import PageNotFoundPage from "./pages/PageNotFoundPage";
import PasswordRecoveryPage from "./pages/PasswordRecoveryPage/PasswordRecoveryPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";

// Styles
import "./styles/UtopiaBootstrap.css";
import "./styles/UtopiaKit.css";

const BREAKPOINT_XSMALL = 375;
const BREAKPOINT_SMALL = 576;
const BREAKPOINT_MEDIUM = 768;
const BREAKPOINT_LARGE = 992;
const BREAKPOINT_XLARGE = 1200;
const BREAKPOINT_XXLARGE = 1400;
const RESIZE_MINIMUM_WAIT_TIME = 100;
const PAGE_ADDRESSES_WHITELIST = [
  "/",
  "/createaccount",
  "/debug",
  "/home",
  "/flights",
  "/forgot-password",
  "/password-recovery/**",
  "/profile",
];

class App extends Component {
  constructor(props) {
    super(props);

    // State Management
    Store.initialize(() => this.state, (e) => this.setState(e));
    this.state = {
      ...Store.getCombinedDefaultReducerStates(),
      breakPoint: "xx_small",
      isAppStateMounted: false,
    };

    // Window Resize throttling
    this.handleResize = _.throttle(
      this.handleResize.bind(this),
      RESIZE_MINIMUM_WAIT_TIME
    );
  }

  render() {
    const { authentication } = this.state;
    const ISACTIVE_LOGINUI = authentication.isActive_LoginUI;
    const currentPath = window.location.pathname;

    return (
      <main>
        {/* Pages */}
        <Router>
          <Switch>
            {/* 404 - No Path */}
            {!PAGE_ADDRESSES_WHITELIST.includes(currentPath) && (
              <PageNotFoundPage />
            )}

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
              {authentication.userId
                ? <PasswordRecoveryPage />
                : <LandingPage />
              }
            </Route>

            {/* Profile Page */}
            <Route path="/profile">
              {authentication.userId ? <UserProfilePage /> : <LandingPage />}
            </Route>
          </Switch>

          {/* Login Modal - zIndex 2 */}
          {ISACTIVE_LOGINUI && <LoginModal />}
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

    let newSize = "xx_small";
    if (window.innerWidth > BREAKPOINT_XSMALL) newSize = "x_small";
    if (window.innerWidth >= BREAKPOINT_SMALL) newSize = "small";
    if (window.innerWidth >= BREAKPOINT_MEDIUM) newSize = "medium";
    if (window.innerWidth >= BREAKPOINT_LARGE) newSize = "large";
    if (window.innerWidth >= BREAKPOINT_XLARGE) newSize = "x_large";
    if (window.innerWidth >= BREAKPOINT_XXLARGE) newSize = "xx_large";

    if (breakPoint !== newSize) {
      console.log(newSize);
      this.setState({ breakPoint: newSize });
    }
  };
}
export default App;
