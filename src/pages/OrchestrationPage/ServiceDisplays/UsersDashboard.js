// Libraries
import React, { Component } from 'react';
import UsersDispatcher from '../../../dispatchers/UsersDispatcher';
import Store from '../../../reducers/Store';

// Components
import PopContent from '../../../components/PopContent';
import ErrorMessage from '../../../components/ErrorMessage';
import FlexRow from '../../../components/FlexRow';
import FlexColumn from '../../../components/FlexColumn';
// import Orchestration from '../../../Orchestration';

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
    const { users } = Store.getState();
    const searchResults = users.search.results;
    const status = users.status;

    return (
    <div style={{height:" 100%", width: "100%"}}>
      <FlexRow
        className={"kit-gradient-lightgrey90 rounded kit-border-shadow p-2"}
        justify={"start"}
        style={{height:" 100%", overflow: "hidden"}}
      >
        {/* Fake API Call */}
        <button
          className={"btn btn-info rounded m-1"}
          onClick={() => UsersDispatcher.onFakeAPICall()}
        >
          {"fakeAPICall()"}
        </button>

        {/* Find All */}
        <button
          className={"btn btn-info rounded"}
          onClick={() => this.findAllUsers()}
        >
          {"findAllUsers()"}
        </button>
      </FlexRow>

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
            overflow: "auto",
            zIndex: "1"
          }}
          onClose={() => this.setState({isActive_PopContent: false})}
        >
          {status === "PENDING" &&
            <div className="spinner-border text-light"/>
          }

          {status === "ERROR" &&
            <ErrorMessage soundAlert={true}>
              Error
            </ErrorMessage>
          }

          {status === "SUCCESS" && 
            this.handleRenderUsersList(searchResults)
          }
        </PopContent>
      }
    </div>);
  }

  findAllUsers = () => {
    UsersDispatcher.onFindAll();
    this.setState({isActive_PopContent: true});
  }

  handleRenderUsersList = (usersList) => {
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
      <FlexColumn
        justify={"start"}
        style={{height: "99%", width: "99%"}}
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
      </FlexColumn>
    );
  }
}
export default UsersDashboard;