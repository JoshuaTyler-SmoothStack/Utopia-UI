// Libraries
import React, { Component } from 'react';
import UsersDispatcher from '../../../dispatchers/UsersDispatcher';
import RootReducer from '../../../reducers/RootReducer';

// Components
import FlexBox from '../../../components/FlexBox';
import PopContent from '../../../components/PopContent';
import Orchestration from '../../../Orchestration';

class UsersDashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      onCancel: null,
      onConfirm: null,
      isActive_PopContent: false,
    };
  }

  render() {
    const { users } = RootReducer.getState();

    const searchResults = users
    ? users.searchResults
    : [];

    const status = users
    ? users.status
    : "INACTIVE";

    return (
    <div style={{height:" 100%", width: "100%"}}>
      <FlexBox
        className={"kit-gradient-lightgrey90 rounded kit-border-shadow p-2"}
        justify={"start"}
        style={{height:" 100%", overflow: "hidden"}}
      >
        {/* findAllUsers() */}
        <button
          className={"btn btn-info rounded m-1"}
          onClick={() => this.findAllUsers()}
        >
          {status === "PENDING" 
            ? <div className="spinner-border text-light"/>
            : "findAllUsers()"
          }
        </button>

        {/* triggerError() */}
        <button
          className={"btn btn-info rounded m-1"}
          onClick={() => this.triggerError()}
        >
          {status === "PENDING" 
            ? <div className="spinner-border text-light"/>
            : "triggerError()"
          }
        </button>
      </FlexBox>

      {/* Pop Content */}
      {this.state.isActive_PopContent &&
        <PopContent
          className="kit-bg-smoke kit-border-shadow rounded"
          style={{
            position: "absolute",
            height: window.innerHeight * 0.75,
            width: window.innerWidth * 0.9,
            top: (window.innerHeight - (window.innerHeight * 0.75)) * 0.5,
            left: (window.innerWidth - (window.innerWidth * 0.9)) * 0.5,
            overflow: "hidden"
          }}
          onClose={() => this.setState({isActive_PopContent: false})}
        >
          {this.handleRenderUserList(searchResults)}
        </PopContent>
      }
    </div>);
  }

  findAllUsers = () => {
    UsersDispatcher.onFindAll();
    this.setState({isActive_PopContent: true});
  }

  triggerError = () => {
    Orchestration.createRequest("POST", "/users",
      onError => {
        console.log(onError);
    }, onSuccess => {
      console.log(onSuccess);
    });
  }

  handleRenderUserList = (usersList) => {
    console.log(usersList);
    let usersTable = [];
    for(var i in usersList) {
      const index = Number(i) + 1;
      usersTable.push(
        <tr key={index}>
          <th scrop="row">{index}</th>
          <td>{usersList[i].id}</td>
          <td>{usersList[i].userRole.name}</td>
          <td>{usersList[i].firstName}</td>
          <td>{usersList[i].lastName}</td>
          <td>{usersList[i].email}</td>
          <td>{usersList[i].password}</td>
          <td>{usersList[i].phone}</td>
        </tr>
      );
    }

    return (
      <FlexBox
        justify={"start"}
        style={{height: "99%", width: "99%"}}
        type={"column"}
      >
        <table className="table kit-border-shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Role</th>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            {usersTable}
          </tbody>
        </table>
      </FlexBox>
    );
  };

}
export default UsersDashboard;