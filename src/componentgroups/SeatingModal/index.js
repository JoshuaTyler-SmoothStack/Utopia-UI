// Libraries
import React from "react";
import Store from "../../reducers/Store";

// Components
import Modal from "../../components/Modal";
import FlexRow from "../../components/FlexRow";
import FlexColumn from "../../components/FlexColumn";
import AirplanesDispatcher from "../../dispatchers/AirplanesDispatcher";

const ZINDEX_DEFAULT = 2;

const SeatingModal = (props) => {

  const { airplanes, flights } = Store.getState();
  const align = props.align || "center";
  const background = props.background || "kit-bg-smoke-light";
  const zIndex = props.zIndex || ZINDEX_DEFAULT;

  const handleRenderSeatingTable = () => {
    AirplanesDispatcher.onRequestThenCallback(String(`/${flights.selected.flightAirplane.airplaneId}`),
      (onError) => {
      // alert the user their request cannot be processed right now
      console.log("get airplane failed");
    }, (onSuccess) => {
      console.log(onSuccess);
    });

    console.log("handleRenderSeatingTable called");
    console.log(airplanes.selected);

    // const alphabet = [ "A", "B", "C", "D", "E", "F", "G", "H"];

    // const firstClassColumns = airplanes.selected;
    // const firstClassRows = 3;
    // const businessClassColumns = 6;
    // const businessClassRows = 10;
    // const economyClassColumns = 8;
    // const economyClassRows = 100;
    // const emergencyExitRows = [49, 50, 113];
    // const occupiedSeats = { "1,1": true, "2,1": true, "4,1": true };

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
              <FlexRow className="col-12 mt-2">
                {() => handleRenderSeatingTable()}
              </FlexRow>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default SeatingModal;
