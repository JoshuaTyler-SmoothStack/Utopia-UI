// Libraries
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

// Components
import BootPage from "./pages/BootPage_v0.0.1";
import LandingPage from "./pages/LandingPage_v0.0.1";
import Login from "./componentgroups/Login_v0.0.1";
import OrchestrationPage from "./pages/OrchestrationPage_v0.0.1";

// Styles
import "./styles/UtopiaBootstrap.css";
import "./styles/UtopiaKit.css";
import RootReducer from "./reducers/RootReducer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    RootReducer.setState = (...state) => this.setState(...state);
    RootReducer.getState = () => this.state;
  }

  render() {
    const { authentication } = this.state;
    const isActive_Login = authentication ? authentication.isActive_LoginUI : false;

    return (
      <main>
        {/* Pages */}
        <Router>
          <Switch>

            {/* Boot Page */}
            <Route exact path="/">
              <BootPage/>
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

        {/* Login */}
        {isActive_Login && <Login/>}
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
