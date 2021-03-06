// Libraries
import React, { Component } from 'react';
import Store from '../../reducers/Store';

// Components
import LocalPageButtons from './LocalPageButtons';
import LocalUserButtons from './LocalUserButtons';
import FlexRow from '../../components/FlexRow';

class NavBar extends Component {
  constructor(props) {
    super(props)
    // @PROP: hideSearchBar - bool

    this.state = {
      isActive_PagesPopContent: false,
      isActive_UserPopContent: false,
    };
  }

  render() {
    const { hideSearchBar } = this.props;
    const { isActive_PagesPopContent, isActive_UserPopContent } = this.state;

    // Authentication vars
    const { authentication } = Store.getState();
    const isUserLoggedIn = authentication.userId !== "";
    const props = this.props;
    return (
      <nav
        className={"navbar bg-primary p-1 " + props.className || ""}
        style={{ ...props.style, height: "4rem", width: "100%" }}
      >
        {/* Icon - List/Hamburger  */}
        <FlexRow className={"dropdown"} style={{height:"3.5rem", width: "3.5rem"}}>
          <button
            className="btn btn-primary h-100 p-1 kit-icon-light"
            onClick={() => this.setState({isActive_PagesPopContent: !isActive_PagesPopContent})}
            onBlur={() => setTimeout(() => this.setState({isActive_PagesPopContent: false}), 100)}
          >  
            <svg className="kit-svg-cream" height={"100%"} viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
          </button>
          <ul className={"dropdown-menu " + (isActive_PagesPopContent ? "show" : "")}>
            <LocalPageButtons />
          </ul>
        </FlexRow>

        {/* Search */}
        {!hideSearchBar &&
          <form className="form-inline ml-auto mr-5">
            <input className="form-control mr-sm-2" type="search" placeholder="search" aria-label="Search" />
            <button className="btn btn-success" type="submit">search</button>
          </form>}

        {/* Icon - User  */}
        <FlexRow className={"dropdown " + (hideSearchBar && "ml-auto")} style={{height:"3.5rem", width: "3.5rem"}}>
          <button
            className="btn btn-primary h-100 p-1 kit-icon-light"
            onClick={() => this.setState({isActive_UserPopContent: !isActive_UserPopContent})}
            onBlur={() => setTimeout(() => this.setState({isActive_UserPopContent: false}), 100)}
          >  
            <svg
              className={"kit-icon-light " + (isUserLoggedIn ? "kit-svg-green" : "kit-svg-cream")}
              height={"100%"}
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg>
          </button>
          <ul className={"dropdown-menu dropdown-menu-right " + (isActive_UserPopContent ? "show" : "")}>
            <LocalUserButtons/>
          </ul>
        </FlexRow>
      </nav>
    );
  }
}
export default NavBar;