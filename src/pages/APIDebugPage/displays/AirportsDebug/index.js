// Libraries
import AirportsDispatcher from "../../../../dispatchers/AirportsDispatcher";
import React, { Component } from 'react';
import Store from "../../../../reducers/Store";

// Components
// import DeleteView from "./DeleteView";
// import EditView from "./EditView";
import ErrorMessage from "../../../../components/ErrorMessage";
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";
import OrchestrationHeader from "../OrchestrationHeader";
import Pagination from "../Pagination";

class AirportsDebug extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { airports } = Store.getState();
    const { searchText } = this.state;

    const isDeletePromptActive = airports
      ? airports.deletePrompt
      : false;

    const isEditPromptActive = airports
      ? airports.editPrompt
      : false;
  
    const airportsMSStatus = airports
      ? airports.status
      : "INACTIVE";

    const searchError = airports
      ? airports.searchError
      : null;

    const searchFilters = airports
      ? airports.searchFilters
      : [];

    const searchFiltersCount = airports
      ? airports.searchFilters.activeCount
      : 0;

    const searchResults = airports
      ? airports.searchResults
      : [];

    return ( 
      <div className="col-8 col-md-10">
        
        {/* Header */}
        <div className="row bg-light p-2 kit-border-shadow">
          
          {/* MS Orchestration Indicators */}
          <OrchestrationHeader className="col-12 col-md-7"
            name="Airport MS"
            status={airportsMSStatus}
            onTriggerError={() => AirportsDispatcher.onError()}
            onTriggerFakeAPICall={() => AirportsDispatcher.onFakeAPICall()}
          />

          {/* Search Bar */}
          <div className="col-12 col-md-5">
            {/* Search */}
            <FlexRow className="mt-2" wrap="no-wrap">
              <input 
                aria-label="Search" 
                className={"form-control " + (searchError && " is-invalid kit-shake")}
                label={searchText}
                placeholder="ID=X or Type=Y"
                type="search" 
                style={{maxWidth:"15rem"}}
                onChange={(e) => this.setState({searchText: e.target.value})}
              />
              <button 
                className="btn btn-success ml-2" 
                type="submit"
                onClick={() => AirportsDispatcher.onFindBy(searchText)}
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

              {/* # of Filters Active */}
              <div className="list-group ml-1">
                <div className="list-group-item" style={{fontSize: "0.85rem", padding:"0.5rem"}}>
                  {searchFiltersCount + " filters active"}
                </div>
              </div>
            </FlexRow>
          </div>

          {/* Pagination */}
          <Pagination className="col-12 p-2" results={airports}
            onSetNumberOfResults={(e) => AirportsDispatcher.onResultsPerPage(e)}
            onSetPageOfResults={(e) => AirportsDispatcher.onResultsPage(e)}
          />
        </div>


        {/* Body */}
        <div className="row">
          <div className="col-12 col-md-12 overflow-auto" style={{height:"80vh"}}>
            {(airportsMSStatus === "PENDING" || airportsMSStatus === "INACTIVE") &&
            <FlexColumn className="h-100">
              <div className="spinner-border"/>
            </FlexColumn>}

            {airportsMSStatus === "ERROR" &&
            <FlexColumn className="h-100">
              <ErrorMessage className="h1" soundAlert={true}>
                {airports.error}
              </ErrorMessage>
            </FlexColumn>}

            {(airportsMSStatus === "SUCCESS" && !isDeletePromptActive && !isEditPromptActive) && 
            this.handleRenderAirportsList(searchResults)}

            {/* {(airportsMSStatus === "SUCCESS" && isDeletePromptActive) && 
            <DeleteView/>}

            {(airportsMSStatus === "SUCCESS" && isEditPromptActive) && 
            <EditView/>} */}
          </div>
        </div>

      </div>
    );
  }

  componentDidMount() {
    const { orchestration } = Store.getState();
    const isMSActive = orchestration
      ? orchestration.services.list.includes("airport-service")
      : false;
    
    if(isMSActive) {
      AirportsDispatcher.onFindAll()
    } else {
      AirportsDispatcher.onError("No Airport MS connection.");
    }
  }

  handleRenderAirportsList = (airportsList) => {
    const { airports } = Store.getState();

    const resultsDisplayed = airports
      ? airports.searchResultsPerPage
      : 0;

    const resultsStart = airports
      ? airports.searchResultsPerPage * (airports.searchResultsPage - 1)
      : 0;

    let airportsTable = [];
    if(!airportsList.length) airportsList = [airportsList];
    for(var i = resultsStart; i < airportsList.length; i++) {
      if(i < resultsStart + resultsDisplayed) {
        
        const airportId = airportsList[i].id;
        if(!airportId) continue;

        const index = Number(i) + 1;
        airportsTable.push(
          <tr key={index}>
            <th scrop="row">{index}</th>
            <td>{airportId}</td>
            <td>{airportsList[i].typeId}</td>
            
            {/* Edit */}
            <td><button className="btn btn-info" 
              onClick={() => AirportsDispatcher.onPromptEdit(airportId)}>
                Edit
            </button></td>

            {/* Delete */}
            <td><button className="btn btn-primary"
                onClick={() => AirportsDispatcher.onPromptDelete(airportId)}>
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
              <th scope="col">Type ID</th>
              <th scope="col"></th>
              <th scope="col"></th>
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