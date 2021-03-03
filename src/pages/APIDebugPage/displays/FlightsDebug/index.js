// Libraries
import FlightsDispatcher from "../../../../dispatchers/FlightsDispatcher";
import Orchestration from "../../../../Orchestration";
import React, { Component } from 'react';
import Store from "../../../../reducers/Store";

// Components
import ChangeOperationReadout from "../ChangeOperationReadout";
//import CreateView from "./CreateView";
//import DeleteView from "./DeleteView";
import DropDown from "../../../../components/DropDown";
//import EditView from "./EditView";
import ErrorMessage from "../../../../components/ErrorMessage";
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";
import ItemsIndexReadout from "../../../../components/ItemsIndexReadout";
import OrchestrationHeader from "../OrchestrationHeader";
import Pagination from "../../../../components/Pagination";

class FlightsDebug extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() { 
    const { flights } = Store.getState();
    const { searchText } = this.state;
    const isCreatePromptActive = flights.create.isActive;
    const isDeletePromptActive = flights.delete.isActive;
    const isEditPromptActive = flights.edit.isActive;
    const flightsMSStatus = flights.status;
    const searchError = flights.search.error;
    const searchFilters = flights.search.filters;
    const searchResults = flights.search.all.results;

    return ( 
      <div className={this.props.className || ""} style={this.props.style}>
        
        {/* Header */}
        <div className="row bg-light p-2 kit-border-shadow">
          
          {/* MS Orchestration Indicators */}
          <OrchestrationHeader className="col-12 col-md-7"
            name="Flight MS"
            status={flightsMSStatus === "INACTIVE" ? "PENDING" : flightsMSStatus}
            style={{maxWidth:"30rem"}}
            onTriggerError={() => FlightsDispatcher.onError()}
            onTriggerFakeAPICall={() => FlightsDispatcher.onFakeAPICall()}
          />

          {/* Search Bar */}
          <div className="col-12 col-md-5">

            {/* Text Input */}
            <FlexRow className="mt-2" wrap="no-wrap">
              <input 
                aria-label="Search" 
                className={"form-control " + (searchError && " is-invalid kit-shake")}
                label={searchError}
                placeholder="ID=X or TypeID=Y"
                type="search" 
                style={{maxWidth:"15rem"}}
                onChange={(e) => this.setState({searchText: e.target.value})}
              />

              {/* Button */}
              <button 
                className="btn btn-success ml-2 text-white kit-text-shadow-thin" 
                type="submit"
                onClick={() => FlightsDispatcher.onFindBy(searchText)}
              >
                search
              </button>
            </FlexRow>
          </div>
        </div>

        {/* Search Sorting & Filtering */}
        <div className={"row bg-light " + 
          ((flightsMSStatus === "INACTIVE" || flightsMSStatus === "ERROR" ||
           isCreatePromptActive || isDeletePromptActive || isEditPromptActive) && 
          "kit-opacity-50 kit-no-user kit-pointer-none")}
        >
          {/* Filters */}
          <div className="col-12 p-2">
            <FlexRow wrap={"no-wrap"}>

              {/* # of Filters Active */}
              <div className="list-group ml-1">
                <div className="list-group-item" style={{fontSize: "0.85rem", padding:"0.5rem"}}>
                  {searchFilters.activeCount + " filters active"}
                </div>
              </div>
            </FlexRow>
          </div>

          {/* Resuts Count & Page Selection */}
          <FlexRow className="col-12 p-2">
            <DropDown 
              selection={flights.search.resultsPerPage}
              options={["3", "10", "25", "50"]}
              onSelect={(e) => FlightsDispatcher.onResultsPerPage(e)}
            />

            <ItemsIndexReadout
              className={"ml-2"}
              currentPage={flights.search.resultsPage}
              itemsPerPage={flights.search.resultsPerPage}
              itemsTotal={flights.search.all.results.length}
            />

            <Pagination
              className={"m-0 ml-2"}
              currentPage={flights.search.resultsPage}
              totalPages={Math.ceil(flights.search.all.results.length / Math.max(flights.search.resultsPerPage, 1))}
              onSelectPage={(e) => FlightsDispatcher.onResultsPage(e)}
            />
          </FlexRow>
        </div>


        {/* Body */}
        <div className="row">
          <div className="col-12" style={{height:"80vh", overflowY: "auto"}}>
            
            {/* Error State */}
            {flightsMSStatus === "ERROR" &&
            <FlexColumn className="h-100">
              <ErrorMessage className="h1" soundAlert={true}>
                {flights.error}
              </ErrorMessage>
              <button className="btn btn-light m-3"
                onClick={() => FlightsDispatcher.onCancel()}
              >
                Back
              </button>
            </FlexColumn>}

            {/* Inactive State */}
            {flightsMSStatus === "INACTIVE" &&
            <FlexColumn className="h-100">
            <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
              name="Establishing Connection . . ." status={"PENDING"}/>
            </FlexColumn>}

            {/* Pending State */}
            {(flightsMSStatus === "PENDING" || flightsMSStatus === "INACTIVE") &&
            <FlexColumn className="h-100">
              <div className="spinner-border"/>
            </FlexColumn>}

            {/* Success State */}
            {(flightsMSStatus === "SUCCESS" &&   !isCreatePromptActive && !isDeletePromptActive && !isEditPromptActive) &&
            this.handleRenderFlightsList(searchResults)}           

            {/* {(flightsMSStatus === "SUCCESS" && isCreatePromptActive) && 
            <CreateView/>} */}

            {/* {(flightsMSStatus === "SUCCESS" && isDeletePromptActive) && 
            <DeleteView/>} */}

            {/* {(flightsMSStatus === "SUCCESS" && isEditPromptActive) && 
            <EditView/>} */}
          </div>
        </div>

      </div>
    );
  }

  componentDidMount() {
    FlightsDispatcher.onCancel();
    Orchestration.findActiveServices(
    onError => {
      FlightsDispatcher.onError("No Orchestration connection.");
    }, onSuccess => {
      const isMSActive = onSuccess.includes("flight-service");
      if(isMSActive) FlightsDispatcher.onFindAll();
      else FlightsDispatcher.onError("No Flight MS connection.");
    });
  }

  handleIncludeReferenceIDs = (isActive) => {
    this.setState({isReferenceIDsActive: isActive});
  }

  handleRenderFlightsList = (flightsList) => {
    const { flights } = Store.getState();
    const resultsDisplayed = Number(flights.search.resultsPerPage);
    const resultsStart = flights.search.resultsPerPage * (flights.search.resultsPage - 1);

    let flightsTable = [];
    if(!flightsList.length) flightsList = [flightsList];
    for(var i = resultsStart; (i < resultsStart + resultsDisplayed && i < flightsList.length); i++) {
      const flight = flightsList[i];
      const flightId = flight.id;
      if(!flightId) continue;

      const index = Number(i) + 1;
      flightsTable.push(
        <tr key={index}>
          <th scrop="row">{index}</th>
          <td>{flightId}</td>
          <td>{flightsList[i].typeId}</td>
          
          {/* Edit */}
          <td><button className="btn btn-info"
            onClick={() => FlightsDispatcher.onPromptEdit(flight)}>
              Edit
          </button></td>

          {/* Delete */}
          <td><button className="btn btn-primary"
            onClick={() => FlightsDispatcher.onPromptDelete(flight)}>
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
              <th scope="col">TypeID</th>
              <th scope="col" colSpan="2">
                <FlexRow>
                  <button className="btn btn-success text-white kit-text-shadow-thin" style={{whiteSpace: "nowrap"}}
                    onClick={() => FlightsDispatcher.onPromptCreate()}>
                    + Create New
                  </button>
                </FlexRow>
              </th>
            </tr>
          </thead>
          <tbody>
            {flightsTable}
            <tr><td colSpan="7"></td>{/* Space at end of table for aesthetic */}</tr>
          </tbody>
        </table>
      </FlexColumn>
    );
  };
}
export default FlightsDebug;