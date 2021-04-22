// Libraries
import AirportsDispatcher from "../../../../dispatchers/AirportsDispatcher";
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

class AirportsDebug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerms: "",
      currentSort: "up",
      sortedItem: "",
    };
  }

  render() {
    const { airports } = Store.getState();
    const { searchTerms } = this.state;

    // Microservice Status
    const airportsMSHealth = airports.health;
    const airportsMSStatus = airports.status;

    // Modal Toggles
    const isCreatePromptActive = airports.create.isActive;
    const isDeletePromptActive = airports.delete.isActive;
    const isEditPromptActive = airports.edit.isActive;

    // Search Results vars
    const searchError = airports.search.error;
    const searchResults = airports.search.results;

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
                  placeholder="IATA ID, City"
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
                    AirportsDispatcher.onSearchAndFilter("/search", searchTerms)
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
            ((airportsMSStatus === "INACTIVE" ||
              airportsMSStatus === "ERROR" ||
              isCreatePromptActive ||
              isDeletePromptActive ||
              isEditPromptActive) &&
              "kit-opacity-50 kit-no-user kit-pointer-none")
          }
        >
          {/* Resuts Count & Page Selection */}
          <div className="row justify-content-center pb-1">
            <FlexColumn className="col-auto text-center mt-2">
              <DropDown
                buttonClassName="btn-secondary dropdown-toggle"
                selection={airports.search.resultsPerPage}
                options={["3", "10", "25", "50"]}
                optionsName="items"
                onSelect={(e) => AirportsDispatcher.onSelectItemsPerPage(e)}
              />
            </FlexColumn>

            <FlexColumn className="col-auto text-center mt-2">
              <ItemsIndexReadout
                currentPage={airports.search.resultsPage}
                itemsPerPage={airports.search.resultsPerPage}
                itemsTotal={airports.search.results.length}
              />
            </FlexColumn>

            <FlexColumn className="col-auto text-center mt-2">
              <Pagination
                currentPage={airports.search.resultsPage}
                totalPages={Math.ceil(
                  airports.search.results.length /
                    Math.max(airports.search.resultsPerPage, 1)
                )}
                onSelectPage={(e) => AirportsDispatcher.onSelectItemsPage(e)}
              />
            </FlexColumn>
          </div>
        </div>

        {/* Body */}
        <div className="col-12" style={{ overflow: "auto" }}>
          {/* Error State */}
          {airportsMSStatus === "ERROR" && (
            <FlexColumn className="h-100">
              <ErrorMessage className="h1" soundAlert={true}>
                {airportsMSHealth === "HEALTHY" ? airports.error : "No Airport MS connection."}
              </ErrorMessage>
              <button
                className="btn btn-light m-3"
                onClick={() => AirportsDispatcher.onCancel()}
              >
                Back
              </button>
            </FlexColumn>
          )}

          {/* Inactive State */}
          {airportsMSStatus === "INACTIVE" && (
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
          {(airportsMSStatus === "PENDING" ||
            airportsMSStatus === "INACTIVE") && (
            <FlexColumn style={{ minHeight: "10rem" }}>
              <div className="spinner-border" />
            </FlexColumn>
          )}

          {/* Success State */}
          {airportsMSStatus === "SUCCESS" &&
            !isCreatePromptActive &&
            !isDeletePromptActive &&
            !isEditPromptActive &&
            this.handleRenderAirportsList(searchResults)}

          {airportsMSStatus === "SUCCESS" && isCreatePromptActive && (
            <CreateView />
          )}

          {airportsMSStatus === "SUCCESS" && isDeletePromptActive && (
            <DeleteView />
          )}

          {airportsMSStatus === "SUCCESS" && isEditPromptActive && <EditView />}
        </div>
      </div>
    );
  }

  componentDidMount() {
    AirportsDispatcher.onCancel();
    AirportsDispatcher.onHealth();
    AirportsDispatcher.onRequest();
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

  handleRenderAirportsList = (airportsList) => {
    const { airports } = Store.getState();
    const resultsDisplayed = Number(airports.search.resultsPerPage);
    const resultsStart =
      airports.search.resultsPerPage * (airports.search.resultsPage - 1);

    const airportsTable = [];
    if (this.state.sortedItem === "airportIataId")
      airportsList.sort((a, b) => {
        return this.state.currentSort === "up"
          ? a.airportIataId.localeCompare(b.airportIataId)
          : b.airportIataId.localeCompare(a.airportIataId);
      });
    else
      airportsList.sort((a, b) => {
        return this.state.currentSort === "up"
          ? a.airportCityName.localeCompare(b.airportCityName)
          : b.airportCityName.localeCompare(a.airportCityName);
      });

    if (!airportsList.length) airportsList = [airportsList];
    for (
      let i = resultsStart;
      i < resultsStart + resultsDisplayed && i < airportsList.length;
      i++
    ) {
      
      const airportIataId = airportsList[i].airportIataId;
      if (airportIataId) {
        const index = Number(i) + 1;
        airportsTable.push(
          <tr key={index}>
            <th scrop="row">{index}</th>
            <td>{airportIataId}</td>
            <td>{airportsList[i].airportCityName}</td>
  
            {/* Edit */}
            <td>
              <button
                className="btn btn-info"
                onClick={() =>
                  AirportsDispatcher.onPromptEdit("/" + airportIataId)
                }
              >
                Edit
              </button>
            </td>
  
            {/* Delete */}
            <td>
              <button
                className="btn btn-primary"
                onClick={() =>
                  AirportsDispatcher.onPromptDelete("/" + airportIataId)
                }
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
                IATA ID
                <button
                  className="btn text-white"
                  value="airportIataId"
                  onClick={this.onSortChange}
                >
                  ⇅
                </button>
              </th>
              <th scope="col">
                City
                <button
                  className="btn text-white"
                  value="airportCityName"
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
                    onClick={() => AirportsDispatcher.onPromptCreate()}
                  >
                    + Create New
                  </button>
                </FlexRow>
              </th>
            </tr>
          </thead>
          <tbody>
            {airportsTable}
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
export default AirportsDebug;
