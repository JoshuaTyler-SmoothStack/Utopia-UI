// Libraries
import RoutesDispatcher from "../../../../dispatchers/RoutesDispatcher";
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

class RoutesDebug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerms: "",
      currentSort: "up",
      sortedItem: "routeId"
    };
  }

  render() { 
    const { orchestration, routes } = Store.getState();
    const { searchTerms } = this.state;
    const isCreatePromptActive = routes.create.isActive;
    const isDeletePromptActive = routes.delete.isActive;
    const isEditPromptActive = routes.edit.isActive;
    const isMSActive = orchestration.services.includes("route-service");
    const routesMSStatus = routes.status;
    const searchError = routes.search.error;
    const searchFilters = routes.search.filters;
    const searchResults = routes.search.results;

    return ( 
      <div className={"row" + (this.props.className || "")} style={this.props.style}>
        
        {/* Header */}
        <div className="col-12 bg-light kit-border-shadow">
          <div className="row mt-1">
            {/* MS Orchestration Indicators */}
            <OrchestrationHeader className="col-12 col-md-6"
              name="Route MS"
              status={routesMSStatus === "INACTIVE" ? "PENDING" : routesMSStatus}
              style={{maxWidth:"30rem"}}
              onTriggerError={() => RoutesDispatcher.onError()}
              onTriggerFakeAPICall={() => RoutesDispatcher.onFakeAPICall(searchResults)}
            />

            {/* Search Bar */}
            <div className="col-12 col-md-5">
              {/* Search */}
              <FlexRow className="mt-1" justify="end" wrap="no-wrap">
                <input 
                  aria-label="Search" 
                  className={"form-control " + (searchError && " is-invalid kit-shake")}
                  label={searchError}
                  placeholder="IATA ID"
                  type="search" 
                  style={{maxWidth:"15rem"}}
                  onChange={(e) => this.setState({searchTerms: e.target.value})}
                />
                <button 
                  className="btn btn-success ml-2 text-white kit-text-shadow-thin" 
                  type="submit"
                  onClick={() => RoutesDispatcher.onSearchAndFilter("/search", searchTerms)}
                >
                  search
                </button>
              </FlexRow>
            </div>
          </div>
        </div>

        {/* Search Sorting & Filtering */}
        <div className={"col-12 bg-light " +
          ((routesMSStatus === "INACTIVE" || routesMSStatus === "ERROR" ||
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
                buttonClassName="btn-secondary dropdown-toggle"
                selection={routes.search.resultsPerPage}
                options={["3", "10", "25", "50"]}
                optionsName="items"
                onSelect={(e) => RoutesDispatcher.onSelectResultsPerPage(e)}
              />
            </FlexColumn>

            <FlexColumn className="col-6 col-md-3 text-center">
              <ItemsIndexReadout
                currentPage={routes.search.resultsPage}
                itemsPerPage={routes.search.resultsPerPage}
                itemsTotal={routes.search.results.length}
              />
            </FlexColumn>

            <FlexColumn className="col-8 mt-2 col-md-3 text-center">
              <Pagination
                currentPage={routes.search.resultsPage}
                totalPages={Math.ceil(routes.search.results.length / Math.max(routes.search.resultsPerPage, 1))}
                onSelectPage={(e) => RoutesDispatcher.onSelectResultsPage(e)}
              />
            </FlexColumn>
          </div>
        </div>


        {/* Body */}
        <div className="col-12" style={{overflow: "auto"}}>

        {/* Error State */}
        {routesMSStatus === "ERROR" &&
          <FlexColumn className="h-100">
            <ErrorMessage className="h1" soundAlert={true}>
              {isMSActive ? routes.error : "No Route MS connection."}
            </ErrorMessage>
            <button className="btn btn-light m-3"
              onClick={() => RoutesDispatcher.onCancel()}
            >
              Back
            </button>
          </FlexColumn>}

          {/* Inactive State */}
          {routesMSStatus === "INACTIVE" &&
          <FlexColumn style={{minHeight:"10rem"}}>
          <ChangeOperationReadout className="m-1" style={{minHeight: "4rem"}} 
            name="Establishing Connection . . ." status={"PENDING"}/>
          </FlexColumn>}

          {/* Pending State */}
          {(routesMSStatus === "PENDING" || routesMSStatus === "INACTIVE") &&
          <FlexColumn style={{minHeight:"10rem"}}>
            <div className="spinner-border"/>
          </FlexColumn>}

          {/* Success State */}
          {(routesMSStatus === "SUCCESS" && !isCreatePromptActive && !isDeletePromptActive && !isEditPromptActive) && 
          this.handleRenderRoutesList(searchResults)}

          {(routesMSStatus === "SUCCESS" && isCreatePromptActive) && 
          <CreateView/>}

          {(routesMSStatus === "SUCCESS" && isDeletePromptActive) && 
          <DeleteView/>}

          {(routesMSStatus === "SUCCESS" && isEditPromptActive) && 
          <EditView/>}
        </div>
      </div>
    );
  }

  componentDidMount() {
    RoutesDispatcher.onCancel();
    OrchestrationDispatcher.onFindActiveServices();
    RoutesDispatcher.onRequest();
  }

  onSortChange = (e) => {
		const { currentSort } = this.state;
		let nextSort;

		if (currentSort === 'down') nextSort = 'up';
		else if (currentSort === 'up') nextSort = 'down';

		this.setState({
			currentSort: nextSort,
      sortedItem: e.target.value
		});
	};

  handleRenderRoutesList = (routesList) => {
    const { routes } = Store.getState();
    const resultsDisplayed = Number(routes.search.resultsPerPage);
    const resultsStart = routes.search.resultsPerPage * (routes.search.resultsPage - 1);

    let routesTable = [];
    if(this.state.sortedItem === "routeId")
    routesList.sort((a, b) => {
      return this.state.currentSort === 'up' ? a.routeId-b.routeId : b.routeId-a.routeId;
    });
    else if(this.state.sortedItem === "routeOriginIataId")
    routesList.sort((a, b) => {
      return this.state.currentSort === 'up' ? a.routeOriginIataId.localeCompare(b.routeOriginIataId) : b.routeOriginIataId.localeCompare(a.routeOriginIataId);
    });
    else if(this.state.sortedItem === "routeDestinationIataId")
    routesList.sort((a, b) => {
      return this.state.currentSort === 'up' ? a.routeDestinationIataId.localeCompare(b.routeDestinationIataId) : b.routeDestinationIataId.localeCompare(a.routeDestinationIataId);
    });

    if (!routesList.length) routesList = [routesList];
    for (var i = resultsStart; (i < resultsStart + resultsDisplayed && i < routesList.length); i++) {
      const routeId = routesList[i].routeId;
      if (!routeId) continue;

      const index = Number(i) + 1;
      routesTable.push(
        <tr key={index}>
          <th scrop="row">{index}</th>
          <td>{routeId}</td>
          <td>{routesList[i].routeOriginIataId}</td>
          <td>{routesList[i].routeDestinationIataId}</td>
          {/* Edit */}
          <td><button className="btn btn-info"
            onClick={() => RoutesDispatcher.onPromptEdit("/"+routeId)}>
            Edit
          </button></td>

          {/* Delete */}
          <td><button className="btn btn-primary"
            onClick={() => RoutesDispatcher.onPromptDelete("/"+routeId)}>
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
              <th scope="col">Route ID<button className="btn text-white" value="routeId" onClick={this.onSortChange}>⇅</button></th>
              <th scope="col">Origin Iata ID<button className="btn text-white" value="routeOriginIataId" onClick={this.onSortChange}>⇅</button></th>
              <th scope="col">Destination Iata ID<button className="btn text-white" value="routeDestinationIataId" onClick={this.onSortChange}>⇅</button></th>
              <th scope="col" colSpan="2">
                <FlexRow>
                  <button className="btn btn-success text-white kit-text-shadow-thin" style={{ whiteSpace: "nowrap" }}
                    onClick={() => RoutesDispatcher.onPromptCreate()}>
                    + Create New
                  </button>
                </FlexRow>
              </th>
            </tr>
          </thead>
          <tbody>
            {routesTable}
            <tr><td colSpan="5"></td>{/* Space at end of table for aesthetic */}</tr>
          </tbody>
        </table>
      </FlexColumn>
    );
  }
}
export default RoutesDebug;