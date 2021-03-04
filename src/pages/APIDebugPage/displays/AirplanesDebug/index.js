// Libraries
import AirplanesDispatcher from "../../../../dispatchers/AirplanesDispatcher";
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

class AirplanesDebug extends Component {
  constructor(props) {
    super(props);
    const { airplanes } = Store.getState();
    this.state = {
      
    };
  }
  render() { 
    const { airplanes } = Store.getState();
    const { searchText } = this.state;
    const isCreatePromptActive = airplanes.create.isActive;
    const isDeletePromptActive = airplanes.delete.isActive;
    const isEditPromptActive = airplanes.edit.isActive;
    const airplanesMSStatus = airplanes.status;
    const searchError = airplanes.search.error;
    const searchFilters = airplanes.search.filters;
    const searchResults = airplanes.search.results;

    return ( 
      <div className={this.props.className || ""} style={this.props.style}>
        
        {/* Header */}
        <div className="row bg-light p-2 kit-border-shadow">
          
          {/* MS Orchestration Indicators */}
          <OrchestrationHeader className="col-12 col-md-7"
            name="Airplane MS"
            status={airplanesMSStatus === "INACTIVE" ? "PENDING" : airplanesMSStatus}
            style={{maxWidth:"30rem"}}
            onTriggerError={() => AirplanesDispatcher.onError()}
            onTriggerFakeAPICall={() => AirplanesDispatcher.onFakeAPICall()}
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
                onClick={() => AirplanesDispatcher.onFindBy(searchText)}
              >
                search
              </button>
            </FlexRow>
          </div>
        </div>

        {/* Search Sorting & Filtering */}
        <div className={"row bg-light " + 
          ((airplanesMSStatus === "INACTIVE" || airplanesMSStatus === "ERROR" ||
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
              selection={airplanes.search.resultsPerPage}
              options={["3", "10", "25", "50"]}
              optionsName="items"
              onSelect={(e) => AirplanesDispatcher.onResultsPerPage(e)}
            />

            <ItemsIndexReadout
              className={"ml-2"}
              currentPage={airplanes.search.resultsPage}
              itemsPerPage={airplanes.search.resultsPerPage}
              itemsTotal={airplanes.search.results.length}
            />

            <Pagination
              className={"m-0 ml-2"}
              currentPage={airplanes.search.resultsPage}
              totalPages={Math.ceil(airplanes.search.results.length / Math.max(airplanes.search.resultsPerPage, 1))}
              onSelectPage={(e) => AirplanesDispatcher.onResultsPage(e)}
            />
          </FlexRow>
        </div>


        {/* Body */}
        <div className="row">
          <div className="col-12" style={{height:"80vh", overflowY: "auto"}}>
            
            {/* Error State */}
            {airplanesMSStatus === "ERROR" &&
            <FlexColumn className="h-100">
              <ErrorMessage className="h1" soundAlert={true}>
                {airplanes.error}
              </ErrorMessage>
              <button className="btn btn-light m-3"
                onClick={() => AirplanesDispatcher.onCancel()}
              >
                Back
              </button>
            </FlexColumn>}

            {/* Inactive State */}
            {airplanesMSStatus === "INACTIVE" &&
            <FlexColumn className="h-100">
            <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
              name="Establishing Connection . . ." status={"PENDING"}/>
            </FlexColumn>}

            {/* Pending State */}
            {(airplanesMSStatus === "PENDING" || airplanesMSStatus === "INACTIVE") &&
            <FlexColumn className="h-100">
              <div className="spinner-border"/>
            </FlexColumn>}

            {/* Success State */}
            {(airplanesMSStatus === "SUCCESS" &&   !isCreatePromptActive && !isDeletePromptActive && !isEditPromptActive) &&
            this.handleRenderAirplanesList(searchResults)}           

            {(airplanesMSStatus === "SUCCESS" && isCreatePromptActive) && 
            <CreateView/>}

            {(airplanesMSStatus === "SUCCESS" && isDeletePromptActive) && 
            <DeleteView/>}

            {(airplanesMSStatus === "SUCCESS" && isEditPromptActive) && 
            <EditView/>}
          </div>
        </div>

      </div>
    );
  }

  componentDidMount() {
    AirplanesDispatcher.onCancel();
    Orchestration.findActiveServices(
    onError => {
      AirplanesDispatcher.onError("No Orchestration connection.");
    }, onSuccess => {
      const isMSActive = onSuccess.includes("airplane-service");
      if(isMSActive) AirplanesDispatcher.onFindAll();
      else AirplanesDispatcher.onError("No Airplane MS connection.");
    });
  }

  handleIncludeReferenceIDs = (isActive) => {
    this.setState({isReferenceIDsActive: isActive});
  }

  handleRenderAirplanesList = (airplanesList) => {
    const { airplanes } = Store.getState();
    const resultsDisplayed = Number(airplanes.search.resultsPerPage);
    const resultsStart = airplanes.search.resultsPerPage * (airplanes.search.resultsPage - 1);

    let airplanesTable = [];
    if(!airplanesList.length) airplanesList = [airplanesList];
    for(var i = resultsStart; (i < resultsStart + resultsDisplayed && i < airplanesList.length); i++) {
      const airplane = airplanesList[i];
      const airplaneId = airplane.id;
      if(!airplaneId) continue;

      const index = Number(i) + 1;
      airplanesTable.push(
        <tr key={index}>
          <th scrop="row">{index}</th>
          <td>{airplaneId}</td>
          <td>{airplanesList[i].typeId}</td>
          
          {/* Edit */}
          <td><button className="btn btn-info"
            onClick={() => AirplanesDispatcher.onPromptEdit(airplane)}>
              Edit
          </button></td>

          {/* Delete */}
          <td><button className="btn btn-primary"
            onClick={() => AirplanesDispatcher.onPromptDelete(airplane)}>
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
                    onClick={() => AirplanesDispatcher.onPromptCreate()}>
                    + Create New
                  </button>
                </FlexRow>
              </th>
            </tr>
          </thead>
          <tbody>
            {airplanesTable}
            <tr><td colSpan="7"></td>{/* Space at end of table for aesthetic */}</tr>
          </tbody>
        </table>
      </FlexColumn>
    );
  };
}
export default AirplanesDebug;