// Libraries
import Orchestration from '../../Orchestration';
import React, { Component } from 'react';

// Components
import NavBar from '../../componentgroups/NavBar_v0.0.1';
import PopContext from '../../components/PopContext_v0.0.1';

// Styles
import "../../styles_v0.0.1/KitStyles.css";
import KitUtils from '../../kitutils/KitUtils_v1.0.0';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    // @PROP: sizing - obj{}
    // @PROP: onSelectPage - f()

    this.state = {
      animationXOffset: 0,
      animationYOffset: 0,
      contentNegotiation: "JSON",
      onCancel: null,
      onConfirm: null,

      // InputText
      isActive_InputText: false,
      inputTextLabel: "",

      // PopContext
      isActive_PopContext: false,
      popContext: ""
    };
  }

  render() { 
    const { sizing } = this.props;
    const { animationXOffset, animationYOffset,
      isActive_PopContext, popContext,
    } = this.state;

    const column = "d-flex flex-column justify-content-center align-items-center";
    const columnAround = "d-flex flex-column justify-content-around align-items-center";
    // const columnStart = "d-flex flex-column justify-content-start align-items-center"
    // const row = "d-flex flex-row justify-content-center align-items-center";
    // const rowStart = "d-flex flex-row justify-content-start align-items-center";

    const pageClasses = column + " bg-custom-blue";
    const pageStyle = { 
      position: "absolute", 
      height: "100vh", 
      width: "100vw", 
      left: animationXOffset + "px", 
      top: animationYOffset + "px"
    }; 

    const popContent = 
    <div 
      className={"bg-custom-lightgrey border-radius-xsm border-shadow"}
      style={{
        fontSize: sizing.h1 + "px",
        height: "95%",
        width: "95%",
        padding: sizing.button + "px",
        overflow: "auto"
      }}
    >
      {popContext}
    </div>;

    return ( 
      <div className={pageClasses} style={pageStyle}>

        {/* Content */}

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

        {/* PopContext */}
        {isActive_PopContext &&
        <PopContext
          buttonSize={sizing.button}
          elementHeight={window.innerHeight*0.85}
          elementWidth={window.innerWidth*0.85}
          elementOffsetX={(window.innerWidth - (window.innerWidth*0.85)) * 0.5}
          elementOffsetY={(window.innerHeight - (window.innerHeight*0.85)) * 0.5}
          passedContent={popContent}
          onClose={() => this.setState({isActive_PopContext: false})}
        />}

      </div>
    );
  }

  handleSetPopContext = (context) => {
    this.setState({isActive_PopContext: true, popContext: JSON.stringify(context)});
  }
}
export default LandingPage;