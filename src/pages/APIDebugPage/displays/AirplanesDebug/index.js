// Libraries
import AirplanesDispatcher from "../../../../dispatchers/AirplanesDispatcher";
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

class AirplanesDebug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerms: ""
    };
  }

  render() { 
    const { orchestration, airplanes } = Store.getState();
    const { searchTerms } = this.state;
    const isCreatePromptActive = airplanes.create.isActive;
    const isDeletePromptActive = airplanes.delete.isActive;
    const isEditPromptActive = airplanes.edit.isActive;
    const isMSActive = orchestration.services.includes("airplane-service");
    const airplanesMSStatus = airplanes.status;
    const searchError = airplanes.search.error;
    const searchFilters = airplanes.search.filters;
    const searchResults = airplanes.search.results;

    return ( 
      <div className={"row" + (this.props.className || "")} style={this.props.style}>
        
        {/* Header */}
        <div className="col-12 bg-light kit-border-shadow">
          <div className="row mt-1">
            {/* MS Orchestration Indicators */}
            <OrchestrationHeader className="col-12 col-md-6"
              name="Airplane MS"
              status={airplanesMSStatus === "INACTIVE" ? "PENDING" : airplanesMSStatus}
              style={{maxWidth:"30rem"}}
              onTriggerError={() => AirplanesDispatcher.onError()}
              onTriggerFakeAPICall={() => AirplanesDispatcher.onFakeAPICall(searchResults)}
            />

            {/* Search Bar */}
            <div className="col-12 col-md-5">
              {/* Search */}
              <FlexRow className="mt-1" justify="end" wrap="no-wrap">
                <input 
                  aria-label="Search" 
                  className={"form-control " + (searchError && " is-invalid kit-shake")}
                  label={searchError}
                  placeholder="ID, TypeID"
                  type="search" 
                  style={{maxWidth:"15rem"}}
                  onChange={(e) => this.setState({searchTerms: e.target.value})}
                />
                <button 
                  className="btn btn-success ml-2 text-white kit-text-shadow-thin" 
                  type="submit"
                  onClick={() => AirplanesDispatcher.onSearchAndFilter("/search", searchTerms)}
                >
                  search
                </button>
              </FlexRow>
            </div>
          </div>
        </div>

        {/* Search Sorting & Filtering */}
        <div className={"col-12 bg-light " +
          ((airplanesMSStatus === "INACTIVE" || airplanesMSStatus === "ERROR" ||
           isCreatePromptActive || isDeletePromptActive || isEditPromptActive) && 
          "kit-opacity-50 kit-no-user kit-pointer-none")}
        >
          
          {/* Filters */}
          <div className="row p-2 justify-content-center p-2">

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
                selection={airplanes.search.resultsPerPage}
                options={["3", "10", "25", "50"]}
                optionsName="items"
                onSelect={(e) => AirplanesDispatcher.onSelectResultsPerPage(e)}
              />
            </FlexColumn>

            <FlexColumn className="col-6 col-md-3 text-center">
              <ItemsIndexReadout
                currentPage={airplanes.search.resultsPage}
                itemsPerPage={airplanes.search.resultsPerPage}
                itemsTotal={airplanes.search.results.length}
              />
            </FlexColumn>

            <FlexColumn className="col-8 mt-2 col-md-3 text-center">
              <Pagination
                currentPage={airplanes.search.resultsPage}
                totalPages={Math.ceil(airplanes.search.results.length / Math.max(airplanes.search.resultsPerPage, 1))}
                onSelectPage={(e) => AirplanesDispatcher.onSelectResultsPage(e)}
              />
            </FlexColumn>
          </div>
        </div>


        {/* Body */}
        <div className="col-12" style={{overflow: "auto"}}>

        {/* Error State */}
        {airplanesMSStatus === "ERROR" &&
          <FlexColumn className="h-100">
            <ErrorMessage className="h1" soundAlert={true}>
              {isMSActive ? airplanes.error : "No Airplane MS connection."}
            </ErrorMessage>
            <button className="btn btn-light m-3"
              onClick={() => AirplanesDispatcher.onCancel()}
            >
              Back
            </button>
          </FlexColumn>}

          {/* Inactive State */}
          {airplanesMSStatus === "INACTIVE" &&
          <FlexColumn style={{minHeight:"10rem"}}>
          <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
            name="Establishing Connection . . ." status={"PENDING"}/>
          </FlexColumn>}

          {/* Pending State */}
          {(airplanesMSStatus === "PENDING" || airplanesMSStatus === "INACTIVE") &&
          <FlexColumn style={{minHeight:"10rem"}}>
            <div className="spinner-border"/>
          </FlexColumn>}

          {/* Success State */}
          {(airplanesMSStatus === "SUCCESS" && !isCreatePromptActive && !isDeletePromptActive && !isEditPromptActive) && 
          this.handleRenderAirplanesList(searchResults)}

          {(airplanesMSStatus === "SUCCESS" && isCreatePromptActive) && 
          <CreateView/>}

          {(airplanesMSStatus === "SUCCESS" && isDeletePromptActive) && 
          <DeleteView/>}

          {(airplanesMSStatus === "SUCCESS" && isEditPromptActive) && 
          <EditView/>}
        </div>
      </div>
    );
  }

  componentDidMount() {
    AirplanesDispatcher.onCancel();
    OrchestrationDispatcher.onFindActiveServices();
    AirplanesDispatcher.onRequest();
  }

  handleRenderAirplanesList = (airplanesList) => {
    const { airplanes } = Store.getState();
    const resultsDisplayed = Number(airplanes.search.resultsPerPage);
    const resultsStart = airplanes.search.resultsPerPage * (airplanes.search.resultsPage - 1);

    let airplanesTable = [];
    if (!airplanesList.length) airplanesList = [airplanesList];
    for (var i = resultsStart; (i < resultsStart + resultsDisplayed && i < airplanesList.length); i++) {
      const airplaneId = airplanesList[i].airplaneId;
      if (!airplaneId) continue;

      const index = Number(i) + 1;
      airplanesTable.push(
        <tr key={index}>
          <th scrop="row">{index}</th>
          <td>{airplaneId}</td>
          <td>{airplanesList[i].airplaneTypeId}</td>

          {/* Edit */}
          <td><button className="btn btn-info"
            onClick={() => AirplanesDispatcher.onPromptEdit("/"+airplaneId)}>
            Edit
          </button></td>

          {/* Delete */}
          <td><button className="btn btn-primary"
            onClick={() => AirplanesDispatcher.onPromptDelete("/"+airplaneId)}>
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
              <th scope="col">Type ID</th>
              <th scope="col" colSpan="2">
                <FlexRow>
                  <button className="btn btn-success text-white kit-text-shadow-thin" style={{ whiteSpace: "nowrap" }}
                    onClick={() => AirplanesDispatcher.onPromptCreate()}>
                    + Create New
                  </button>
                </FlexRow>
              </th>
            </tr>
          </thead>
          <tbody>
            {airplanesTable}
            <tr><td colSpan="5"></td>{/* Space at end of table for aesthetic */}</tr>
          </tbody>
        </table>
      </FlexColumn>
    );
  }
}
export default AirplanesDebug;