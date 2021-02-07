// Libraries
import React, { Component } from 'react';

// Components
import PopContext from '../../components/PopContext_v0.0.1';

class NavBar extends Component {
  constructor(props) {
    super(props)
    // @PROP: sizing - Object{}
    // @PROP: onSelectMenu - Function()
    // @PROP: onSelectPage - Function()

    this.state = {
      isActive_notYetImplemented: false,
    };
  }

  render() {
    const { sizing } = this.props;
    const { isActive_notYetImplemented } = this.state;

    const popContent = 
    <button
      className={"btn-custom bg-custom-yellow color-custom-cream m-2 no-user"}
      style={{
        height: sizing.button + "px",
        width: (sizing.button*3) + "px",
      }}
      onClick={() => this.props.onSelectPage("BOOTPAGE")}
    >
      {"View Boot Page"}
    </button>;
    
    return (
      <div>
        {/* NavBar */}
        <div 
          className="gradient-red d-flex flex-row justify-content-start align-items-center" 
          style={{height: "100%", width:"100%"}}>
            
            {/* Icon - Hamburger  */}
            <svg 
              className="ml-2 icon-light svg-color-custom-cream" 
              height={sizing.button} 
              width={sizing.button} 
              viewBox="0 0 16 16"
              onClick={() => this.handlePopContextToggle()}
            >
              <path fillRule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
        </div>

        {/* Pop Context */}
        {isActive_notYetImplemented && 
          <PopContext
            buttonSize={sizing.buttonSmall}
            elementHeight={sizing.screenbarLarge}
            elementWidth={sizing.screenbarLarge * 2}
            elementOffsetX={10}
            elementOffsetY={-sizing.screenbarLarge + 10}
            passedContent={popContent}
            onClose={() => this.handlePopContextToggle()}
          />
        }
      </div>
     );
  }

  handlePopContextToggle = () => {
    const { isActive_notYetImplemented } = this.state;
    this.setState({isActive_notYetImplemented: !isActive_notYetImplemented});
  }
}
export default NavBar;