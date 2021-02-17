// Libraries
import React, { Component } from 'react';

// Components
import MSTitle from './MSTitle';
import PathIndicator from './PathIndicator';
import StatusIndicator from './StatusIndicator';

// Styles
import "../../../styles/KitStyles.css";
import UsersDispatcher from '../../../dispatchers/UsersDispatcher';
import PopContent from '../../../components/PopContent_v0.0.1';

class UsersDashboard extends Component {
  constructor(props) {
    super(props)
    // @PROP: isActive - bool
    // @PROP: reduce - f()
    // @PROP: state - obj{}

    this.state = {
      onCancel: null,
      onConfirm: null,
      isActive_PopContent: false,
    };
  }

  render() {
    const { isActive, state } = this.props;
    const { sizing } = state;

    const buttonSize = sizing.button || 30;

    const searchResults = state.users
    ? state.users.searchResults
    : [];

    const status = state.users
    ? state.users.status
    : "UNKNOWN";

    return ( 
      <div
        className={"gradient-lightgrey90 border-radius-sm border-shadow flex-column"}
        style={{
          height: isActive ? "150px" : "75px", 
          width:"100%", 
          overflow:"hidden",
          marginBottom: buttonSize * 0.75 + "px"
        }}
      >
        {/* Header */}
        <div
          className={"flex-row-start"}
          style={{height: "40%", width:"100%"}}
        >
          {/* Title */}
          <div style={{marginLeft: buttonSize * 0.5 + "px"}}>
            <MSTitle
              buttonSize={buttonSize}
              isActive={isActive}
              text={"User MS"}
            />
          </div>

          {/* Status Indicator */}
          <div style={{marginLeft:"auto", marginRight: buttonSize * 0.25 +"px"}}>
            <StatusIndicator 
              status={isActive ? "ACTIVE" : "INACTIVE"}
              size={buttonSize * 0.75}
            />
          </div>

          {/* URI Path Text */}
          <div style={{marginRight: buttonSize * 0.5 +"px"}}>
            <PathIndicator 
              location={"http://user-service"}
              size={buttonSize * 0.8}
            />
          </div>
        </div>

        {/* Divider */}
        {isActive &&
          <div 
            className={"gradient-smoke border-shadow flex-row-start"}
            style={{
              height:"5%",
              width:"100%"
            }}
          />
        }

        {/* Function Buttons */}
        {isActive &&
          <div
            className={"flex-row-start"}
            style={{
              height: "55%", 
              width:"95%",
              flexWrap: "wrap"
            }}
          >
            <button
              className={"btn bg-cream bg-yellow-hover border-radius-sm border-shadow border-shadow-hover flex-column"}
              style={{
                height: buttonSize + "px", 
                width: (buttonSize * 3.5) + "px",
              }}
              onClick={() => this.findAllUsers()}
            >
              {status === "PENDING" 
                ? <div
                    className="spinner-border color-cream"
                    style={{
                      height: buttonSize * 0.5 + "px",
                      width: buttonSize * 0.5 + "px",
                    }}
                  />
                : "findAllUsers()"
              }
            </button>
          </div>
        }

      {/* Pop Content */}
      {this.state.isActive_PopContent &&
        <PopContent 
          buttonSize={buttonSize}
          elementHeight={window.innerHeight * 0.75}
          elementWidth={window.innerWidth * 0.9}
          elementOffsetX={(window.innerWidth - (window.innerWidth * 0.9)) * 0.5}
          elementOffsetY={(window.innerHeight - (window.innerHeight * 0.75)) * 0.5}
          onClose={() => this.setState({isActive_PopContent: false})}
          content={this.handleRenderUserList(searchResults)}
        />
      }
      </div>
    );
  }

  findAllUsers = () => {
    const { reduce } = this.props;
    UsersDispatcher.onFindAll(reduce);
    this.setState({isActive_PopContent: true});
  }

  handleRenderUserList = (usersList) => {
    let usersTable = [];
    for(var i in usersList) {
      usersTable.push(
        <div
          key={"user-" + usersList[i].id}
          className="bg-yellow border-radius-xsm border-shadow flex-row-start m-1"
          style={{
            fontSize: "20px",
            width:"95%",
            paddingLeft: "10px"
          }}
        >
          <div
            className="bg-smoke border-radius-xsm border-shadow flex-row"
            style={{width:"50px"}}
          >
            {usersList[i].id}
          </div>
          <div 
            className="ml-auto mr-auto flex-row"
            style={{height:"40px"}}
          >
            {usersList[i].confirmationCode}
          </div>
        </div>
      );
    }
    return (
      <div
        className="bg-smoke border-radius-xsm border-shadow flex-column-start"
        style={{
          height: "95%",
          width: "95%",
          overflowY: "auto"
        }}
      >
        {usersTable}
      </div>
    );
  };

}
export default UsersDashboard;