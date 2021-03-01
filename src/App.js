// Libraries
import _ from "lodash";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

// Components
import LoginModal from "./componentgroups/LoginModal";

// Pages
import APIDebugPage from "./pages/APIDebugPage";
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

    this.handleResize = _.throttle(this.handleResize.bind(this), 100);
    this.state = { 
      ...Store.getCombinedDefaultReducerStates(),
      breakPoint: "xx_small",
      isAppStateMounted: false,
    };
    Store.setState = (e) => this.setState(e);
    Store.getState = () => this.state;
  }

  render() {
    const isActive_LoginModal = this.state.authentication.isActive_LoginUI
    
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

          {/* Login Modal - zIndex 2 */}
          {isActive_LoginModal && <LoginModal/>}
        </Router>
      </main>
    );
  }

  componentDidMount() {
    this.setState({isAppStateMounted: true});
    this.handleResize();
    window.addEventListener("resize", () => this.handleResize());
  }

  componentDidUpdate() {
    // console.log(this.state);
  }

  handleResize = () => {
    const { breakPoint } = this.state;

    let newSize = "xx_small";
    if(window.innerWidth > 375) newSize = "x_small";
    if(window.innerWidth >= 576) newSize = "small";
    if(window.innerWidth >= 768) newSize = "medium";
    if(window.innerWidth >= 992) newSize = "large";
    if(window.innerWidth >= 1200) newSize = "x_large";
    if(window.innerWidth >= 1400) newSize = "xx_large";

    if(breakPoint !== newSize) {
      // console.log(newSize);
      this.setState({breakPoint: newSize});
    }
  }
}
export default App;