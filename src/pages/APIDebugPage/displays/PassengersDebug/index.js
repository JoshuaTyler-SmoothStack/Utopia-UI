// Libraries
import PassengersDispatcher from "../../../../dispatchers/PassengersDispatcher";
import OrchestrationDispatcher from "../../../../dispatchers/OrchestrationDispatcher";
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

class PassengersDebug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPassengerInfoActive: false,
      searchTerms: ""
    };
  }

  render() { 
    const { orchestration, passengers } = Store.getState();
    const { isPassengerInfoActive, searchTerms } = this.state;
    const isCreatePromptActive = passengers.create.isActive;
    const isDeletePromptActive = passengers.delete.isActive;
    const isEditPromptActive = passengers.edit.isActive;
    const isMSActive = orchestration.services.includes("passengers");
    const passengersMSStatus = passengers.status;
    const searchError = passengers.search.error;
    const searchFilters = passengers.search.filters;
    const searchResults = passengers.search.results;

    return ( 
      <div className={"row" + (this.props.className || "")} style={this.props.style}>
        
        {/* Header */}
        <div className="col-12 bg-light kit-border-shadow">
          <div className="row mt-1">
            {/* MS Orchestration Indicators */}
            <OrchestrationHeader className="col-12 col-md-6"
              name="Passenger MS"
              status={passengersMSStatus === "INACTIVE" ? "PENDING" : passengersMSStatus}
              style={{maxWidth:"30rem"}}
              onTriggerError={() => PassengersDispatcher.onError()}
              onTriggerFakeAPICall={() => PassengersDispatcher.onFakeAPICall(searchResults)}
            />

            {/* Search Bar */}
            <div className="col-12 col-md-5">
              {/* Search */}
              <FlexRow className="mt-1" justify="end" wrap="no-wrap">
                <input 
                  aria-label="Search" 
                  className={"form-control " + (searchError && " is-invalid kit-shake")}
                  label={searchError}
                  placeholder="IDs, name, address, . . ."
                  type="search" 
                  style={{maxWidth:"15rem"}}
                  onChange={(e) => this.setState({searchTerms: e.target.value})}
                />
                <button 
                  className="btn btn-success ml-2 text-white kit-text-shadow-thin" 
                  type="submit"
                  onClick={() => PassengersDispatcher.onSearchAndFilter("/search", searchTerms)}
                >
                  search
                </button>
              </FlexRow>
            </div>
          </div>
        </div>

        {/* Search Sorting & Filtering */}
        <div className={"col-12 bg-light " +
          ((passengersMSStatus === "INACTIVE" || passengersMSStatus === "ERROR" ||
           isCreatePromptActive || isDeletePromptActive || isEditPromptActive) && 
          "kit-opacity-50 kit-no-user kit-pointer-none")}
        >
          
          {/* Filters */}
          <div className="row p-2 justify-content-center p-2">
              
              {/* Toggle Reference Data */}
              <FlexRow className="col-auto p-0 bg-dark rounded kit-border-shadow ml-1" wrap={"no-wrap"}>
                <button className={"btn text-white " + (isPassengerInfoActive && "btn-success")}
                  onClick={() => this.handleIncludeReferenceIDs(true)}
                >
                  Show Passenger Info
                </button>
                <button className={"btn text-white " + (!isPassengerInfoActive && "btn-success")}
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
                selection={passengers.search.resultsPerPage}
                options={["3", "10", "25", "50"]}
                optionsName="items"
                onSelect={(e) => PassengersDispatcher.onSelectResultsPerPage(e)}
              />
            </FlexColumn>

            <FlexColumn className="col-6 col-md-3 text-center">
              <ItemsIndexReadout
                currentPage={passengers.search.resultsPage}
                itemsPerPage={passengers.search.resultsPerPage}
                itemsTotal={passengers.search.results.length}
              />
            </FlexColumn>

            <FlexColumn className="col-8 mt-2 col-md-3 text-center">
              <Pagination
                currentPage={passengers.search.resultsPage}
                totalPages={Math.ceil(passengers.search.results.length / Math.max(passengers.search.resultsPerPage, 1))}
                onSelectPage={(e) => PassengersDispatcher.onSelectResultsPage(e)}
              />
            </FlexColumn>
          </div>
        </div>


        {/* Body */}
        <div className="col-12" style={{overflow: "auto"}}>

        {/* Error State */}
        {passengersMSStatus === "ERROR" &&
          <FlexColumn className="h-100">
            <ErrorMessage className="h1" soundAlert={true}>
              {isMSActive ? passengers.error : "No Passenger MS connection."}
            </ErrorMessage>
            <button className="btn btn-light m-3"
              onClick={() => PassengersDispatcher.onCancel()}
            >
              Back
            </button>
          </FlexColumn>}

          {/* Inactive State */}
          {passengersMSStatus === "INACTIVE" &&
          <FlexColumn style={{minHeight:"10rem"}}>
          <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
            name="Establishing Connection . . ." status={"PENDING"}/>
          </FlexColumn>}

          {/* Pending State */}
          {(passengersMSStatus === "PENDING" || passengersMSStatus === "INACTIVE") &&
          <FlexColumn style={{minHeight:"10rem"}}>
            <div className="spinner-border"/>
          </FlexColumn>}

          {/* Success State */}
          {(passengersMSStatus === "SUCCESS" && !isCreatePromptActive && !isDeletePromptActive && !isEditPromptActive) && 
          this.handleRenderPassengersList(searchResults)}

          {(passengersMSStatus === "SUCCESS" && isCreatePromptActive) && 
          <CreateView/>}

          {(passengersMSStatus === "SUCCESS" && isDeletePromptActive) && 
          <DeleteView/>}

          {(passengersMSStatus === "SUCCESS" && isEditPromptActive) && 
          <EditView/>}
        </div>
      </div>
    );
  }

  componentDidMount() {
    PassengersDispatcher.onCancel();
    OrchestrationDispatcher.onFindActiveServices();
    PassengersDispatcher.onRequest();
  }

  handleIncludeReferenceIDs = (isActive) => {
    this.setState({isPassengerInfoActive: isActive});
  }

  handleRenderPassengersList = (passengersList) => {
    const { passengers } = Store.getState();
    const { isPassengerInfoActive } = this.state;
    const resultsDisplayed = Number(passengers.search.resultsPerPage);
    const resultsStart = passengers.search.resultsPerPage * (passengers.search.resultsPage - 1);

    let passengersTable = [];
    if (!passengersList.length) passengersList = [passengersList];
    for (var i = resultsStart; (i < resultsStart + resultsDisplayed && i < passengersList.length); i++) {
      const passengerId = passengersList[i].passengerId;
      if (!passengerId) continue;

      const index = Number(i) + 1;
      passengersTable.push(
        <tr key={index}>
          <th scope="col">{index}</th>
          <td>{passengersList[i].passengerId}</td>
          <td>{passengersList[i].passengerBookingId}</td>
          <td>{passengersList[i].passengerPassportId}</td>
          {isPassengerInfoActive && <td>{passengersList[i].passengerFirstName}</td>}
          {isPassengerInfoActive && <td>{passengersList[i].passengerLastName}</td>}
          {isPassengerInfoActive && <td>{passengersList[i].passengerDateOfBirth}</td>}
          {isPassengerInfoActive && <td>{passengersList[i].passengerSex}</td>}
          {isPassengerInfoActive && <td>{passengersList[i].passengerAddress}</td>}
          {isPassengerInfoActive && 
          <td>
            {passengersList[i].passengerIsVeteran 
              ? <div className="h3 text-success" style={{fontFamily: "monospace"}}>✔</div> 
              : <div className="h3 text-danger" style={{fontFamily: "monospace"}}>X</div>}
          </td>}

          {/* Edit */}
          <td><button className="btn btn-info"
            onClick={() => PassengersDispatcher.onPromptEdit("/"+passengerId)}>
            Edit
          </button></td>

          {/* Delete */}
          <td><button className="btn btn-primary"
            onClick={() => PassengersDispatcher.onPromptDelete("/"+passengerId)}>
            Delete
          </button></td>
        </tr>
      );
    }

    return (
      <FlexColumn justify={"start"} style={{ height: "99%", width: "99%" }}>
        <table className="table kit-border-shadow m-3">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Booking ID</th>
              <th scope="col">Passport ID</th>
              {isPassengerInfoActive
                && <th scope="col">First Name</th>}
              {isPassengerInfoActive
                && <th scope="col">Last Name</th>}
              {isPassengerInfoActive
                && <th scope="col">DOB</th>}
              {isPassengerInfoActive
                && <th scope="col">Sex</th>}
              {isPassengerInfoActive
                && <th scope="col">Address</th>}
              {isPassengerInfoActive
                && <th scope="col">Veteran</th>}
              <th scope="col" colSpan="2">
                <FlexRow>
                  <button className="btn btn-success text-white kit-text-shadow-thin" style={{ whiteSpace: "nowrap" }}
                    onClick={() => PassengersDispatcher.onPromptCreate()}>
                    + Create New
                  </button>
                </FlexRow>
              </th>
            </tr>
          </thead>
          <tbody>
            {passengersTable}
            <tr><td colSpan="12"></td>{/* Space at end of table for aesthetic */}</tr>
          </tbody>
        </table>
      </FlexColumn>
    );
  }
}
export default PassengersDebug;