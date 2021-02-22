// Libraries
import React, { Component } from 'react';
import BookingsDispatcher from '../../../dispatchers/BookingsDispatcher';
import RootReducer from '../../../reducers/RootReducer';

// Components
import FlexBox from '../../../components/FlexBox';
import PopContent from '../../../components/PopContent';
import Orchestration from '../../../Orchestration';

class BookingsDashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      onCancel: null,
      onConfirm: null,
      isActive_PopContent: false,
    };
  }

  render() {
    const { bookings } = RootReducer.getState();

    const searchResults = bookings
    ? bookings.searchResults
    : [];

    const status = bookings
    ? bookings.status
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
            : "findAllBookings()"
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
    BookingsDispatcher.onFindAll();
    this.setState({isActive_PopContent: true});
  }

  triggerError = () => {
    Orchestration.createRequest("POST", "/bookings",
      onError => {
        console.log(onError);
    }, onSuccess => {
      console.log(onSuccess);
    });
  }

  handleRenderUserList = (bookingsList) => {
    let bookingsTable = [];
    for(var i in bookingsList) {
      const index = Number(i) + 1;
      bookingsTable.push(
        <tr key={index}>
          <th scrop="row">{index}</th>
          <td>{bookingsList[i].id}</td>
          <td>{bookingsList[i].isActive}</td>
          <td>{bookingsList[i].confirmationCode}</td>
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
              <th scope="col">Status</th>
              <th scope="col">Confirmation Code</th>
            </tr>
          </thead>
          <tbody>
            {bookingsTable}
          </tbody>
        </table>
      </FlexBox>
    );
  };

  
}
export default BookingsDashboard;