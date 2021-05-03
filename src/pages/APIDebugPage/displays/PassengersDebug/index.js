// Libraries
import PassengersDispatcher from "../../../../dispatchers/PassengersDispatcher";
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

class PassengersDebug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPassengerInfoActive: false,
      searchTerms: "",
    };
  }

  render() {
    const { passengers } = Store.getState();
    const { isPassengerInfoActive, searchTerms } = this.state;

    // Microservice Status
    const passengersMSHealth = passengers.health;
    const passengersMSStatus = passengers.status;

    // Modal Toggles
    const isCreatePromptActive = passengers.create.isActive;
    const isDeletePromptActive = passengers.delete.isActive;
    const isEditPromptActive = passengers.edit.isActive;

    // Search Results vars
    const searchError = passengers.search.error;
    const searchResults = passengers.search.results;

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
                  placeholder="IDs, name, address, . . ."
                  type="search"
                  style={{ maxWidth: "15rem" }}
                  onChange={(e) =>
                    this.setState({ searchTerms: e.target.value })
                  }
                />
                <button
                  className="btn btn-success ml-2 text-white kit-text-shadow-dark"
                  type="submit"
                  onClick={() =>
                    PassengersDispatcher.onSearchAndFilter(
                      "/search",
                      searchTerms
                    )
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
            ((passengersMSStatus === "INACTIVE" ||
              passengersMSStatus === "ERROR" ||
              isCreatePromptActive ||
              isDeletePromptActive ||
              isEditPromptActive) &&
              "kit-opacity-50 kit-no-user kit-pointer-none")
          }
        >
          {/* Resuts Count & Page Selection */}
          <div className="row justify-content-center pb-1">

            {/* Toggle Reference Data */}
            <FlexRow
              className="col-auto p-0 bg-dark rounded mt-2"
              wrap={"no-wrap"}
            >
              <button
                className={
                  "btn text-white " + (isPassengerInfoActive && "btn-success")
                }
                onClick={() => this.handleIncludePassengerInfo(true)}
              >
                Show IDs
              </button>
              <button
                className={
                  "btn text-white " + (!isPassengerInfoActive && "btn-success")
                }
                onClick={() => this.handleIncludePassengerInfo(false)}
              >
                Hide
              </button>
            </FlexRow>

            {/* DropDown */}
            <FlexColumn className="col-auto text-center mt-2">
              <DropDown
                buttonClassName="btn-secondary dropdown-toggle"
                selection={passengers.search.resultsPerPage}
                options={["3", "10", "25", "50"]}
                optionsName="items"
                onSelect={(e) => PassengersDispatcher.onSelectItemsPerPage(e)}
              />
            </FlexColumn>

            {/* Readout */}
            <FlexColumn className="col-auto text-center mt-2">
              <ItemsIndexReadout
                currentPage={passengers.search.resultsPage}
                itemsPerPage={passengers.search.resultsPerPage}
                itemsTotal={passengers.search.results.length}
              />
            </FlexColumn>

            {/* Pagination */}
            <FlexColumn className="col-auto text-center mt-2">
              <Pagination
                currentPage={passengers.search.resultsPage}
                totalPages={Math.ceil(
                  passengers.search.results.length /
                    Math.max(passengers.search.resultsPerPage, 1)
                )}
                onSelectPage={(e) => PassengersDispatcher.onSelectItemsPage(e)}
              />
            </FlexColumn>
          </div>
        </div>

        {/* Body */}
        <div className="col-12" style={{ overflow: "auto" }}>
          {/* Error State */}
          {passengersMSStatus === "ERROR" && (
            <FlexColumn className="h-100">
              <ErrorMessage className="h1" soundAlert={true}>
                {passengersMSHealth === "HEALTHY"
                  ? passengers.error
                  : "No Passenger MS connection."}
              </ErrorMessage>
              <button
                className="btn btn-light m-3"
                onClick={() => PassengersDispatcher.onCancel()}
              >
                Back
              </button>
            </FlexColumn>
          )}

          {/* Inactive State */}
          {passengersMSStatus === "INACTIVE" && (
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
          {(passengersMSStatus === "PENDING" ||
            passengersMSStatus === "INACTIVE") && (
            <FlexColumn style={{ minHeight: "10rem" }}>
              <div className="spinner-border" />
            </FlexColumn>
          )}

          {/* Success State */}
          {passengersMSStatus === "SUCCESS" &&
            !isCreatePromptActive &&
            !isDeletePromptActive &&
            !isEditPromptActive &&
            this.handleRenderPassengersList(searchResults)}

          {passengersMSStatus === "SUCCESS" && isCreatePromptActive && (
            <CreateView />
          )}

          {passengersMSStatus === "SUCCESS" && isDeletePromptActive && (
            <DeleteView />
          )}

          {passengersMSStatus === "SUCCESS" && isEditPromptActive && (
            <EditView />
          )}
        </div>
      </div>
    );
  }

  componentDidMount() {
    PassengersDispatcher.onCancel();
    PassengersDispatcher.onHealth();
    PassengersDispatcher.onRequest();
  }

  handleIncludePassengerInfo = (isActive) => {
    this.setState({ isPassengerInfoActive: isActive });
  };

  handleRenderPassengersList = (passengersList) => {
    const { passengers } = Store.getState();
    const { isPassengerInfoActive } = this.state;
    const resultsDisplayed = Number(passengers.search.resultsPerPage);
    const resultsStart =
      passengers.search.resultsPerPage * (passengers.search.resultsPage - 1);

    const passengersTable = [];
    if (!passengersList.length) passengersList = [passengersList];
    for (
      let i = resultsStart;
      i < resultsStart + resultsDisplayed && i < passengersList.length;
      i++
    ) {
      const passengerId = passengersList[i].passengerId;

      if (passengerId) {
        const index = Number(i) + 1;
        passengersTable.push(
          <tr key={index}>
            <th scope="col">{index}</th>
            <td>{passengersList[i].passengerId}</td>
            <td>{passengersList[i].passengerBookingId}</td>
            <td>{passengersList[i].passengerPassportId}</td>
            {isPassengerInfoActive && (
              <td>{passengersList[i].passengerFirstName}</td>
            )}
            {isPassengerInfoActive && (
              <td>{passengersList[i].passengerLastName}</td>
            )}
            {isPassengerInfoActive && (
              <td>{passengersList[i].passengerDateOfBirth}</td>
            )}
            {isPassengerInfoActive && <td>{passengersList[i].passengerSex}</td>}
            {isPassengerInfoActive && (
              <td>{passengersList[i].passengerAddress}</td>
            )}
            {isPassengerInfoActive && (
              <td>
                {passengersList[i].passengerIsVeteran ? (
                  <div
                    className="h3 text-success"
                    style={{ fontFamily: "monospace" }}
                  >
                    ✔
                  </div>
                ) : (
                  <div
                    className="h3 text-danger"
                    style={{ fontFamily: "monospace" }}
                  >
                    X
                  </div>
                )}
              </td>
            )}

            {/* Edit */}
            <td>
              <button
                className="btn btn-info"
                onClick={() =>
                  PassengersDispatcher.onPromptEdit("/" + passengerId)
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
                  PassengersDispatcher.onPromptDelete("/" + passengerId)
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
              <th scope="col">ID</th>
              <th scope="col">Booking ID</th>
              <th scope="col">Passport ID</th>
              {isPassengerInfoActive && <th scope="col">First Name</th>}
              {isPassengerInfoActive && <th scope="col">Last Name</th>}
              {isPassengerInfoActive && <th scope="col">DOB</th>}
              {isPassengerInfoActive && <th scope="col">Sex</th>}
              {isPassengerInfoActive && <th scope="col">Address</th>}
              {isPassengerInfoActive && <th scope="col">Veteran</th>}
              <th scope="col" colSpan="2">
                <FlexRow>
                  <button
                    className="btn btn-success text-white kit-text-shadow-dark"
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => PassengersDispatcher.onPromptCreate()}
                  >
                    + Create New
                  </button>
                </FlexRow>
              </th>
            </tr>
          </thead>
          <tbody>
            {passengersTable}
            <tr>
              <td colSpan="12"></td>
              {/* Space at end of table for aesthetic */}
            </tr>
          </tbody>
        </table>
      </FlexColumn>
    );
  };
}
export default PassengersDebug;
