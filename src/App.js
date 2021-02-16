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
              constants={constants}
              reduce={this.handleStateUpdate}
              state={this.state}
            />
          </Route>
          <Route path="/home">
            <OrchestrationVisual
              constants={constants}
              reduce={this.handleStateUpdate}
              state={this.state}
            />
          </Route>
          <Route path="/orchestration">
            <OrchestrationVisual
              constants={constants}
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
    this.handleSynchronizeReducerStates();
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  handleResize = () => {
    let newSizing = sizes.xx_small;

    // Extra Extra Small
    //================================
    if (window.innerWidth < 375) {
      console.log(sizes.xx_small.breakPoint);
      newSizing = sizes.xx_small;
    }

    // Extra Small
    //================================
    else if (window.innerWidth < 576) {
      console.log(sizes.x_small.breakPoint);
      newSizing = sizes.x_small;
    }

    // Small
    //================================
    else if (window.innerWidth < 768) {
      console.log(sizes.small.breakPoint);
      newSizing = sizes.small;
    }

    // Medium
    //================================
    else {
      //if(window.innerWidth < 992) {
      console.log(sizes.medium.breakPoint);
      newSizing = sizes.medium;
    }

    // Large
    //================================
    // else if(window.innerWidth < 1200) {
    //   console.log(sizes.large.breakPoint);
    //   newSizing = sizes.large;
    // }

    // Extra Large
    //================================
    // else if(window.innerWidth < 1400) {
    //   console.log(sizes.x_large.breakPoint);
    //   newSizing = sizes.x_large;
    // }

    // Extra Extra Large
    //================================
    // else {
    //   console.log(sizes.xx_large.breakPoint);
    //   newSizing = sizes.xx_large;
    // }
    this.setState({
      sizing: { ...newSizing, resizeKey: _.uniqueId("resize-") },
    });
  };

  handleStateUpdate = (action) => {
    switch(action.type.split("_")[0]) {
      
      // Navigation
      case constants.navigation.root:
        this.setState({navigation: navigationReducer(action)});
      break;

      // Orchestration
      case constants.orchestration.root:
        this.setState({orchestration: orchestrationReducer(action)});
      break;

      // Orchestration Dashboard
      case constants.orchestrationDashboard.root:
        this.setState({orchestrationDashboard: orchestrationDashboardReducer(action)});
      break;
    }
  }

  handleSynchronizeReducerStates = () => {
    this.setState({
      navigation: defaultNavigationState,
      orchestration: defaultOrchestrationState,
      orchestrationDashboard: defaultOrchestrationDashboardState
    });
  }
}
export default App;
