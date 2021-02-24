// Libraries
import AirplanesDispatcher from "../../../../dispatchers/AirplanesDispatcher";
import AirplanesDebugDispatcher from "../../../../dispatchers/AirplanesDebugDispatcher";
import React, { Component } from 'react';
import RootReducer from "../../../../reducers/RootReducer";

// Components
// import DeleteView from "./DeleteView";
// import EditView from "./EditView";
import ErrorMessage from "../../../../components/ErrorMessage";
import FlexColumn from "../../../../components/FlexColumn";
import FlexRow from "../../../../components/FlexRow";
import OrchestrationHeader from "../OrchestrationHeader";
import Pagination from "../Pagination";

class AirplanesDebug extends Component {
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
    const { airplanes } = RootReducer.getState();
    const { searchText } = this.state;

    const isDeletePromptActive = airplanes
      ? airplanes.deletePrompt
      : false;

    const isEditPromptActive = airplanes
      ? airplanes.editPrompt
      : false;
  
    const airplanesMSStatus = airplanes
      ? airplanes.status
      : "INACTIVE";

    const searchError = airplanes
      ? airplanes.searchError
      : null;

    const searchFilters = airplanes
      ? airplanes.searchFilters
      : [];

    const searchFiltersCount = airplanes
      ? airplanes.searchFilters.activeCount
      : 0;

    const searchResults = airplanes
      ? airplanes.searchResults
      : [];

    return ( 
      <div className="col-8 col-md-10">
        
        {/* Header */}
        <div className="row bg-light p-2 kit-border-shadow">
          
          {/* MS Orchestration Indicators */}
          <OrchestrationHeader className="col-12 col-md-7"
            name="Airplane MS"
            status={airplanesMSStatus}
            onTriggerError={() => AirplanesDispatcher.onError()}
            onTriggerFakeAPICall={() => AirplanesDebugDispatcher.onFakeAPICall()}
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
                onClick={() => AirplanesDispatcher.onFindBy(searchText)}
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
          <Pagination className="col-12 p-2" results={airplanes}
            onSetNumberOfResults={(e) => AirplanesDispatcher.onResultsPerPage(e)}
            onSetPageOfResults={(e) => AirplanesDispatcher.onResultsPage(e)}
          />
        </div>


        {/* Body */}
        <div className="row">
          <div className="col-12 col-md-12 overflow-auto" style={{height:"80vh"}}>
            {(airplanesMSStatus === "PENDING" || airplanesMSStatus === "INACTIVE") &&
            <FlexColumn className="h-100">
              <div className="spinner-border"/>
            </FlexColumn>}

            {airplanesMSStatus === "ERROR" &&
            <FlexColumn className="h-100">
              <ErrorMessage className="h1" soundAlert={true}>
                {airplanes.error}
              </ErrorMessage>
            </FlexColumn>}

            {(airplanesMSStatus === "SUCCESS" && !isDeletePromptActive && !isEditPromptActive) && 
            this.handleRenderAirplanesList(searchResults)}

            {/* {(airplanesMSStatus === "SUCCESS" && isDeletePromptActive) && 
            <DeleteView/>}

            {(airplanesMSStatus === "SUCCESS" && isEditPromptActive) && 
            <EditView/>} */}
          </div>
        </div>

      </div>
    );
  }

  componentDidMount() {
    const { orchestration } = RootReducer.getState();
    const isMSActive = orchestration
      ? orchestration.services.list.includes("airplane-service")
      : false;
    
    if(isMSActive) {
      AirplanesDispatcher.onFindAll()
    } else {
      AirplanesDispatcher.onError("No Airplane MS connection.");
    }
  }

  handleRenderAirplanesList = (airplanesList) => {
    const { airplanes } = RootReducer.getState();

    const resultsDisplayed = airplanes
      ? airplanes.searchResultsPerPage
      : 0;

    const resultsStart = airplanes
      ? airplanes.searchResultsPerPage * (airplanes.searchResultsPage - 1)
      : 0;

    let airplanesTable = [];
    if(!airplanesList.length) airplanesList = [airplanesList];
    for(var i = resultsStart; i < airplanesList.length; i++) {
      if(i < resultsStart + resultsDisplayed) {
        
        const airplaneId = airplanesList[i].id;
        if(!airplaneId) continue;

        const index = Number(i) + 1;
        airplanesTable.push(
          <tr key={index}>
            <th scrop="row">{index}</th>
            <td>{airplaneId}</td>
            <td>{airplanesList[i].typeId}</td>
            
            {/* Edit */}
            <td><button className="btn btn-info" 
              onClick={() => AirplanesDispatcher.onPromptEdit(airplaneId)}>
                Edit
            </button></td>

            {/* Delete */}
            <td><button className="btn btn-primary"
                onClick={() => AirplanesDispatcher.onPromptDelete(airplaneId)}>
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
            {airplanesTable}
            <tr><td colSpan="5"></td>{/* Space at end of table for aesthetic */}</tr>
          </tbody>
        </table>
      </FlexColumn>
    );
  };
}
export default AirplanesDebug;