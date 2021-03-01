// Libraries
import BookingsDispatcher from "../../../../dispatchers/BookingsDispatcher";
import Orchestration from "../../../../Orchestration";
import React, { Component } from 'react';
import Store from "../../../../reducers/Store";

// Components
import ChangeOperationReadout from "../ChangeOperationReadout";
import CreateView from "./CreateView";
import DeleteView from "./DeleteView";
import DropDown from "../../../../components/DropDown";
import EditView from "./EditView";
import ErrorMessage from "../../../../components/ErrorMessage";
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";
import ItemsIndexReadout from "../../../../components/ItemsIndexReadout";
import OrchestrationHeader from "../OrchestrationHeader";
import Pagination from "../../../../components/Pagination";

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
    const { bookings } = Store.getState();
    const { isReferenceIDsActive, searchText } = this.state;
    const isCreatePromptActive = bookings.create.isActive;
    const isDeletePromptActive = bookings.delete.isActive;
    const isEditPromptActive = bookings.edit.isActive;
    const bookingsMSStatus = bookings.status;
    const searchError = bookings.search.error;
    const searchFilters = bookings.search.filters;
    const searchResults = bookings.search.results;

    return ( 
      <div className={"row" + (this.props.className || "")} style={this.props.style}>
        
        {/* Header */}
        <div className="col-12 bg-light kit-border-shadow">
          <div className="row p-2">
            {/* MS Orchestration Indicators */}
            <OrchestrationHeader className="col-12 col-md-7"
              name="Booking MS"
              status={bookingsMSStatus === "INACTIVE" ? "PENDING" : bookingsMSStatus}
              style={{maxWidth:"30rem"}}
              onTriggerError={() => BookingsDispatcher.onError()}
              onTriggerFakeAPICall={() => BookingsDispatcher.onFakeAPICall()}
            />

            {/* Search Bar */}
            <div className="col-12 col-md-5">
              {/* Search */}
              <FlexRow className="mt-2" wrap="no-wrap">
                <input 
                  aria-label="Search" 
                  className={"form-control " + (searchError && " is-invalid kit-shake")}
                  label={searchError}
                  placeholder="ID=X or Confirmation=Y"
                  type="search" 
                  style={{maxWidth:"15rem"}}
                  onChange={(e) => this.setState({searchText: e.target.value})}
                />
                <button 
                  className="btn btn-success ml-2 text-white kit-text-shadow-thin" 
                  type="submit"
                  onClick={() => BookingsDispatcher.onFindBy(searchText)}
                >
                  search
                </button>
              </FlexRow>
            </div>
          </div>
        </div>

        {/* Search Sorting & Filtering */}
        <div className={"col-12 bg-light " +
          ((bookingsMSStatus === "INACTIVE" || bookingsMSStatus === "ERROR" ||
           isCreatePromptActive || isDeletePromptActive || isEditPromptActive) && 
          "kit-opacity-50 kit-no-user kit-pointer-none")}
        >
          
          {/* Filters */}
          <div className="row p-2 justify-content-center p-2">
              
              {/* Toggle Reference Data */}
              <FlexRow className="col-auto p-0 bg-dark rounded kit-border-shadow ml-1" wrap={"no-wrap"}>
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
              <div className="col-auto list-group ml-2">
                <div className="list-group-item" style={{fontSize: "0.85rem", padding:"0.5rem"}}>
                  {searchFilters.activeCount + " filters active"}
                </div>
              </div>
          </div>

          {/* Resuts Count & Page Selection */}
          <div className="row justify-content-center p-2">
            <FlexColumn className="col-4 col-md-3 text-center">
              <DropDown
                selection={bookings.search.resultsPerPage}
                options={["3", "10", "25", "50"]}
                onSelect={(e) => BookingsDispatcher.onResultsPerPage(e)}
              />
            </FlexColumn>

            <FlexColumn className="col-6 col-md-3 text-center">
              <ItemsIndexReadout
                currentPage={bookings.search.resultsPage}
                itemsPerPage={bookings.search.resultsPerPage}
                itemsTotal={bookings.search.results.length}
              />
            </FlexColumn>

            <FlexColumn className="col-8 mt-2 col-md-3 text-center">
              <Pagination
                currentPage={bookings.search.resultsPage}
                totalPages={Math.ceil(bookings.search.results.length / Math.max(bookings.search.resultsPerPage, 1))}
                onSelectPage={(e) => BookingsDispatcher.onResultsPage(e)}
              />
            </FlexColumn>
          </div>
        </div>


        {/* Body */}
        <div className="col-12" style={{overflowY: "auto"}}>

        {/* Error State */}
        {bookingsMSStatus === "ERROR" &&
          <FlexColumn className="h-100">
            <ErrorMessage className="h1" soundAlert={true}>
              {bookings.error}
            </ErrorMessage>
            <button className="btn btn-light m-3"
              onClick={() => BookingsDispatcher.onCancel()}
            >
              Back
            </button>
          </FlexColumn>}

          {/* Inactive State */}
          {bookingsMSStatus === "INACTIVE" &&
          <FlexColumn className="h-100">
          <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
            name="Establishing Connection . . ." status={"PENDING"}/>
          </FlexColumn>}

          {/* Pending State */}
          {(bookingsMSStatus === "PENDING" || bookingsMSStatus === "INACTIVE") &&
          <FlexColumn className="h-100">
            <div className="spinner-border"/>
          </FlexColumn>}

          {/* Success State */}
          {(bookingsMSStatus === "SUCCESS" && !isCreatePromptActive && !isDeletePromptActive && !isEditPromptActive) && 
          this.handleRenderBookingsList(searchResults)}

          {(bookingsMSStatus === "SUCCESS" && isCreatePromptActive) && 
          <CreateView/>}

          {(bookingsMSStatus === "SUCCESS" && isDeletePromptActive) && 
          <DeleteView/>}

          {(bookingsMSStatus === "SUCCESS" && isEditPromptActive) && 
          <EditView/>}
        </div>
      </div>
    );
  }

  componentDidMount() {
    BookingsDispatcher.onCancel();
    Orchestration.findActiveServices(
    onError => {
      BookingsDispatcher.onError("No Orchestration connection.");
    }, onSuccess => {
      const isMSActive = onSuccess.includes("booking-service");
      if(isMSActive) BookingsDispatcher.onFindAll()
      else BookingsDispatcher.onError("No Booking MS connection.");
    });
  }

  handleIncludeReferenceIDs = (isActive) => {
    this.setState({isReferenceIDsActive: isActive});
  }

  handleRenderBookingsList = (bookingsList) => {
    const { bookings } = Store.getState();
    const { isReferenceIDsActive } = this.state;
    const resultsDisplayed = Number(bookings.search.resultsPerPage);
    const resultsStart = bookings.search.resultsPerPage * (bookings.search.resultsPage - 1);

    let bookingsTable = [];
    if(!bookingsList.length) bookingsList = [bookingsList];
    for(var i = resultsStart; (i < resultsStart + resultsDisplayed && i < bookingsList.length); i++) {
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
              <th scope="col" colSpan="2">
                <FlexRow>
                  <button className="btn btn-success text-white kit-text-shadow-thin" style={{whiteSpace: "nowrap"}}
                    onClick={() => BookingsDispatcher.onPromptCreate()}>
                    + Create New
                  </button>
                </FlexRow>
              </th>
            </tr>
          </thead>
          <tbody>
            {bookingsTable}
            <tr><td colSpan="7"></td>{/* Space at end of table for aesthetic */}</tr>
          </tbody>
        </table>
      </FlexColumn>
    );
  }
}
export default BookingsDebug;