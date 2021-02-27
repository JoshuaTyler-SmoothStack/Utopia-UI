// Libraries
import React, { Component } from 'react';
import BookingsDispatcher from '../../../dispatchers/BookingsDispatcher';
import Store from '../../../reducers/Store';

// Components
import PopContent from '../../../components/PopContent';
import ErrorMessage from '../../../components/ErrorMessage';
import FlexRow from '../../../components/FlexRow';
import FlexColumn from '../../../components/FlexColumn';
// import Orchestration from '../../../Orchestration';

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
    const { bookings } = Store.getState();
    const searchResults = bookings.search.results;
    const status = bookings.status;

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
          onClick={() => BookingsDispatcher.onFakeAPICall()}
        >
          {"fakeAPICall()"}
        </button>

        {/* Find All */}
        <button
          className={"btn btn-info rounded"}
          onClick={() => this.findAllBookings()}
        >
          {"findAllBookings()"}
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
            this.handleRenderBookingsList(searchResults)
          }
        </PopContent>
      }
    </div>);
  }

  findAllBookings = () => {
    BookingsDispatcher.onFindAll();
    this.setState({isActive_PopContent: true});
  }

  handleRenderBookingsList = (bookingsList) => {
    const { bookings } = Store.getState();
    const resultsDisplayed = bookings.search.resultsPerPage;
    const resultsStart = bookings.search.resultsPerPage * (bookings.search.resultsPage - 1);

    let bookingsTable = [];
    if(!bookingsList.length) bookingsList = [bookingsList];
    for(var i = resultsStart; i < bookingsList.length; i++) {
      if(i < resultsStart + resultsDisplayed) {
        
        const bookingId = bookingsList[i].id;
        if(!bookingId) continue;

        const index = Number(i) + 1;
        bookingsTable.push(
          <tr key={index}>
            <th scrop="row">{index}</th>
            <td>{bookingId}</td>
            <td>{bookingsList[i].status}</td>
            <td>{bookingsList[i].confirmationCode}</td>
          </tr>
        );
      } else {
        break;
      }
    }

    return (
      <FlexColumn justify={"start"} style={{height: "99%", width: "99%"}}>
        <table className="table kit-border-shadow m-3">
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
            <tr><td colSpan="4"></td>{/* Space at end of table for aesthetic */}</tr>
          </tbody>
        </table>
      </FlexColumn>
    );
  }
}
export default BookingsDashboard;