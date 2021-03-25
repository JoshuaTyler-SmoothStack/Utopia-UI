// Libraries
import React, { Component } from "react";
import Store from "../../reducers/Store";
import AirportsDispatcher from "../../dispatchers/AirportsDispatcher";

// Components
import FlexRow from "../../components/FlexRow";
import NavBar from "../../componentgroups/NavBar";
import StageDislay from "../../components/StageDisplay";
import Stage1 from "./Stage1";
import Stage2 from "./Stage2";
import Stage3 from "./Stage3";
import Stage4 from "./Stage4";
import Stage5 from "./Stage5";
import KitUtils from "../../kitutils/KitUtils_v1.0.0";

class BookingsCreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStage: 1,
      firstName: "",
      lastName: "",
      email: "",
      passportId: "",
      dateOfBirth: "",
      sex: "",
      address: "",
      isAgreement: false,
      isVeteran: false,
    };
  }

  render() {
    const { authentication, breakPoint } = Store.getState();
    const { currentStage, firstName, lastName, email, passportId,
      dateOfBirth, sex, address, isAgreement, isVeteran } = this.state;

    const selectedStage = authentication.userId ? currentStage+1 : currentStage;
    const stageCount = authentication.userId ? 4 : 5;
    const stageNames = authentication.userId
      ? ["Passneger Info", "Regulations", "Payment", "Complete"]
      : ["Login/Guest", "Passneger Info", "Regulations", "Payment", "Complete"];

    return (
      <div className="container-fluid" style={{ height: "100vh", width: "100vw", maxWidth:"1400px",  overflowY: "hidden" }}>
        <div className="row">

          {/* Navbar */}
          <NavBar className="col-12"  />

          {/* Body */}
          <div className="col-12">
            <div className="row">
              
              {/* Header */}
              <div className="col-12">
                <FlexRow className="row w-100 p-3">
                  <StageDislay
                    className="w-100 bg-info rounded"
                    style={{maxWidth: "1000px"}}
                    disableStageNameNumber={true}
                    disableInactiveStageNames={breakPoint.includes("small")}
                    stage={currentStage}
                    stageCount={stageCount}
                    stageNames={stageNames}
                    stageNamesClassName={"text-white text-center kit-text-shadow-thin"}
                    stageClassName={"bg-light rounded"}
                    stageSelectedClassName={"bg-primary rounded"}
                    stageOnClick={(stageNumber) => this.setState({currentStage: stageNumber})}
                  />
                </FlexRow>
              </div>

              {/* Body */}
              <div className="col-12">
                <FlexRow className="row w-100">
                
                {/* Login or provide guest info - Stage 1 */}
                {selectedStage === 1 &&
                  <Stage1 className="col-12 col-sm-10 col-md-8"
                    breakPoint={breakPoint}
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    onFirstName={(value) => this.setState({firstName: value})}
                    onLastName={(value) => this.setState({lastName: value})}
                    onEmail={(value) => this.setState({email: value})}
                  />
                }

                {/* Stage 2 - Create Passenger */}
                {selectedStage === 2 &&
                  <Stage2 className="col-12 col-sm-10 col-md-8"
                    address={address}
                    dateOfBirth={dateOfBirth}
                    isVeteran={isVeteran}
                    passportId={passportId}
                    sex={sex}
                    onAddress={(value) => this.setState({address: value})}
                    onDateOfBirth={(value) => this.setState({dateOfBirth: value})}
                    onIsVeteran={(value) => this.setState({isVeteran: value})}
                    onPassportId={(value) => this.setState({passportId: value})}
                    onSex={(value) => this.setState({sex: value})}
                  />
                }

                {/* Stage 3 - Agree to Terms */}
                {selectedStage === 3 &&
                  <Stage3 className="col-12 col-sm-10 col-md-8"
                    isAgreement={isAgreement}
                    onIsAgreement={(value) => this.setState({isAgreement: value})}
                  />
                }

                {/* Pay for Booking */}
                {selectedStage === 4 &&
                  <Stage4/>
                }

                {/* Confirm Success & Redirect to Bookings Page */}
                {selectedStage === 5 &&
                  <Stage5/>
                }

                {/* Previous & Next Buttons */}
                <FlexRow className="col-12 col-md-6 mt-3 bg-light rounded p-2" justify="around">
                  <button className={("btn btn-dark ") + (currentStage === 1 && "disabled")}
                    onClick={() => {
                      this.setState({currentStage: Math.max(currentStage-1, 1)});
                      if(currentStage === 1) KitUtils.soundAlert();
                    }}
                  >
                    Previous
                  </button>

                  <button className={("btn btn-dark ") + (currentStage === stageCount && "disabled")}
                    onClick={() => {
                      this.setState({currentStage: Math.min(currentStage+1, stageCount)});
                      if(currentStage === stageCount) KitUtils.soundAlert();
                    }}
                  >
                    Next
                  </button>
                </FlexRow>
                </FlexRow>
              </div>
            </div>
          </div> {/* Body-End */}

        </div>
      </div>
    );
  }

  componentDidMount() {
    const { airports } = Store.getState();
    if(!airports.search.results) AirportsDispatcher.onRequest();
  }

  handleSubmit = () => {
    const { airports } = Store.getState();
    AirportsDispatcher.onSearchAndFilter("/search", "", airports.search.filters);
    this.setState({redirectToFlightSearchPage: true});
  };
}
export default BookingsCreatePage;
