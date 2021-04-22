// Libraries
import RoutesDispatcher from "../../../../dispatchers/RoutesDispatcher";
import React, { Component } from "react";
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
import Pagination from "../../../../components/Pagination";

class RoutesDebug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerms: "",
      currentSort: "up",
      sortedItem: "routeId",
    };
  }

  render() {
    const { routes } = Store.getState();
    const { searchTerms } = this.state;

    // Microservice Status
    const routesMSHealth = routes.health;
    const routesMSStatus = routes.status;

    // Modal Toggles
    const isCreatePromptActive = routes.create.isActive;
    const isDeletePromptActive = routes.delete.isActive;
    const isEditPromptActive = routes.edit.isActive;

    // Search Results vars
    const searchError = routes.search.error;
    const searchResults = routes.search.results;

    return (
      <div
        className={"row" + (this.props.className || "")}
        style={this.props.style}
      >
        {/* Header */}
        <div className="col-12 bg-light kit-border-shadow">
          <div className="row p-2">

            {/* Search Bar */}
            <div className="col-12">
              {/* Search */}
              <FlexRow className="mt-1" justify="end" wrap="no-wrap">
                <input
                  aria-label="Search"
                  className={
                    "form-control " + (searchError && " is-invalid kit-shake")
                  }
                  label={searchError}
                  placeholder="IATA ID"
                  type="search"
                  style={{ maxWidth: "15rem" }}
                  onChange={(e) =>
                    this.setState({ searchTerms: e.target.value })
                  }
                />
                <button
                  className="btn btn-success ml-2 text-white kit-text-shadow-thin"
                  type="submit"
                  onClick={() =>
                    RoutesDispatcher.onSearchAndFilter("/search", searchTerms)
                  }
                >
                  search
                </button>
              </FlexRow>
            </div>
          </div>
        </div>

        {/* Search Sorting & Filtering */}
        <div
          className={
            "col-12 bg-light " +
            ((routesMSStatus === "INACTIVE" ||
              routesMSStatus === "ERROR" ||
              isCreatePromptActive ||
              isDeletePromptActive ||
              isEditPromptActive) &&
              "kit-opacity-50 kit-no-user kit-pointer-none")
          }
        >
          {/* Resuts Count & Page Selection */}
          <div className="row justify-content-center pb-1">

            {/* DropDown */}
            <FlexColumn className="col-auto text-center mt-2">
              <DropDown
                buttonClassName="btn-secondary dropdown-toggle"
                selection={routes.search.resultsPerPage}
                options={["3", "10", "25", "50"]}
                optionsName="items"
                onSelect={(e) => RoutesDispatcher.onSelectItemsPerPage(e)}
              />
            </FlexColumn>

            {/* Readout */}
            <FlexColumn className="col-auto text-center mt-2">
              <ItemsIndexReadout
                currentPage={routes.search.resultsPage}
                itemsPerPage={routes.search.resultsPerPage}
                itemsTotal={routes.search.results.length}
              />
            </FlexColumn>

            {/* Pagination */}
            <FlexColumn className="col-auto text-center mt-2">
              <Pagination
                currentPage={routes.search.resultsPage}
                totalPages={Math.ceil(
                  routes.search.results.length /
                    Math.max(routes.search.resultsPerPage, 1)
                )}
                onSelectPage={(e) => RoutesDispatcher.onSelectItemsPage(e)}
              />
            </FlexColumn>
          </div>
        </div>

        {/* Body */}
        <div className="col-12" style={{ overflow: "auto" }}>
          {/* Error State */}
          {routesMSStatus === "ERROR" && (
            <FlexColumn className="h-100">
              <ErrorMessage className="h1" soundAlert={true}>
                {routesMSHealth === "HEALTHY"
                  ? routes.error
                  : "No Route MS connection."
                }
              </ErrorMessage>
              <button
                className="btn btn-light m-3"
                onClick={() => RoutesDispatcher.onCancel()}
              >
                Back
              </button>
            </FlexColumn>
          )}

          {/* Inactive State */}
          {routesMSStatus === "INACTIVE" && (
            <FlexColumn style={{ minHeight: "10rem" }}>
              <ChangeOperationReadout
                className="m-1"
                style={{ minHeight: "4rem" }}
                name="Establishing Connection . . ."
                status={"PENDING"}
              />
            </FlexColumn>
          )}

          {/* Pending State */}
          {(routesMSStatus === "PENDING" || routesMSStatus === "INACTIVE") && (
            <FlexColumn style={{ minHeight: "10rem" }}>
              <div className="spinner-border" />
            </FlexColumn>
          )}

          {/* Success State */}
          {routesMSStatus === "SUCCESS" &&
            !isCreatePromptActive &&
            !isDeletePromptActive &&
            !isEditPromptActive &&
            this.handleRenderRoutesList(searchResults)}

          {routesMSStatus === "SUCCESS" && isCreatePromptActive && (
            <CreateView />
          )}

          {routesMSStatus === "SUCCESS" && isDeletePromptActive && (
            <DeleteView />
          )}

          {routesMSStatus === "SUCCESS" && isEditPromptActive && <EditView />}
        </div>
      </div>
    );
  }

  componentDidMount() {
    RoutesDispatcher.onCancel();
    RoutesDispatcher.onHealth();
    RoutesDispatcher.onRequest();
  }

  onSortChange = (e) => {
    const { currentSort } = this.state;
    let nextSort;

    if (currentSort === "down") nextSort = "up";
    else nextSort = "down";

    this.setState({
      currentSort: nextSort,
      sortedItem: e.target.value,
    });
  };

  handleRenderRoutesList = (routesList) => {
    if (!routesList.length) routesList = [routesList];

    const { routes } = Store.getState();
    const resultsDisplayed = Number(routes.search.resultsPerPage);
    const resultsStart =
      routes.search.resultsPerPage * (routes.search.resultsPage - 1);

    const routesTable = [];
    if (this.state.sortedItem === "routeOriginIataId") {
      routesList.sort((a, b) => {
        return this.state.currentSort === "up"
          ? a.routeOriginIataId.localeCompare(b.routeOriginIataId)
          : b.routeOriginIataId.localeCompare(a.routeOriginIataId);
      });
    } else if (this.state.sortedItem === "routeDestinationIataId") {
      routesList.sort((a, b) => {
        return this.state.currentSort === "up"
          ? a.routeDestinationIataId.localeCompare(b.routeDestinationIataId)
          : b.routeDestinationIataId.localeCompare(a.routeDestinationIataId);
      });
    } else {
      routesList.sort((a, b) => {
        return this.state.currentSort === "up"
          ? a.routeId - b.routeId
          : b.routeId - a.routeId;
      });
    }

    for (
      let i = resultsStart;
      i < resultsStart + resultsDisplayed && i < routesList.length;
      i++
    ) {
      const routeId = routesList[i].routeId;
      if (routeId) {
        const index = Number(i) + 1;
        routesTable.push(
          <tr key={index}>
            <th scrop="row">{index}</th>
            <td>{routeId}</td>
            <td>{routesList[i].routeOrigin.airportIataId}</td>
            <td>{routesList[i].routeDestination.airportIataId}</td>
            {/* Edit */}
            <td>
              <button
                className="btn btn-info"
                onClick={() => RoutesDispatcher.onPromptEdit("/" + routeId)}
              >
                Edit
              </button>
            </td>

            {/* Delete */}
            <td>
              <button
                className="btn btn-primary"
                onClick={() => RoutesDispatcher.onPromptDelete("/" + routeId)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      }
    }

    return (
      <FlexColumn justify={"start"} style={{ height: "99%", width: "99%" }}>
        <table className="table kit-border-shadow m-3">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">
                Route ID
                <button
                  className="btn text-white"
                  value="routeId"
                  onClick={this.onSortChange}
                >
                  ⇅
                </button>
              </th>
              <th scope="col">
                Origin Iata ID
                <button
                  className="btn text-white"
                  value="routeOriginIataId"
                  onClick={this.onSortChange}
                >
                  ⇅
                </button>
              </th>
              <th scope="col">
                Destination Iata ID
                <button
                  className="btn text-white"
                  value="routeDestinationIataId"
                  onClick={this.onSortChange}
                >
                  ⇅
                </button>
              </th>
              <th scope="col" colSpan="2">
                <FlexRow>
                  <button
                    className="btn btn-success text-white kit-text-shadow-thin"
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => RoutesDispatcher.onPromptCreate()}
                  >
                    + Create New
                  </button>
                </FlexRow>
              </th>
            </tr>
          </thead>
          <tbody>
            {routesTable}
            <tr>
              <td colSpan="5"></td>
              {/* Space at end of table for aesthetic */}
            </tr>
          </tbody>
        </table>
      </FlexColumn>
    );
  };
}
export default RoutesDebug;
