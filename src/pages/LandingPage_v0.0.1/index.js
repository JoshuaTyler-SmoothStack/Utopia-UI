// Libraries
import React, { Component } from 'react';

// Components
import NavBar from '../../componentgroups/NavBar_v0.0.1';

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
        className={"kit-bg-blue flex-column"}
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
            height: "20rem",
            width: "40rem",
            maxHeight: "100%",
            maxWidth: "100%",
          }}
        >
          {/* insert page content */}
        </div>

        {/* Navbar */}
        <div
          className="nav"
          style={{
            position: "absolute", 
            width: "100vw",
            top:"0", 
          }}
        >
          <NavBar
            reduce={reduce}
            state={state}
          />
        </div>
      </div>
    );
  }



}
export default OrchestrationPage;