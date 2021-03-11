// Libraries
import React, { useEffect } from "react";
import Store from "../../reducers/Store";

// Components
import Modal from "../../components/Modal";
import FlexRow from "../../components/FlexRow";
import FlexColumn from "../../components/FlexColumn";

const ESCAPE_KEY = 27;

const SeatingModal = (props) => {

  const { flights } = Store.getState();
  const align = props.align || "center";
  const background = props.background || "kit-bg-smoke-light";
  const zIndex = props.zIndex || 2;

  // Escape Key Listener
  useEffect(() => {
    const handleKeyPress = event => {  
      const { keyCode } = event;
      if (keyCode === ESCAPE_KEY) {
        event.preventDefault();  
        props.onClose();
      }
    }
  
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  });

  const handleRenderSeatingTable = () => {
    console.log("handleRenderSeatingTable called");

    const alphabet = [ "A", "B", "C", "D", "E", "F", "G", "H"];

    const firstClassColumns = 4;
    const firstClassRows = 8;
    const businessClassColumns = 4;
    const businessClassRows = 4;
    const economyClassColumns = 8;
    const economyClassRows = 100;
    const occupiedSeats = {"1,1": true, "2,1": true, "4,1": true};

    // const seatingTable = {
    //   firstClassColumns: 4,
    //   firstClassRows: 6,
    //   businessClassColumns: 6,
    //   businessClassRows: 10,
    //   economyClassColumns: 8,
    //   economyClassRows: 100,
    //   occupiedSeats: ["1,1", "2,1", "4,1"],

    //   // "1:1", "2:1", "3:1"
    //   // "1:2", "2:2", "3:2"

    //   // "1:3", "2:3", "3:3", "4:3",
    //   // "1:4", "2:4", "3:4", "4:4",
    //   // "1:4", "2:4", "3:4", "4:4",
    //   // "1:5", "2:5", "3:5", "4:5",
    //   // "1:6", "2:6", "3:6", "4:6",

    //   // "1:7", "2:7", "3:7", "4:7", "5:7", "6:7",
    //   // "1:8", "2:8", "3:8", "4:8", "5:7", "6:7",
    //   // "1:9", "2:9", "3:9", "4:9", "5:7", "6:7",
    //   // "1:6", "2:6", "3:6", "4:6", "5:7", "6:7",
    //   // "1:6", "2:6", "3:6", "4:6", "5:7", "6:7",
    //   // "1:6", "2:6", "3:6", "4:6", "5:7", "6:7",
    //   // "1:6", "2:6", "3:6", "4:6", "5:7", "6:7",
    //   // "1:6", "2:6", "3:6", "4:6", "5:7", "6:7",
    //   // "1:6", "2:6", "3:6", "4:6", "5:7", "6:7",
    //   // "1:6", "2:6", "3:6", "4:6", "5:7", "6:7",
    //   // "1:6", "2:6", "3:6", "4:6", "5:7", "6:7",
    //   // "1:6", "2:6", "3:6", "4:6", "5:7", "6:7",
    //   // "1:6", "2:6", "3:6", "4:6", "5:7", "6:7",
    // };

    let firstClassItems = [];
    let businessClassItems = [];
    let economyClassItems = [];
    let columnItems = [];
    const totalRows = firstClassRows + businessClassRows + economyClassRows;
    console.log(totalRows);
    for(var i = 0; i < totalRows; i++) {
      let rowItemsTop = [];
      let rowItemsBottom = [];

      // First Class
      if(i < firstClassRows) {
        for(var ii = 0; ii < firstClassColumns; ii++) {
          console.log("seat: " + i+alphabet[ii]);
          
          // Occupied First Class Seat
          console.log(occupiedSeats[i+","+ii], i, ii);
          if(occupiedSeats[i+","+ii]) {
            if(ii < firstClassColumns * 0.5) {
              rowItemsTop.push(
                <button className="btn btn-dark mt-1 mb-1 ml-2 mr-2">
                  {(i+1)+alphabet[ii]}
                </button>
              );
            } else {
              rowItemsBottom.push(
                <button className="btn btn-dark mt-1 mb-1 ml-2 mr-2">
                  {(i+1)+alphabet[ii]}
                </button>
              );
            }

          }

          // Unoccupied First Class Seat
          else {
            if(ii < firstClassColumns * 0.5) {
              rowItemsTop.push(
                <button className="btn btn-success mt-1 mb-1 ml-2 mr-2">
                  {(i+1)+alphabet[ii]}
                </button>
              );
            } else {
              rowItemsBottom.push(
                <button className="btn btn-success mt-1 mb-1 ml-2 mr-2">
                  {(i+1)+alphabet[ii]}
                </button>
              );
            }
          }
        }
        firstClassItems.push(
          <FlexColumn wrap="no-wrap">
            <FlexColumn className="mb-3" wrap="no-wrap">{rowItemsTop}</FlexColumn>
            <FlexColumn wrap="no-wrap">{rowItemsBottom}</FlexColumn>
          </FlexColumn>
        );
      }

      // // Business Class
      // if(i < (firstClassRows + businessClassRows)) {
      //   for(var ii = 0; ii < businessClassRows; ii++) {
      //     console.log("seat: " + i+alphabet[ii]);
          
      //     // Occupied Business Class Seat
      //     console.log(occupiedSeats[i+","+ii], i, ii);
      //     if(occupiedSeats[i+","+ii]) {
      //       if(ii < businessClassColumns * 0.5) {
      //         rowItemsTop.push(
      //           <button className="btn btn-dark mt-1 mb-1 ml-2 mr-2">
      //             {i+alphabet[ii]}
      //           </button>
      //         );
      //       } else {
      //         rowItemsBottom.push(
      //           <button className="btn btn-dark mt-1 mb-1 ml-2 mr-2">
      //             {i+alphabet[ii]}
      //           </button>
      //         );
      //       }

      //     }

      //     // Unoccupied Business Class Seat
      //     else {
      //       if(ii < businessClassColumns * 0.5) {
      //         rowItemsTop.push(
      //           <button className="btn btn-success mt-1 mb-1 ml-2 mr-2">
      //             {i+alphabet[ii]}
      //           </button>
      //         );
      //       } else {
      //         rowItemsBottom.push(
      //           <button className="btn btn-success mt-1 mb-1 ml-2 mr-2">
      //             {i+alphabet[ii]}
      //           </button>
      //         );
      //       }
      //     }
      //   }
      //   businessClassItems.push(
      //     <FlexColumn wrap="no-wrap">
      //       <FlexColumn className="mb-3" wrap="no-wrap">{rowItemsTop}</FlexColumn>
      //       <FlexColumn wrap="no-wrap">{rowItemsBottom}</FlexColumn>
      //     </FlexColumn>
      //   );
      // }

      // // Economy Class
      // else {

      // }
    }
    return (
      <FlexRow wrap="no-wrap">
        <FlexRow wrap="no-wrap">{firstClassItems}</FlexRow>
        {/* <FlexRow className="ml-3">{businessClassItems}</FlexRow>
        <FlexRow>{economyClassItems}</FlexRow> */}
      </FlexRow>
    );
  }

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
          <div className="col-12 col-md-9 col-lg-6 bg-primary p-2 m-auto rounded kit-border-shadow">
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
              <FlexRow className="col-12 mt-2">
                {handleRenderSeatingTable()}
              </FlexRow>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default SeatingModal;