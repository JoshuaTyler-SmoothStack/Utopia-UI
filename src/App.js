// Libraries
import _ from "lodash";
import React, { Component } from "react";

// Components
import BootPage from "./pages/BootPage_v0.0.1";
import LandingPage from "./pages/LandingPage_v0.0.1";

// Styles
import sizes from "./styles_v0.0.1/Sizing.json";
import "./styles_v0.0.1/KitStyles.css";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.handleResize = _.throttle(this.handleResize.bind(this), 100);

    this.state = {
      currentPage: "BOOTPAGE",
      previousPage: "LANDINGPAGE",
      isInitialSizeSet: false,
      sizing: {},
    };
  }

  render() {
    const { currentPage, sizing } = this.state;
    return (
      <main className="framedscreen">
        {currentPage === "LANDINGPAGE" && (
          <LandingPage
            sizing={sizing}
            onSelectPage={(e) => this.handleSelectPage(e)}
          />
        )}

        {currentPage === "BOOTPAGE" && (
          <BootPage
            sizing={sizing}
            onSelectPage={(e) => this.handleSelectPage(e)}
          />
        )}
      </main>
    );
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", () => {
      this.handleResize();
    });
  }

  handleSelectPage = (newPage) => {
    const { currentPage, previousPage } = this.state;
    if (newPage === "") {
      newPage = previousPage;
    }

    this.setState({
      currentPage: newPage,
      previousPage: currentPage !== previousPage ? currentPage : previousPage,
    });
  };

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
}
export default App;
