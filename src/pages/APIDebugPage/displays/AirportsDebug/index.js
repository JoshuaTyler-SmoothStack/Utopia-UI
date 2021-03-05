// Libraries
import AirportsDispatcher from "../../../../dispatchers/AirportsDispatcher";
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

class AirportsDebug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingValues: {
        airportName: "0",
        iataId: "0",
        cityName: "0"
      }
    };
  }
  render() { 
    const { airports } = Store.getState();
    const { searchText } = this.state;
    const isCreatePromptActive = airports.create.isActive;
    const isDeletePromptActive = airports.delete.isActive;
    const isEditPromptActive = airports.edit.isActive;
    const airportsMSStatus = airports.status;
    const searchError = airports.search.error;
    const searchFilters = airports.search.filters;
    const searchResults = airports.search.results;

    return ( 
      <div className={this.props.className || ""} style={this.props.style}>
        
        {/* Header */}
        <div className="row bg-light p-2 kit-border-shadow">
          
          {/* MS Orchestration Indicators */}
          <OrchestrationHeader className="col-12 col-md-7"
            name="Airport MS"
            status={airportsMSStatus === "INACTIVE" ? "PENDING" : airportsMSStatus}
            style={{maxWidth:"30rem"}}
            onTriggerError={() => AirportsDispatcher.onError()}
            onTriggerFakeAPICall={() => AirportsDispatcher.onFakeAPICall()}
          />

          {/* Search Bar */}
          <div className="col-12 col-md-5">

            {/* Text Input */}
            <FlexRow className="mt-2" wrap="no-wrap">
              <input 
                aria-label="Search" 
                className={"form-control " + (searchError && " is-invalid kit-shake")}
                label={searchError}
                placeholder="IATA=X or City=Y"
                type="search" 
                style={{maxWidth:"15rem"}}
                onChange={(e) => this.setState({searchText: e.target.value})}
              />

              {/* Button */}
              <button 
                className="btn btn-success ml-2 text-white kit-text-shadow-thin" 
                type="submit"
                onClick={() => AirportsDispatcher.onSearchAndFilter("/search", searchText)}
              >
                search
              </button>
            </FlexRow>
          </div>
        </div>

        {/* Search Sorting & Filtering */}
        <div className={"row bg-light " + 
          ((airportsMSStatus === "INACTIVE" || airportsMSStatus === "ERROR" ||
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
              selection={airports.search.resultsPerPage}
              options={["3", "10", "25", "50"]}
              optionsName="items"
              onSelect={(e) => AirportsDispatcher.onSelectResultsPerPage(e)}
            />

            <ItemsIndexReadout
              className={"ml-2"}
              currentPage={airports.search.resultsPage}
              itemsPerPage={airports.search.resultsPerPage}
              itemsTotal={airports.search.results.length}
            />

            <Pagination
              className={"m-0 ml-2"}
              currentPage={airports.search.resultsPage}
              totalPages={Math.ceil(airports.search.results.length / Math.max(airports.search.resultsPerPage, 1))}
              onSelectPage={(e) => AirportsDispatcher.onSelectResultsPage(e)}
            />
          </FlexRow>
        </div>


        {/* Body */}
        <div className="row">
          <div className="col-12" style={{height:"80vh", overflowY: "auto"}}>
            
            {/* Error State */}
            {airportsMSStatus === "ERROR" &&
            <FlexColumn className="h-100">
              <ErrorMessage className="h1" soundAlert={true}>
                {airports.error}
              </ErrorMessage>
              <button className="btn btn-light m-3"
                onClick={() => AirportsDispatcher.onCancel()}
              >
                Back
              </button>
            </FlexColumn>}

            {/* Inactive State */}
            {airportsMSStatus === "INACTIVE" &&
            <FlexColumn className="h-100">
            <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
              name="Establishing Connection . . ." status={"PENDING"}/>
            </FlexColumn>}

            {/* Pending State */}
            {(airportsMSStatus === "PENDING" || airportsMSStatus === "INACTIVE") &&
            <FlexColumn className="h-100">
              <div className="spinner-border"/>
            </FlexColumn>}

            {/* Success State */}
            {(airportsMSStatus === "SUCCESS" &&   !isCreatePromptActive && !isDeletePromptActive && !isEditPromptActive) &&
            this.handleRenderAirportsList(searchResults)}           

            {(airportsMSStatus === "SUCCESS" && isCreatePromptActive) && 
            <CreateView/>}

            {(airportsMSStatus === "SUCCESS" && isDeletePromptActive) && 
            <DeleteView/>}

            {(airportsMSStatus === "SUCCESS" && isEditPromptActive) && 
            <EditView/>}
          </div>
        </div>

      </div>
    );
  }

  componentDidMount() {
    AirportsDispatcher.onCancel();
    Orchestration.findActiveServices(
    onError => {
      AirportsDispatcher.onError("No Orchestration connection.");
    }, onSuccess => {
      const isMSActive = onSuccess.includes("airport-service");
      if(isMSActive) AirportsDispatcher.onRequest();
      else AirportsDispatcher.onError("No Airport MS connection.");
    });
  }

  handleIncludeReferenceIDs = (isActive) => {
    this.setState({isReferenceIDsActive: isActive});
  }

  handleRenderAirportsList = (airportsList) => {
    const { airports } = Store.getState();
    const resultsDisplayed = Number(airports.search.resultsPerPage);
    const resultsStart = airports.search.resultsPerPage * (airports.search.resultsPage - 1);

    let airportsTable = [];
    if(!airportsList.length) airportsList = [airportsList];
    for(var i = resultsStart; (i < resultsStart + resultsDisplayed && i < airportsList.length); i++) {
      const airport = airportsList[i];
      const airportIataId = airport.iataId;
      if(!airportIataId) continue;

      const index = Number(i) + 1;
      airportsTable.push(
        <tr key={index}>
          <th scrop="row">{index}</th>
          <td>{airportIataId}</td>
          <td>{airportsList[i].city}</td>
          
          {/* Edit */}
          <td><button className="btn btn-info"
            onClick={() => AirportsDispatcher.onPromptEdit(airport)}>
              Edit
          </button></td>

          {/* Delete */}
          <td><button className="btn btn-primary"
            onClick={() => AirportsDispatcher.onPromptDelete(airport)}>
             Delete
          </button></td>
        </tr>
      );
    }

    return (
      <FlexColumn justify={"start"} style={{height: "95%", width: "95%"}}>
        <table className="table kit-border-shadow m-3">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">IATA ID</th>
              <th scope="col">City</th>
              <th scope="col" colSpan="2">
                <FlexRow>
                  <button className="btn btn-success text-white kit-text-shadow-thin" style={{whiteSpace: "nowrap"}}
                    onClick={() => AirportsDispatcher.onPromptCreate()}>
                    + Create New
                  </button>
                </FlexRow>
              </th>
            </tr>
          </thead>
          <tbody>
            {airportsTable}
            <tr><td colSpan="5"></td>{/* Space at end of table for aesthetic */}</tr>
          </tbody>
        </table>
      </FlexColumn>
    );
  };
}
export default AirportsDebug;