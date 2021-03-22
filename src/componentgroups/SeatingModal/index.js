// Libraries
import React, { useEffect, useState } from "react";
import Store from "../../reducers/Store";
import BookingsDispatcher from "../../dispatchers/BookingsDispatcher";
import Constants from "../../resources/constants.json";

// Components
import { Redirect } from "react-router";
import ErrorMessage from "../../components/ErrorMessage";
import FlexRow from "../../components/FlexRow";
import FlexColumn from "../../components/FlexColumn";
import KitUtils from "../../kitutils/KitUtils_v1.0.0";
import Modal from "../../components/Modal";

const ALPHABET = [ "A", "B", "C", "D", "E", "F", "G", "H"];
const EMERGENCY_EXIT_ROW_MESSAGE = "Passengers seated in the emergency exit row are on the front lines of an emergency evacuation. It's important that they are able to articulate directions to other passengers. This is also one of the reasons flight attendants ask passengers seated in the emergency exit row to give a verbal yes.";
const ZINDEX_DEFAULT = 2;

const SeatingModal = (props) => {

  const { airplanes, breakPoint, flights } = Store.getState();
  const align = props.align || "center";
  const background = props.background || "kit-bg-smoke-light";
  const zIndex = props.zIndex || ZINDEX_DEFAULT;
  const [errorMessage, setErrorMessage] = useState("");
  const [iActiveConfirmSeatSelection, setIsActiveConfirmSeatSelection] = useState(false);
  const [isEmergencyExitRowAgreement, setIsEmergencyExitRowAgreement] = useState(false);
  const [seatingTable, setSeatingTable] = useState(null);
  const [seatSelection, setSeatSelection] = useState("");
  const [selectingEmerencyExitRow, setSelectingEmerencyExitRow] = useState(false);
  const [isRedirectingToBooking, setIsRedirectingToBooking] = useState(false);

  const handleSelectSeat = (seatPosition, isAvailable, isEmergencyExitRow) => {
    setSeatSelection(seatPosition);
    if(!isAvailable) {
      KitUtils.soundAlert();
      setErrorMessage(String(`Seat: ${seatPosition} is occupied`));
    } else {
      setErrorMessage("");
      setSelectingEmerencyExitRow(isEmergencyExitRow);
      setIsActiveConfirmSeatSelection(true);
    }
  };

  const handleConfirmSeat = () => {
    if(selectingEmerencyExitRow && !isEmergencyExitRowAgreement) {
      setErrorMessage("You must agree to the terms to purchase a seat in an Emergency Exit Row.");
      return;
    }

    BookingsDispatcher.onSetFilter("bookingFlightId", flights.selected.flightId);
    BookingsDispatcher.onSetFilter("bookingPassengerSeat", seatSelection);
    setIsRedirectingToBooking(true);
  };

  useEffect(() => {
    if(!seatingTable) {
      setSeatingTable(true);
      const firstClassCapacity = flights.selected.flightAirplane.airplaneType.airplaneTypeFirstClassCapacity;
      const firstClassColumns = flights.selected.flightAirplane.airplaneType.airplaneTypeFirstClassColumns;
      const firstClassRows = firstClassCapacity / firstClassColumns;
      
      const businessClassCapacity = flights.selected.flightAirplane.airplaneType.airplaneTypeBusinessClassCapacity;
      const businessClassColumns = flights.selected.flightAirplane.airplaneType.airplaneTypeBusinessClassColumns;
      const businessClassRows = businessClassCapacity / businessClassColumns;
      
      const coachClassCapacity = flights.selected.flightAirplane.airplaneType.airplaneTypeCoachClassCapacity;
      const coachClassColumns = flights.selected.flightAirplane.airplaneType.airplaneTypeCoachClassColumns;
      const coachClassRows = coachClassCapacity / coachClassColumns;
      
      const emergencyExitRows = flights.selected.flightAirplane.airplaneType.airplaneTypeEmergencyExitRows.split("-");
      const occupiedSeats = ["1A", "11D", "35E"];

      const leftSeats = [];
      const rightSeats = [];

      // Loop Rows
      const totalRows = (firstClassRows + businessClassRows + coachClassRows);
      for(let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
        const rowLeftSide = [];
        const rowRightSide = [];

        let columnCount = coachClassColumns;
        let defaultSeatColor = "kit-bg-bronze";
        if(rowIndex < firstClassRows) {
          defaultSeatColor = "kit-bg-gold";
          columnCount = firstClassColumns;
        }
        else if(rowIndex < (firstClassRows + businessClassRows)) {
          defaultSeatColor = "kit-bg-silver";
          columnCount = businessClassColumns;
        }

        // Loop Columns
        for(let columnIndex = 0; columnIndex < columnCount; columnIndex++) {

          // Set Seat variables
          let isAvailable = true;
          let isEmergencyExitRow = false;
          const seatPosition = String(`${rowIndex+1}${ALPHABET[columnIndex]}`);
          let seatColor = defaultSeatColor;

          if(occupiedSeats.includes(seatPosition)) {
            seatColor = "btn-dark";
            isAvailable = false;
          }
          else if(emergencyExitRows.includes(String(rowIndex))) {
            seatColor = "btn-primary";
            isEmergencyExitRow = true;
          }

          // Render the Seat
          const selectedHalf = (columnIndex < (columnCount / 2)) ? rowLeftSide : rowRightSide;
          selectedHalf.push(
            <button key={String(`seat-${seatPosition}`)}
              className={String(`btn m-1 ${seatColor}`)}
              style={{minHeight:"2rem", minWidth:"2rem"}}
              onClick={() => handleSelectSeat(seatPosition, isAvailable, isEmergencyExitRow)}
            >
              {seatPosition}
            </button>
          );
        }

        leftSeats.push(
          <FlexRow key={String(`row-left-${rowIndex}`)} justify="around" wrap="no-wrap">
            {rowLeftSide}
          </FlexRow>
        );
        rightSeats.push(
          <FlexRow key={String(`seat-${rowIndex}`)} justify="around" wrap="no-wrap">
            {rowRightSide}
          </FlexRow>
        );
      }

      // Render rows of seats
      const seatingTable = (
        <FlexRow className="bg-white rounded" wrap="no-wrap">
          <FlexColumn justify="around" wrap="no-wrap">{leftSeats}</FlexColumn>
          <div className="bg-light rounded m-1" style={{height:String(`${totalRows * 3}rem`), width:"5px"}}/>
          <FlexColumn justify="around" wrap="no-wrap">{rightSeats}</FlexColumn>
        </FlexRow>
      );
      setSeatingTable(seatingTable);
    }
  }, [airplanes, flights, seatingTable, setSeatingTable]);

  return (
    <Modal
      align={align}
      background={background}
      disableCloseButton={true}
      zIndex={zIndex}
      onClose={props.onClose}
    >
      <div className="container-fluid">
        <div className="row">
          <div className={(props.className || "")} style={props.style}>
            <div className="row">
              
              {/* Close Button */}
              <FlexRow>
                <button
                  className="btn btn-dark"
                  style={{
                    position: "absolute",
                    top: "-2rem",
                    right: "1rem",
                    zIndex: Number(zIndex) + 1,
                  }}
                  onClick={() => props.onClose()}
                >
                  <svg
                    className="kit-icon-light kit-svg-white"
                    height="2rem"
                    width="2rem"
                    viewBox="4 4 8 8"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </button>
              </FlexRow>

              {/* Title */}
              <div className="col-12 bg-white rounded p-2 kit-border-shadow">
                <FlexRow className="h-100" justify="start" wrap="no-wrap">

                  {/* Flight ID */}
                  <FlexColumn className="h-100 ml-2">
                    <FlexRow className="mb-0 mr-auto" justify="start" wrap="no-wrap">
                      <h2 className="text-dark">{"Flight: "}</h2>
                      <h2 className="ml-2 text-info">{"UA" + flights.selected.flightId}</h2>
                    </FlexRow>
                    <h5 className="text-light mr-auto">
                      {flights.selected.flightAirplane.airplaneType.airplaneTypeName || "Airplane not yet selected."}
                    </h5>
                  </FlexColumn>

                  {/* Select a Seat */}
                  {!(breakPoint.includes("small")) &&
                  <FlexColumn className="ml-4">
                    <h4 className="text-center">Select a seat</h4>
                  </FlexColumn>}

                  {/* Keys */}
                  <FlexRow className="ml-auto" justify="start" wrap="no-wrap">
                    {/* First, Business, Economy */}
                    <FlexColumn className="h-100" justify="start">
                      <FlexRow className="w-100" justify="start" wrap="no-wrap">
                        <div
                          className="rounded kit-bg-gold kit-border-shadow-sm mr-1"
                          style={{height:"1rem", width:"1rem"}}
                        />
                        <span>First</span>
                      </FlexRow>
                      <FlexRow className="w-100" justify="start" wrap="no-wrap">
                        <div
                          className="rounded kit-bg-silver kit-border-shadow-sm mr-1"
                          style={{height:"1rem", width:"1rem"}}
                        />
                        <span>Business</span>
                      </FlexRow>
                      <FlexRow className="w-100" justify="start" wrap="no-wrap">
                        <div
                          className="rounded kit-bg-bronze kit-border-shadow-sm mr-1"
                          style={{height:"1rem", width:"1rem"}}
                        />
                        <span>Economy</span>
                      </FlexRow>
                    </FlexColumn>

                    {/* Emergency / Occupied */}
                    <FlexColumn className="h-100 ml-3" justify="start">
                      <FlexRow className="w-100" justify="start" wrap="no-wrap">
                        <div
                          className="rounded bg-primary kit-border-shadow-sm mr-1"
                          style={{height:"1rem", width:"1rem"}}
                        />
                        <span>Emergency Exit</span>
                      </FlexRow>
                      <FlexRow className="w-100" justify="start" wrap="no-wrap">
                        <div
                          className="rounded bg-dark kit-border-shadow-sm mr-1"
                          style={{height:"1rem", width:"1rem"}}
                        />
                        <span>Occupied</span>
                      </FlexRow>
                    </FlexColumn>
                  </FlexRow>
                </FlexRow>
              </div>

              {/* Error Message */}
              {errorMessage !== "" &&
              <FlexRow className="bg-white rounded w-100 p-2">
                <ErrorMessage className="h5 text-center">
                  {errorMessage}
                </ErrorMessage>
              </FlexRow>}

              {/* Seating Chart */}
              {!iActiveConfirmSeatSelection &&
              <FlexRow className="col-12 mt-2" style={{maxHeight:"50vh", overflowY: "auto"}}>
                {seatingTable}
              </FlexRow>}

              {/* Seat Selection Confirmation */}
              {iActiveConfirmSeatSelection &&
              <FlexColumn className="col-12 mt-2" style={{maxHeight:"50vh", overflowY: "auto"}}>
                
                {/* Seat Selection */}
                <FlexRow className="bg-white rounded p-2 mb-2">
                  <h5 className="text-light">{"You have selected seat:"}</h5>
                  <h5 className="ml-1">{seatSelection}</h5>
                </FlexRow>

                {/* Emergency Exit Row */}
                {selectingEmerencyExitRow &&
                  <div>
                    {/* Text */}
                    <FlexColumn className="bg-white rounded p-2 mb-2">
                      <h5 className="text-danger">You have selected an Emergency Exit Row</h5>
                      <span>{EMERGENCY_EXIT_ROW_MESSAGE}</span>
                    </FlexColumn>

                    {/* Checkbox */}
                    <FlexRow className="bg-white rounded p-2" wrap="no-wrap">
                      <FlexRow justify="start" style={{width:"2rem"}}>
                        <input
                          className="form-check-input ml-1"
                          style={{height:"1.5rem", width:"1.5rem"}}
                          type="checkbox"
                          checked={isEmergencyExitRowAgreement}
                          onChange={() => setIsEmergencyExitRowAgreement(!isEmergencyExitRowAgreement)}
                        />
                      </FlexRow>
                      <span className="ml-1">I am able and willing to assist in emergency evactuation duties.</span>
                    </FlexRow>
                  </div>
                }

                {/* Buttons */}
                <FlexRow className="w-75 p-2" justify="around">
                  {/* Cancel */}
                  <button className="btn btn-dark"
                    onClick={() => setIsActiveConfirmSeatSelection(false)}
                  >
                    Cancel
                  </button>

                  {/* Confirm */}
                  <button
                    className={
                      "btn btn-success text-white kit-text-shadow-thin" +
                      ((selectingEmerencyExitRow && !isEmergencyExitRowAgreement) && " disabled")
                    }
                    onClick={() => handleConfirmSeat()}
                  >
                    Confirm
                  </button>
                </FlexRow>

              </FlexColumn>}
            </div>
          </div>
        </div>
      </div>

      {/* Redirects */}
      {isRedirectingToBooking && <Redirect to={Constants.pagePaths.bookingNew}/>}

    </Modal>
  );
};
export default SeatingModal;
