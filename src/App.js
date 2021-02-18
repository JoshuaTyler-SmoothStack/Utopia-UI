// Libraries
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import constants from "./resources/constants.json"

// Components
import BootPage from "./pages/BootPage_v0.0.1";
import LandingPage from "./pages/LandingPage_v0.0.1";
import Login from "./componentgroups/Login_v0.0.1";
import OrchestrationPage from "./pages/OrchestrationPage_v0.0.1";

// Reducers
import airplanesReducer, { defaultAirplanesState } from "./reducers/AirplanesReducer";
import airportsReducer, { defaultAirportsState } from "./reducers/AirportsReducer";
import authenticationReducer, {defaultAuthenticationState} from "./reducers/AuthenticationReducer";
import bookingsReducer, { defaultBookingsState } from "./reducers/BookingsReducer";
import flightsReducer, { defaultFlightsState } from "./reducers/FlightsReducer";
import orchestrationReducer, {defaultOrchestrationState} from "./reducers/OrchestrationReducer";
import paymentsReducer, { defaultPaymentsState } from "./reducers/PaymentsReducer";
import routesReducer, { defaultRoutesState } from "./reducers/RoutesReducer";
import usersReducer, { defaultUsersState } from "./reducers/UsersReducer";

// Styles
import "./styles/UtopiaBootstrap.css";
import "./styles/UtopiaKit.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { authentication } = this.state;
    const isActive_Login = authentication ? authentication.isActive_LoginUI : false;

    return (
      <main>

        {/* Pages */}
        <Router>
          <Switch>
            <Route exact path="/">
              <BootPage
                reduce={this.handleStateUpdate}
                state={this.state}
              />
            </Route>
            <Route path="/home">
              <LandingPage
                reduce={this.handleStateUpdate}
                state={this.state}
              />
            </Route>
            <Route path="/orchestration">
              <OrchestrationPage
                reduce={this.handleStateUpdate}
                state={this.state}
              />
            </Route>
          </Switch>
        </Router>

        {/* Login */}
        {/* {isActive_Login && 
          <Login 
            reduce={this.handleStateUpdate}
            state={this.state}
          />
        } */}
      </main>
    );
  }

  componentDidMount() {
    this.handleSynchronizeDefaultReducerStates();
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  handleStateUpdate = (action) => {
    switch(action.type.split("_")[0]) {
      
      // airplanes
      case constants.airplanes.root:
        this.setState((state) => ({
          airplanes: {
            ...state.airplanes, 
            ...airplanesReducer(action)
          }
        }));
      break;

      // airports
      case constants.airports.root:
        this.setState((state) => ({
          airports: {
            ...state.airports, 
            ...airportsReducer(action)
          }
        }));
      break;

      // authentication
      case constants.authentication.root:
        this.setState((state) => ({
          authentication: {
            ...state.authentication, 
            ...authenticationReducer(action)
          }
        }));
      break;

      // bookings
      case constants.bookings.root:
        this.setState((state) => ({
          bookings: {
            ...state.bookings, 
            ...bookingsReducer(action)
          }
        }));
      break;

      // flights
      case constants.flights.root:
        this.setState((state) => ({
          flights: {
            ...state.flights, 
            ...flightsReducer(action)
          }
        }));
      break;

      // orchestration
      case constants.orchestration.root:
        this.setState((state) => ({ 
          orchestration: {
            ...state.orchestration,
            ...orchestrationReducer(action)
          }
        }));
      break;

      // payments
      case constants.payments.root:
        this.setState((state) => ({
          payments: {
            ...state.payments, 
            ...paymentsReducer(action)
          }
        }));
      break;

      // routes
      case constants.routes.root:
        this.setState((state) => ({
          routes: {
            ...state.routes, 
            ...routesReducer(action)
          }
        }));
      break;

      // users
      case constants.users.root:
        this.setState((state) => ({
          users: {
            ...state.users, 
            ...usersReducer(action)
          }
        }));
      break;
    }
  }

  handleSynchronizeDefaultReducerStates = () => {
    this.setState({
      airplanes: defaultAirplanesState,
      airports: defaultAirportsState,
      authentication: defaultAuthenticationState,
      bookings: defaultBookingsState,
      flights: defaultFlightsState,
      orchestration: defaultOrchestrationState,
      payments: defaultPaymentsState,
      routes: defaultRoutesState,
      users: defaultUsersState
    });
  }
}
export default App;
