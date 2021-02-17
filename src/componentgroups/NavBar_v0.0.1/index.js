// Libraries
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthenticationDispatcher from '../../dispatchers/AuthenticationDispatcher';

// Components
import PopContent from '../../components/PopContent_v0.0.1';

class NavBar extends Component {
  constructor(props) {
    super(props)
    // @PROP: reduce - f()
    // @PROP: sizing - Object{}

    this.state = {
      isActivePopContent: false,
    };
  }

  render() {
    const { reduce, sizing } = this.props;
    const { isActivePopContent } = this.state;

    const popContent =
    <div 
      className="flex-column-around"
      style={{height: "100%"}}
    >
      <Link to={"/"}>
        <button
          className={"btn bg-yellow color-cream no-user"}
          style={{
            height: sizing.button + "px",
            width: (sizing.button*3) + "px",
          }}
        >
          {"Boot Page"}
        </button>
      </Link>
      
      <Link to={"/home"}>
        <button
          className={"btn bg-yellow color-cream no-user"}
          style={{
            height: sizing.button + "px",
            width: (sizing.button*3) + "px",
          }}
        >
          {"Landing Page"}
        </button>
      </Link>  

      <Link to={"/orchestration"}>
        <button
          className={"btn bg-yellow color-cream no-user"}
          style={{
            height: sizing.button + "px",
            width: (sizing.button*3) + "px",
          }}
        >
          {"Orchestration Page"}
        </button>
      </Link>      
    </div>;
    
    return (
      <div>
        {/* NavBar */}
        <div 
          className="gradient-red flex-row-start" 
          style={{
            height: "100%", 
            width:"100%",
          }}>
            
            {/* Icon - List/Hamburger  */}
            <svg 
              className="icon-light svg-color-cream ml-2" 
              height={sizing.button} 
              width={sizing.button} 
              viewBox="0 0 16 16"
              onClick={() => this.handlePopContentToggle()}
            >
              <path fillRule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>

            {/* Icon - User  */}
            <svg 
              className="icon-light svg-color-cream ml-auto mr-3" 
              height={sizing.button*0.8} 
              width={sizing.button*0.8} 
              viewBox="0 0 16 16"
              onClick={() => AuthenticationDispatcher.onPrompt(reduce)}
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
        </div>

        {/* Pop Context */}
        {isActivePopContent && 
          <PopContent
            buttonSize={sizing.buttonSmall}
            elementHeight={sizing.button * 3.5}
            elementWidth={sizing.screenbarLarge * 2}
            elementOffsetX={10}
            elementOffsetY={-sizing.button * 3}
            content={popContent}
            onClose={() => this.handlePopContentToggle()}
          />
        }
      </div>
     );
  }

  handlePopContentToggle = () => {
    const { isActivePopContent } = this.state;
    this.setState({isActivePopContent: !isActivePopContent});
  }
}
export default NavBar;