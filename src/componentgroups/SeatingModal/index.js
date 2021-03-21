// Libraries
import React, { useEffect, useState } from "react";
import Store from "../../reducers/Store";

// Components
import Modal from "../../components/Modal";
import FlexRow from "../../components/FlexRow";
import FlexColumn from "../../components/FlexColumn";
import KitUtils from "../../kitutils/KitUtils_v1.0.0";

const ALPHABET = [ "A", "B", "C", "D", "E", "F", "G", "H"];
const ZINDEX_DEFAULT = 2;

const SeatingModal = (props) => {

  const { airplanes, flights } = Store.getState();
  const align = props.align || "center";
  const background = props.background || "kit-bg-smoke-light";
  const zIndex = props.zIndex || ZINDEX_DEFAULT;
  const [seatingTable, setSeatingTable] = useState(null);

  const handleRenderSeatingTable = () => {
    
    console.log(airplanes.selected);

    



    // let firstClassItems = [];
    // // let businessClassItems = [];
    // // let economyClassItems = [];
    // // let columnItems = [];
    // const totalColumns = Math.max([firstClassColumns, businessClassColumns, economyClassColumns]); 
    // const totalRows = firstClassRows + businessClassRows + economyClassRows;
    // for(var i = 0; i < totalRows; i++) {
    //   let rowItemsTop = [];
    //   let rowItemsBottom = [];

    //   for(var ii = 0; ii < totalColumns; ii++) {
    //     let classColor = "btn-dark"

    //     if(i < firstClassRows) {
    //       if(ii > firstClassColumns) continue;
    //       if(!occupiedSeats[i+","+ii]) classColor = "kit-bg-gold";
    //     }
    //     else if(i < (firstClassRows + businessClassRows)) {
    //       if(ii > businessClassColumns) continue;
    //       if(!occupiedSeats[i+","+ii]) classColor = "kit-bg-silver";
    //     }
    //     else {
    //       if(ii > economyClassColumns) continue;
    //       if(!occupiedSeats[i+","+ii]) classColor = "kit-bg-bronze";
    //     }
    //     console.log("seat: " + i+alphabet[ii]);
        

    //   }

      
    // return (
    //   <FlexRow wrap="no-wrap">
    //     <FlexRow wrap="no-wrap">{firstClassItems}</FlexRow>
    //     {/* <FlexRow className="ml-3">{businessClassItems}</FlexRow>
    //     <FlexRow>{economyClassItems}</FlexRow> */}
    //   </FlexRow>
    // );
    return <div></div>;
  };

  const selectSeat = (seatPosition, isAvailable, isEmergencyExitRow) => {
    if(!isAvailable) {
      KitUtils.soundAlert();
      // showErrorMessage(String(`Seat: ${seatPosition} is occupied`));
    } else {
      // setSelectingEmerencyExitRow(isEmergencyExitRow);
      // setIsActiveConfirmSeatSelection(true);
    }
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
      const occupiedSeats = ["1,1", "2,1", "4,1"];

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
          else if(emergencyExitRows.includes(seatPosition)) {
            seatColor = "btn-primary";
            isEmergencyExitRow = true;
          }

          // Render the Seat
          const selectedHalf = (columnIndex < (columnCount / 2)) ? rowLeftSide : rowRightSide;
          selectedHalf.push(
            <button key={String(`seat-${seatPosition}`)}
              className={String(`btn m-1 btn-dark ${seatColor}`)}
              style={{minHeight:"2rem", minWidth:"2rem"}}
              onClick={() => selectSeat(seatPosition, isAvailable, isEmergencyExitRow)}
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
          <div className="bg-success rounded m-1" style={{height:String(`${totalRows}px`), width:"5px"}}/>
          <FlexColumn justify="around" wrap="no-wrap">{rightSeats}</FlexColumn>
        </FlexRow>
      );
      console.log(seatingTable);
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
                <FlexRow className="h-100" justify="start">

                  {/* Flight ID */}
                  <FlexColumn className="h-100 ml-2">
                    <FlexRow className="mb-0 mr-auto" justify="start">
                      <h2 className="text-dark">{"Flight: "}</h2>
                      <h2 className="ml-2 text-info">{"UA" + flights.selected.flightId}</h2>
                    </FlexRow>
                    <h5 className="text-light mr-auto">
                      {flights.selected.flightAirplaneTypeName || "Airplane not yet selected."}
                    </h5>
                  </FlexColumn>
                </FlexRow>
              </div>

              {/* Seating Chart */}
              <FlexRow className="col-12 mt-2" style={{maxHeight:"50vh", overflowY: "scroll"}}>
                {seatingTable}
              </FlexRow>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default SeatingModal;
