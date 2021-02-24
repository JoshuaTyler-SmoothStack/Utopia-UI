// Libraries
import BookingsDispatcher from "../../../../dispatchers/BookingsDispatcher";
import BookingsDebugDispatcher from "../../../../dispatchers/BookingsDebugDispatcher";
import React, { Component } from 'react';
import RootReducer from "../../../../reducers/RootReducer";

// Components
import DeleteView from "./DeleteView";
import EditView from "./EditView";
import ErrorMessage from "../../../../components/ErrorMessage";
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";
import OrchestrationHeader from "../OrchestrationHeader";
import Pagination from "../Pagination";

class BookingsDebug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReferenceIDsActive: false,
      isResultsDropdownActive: false,
      editingValues: {
        status: 0,
        flightId: 0,
        passengerId: 0,
        userId: 0,
        guestEmail: "",
        guestPhone: ""
      }
    };
  }
  render() { 
    const { bookings } = RootReducer.getState();
    const { isReferenceIDsActive, searchText } = this.state;

    const isDeletePromptActive = bookings
      ? bookings.deletePrompt
      : false;

    const isEditPromptActive = bookings
      ? bookings.editPrompt
      : false;
  
    const bookingsMSStatus = bookings
      ? bookings.status
      : "INACTIVE";

    const searchError = bookings
      ? bookings.searchError
      : null;

    const searchFilters = bookings
      ? bookings.searchFilters
      : [];

    const searchResults = bookings
      ? bookings.searchResults
      : [];

    return ( 
      <div className="col-8 col-md-10">
        
        {/* Header */}
        <div className="row bg-light p-2 kit-border-shadow">
          
          {/* MS Orchestration Indicators */}
          <OrchestrationHeader className="col-12 col-md-7"
            name="Booking MS"
            status={bookingsMSStatus}
            onTriggerError={() => BookingsDispatcher.onError()}
            onTriggerFakeAPICall={() => BookingsDebugDispatcher.onFakeAPICall()}
          />

          {/* Search Bar */}
          <div className="col-12 col-md-5">
            {/* Search */}
            <FlexRow className="mt-2" wrap="no-wrap">
              <input 
                aria-label="Search" 
                className={"form-control " + (searchError && " is-invalid kit-shake")}
                label={searchText}
                placeholder="ID=X or Confirmation=Y"
                type="search" 
                style={{maxWidth:"15rem"}}
                onChange={(e) => this.setState({searchText: e.target.value})}
              />
              <button 
                className="btn btn-success ml-2" 
                type="submit"
                onClick={() => BookingsDispatcher.onFindBy(searchText)}
              >
                search
              </button>
            </FlexRow>
          </div>
        </div>

        {/* Search Sorting & Filtering */}
        <div className={"row bg-light kit-border-shadow " + ((isDeletePromptActive || isEditPromptActive) && "kit-opacity-50 kit-no-user kit-pointer-none")}>
          {/* Filters */}
          <div className="col-12 p-2">
            <FlexRow wrap={"no-wrap"}>
              
              {/* Toggle Reference Data */}
              <FlexRow className="bg-dark rounded kit-border-shadow ml-1" wrap={"no-wrap"}>
                <button className={"btn text-white " + (isReferenceIDsActive && "btn-success")}
                  onClick={() => this.handleIncludeReferenceIDs(true)}
                >
                  Show IDs
                </button>
                <button className={"btn text-white " + (!isReferenceIDsActive && "btn-success")}
                  onClick={() => this.handleIncludeReferenceIDs(false)}
                >
                  Hide
                </button>
              </FlexRow>

              {/* # of Filters Active */}
              <div className="list-group ml-1">
                <div className="list-group-item" style={{fontSize: "0.85rem", padding:"0.5rem"}}>
                  {searchFilters.activeCount + " filters active"}
                </div>
              </div>
            </FlexRow>
          </div>

          {/* Pagination */}
          <Pagination className="col-12 p-2" results={bookings}
            onSetNumberOfResults={(e) => BookingsDispatcher.onResultsPerPage(e)}
            onSetPageOfResults={(e) => BookingsDispatcher.onResultsPage(e)}
          />
        </div>


        {/* Body */}
        <div className="row">
          <div className="col-12 col-md-12 overflow-auto" style={{height:"80vh"}}>
            {(bookingsMSStatus === "PENDING" || bookingsMSStatus === "INACTIVE") &&
            <FlexColumn className="h-100">
              <div className="spinner-border"/>
            </FlexColumn>}

            {bookingsMSStatus === "ERROR" &&
            <FlexColumn className="h-100">
              <ErrorMessage className="h1" soundAlert={true}>
                {bookings.error}
              </ErrorMessage>
            </FlexColumn>}

            {(bookingsMSStatus === "SUCCESS" && !isDeletePromptActive && !isEditPromptActive) && 
            this.handleRenderBookingsList(searchResults)}

            {(bookingsMSStatus === "SUCCESS" && isDeletePromptActive) && 
            <DeleteView/>}

            {(bookingsMSStatus === "SUCCESS" && isEditPromptActive) && 
            <EditView/>}
          </div>
        </div>

      </div>
    );
  }

  componentDidMount() {
    const { orchestration } = RootReducer.getState();
    const isMSActive = orchestration
      ? orchestration.services.list.includes("booking-service")
      : false;
    
    if(isMSActive) {
      BookingsDispatcher.onFindAll()
    } else {
      BookingsDispatcher.onError("No Booking MS connection.");
    }
  }

  handleIncludeReferenceIDs = (isActive) => {
    this.setState({isReferenceIDsActive: isActive});
  }

  handleRenderBookingsList = (bookingsList) => {
    const { bookings } = RootReducer.getState();
    const { isReferenceIDsActive } = this.state;

    const resultsDisplayed = bookings
      ? bookings.searchResultsPerPage
      : 0;

    const resultsStart = bookings
      ? bookings.searchResultsPerPage * (bookings.searchResultsPage - 1)
      : 0;

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
            {isReferenceIDsActive && <td>{bookingsList[i].flightId || "Error"}</td>}
            {isReferenceIDsActive && <td>{bookingsList[i].passengerId || "NR"}</td>}
            {isReferenceIDsActive && <td>{bookingsList[i].userId || "Guest"}</td>}
            
            {/* Edit */}
            <td><button className="btn btn-info"
              onClick={() => BookingsDispatcher.onPromptEdit(bookingId)}>
                Edit
            </button></td>

            {/* Delete */}
            <td><button className="btn btn-primary"
              onClick={() => BookingsDispatcher.onPromptDelete(bookingId)}>
                Delete
            </button></td>
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
              {isReferenceIDsActive && <th scope="col">Flight ID</th>}
              {isReferenceIDsActive && <th scope="col">Passenger ID</th>}
              {isReferenceIDsActive && <th scope="col">User ID</th>}
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {bookingsTable}
            <tr><td colSpan="7"></td>{/* Space at end of table for aesthetic */}</tr>
          </tbody>
        </table>
      </FlexColumn>
    );
  };
}
export default BookingsDebug;