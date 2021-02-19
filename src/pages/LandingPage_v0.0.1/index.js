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

    return ( 
      <div 
        className={"kit-bg-blue"}
        style={{ 
          position: "absolute", 
          height: "100vh", 
          width: "100vw",
        }}
       >
        {/* Content */}
        <div>content</div>

        {/* Navbar */}
        <NavBar/>
      </div>
    );
  }



}
export default OrchestrationPage;