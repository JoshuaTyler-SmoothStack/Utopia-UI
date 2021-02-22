// Libraries
import React, { Component } from 'react';

// Components
import FlexBox from '../../components/FlexBox';
import NavBar from '../../componentgroups/NavBar_v0.0.1';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() { 

    return ( 
      <div>
        <FlexBox
          className={"kit-bg-blue"}
          type={"column"}
          style={{ 
            position: "absolute", 
            height: "100vh", 
            width: "100vw",
          }}
        >
          {/* Content */}
          <div className="text-white">content</div>
        </FlexBox>

        {/* Navbar */}
        <NavBar/>
      </div>
    );
  }
}
export default LandingPage;