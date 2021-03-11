// Libraries
import moment from "moment";
import React, { useEffect, useState } from "react";
import Store from "../../reducers/Store";

// Components
import Modal from "../../components/Modal";
import SeatingModal from "../SeatingModal";
import FlexRow from "../../components/FlexRow";
import FlexColumn from "../../components/FlexColumn";

const ESCAPE_KEY = 27;

const FlightModal = (props) => {

  const { flights } = Store.getState();
  const align = props.align || "center";
  const background = props.background || "kit-bg-smoke-light";
  const zIndex = props.zIndex || 2;

  const departureTime = moment(flights.selected.flightDepartureTime).format('M/DD/YY | h:mm a');
  const flightHours = Math.floor(Math.max(flights.selected.flightDuration, 1) / 3600);
  const flightMinutes = Math.floor(Math.max(flights.selected.flightDuration - (flightHours * 3600), 1) / 60);

  const [isActive_SeatingModal, setIsActive_SeatingModal] = useState(false);

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

                  {/* Date & Time */}
                  <FlexColumn className="h-100 ml-auto mr-auto">
                    <h4 className="text-dark">{departureTime.split("|")[1]}</h4>
                    <h5 className="text-dark">{departureTime.split("|")[0]}</h5 >
                  </FlexColumn>

                  {/* Origin To Destination */}
                  <FlexColumn className="h-100 ml-auto mr-auto">
                    <FlexRow>
                      <h3 className="text-warning">{flights.selected.flightRouteOriginIataId}</h3>
                      <h3 className="text-dark ml-1 mr-1">{"➜"}</h3>
                      <h3 className="text-warning">{flights.selected.flightRouteDestinationIataId}</h3>
                    </FlexRow>
                    <h5>{flightHours + "h " + flightMinutes + "m"}</h5>
                  </FlexColumn>
                </FlexRow>
              </div>

              {/* Seating Chart */}
              <FlexRow className="col-12 mt-2">
                <div 
                  className="bg-white rounded p-2" 
                  style={{height:"150px", width:"400px"}}
                >
                  {isActive_SeatingModal &&
                  <SeatingModal
                    background="kit-bg-smoke-dark"
                    zIndex={zIndex + 1}
                    onClose={() => setIsActive_SeatingModal(false)}
                  />}
                </div>
              </FlexRow>

              {/* Seat Pricing */}
              <FlexRow className="col-12 mt-2">
                <FlexRow className="bg-white rounded">

                {/* First Class */}                  
                <button className="btn btn-dark rounded m-2"
                  style={{minWidth:"8rem"}}
                  onClick={() => setIsActive_SeatingModal(true)}
                >
                  <FlexColumn>
                    {/* Label */}
                    <h5>First Class</h5>

                    {/* Sofa Svg */}
                    <svg 
                      className="kit-svg-gold"
                      height="2rem"
                      width="2rem"
                      viewBox="0 0 512 512"
                    >
                      <path d="M160 224v64h192v-64c0-35.3 28.7-64 64-64h32c0-53-43-96-96-96H160c-53 0-96 43-96 96h32c35.3 0 64 28.7 64 64zm288-32h-32c-17.7 0-32 14.3-32 32v96H128v-96c0-17.7-14.3-32-32-32H64c-35.3 0-64 28.7-64 64 0 23.6 13 44 32 55.1V432c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16v-16h256v16c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16V311.1c19-11.1 32-31.5 32-55.1 0-35.3-28.7-64-64-64z"/>
                    </svg>

                    {/* Price */}
                    <div>$1200</div>
                  </FlexColumn>
                </button>
                

                {/* Business Class */}
                <button className="btn btn-dark rounded m-2"
                  style={{minWidth:"8rem"}}
                >
                  <FlexColumn>
                    {/* Label */}
                    <h5>Business</h5>

                    {/* Sofa Svg */}
                    <svg 
                      className="kit-svg-silver"
                      height="2rem"
                      width="2rem"
                      viewBox="0 0 512 512"
                    >
                      <path d="M160 224v64h192v-64c0-35.3 28.7-64 64-64h32c0-53-43-96-96-96H160c-53 0-96 43-96 96h32c35.3 0 64 28.7 64 64zm288-32h-32c-17.7 0-32 14.3-32 32v96H128v-96c0-17.7-14.3-32-32-32H64c-35.3 0-64 28.7-64 64 0 23.6 13 44 32 55.1V432c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16v-16h256v16c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16V311.1c19-11.1 32-31.5 32-55.1 0-35.3-28.7-64-64-64z"/>
                    </svg>
                    
                    {/* Price */}
                    <div>$700</div>
                  </FlexColumn>
                </button>

                {/* Economy Class */}
                <button className="btn btn-dark rounded m-2"
                  style={{minWidth:"8rem"}}
                >
                  <FlexColumn>
                    {/* Label */}
                    <h5>Economy</h5>

                    {/* Sofa Svg */}
                    <svg 
                      className="kit-svg-bronze"
                      height="2rem"
                      width="2rem"
                      viewBox="0 0 512 512"
                    >
                      <path d="M160 224v64h192v-64c0-35.3 28.7-64 64-64h32c0-53-43-96-96-96H160c-53 0-96 43-96 96h32c35.3 0 64 28.7 64 64zm288-32h-32c-17.7 0-32 14.3-32 32v96H128v-96c0-17.7-14.3-32-32-32H64c-35.3 0-64 28.7-64 64 0 23.6 13 44 32 55.1V432c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16v-16h256v16c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16V311.1c19-11.1 32-31.5 32-55.1 0-35.3-28.7-64-64-64z"/>
                    </svg>

                    {/* Price */}
                    <div>$239</div>
                  </FlexColumn>
                </button>
              </FlexRow>
            </FlexRow>

              {/* Lay-Overs */}
              <div className="col-12"></div>

              {/* Buttons */}
              <FlexRow className="col-12 p-2" justify="start">
                
                {/* Already Have Ticket */}
                <button className="btn btn-info ml-2">
                  Already have a ticket?
                </button>

                {/* Wut */}
                <button className="btn btn-success text-white ml-2">
                  wut
                </button>
              </FlexRow>

            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default FlightModal;
