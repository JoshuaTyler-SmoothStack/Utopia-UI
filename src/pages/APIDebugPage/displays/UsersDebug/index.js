// Libraries
import UsersDispatcher from "../../../../dispatchers/UsersDispatcher";
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
import OrchestrationHeader from "../OrchestrationHeader";
import Pagination from "../../../../components/Pagination";

class UsersDebug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerms: "",
      currentSort: "up",
      sortedItem: "",
    };
  }

  render() {
    const { users } = Store.getState();
    const { searchTerms } = this.state;

    // Microservice Status
    const usersMSHealth = users.health;
    const usersMSStatus = users.status;

    // Modal Toggles
    const isCreatePromptActive = users.create.isActive;
    const isDeletePromptActive = users.delete.isActive;
    const isEditPromptActive = users.edit.isActive;

    // Search Results vars
    const searchError = users.search.error;
    const searchFilters = users.search.filters;
    const searchResults = users.search.results;

    return (
      <div
        className={"row" + (this.props.className || "")}
        style={this.props.style}
      >
        {/* Header */}
        <div className="col-12 bg-light kit-border-shadow">
          <div className="row mt-1">
            {/* MS Orchestration Indicators */}
            <OrchestrationHeader
              className="col-12 col-md-6"
              name="User MS"
              health={usersMSHealth}
              status={
                usersMSStatus === "INACTIVE" ? "PENDING" : usersMSStatus
              }
              style={{ maxWidth: "30rem" }}
              onTriggerError={() => UsersDispatcher.onError()}
              onTriggerFakeAPICall={() =>
                UsersDispatcher.onFakeAPICall(searchResults)
              }
            />

            {/* Search Bar */}
            <div className="col-12 col-md-5">
              {/* Search */}
              <FlexRow className="mt-1" justify="end" wrap="no-wrap">
                <input
                  aria-label="Search"
                  className={
                    "form-control " + (searchError && " is-invalid kit-shake")
                  }
                  label={searchError}
                  placeholder=""
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
                    UsersDispatcher.onSearchAndFilter("/search", searchTerms)
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
            ((usersMSStatus === "INACTIVE" ||
              usersMSStatus === "ERROR" ||
              isCreatePromptActive ||
              isDeletePromptActive ||
              isEditPromptActive) &&
              "kit-opacity-50 kit-no-user kit-pointer-none")
          }
        >
          {/* Filters */}
          <div className="row p-2 justify-content-center p-2">
            {/* # of Filters Active */}
            <div className="col-auto list-group ml-2">
              <div
                className="list-group-item"
                style={{ fontSize: "0.85rem", padding: "0.5rem" }}
              >
                {searchFilters.activeCount + " filters active"}
              </div>
            </div>
          </div>

          {/* Resuts Count & Page Selection */}
          <div className="row justify-content-center p-2">
            <FlexColumn className="col-4 col-md-3 text-center">
              <DropDown
                buttonClassName="btn-secondary dropdown-toggle"
                selection={users.search.resultsPerPage}
                options={["3", "10", "25", "50"]}
                optionsName="items"
                onSelect={(e) => UsersDispatcher.onSelectItemsPerPage(e)}
              />
            </FlexColumn>

            <FlexColumn className="col-6 col-md-3 text-center">
              <ItemsIndexReadout
                currentPage={users.search.resultsPage}
                itemsPerPage={users.search.resultsPerPage}
                itemsTotal={users.search.results.length}
              />
            </FlexColumn>

            <FlexColumn className="col-8 mt-2 col-md-3 text-center">
              <Pagination
                currentPage={users.search.resultsPage}
                totalPages={Math.ceil(
                  users.search.results.length /
                    Math.max(users.search.resultsPerPage, 1)
                )}
                onSelectPage={(e) => UsersDispatcher.onSelectItemsPage(e)}
              />
            </FlexColumn>
          </div>
        </div>

        {/* Body */}
        <div className="col-12" style={{ overflow: "auto" }}>
          {/* Error State */}
          {usersMSStatus === "ERROR" && (
            <FlexColumn className="h-100">
              <ErrorMessage className="h1" soundAlert={true}>
                {usersMSHealth === "HEALTHY" ? users.error : "No User MS connection."}
              </ErrorMessage>
              <button
                className="btn btn-light m-3"
                onClick={() => UsersDispatcher.onCancel()}
              >
                Back
              </button>
            </FlexColumn>
          )}

          {/* Inactive State */}
          {usersMSStatus === "INACTIVE" && (
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
          {(usersMSStatus === "PENDING" ||
            usersMSStatus === "INACTIVE") && (
            <FlexColumn style={{ minHeight: "10rem" }}>
              <div className="spinner-border" />
            </FlexColumn>
          )}

          {/* Success State */}
          {usersMSStatus === "SUCCESS" &&
            !isCreatePromptActive &&
            !isDeletePromptActive &&
            !isEditPromptActive &&
            this.handleRenderUsersList(searchResults)}

          {usersMSStatus === "SUCCESS" && isCreatePromptActive && (
            <CreateView />
          )}

          {usersMSStatus === "SUCCESS" && isDeletePromptActive && (
            <DeleteView />
          )}

          {usersMSStatus === "SUCCESS" && isEditPromptActive && <EditView />}
        </div>
      </div>
    );
  }

  componentDidMount() {
    UsersDispatcher.onCancel();
    UsersDispatcher.onHealth();
    UsersDispatcher.onRequest();
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

  handleRenderUsersList = (usersList) => {
    const { users } = Store.getState();
    const resultsDisplayed = Number(users.search.resultsPerPage);
    const resultsStart =
      users.search.resultsPerPage * (users.search.resultsPage - 1);

    const usersTable = [];
    const { currentSort, sortedItem } = this.state;
    switch (sortedItem) {
      case "userEmail":
        usersList.sort((a, b) => {
          return currentSort === "up"
            ? a.userEmail.localeCompare(b.userEmail)
            : b.userEmail.localeCompare(a.userEmail)
        });
      break;

      case "userFirstName":
        usersList.sort((a, b) => {
          return currentSort === "up"
            ? a.userFirstName.localeCompare(b.userFirstName)
            : b.userFirstName.localeCompare(a.userFirstName)
        });
      break;

      case "userLastName":
        usersList.sort((a, b) => {
          return currentSort === "up"
            ? a.userLastName.localeCompare(b.userLastName)
            : b.userLastName.localeCompare(a.userLastName)
        });
      break;

      case "userRole":
        usersList.sort((a, b) => {
          return currentSort === "up"
            ? a.userRole.localeCompare(b.userRole)
            : b.userRole.localeCompare(a.userRole)
        });
      break;
      
      default:
        usersList.sort((a, b) => {
          return currentSort === "up"
            ? a.userId - b.userId
            : b.userId - a.userId;
        });
    }

    if (!usersList.length) usersList = [usersList];
    for (
      let i = resultsStart;
      i < resultsStart + resultsDisplayed && i < usersList.length;
      i++
    ) {
      const userId = usersList[i].userId;
      if (userId) {
        const index = Number(i) + 1;
        usersTable.push(
          <tr key={index}>
            <th scrop="row">{index}</th>
            <td>{userId}</td>
            <td>{usersList[i].userEmail}</td>
            <td>{usersList[i].userFirstName}</td>
            <td>{usersList[i].userLastName}</td>
            <td>{usersList[i].userPhone}</td>
            <td>{usersList[i].userRole}</td>

            {/* Edit */}
            <td>
              <button
                className="btn btn-info"
                onClick={() =>
                  UsersDispatcher.onPromptEdit("/" + userId)
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
                  UsersDispatcher.onPromptDelete("/" + userId)
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
              <th scope="col">ID
                <button
                  className="btn text-white"
                  value="userId"
                  onClick={this.onSortChange}
                >
                  ⇅
                </button>
              </th>
              <th scope="col">Email
                <button
                  className="btn text-white"
                  value="userEmail"
                  onClick={this.onSortChange}
                >
                    ⇅
                </button>
              </th>
              <th scope="col">First Name
                <button
                  className="btn text-white"
                  value="userFirstName"
                  onClick={this.onSortChange}
                >
                    ⇅
                </button>
              </th>
              <th scope="col">Last Name
                <button
                  className="btn text-white"
                  value="userLastName"
                  onClick={this.onSortChange}
                >
                  ⇅
                </button>
              </th>
              <th scope="col">Phone</th>
              <th scope="col">Role
                <button
                  className="btn text-white"
                  value="userRole"
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
                    onClick={() => UsersDispatcher.onPromptCreate()}
                  >
                    + Create New
                  </button>
                </FlexRow>
              </th>
            </tr>
          </thead>
          <tbody>
            {usersTable}
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
export default UsersDebug;
