// Libraries
import _ from "lodash";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import constants from "./constants.json"
import navigationReducer, {defaultNavigationState} from "./reducers/NavigationReducer";
import orchestrationReducer, {defaultOrchestrationState} from "./reducers/OrchestrationReducer";
import orchestrationDashboardReducer, {defaultOrchestrationDashboardState} from "./reducers/OrchestrationDashboardReducer";

// Components
import BootPage from "./pages/BootPage_v0.0.1";
import LandingPage from "./pages/LandingPage_v0.0.1";
import OrchestrationVisual from "./pages/OrchestrationPage_v0.0.1";

// Styles
import sizes from "./styles_v0.0.1/Sizing.json";
import "./styles_v0.0.1/KitStyles.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.handleResize = _.throttle(this.handleResize.bind(this), 100);
    this.state = {
      sizing: sizes.xx_small,
    };
  }

  render() {
    return (
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
            <OrchestrationVisual
              reduce={this.handleStateUpdate}
              state={this.state}
            />
          </Route>
        </Switch>
      </Router>
    );
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", () => {
      this.handleResize();
    });
    this.handleSynchronizeDefaultReducerStates();
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  handleResize = () => {
    let newSizing = sizes.xx_small;

    // Extra Extra Small
    if (window.innerWidth < 375) {
      newSizing = sizes.xx_small;
    }

    // Extra Small
    else if (window.innerWidth < 576) {
      newSizing = sizes.x_small;
    }

    // Small
    else if (window.innerWidth < 768) {
      console.log(sizes.small.breakPoint);
      newSizing = sizes.small;
    }

    // Medium
    else {
      //if(window.innerWidth < 992) {
      newSizing = sizes.medium;
    }

    // Large
    // else if(window.innerWidth < 1200) {
    //   newSizing = sizes.large;
    // }

    // Extra Large
    // else if(window.innerWidth < 1400) {
    //   newSizing = sizes.x_large;
    // }

    // Extra Extra Large
    // else {
    //   newSizing = sizes.xx_large;
    // }

    console.log(newSizing.breakPoint);
    this.setState({
      sizing: { ...newSizing, resizeKey: _.uniqueId("resize-") },
    });
  };

  handleStateUpdate = (action) => {
    switch(action.type.split("_")[0]) {
      
      // Navigation
      case constants.navigation.root:
        this.setState((state) => ({
          navigation: {
            ...state.navigation, 
            ...navigationReducer(action)
          }
        }));
      break;

      // Orchestration
      case constants.orchestration.root:
        this.setState((state) => ({ 
          orchestration: {
            ...state.orchestration,
            ...orchestrationReducer(action)
          }
        }));
      break;

      // Orchestration Dashboard
      case constants.orchestrationDashboard.root:
        this.setState((state) => ({
          orchestrationDashboard: {
            ...state.orchestrationDashboard, 
            ...orchestrationDashboardReducer(action)
          }
        }));
      break;
    }
  }

  handleSynchronizeDefaultReducerStates = () => {
    this.setState({
      navigation: defaultNavigationState,
      orchestration: defaultOrchestrationState,
      orchestrationDashboard: defaultOrchestrationDashboardState
    });
  }
}
export default App;
