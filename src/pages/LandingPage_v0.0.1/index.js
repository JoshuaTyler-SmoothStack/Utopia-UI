// Libraries
import React, { Component } from 'react';

// Components
// import NavBar from '../NavBar_v1.0.0';

// Styles
import "../../styles_v0.0.1/KitStyles.css";

class MapPage extends Component {
  constructor(props) {
    super(props);
    // @PROP: sizing - obj{}
    // @PROP: onPageSelect - f()

    this.state = {
      animationXOffset: 0,
      animationYOffset: 0,
    };
  }

  render() { 
    const { sizing } = this.props;
    const { animationXOffset, animationYOffset } = this.state;

    const pageClasses = "d-flex flex-column justify-content-center align-items-center";
    const pageStyle = {position: "absolute", height: "100vh", width: "100vw", left: animationXOffset + "px", top: animationYOffset + "px"}; 

    return ( 
      <div className={pageClasses} style={pageStyle}>

        {/* Content */}
        <div>
          I am the Landing Page!
        </div>

        {/* Navbar */}
      </div>
    );
  }
}
export default MapPage;