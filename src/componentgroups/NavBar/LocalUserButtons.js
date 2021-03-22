// Libraries
import React from "react";
import Constants from "../../resources/constants.json";
import { Link } from 'react-router-dom';

// Components
import FlexColumn from "../../components/FlexColumn";
import AuthenticationDispatcher from "../../dispatchers/AuthenticationDispatcher";
import Store from '../../reducers/Store';

const LocalUserButtons = (props) => {
  const buttonClassName = "btn btn-secondary m-1";
  const buttonStyle = { width: "10rem" };

  const { authentication } = Store.getState();

  return (
    <FlexColumn
      align={"start"}
      className={"h-100 pl-1 pr-1 " + (props.className || "")}
      justify={"around"}
      style={props.style}>

      {authentication.userToken &&
        <div>
          <Link to={Constants.pagePaths.profile}>
            <button className={buttonClassName} style={buttonStyle}>
              {"Profile"}
            </button>
          </Link>
          {/* Logout */}
          <button className={buttonClassName} style={buttonStyle}
            onClick={() => AuthenticationDispatcher.onLogout()}
          >
            {"Logout"}
          </button>
        </div>
      }

      {!authentication.userToken &&
        <div>
          {/* Login */}
          <button className={buttonClassName} style={buttonStyle}
            onClick={() => AuthenticationDispatcher.onPromptLogin()}
          >
            {"Login"}
          </button>

          {/* Create Account Page */}
          <Link to={Constants.pagePaths.createAccount}>
            <button className={buttonClassName} style={buttonStyle}>
              {"Create Account"}
            </button>
          </Link>
        </div>
      }
    </FlexColumn>
  );
};
export default LocalUserButtons;
