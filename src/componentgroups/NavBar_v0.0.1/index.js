// Libraries
import React, { Component } from 'react';
import AuthenticationDispatcher from '../../dispatchers/AuthenticationDispatcher';
import RootReducer from '../../reducers/RootReducer';

// Components
import PopContent from '../../components/PopContent_v0.0.1';
import LoginModal from '../LoginModal_v0.0.1';
import LocalPageButtonsPopContent from './LocalPageButtonsPopContent';

class NavBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isActivePopContent: false,
    };
  }

  render() {
    const { isActivePopContent } = this.state;
    
    // Authentication vars
    const { authentication } = RootReducer.getState();
    const isActive_LoginUI = authentication
      ? authentication.isActive_LoginUI
      : false;

    const isUserLoggedIn = authentication
      ? authentication.userId !== "UNKNOWN"
      : false;  
    
    return (
      <div>
        <nav 
          className="navbar navbar-dark bg-primary"
          style={{
            position: "absolute",
            height: "4rem",
            width: "100%",
          }}
        >        
          {/* Icon - List/Hamburger  */}
          <svg 
            className="kit-icon-light kit-svg-cream" 
            height={"100%"} 
            viewBox="0 0 16 16"
            onClick={() => this.handlePopContentToggle()}
          >
            <path fillRule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
          </svg>

          {/* Search */}
          <form className="form-inline ml-auto mr-5">
            <input className="form-control mr-sm-2" type="search" placeholder="search" aria-label="Search"/>
            <button className="btn btn-success" type="submit">search</button>
          </form>

          {/* Icon - User  */}
          <svg 
            className={
              "kit-icon-light mr-3 " + (
              isUserLoggedIn 
              ? "kit-svg-green" 
              : "kit-svg-cream"
            )} 
            height={"90%"}
            viewBox="0 0 16 16"
            onClick={() => AuthenticationDispatcher.onPrompt()}
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg>

          {/* Menu Pop Context */}
          {isActivePopContent && 
            <PopContent
              className="kit-bg-smoke kit-border-shadow rounded"
              style={{
                position: "absolute",
                height: "auto",
                width: "15rem",
                top: "1rem",
                left: "4rem",
                overflow: "hidden"
              }}
              onClose={() => this.handlePopContentToggle()}
            >
              <LocalPageButtonsPopContent/>
            </PopContent>
          }
        </nav>
        
        {/* User Pop Context */}
        {isActive_LoginUI && <LoginModal/>}
      </div>
    );
  }

  handlePopContentToggle = () => {
    const { isActivePopContent } = this.state;
    this.setState({isActivePopContent: !isActivePopContent});
  }
}
export default NavBar;