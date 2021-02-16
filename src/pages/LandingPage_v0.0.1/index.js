// Libraries
import React, { Component } from 'react';

// Components
import NavBar from '../../componentgroups/NavBar_v0.0.1';

// Styles
import "../../styles_v0.0.1/KitStyles.css";

class OrchestrationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() { 
    const { constants, state, reduce } = this.props;
    const { sizing } = state;

    return ( 
      <div 
        className={"bg-blue flex-column"}
        style={{ 
          position: "absolute", 
          height: "100vh", 
          width: "100vw",
        }}
       >

        {/* Content */}
        <div 
          className={"bg-red flex-column-around"}
          style={{
            height: (sizing.buttonLarge * 4 + sizing.button * 8) + "px",
            width: (sizing.buttonLarge * 7) + "px",
            maxHeight: "100%",
            maxWidth: "100%",
          }}
        >
          {/* insert page content */}
        </div>

        {/* Navbar */}
        <div 
          style={{
            position: "absolute", 
            height: sizing.screenbar+"px",
            width: "100vw",
            top:"0", 
          }}
        >
          <NavBar
            sizing={sizing}
            onSelectPage={(e) => this.props.onSelectPage(e)}
          />
        </div>
      </div>
    );
  }
}
export default OrchestrationPage;