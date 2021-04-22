// Libraries
import PaymentsDispatcher from "../../../../dispatchers/PaymentsDispatcher";
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

class PaymentsDebug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPaymentInfoActive: false,
      searchTerms: "",
    };
  }

  render() {
    const { payments } = Store.getState();
    const { isPaymentInfoActive, searchTerms } = this.state;

    // Microservice Status
    const paymentsMSHealth = payments.health;
    const paymentsMSStatus = payments.status;

    // Modal Toggles
    const isCreatePromptActive = payments.create.isActive;
    const isDeletePromptActive = payments.delete.isActive;
    const isEditPromptActive = payments.edit.isActive;

    // Search Results vars
    const searchError = payments.search.error;
    const searchResults = payments.search.results;

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
                  aria-label={"Search"}
                  className={
                    "form-control " + (searchError && " is-invalid kit-shake")
                  }
                  label={searchError}
                  placeholder={"search by IDs"}
                  type={"search"}
                  style={{ maxWidth: "15rem" }}
                  onChange={(e) =>
                    this.setState({ searchTerms: e.target.value })
                  }
                />
                <button
                  className="btn btn-success ml-2 text-white kit-text-shadow-thin"
                  type="submit"
                  onClick={() =>
                    PaymentsDispatcher.onSearchAndFilter(
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
            ((paymentsMSStatus === "INACTIVE" ||
              paymentsMSStatus === "ERROR" ||
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
                selection={payments.search.resultsPerPage}
                options={["3", "10", "25", "50"]}
                optionsName="items"
                onSelect={(e) => PaymentsDispatcher.onSelectItemsPerPage(e)}
              />
            </FlexColumn>

            {/* Readout */}
            <FlexColumn className="col-auto text-center mt-2">
              <ItemsIndexReadout
                currentPage={payments.search.resultsPage}
                itemsPerPage={payments.search.resultsPerPage}
                itemsTotal={payments.search.results.length}
              />
            </FlexColumn>

            {/* Pagination */}
            <FlexColumn className="col-auto text-center mt-2">
              <Pagination
                currentPage={payments.search.resultsPage}
                totalPages={Math.ceil(
                  payments.search.results.length /
                    Math.max(payments.search.resultsPerPage, 1)
                )}
                onSelectPage={(e) => PaymentsDispatcher.onSelectItemsPage(e)}
              />
            </FlexColumn>
          </div>
        </div>

        {/* Body */}
        <div className="col-12" style={{ overflow: "auto" }}>
          {/* Error State */}
          {paymentsMSStatus === "ERROR" && (
            <FlexColumn className="h-100">
              <ErrorMessage className="h1" soundAlert={true}>
                {paymentsMSHealth === "HEALTHY"
                  ? payments.error
                  : "No Payment MS connection."}
              </ErrorMessage>
              <button
                className="btn btn-light m-3"
                onClick={() => PaymentsDispatcher.onCancel()}
              >
                Back
              </button>
            </FlexColumn>
          )}

          {/* Inactive State */}
          {paymentsMSStatus === "INACTIVE" && (
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
          {(paymentsMSStatus === "PENDING" ||
            paymentsMSStatus === "INACTIVE") && (
            <FlexColumn style={{ minHeight: "10rem" }}>
              <div className="spinner-border" />
            </FlexColumn>
          )}

          {/* Success State */}
          {paymentsMSStatus === "SUCCESS" &&
            !isCreatePromptActive &&
            !isDeletePromptActive &&
            !isEditPromptActive &&
            this.handleRenderPaymentsList(searchResults)}

          {paymentsMSStatus === "SUCCESS" && isCreatePromptActive && (
            <CreateView />
          )}

          {paymentsMSStatus === "SUCCESS" && isDeletePromptActive && (
            <DeleteView />
          )}

          {paymentsMSStatus === "SUCCESS" && isEditPromptActive && (
            <EditView />
          )}
        </div>
      </div>
    );
  }

  componentDidMount() {
    PaymentsDispatcher.onCancel();
    PaymentsDispatcher.onHealth();
    PaymentsDispatcher.onRequest();
  }

  handleIncludePaymentInfo = (isActive) => {
    this.setState({ isPaymentInfoActive: isActive });
  };

  handleRenderPaymentsList = (paymentsList) => {
    const { payments } = Store.getState();
    const { isPaymentInfoActive } = this.state;
    const resultsDisplayed = Number(payments.search.resultsPerPage);
    const resultsStart =
      payments.search.resultsPerPage * (payments.search.resultsPage - 1);

    const paymentsTable = [];
    if (!paymentsList.length) paymentsList = [paymentsList];
    for (
      let i = resultsStart;
      i < resultsStart + resultsDisplayed && i < paymentsList.length;
      i++
    ) {
      const paymentId = paymentsList[i].paymentId;

      if (paymentId) {
        const index = Number(i) + 1;
        paymentsTable.push(
          <tr key={index}>
            <th scope="col">{index}</th>
            <td>{paymentsList[i].paymentId}</td>
            <td>{paymentsList[i].paymentBookingUuid}</td>
            <td>{paymentsList[i].paymentStripeUuid}</td>
            <td>{paymentsList[i].paymentStatus}</td>

            {/* Edit */}
            <td>
              <button
                className="btn btn-info"
                onClick={() =>
                  PaymentsDispatcher.onPromptEdit("/" + paymentId)
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
                  PaymentsDispatcher.onPromptDelete("/" + paymentId)
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
              <th scope="col">Booking UUID</th>
              <th scope="col">Stripe UUID</th>
              <th scope="col">Status</th>
              <th scope="col" colSpan="2">
                <FlexRow>
                  <button
                    className="btn btn-success text-white kit-text-shadow-thin"
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => PaymentsDispatcher.onPromptCreate()}
                  >
                    + Create New
                  </button>
                </FlexRow>
              </th>
            </tr>
          </thead>
          <tbody>
            {paymentsTable}
            <tr>
              <td colSpan="7"></td>
              {/* Space at end of table for aesthetic */}
            </tr>
          </tbody>
        </table>
      </FlexColumn>
    );
  };
}
export default PaymentsDebug;
