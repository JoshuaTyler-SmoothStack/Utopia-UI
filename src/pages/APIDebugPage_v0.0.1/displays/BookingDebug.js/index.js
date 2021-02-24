// Libraries
import BookingsDispatcher from "../../../../dispatchers/BookingsDispatcher";
import React, { Component } from 'react';
import RootReducer from "../../../../reducers/RootReducer";

// Components
import DeleteView from "./DeleteView";
import EditView from "./EditView";
import ErrorMessage from "../../../../components/ErrorMessage";
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";
import StatusAsyncIndicator from "../../../../components/StatusAsyncIndicator";
import StatusIndicator from "../../../../components/StatusIndicator";

class BookingsDebug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPassengerDisplayActive: false,
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
    const { bookings, orchestration } = RootReducer.getState();
    const { isPassengerDisplayActive, isResultsDropdownActive, searchText } = this.state;

    const isDeletePromptActive = bookings
      ? bookings.deletePrompt
      : false;

    const isEditPromptActive = bookings
      ? bookings.editPrompt
      : false;

    const isMSActive = orchestration
      ? orchestration.services.list.includes("booking-service")
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

    const resultsDisplayed = bookings
      ? bookings.searchResultsPerPage
      : 0;

    const resultsStart = bookings
      ? ((bookings.searchResultsPage - 1) * bookings.searchResultsPerPage) + 1
      : 0;

    // const resultsTotal = bookings
    // ? bookings.searchResultsTotal
    // : 0;

    const resultsTotal = bookings
    ? searchResults.length || 1
    : 0;

    const resultsEnd = bookings
    ? Math.min(bookings.searchResultsPage * bookings.searchResultsPerPage, resultsTotal)
    : 0;

    return ( 
      <div className="col-8 col-md-10">
        
        {/* Header */}
        <div className="row bg-light p-2 kit-border-shadow">
          
          {/* MS Orchestration Indicators */}
          <div className="col-12 col-md-7">
            <FlexRow justify={"start"}>
              <FlexRow 
                className="bg-dark rounded kit-border-shadow" 
                justify={"start"} 
                style={{maxWidth: "15rem"}}
              >
                {/* Nameplate */}
                <div 
                  className={"btn kit-border-shadow kit-pointer-none m-2 " + 
                  (isMSActive? "bg-success" : "bg-warning")}
                >
                  Booking MS
                </div>

                {/* IO Indicator */}
                <StatusAsyncIndicator 
                  className="ml-auto mr-2"
                  status={bookingsMSStatus}
                />

                {/* Status Indicator */}
                <StatusIndicator 
                  className="mr-2"
                  status={isMSActive ? "ACTIVE" : "INACTIVE"}
                />
              </FlexRow>

              {/* Error Trigger */}
              <button className="btn btn-primary ml-2"
                onClick={() => BookingsDispatcher.onError()}
              >
                !Error!
              </button>

              {/* Fake API Call */}
              <button className="btn btn-info ml-2"
                onClick={() => BookingsDispatcher.onFakeAPICall()}
              >
                Fake API Call
              </button>
            </FlexRow>
          </div>

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
                <button className={"btn text-white " + (isPassengerDisplayActive && "btn-success")}
                  onClick={() => this.handleIncludeReferenceData(true)}
                >
                  Show IDs
                </button>
                <button className={"btn text-white " + (!isPassengerDisplayActive && "btn-success")}
                  onClick={() => this.handleIncludeReferenceData(false)}
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
          <div className="col-12 p-2">
              <FlexRow wrap={"no-wrap"}>
                {/* # of Results Selection */}
                <div className="dropdown">
                  <button 
                    className="btn btn-secondary dropdown-toggle" 
                    type="button"
                    onClick={() => this.setState({isResultsDropdownActive: !isResultsDropdownActive})}
                  >
                    {resultsDisplayed + " results"}
                  </button>
                  <ul className={"dropdown-menu " + (isResultsDropdownActive ? "show" : "")}>
                  <li><button className="dropdown-item" type="button" onClick={() => this.handleSetNumberOfResults(3)}>3</button></li>
                    <li><button className="dropdown-item" type="button" onClick={() => this.handleSetNumberOfResults(25)}>25</button></li>
                    <li><button className="dropdown-item" type="button" onClick={() => this.handleSetNumberOfResults(50)}>50</button></li>
                    <li><button className="dropdown-item" type="button" onClick={() => this.handleSetNumberOfResults(100)}>100</button></li>
                  </ul>
                </div>

                {/* # of Results Display */}
                <div className="list-group ml-1">
                  <div className="list-group-item" style={{fontSize: "0.85rem", padding:"0.5rem"}}>
                    {resultsTotal === 1 && resultsStart + " of " + resultsTotal + " total"}
                    {resultsTotal !== 1 && resultsStart + " to " + resultsEnd + " of " + resultsTotal + " total"}
                  </div>
                </div>

                {/* Results Pagination */}
                {bookings &&
                <div className="ml-2">
                  {this.handleRenderPagination()}
                </div>}
              </FlexRow>
          </div>
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

  handleIncludeReferenceData = (isActive) => {
    this.setState({isPassengerDisplayActive: isActive});
  }

  handleRenderBookingsList = (bookingsList) => {
    const { bookings } = RootReducer.getState();
    const { isPassengerDisplayActive } = this.state;

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
            {isPassengerDisplayActive && <td>{bookingsList[i].flightId || "Error"}</td>}
            {isPassengerDisplayActive && <td>{bookingsList[i].passengerId || "NR"}</td>}
            {isPassengerDisplayActive && <td>{bookingsList[i].userId || "Guest"}</td>}
            
            {/* Edit */}
            <td>
              <button className="btn btn-info"
                onClick={() => BookingsDispatcher.onPromptEdit(bookingId)}
              >
                Edit
              </button>
            </td>

            {/* Delete */}
            <td>
              <button className="btn btn-primary"
                onClick={() => BookingsDispatcher.onPromptDelete(bookingId)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      } else {
        break;
      }
    }

    return (
      <FlexColumn
        justify={"start"}
        style={{height: "99%", width: "99%"}}
      >
        <table className="table kit-border-shadow m-3">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Status</th>
              <th scope="col">Confirmation Code</th>
              {isPassengerDisplayActive && <th scope="col">Flight ID</th>}
              {isPassengerDisplayActive && <th scope="col">Passenger ID</th>}
              {isPassengerDisplayActive && <th scope="col">User ID</th>}
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

  handleRenderPagination = () => {
    const { bookings } = RootReducer.getState();
    const currentPage = bookings
      ? bookings.searchResultsPage
      : 1;

    const resultsPerPage = bookings
      ? bookings.searchResultsPerPage
      : 1;

    // TODO receive total results from API - bookings.searchResultsTotal
    const totalResults = bookings
      ? bookings.searchResults.length || 1
      : 0;

    const totalPages = Math.ceil(totalResults / Math.max(resultsPerPage, 1));

    // 1st Page - 1, 2, last with previous disabled
    const paginationItems = {
      next: currentPage < totalPages,
      previous: currentPage > 1,
      selected: currentPage,
      pos1: 1,
      pos2: currentPage === 1 ? 2 : currentPage,
      pos3: totalPages,
      isPos2Disabled: false,
      isPos3Disabled: false,
    };

    if(totalPages < 2) {
      paginationItems.previous = false;
      paginationItems.next = false;
      paginationItems.isPos2Disabled = true;
      paginationItems.isPos3Disabled = true;
    } else if(totalPages < 3) {
      paginationItems.isPos2Disabled = true;
    }

    if(currentPage === totalPages) {
      paginationItems.next = false;
      paginationItems.pos2 = currentPage - 1;
    }

    const previous = 
    <li className={"page-item" + (paginationItems.previous ? "" : " disabled")}>
      <button className={"page-link"} aria-label="Previous"
        onClick={paginationItems.previous ? () => this.handleSetPageOfResults(paginationItems.selected - 1) : () => {}}
      >
        <span aria-hidden="true">«</span>
      </button>
    </li>

    const pos1 = 
    <li className={"page-item" + (paginationItems.selected === paginationItems.pos1 ? " active" : "")}>
      <button className={"page-link"} onClick={paginationItems.selected === paginationItems.pos1 ? () => {} : () => this.handleSetPageOfResults(paginationItems.pos1)}>
        {paginationItems.pos1}
      </button>
    </li>

    const pos2 = 
    <li className={"page-item" + (paginationItems.selected === paginationItems.pos2 ? " active" : "")}>
      <button className="page-link" onClick={paginationItems.selected === paginationItems.pos2 ? () => {} : () => this.handleSetPageOfResults(paginationItems.pos2)}>
        {paginationItems.pos2}
      </button>
    </li>

    const pos3 = 
    <li className={"page-item" + (paginationItems.selected === paginationItems.pos3 ? " active" : "")}>
      <button className="page-link" onClick={paginationItems.selected === paginationItems.pos3 ? () => {} : () => this.handleSetPageOfResults(paginationItems.pos3)}>
        {paginationItems.pos3}
      </button>
    </li>

    const next = 
    <li className={"page-item" + (paginationItems.next ? "" : " disabled")}>
      <button className="page-link" aria-label="Previous"
        onClick={paginationItems.next ? () => this.handleSetPageOfResults(paginationItems.selected + 1) : () => {}}
      >
        <span aria-hidden="true">»</span>
      </button>
    </li>

    return (
      <ul className="pagination m-0">
        {previous}
        {pos1}
        {!paginationItems.isPos2Disabled && pos2}
        {!paginationItems.isPos3Disabled && pos3}
        {next}
      </ul>
    );
  }

  handleSetNumberOfResults = (number) => {
    this.setState({isResultsDropdownActive: false});
    BookingsDispatcher.onResultsPerPage(number);
  }

  handleSetPageOfResults = (page) => {
    BookingsDispatcher.onResultsPage(page);
  }
}
export default BookingsDebug;