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
import KitUtils from "../../kitutils/KitUtils";

const SALES_TAX_SIMULATED = 0.057;

class BookingsCreatePage extends Component {
  constructor(props) {
    super(props);

    const { authentication, bookings } = Store.getState();
    const { bookingFlightId, bookingSeatId, bookingSeatPrice } = bookings.search.filters;

    this.state = {
      address: "",
      cardAddress: "",
      cardHolderName: "",
      currentStage: 1,
      dateOfBirth: "",
      email: "",
      firstName: "",
      flightId: 0,
      isAgreement: false,
      isVeteran: false,
      lastName: "",
      passportId: "",
      paymentAmount: bookingSeatPrice
        ? `$${(Number(bookingSeatPrice.replace("$", "")) * (1 + SALES_TAX_SIMULATED)).toFixed(2)}`
        : "Invalid Payment",
      paymentConfirmation: "",
      paymentTitle: `UA-${bookingFlightId || "Invalid"}, Seat: ${bookingSeatId || "Invalid"}`,
      phone: "",
      sex: "",
      stageCount: authentication.userId ? 4 : 5,
      stageNames: authentication.userId
      ? ["Passeneger Info", "Regulations", "Payment", "Complete"]
      : ["Login/Guest", "Passeneger Info", "Regulations", "Payment", "Complete"],
    };
  }

  render() {
    const { authentication, breakPoint } = Store.getState();
    const {
      address,
      cardAddress,
      cardHolderName,
      currentStage,
      dateOfBirth,
      email,
      firstName,
      isAgreement,
      isVeteran ,
      lastName,
      passportId,
      paymentAmount,
      paymentConfirmation,
      paymentTitle,
      phone,
      sex,
      stageCount,
      stageNames,
    } = this.state;

    const selectedStage = authentication.userId ? currentStage + 1 : currentStage;

    return (
      <div className={"container-fluid"} style={{minHeight: "100vh", maxWidth:"1400px", overflow: "auto"}}>
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
                    stageNamesClassName={"text-white text-center kit-text-shadow-dark"}
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
                  <Stage1 className={"col-12 col-sm-10 col-md-8 row"}
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
                  <Stage2 className={"col-12 col-sm-10 col-md-8 row"}
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
                  <Stage3 className={"col-12 col-sm-10 col-md-8"}
                    isAgreement={isAgreement}
                    onIsAgreement={(value) => this.setState({isAgreement: value})}
                  />
                }

                {/* Pay for Booking */}
                {selectedStage === 4 &&
                  <Stage4 className={"col-12 col-sm-10 col-md-8"}
                    cardAddress={cardAddress}
                    cardHolderName={cardHolderName}
                    passengerAddress={address}
                    paymentAmount={paymentAmount}
                    paymentComplete={paymentConfirmation}
                    paymentTitle={paymentTitle}
                    onCardAddress={(value) => this.setState({cardAddress: value})}
                    onCardHolderName={(value) => this.setState({cardHolderName: value})}
                    onPaymentConfirmation={(value) => this.setState({paymentConfirmation: value})}
                  />
                }

                {/* Confirm Success & Redirect to Bookings Page */}
                {selectedStage === 5 &&
                  <Stage5
                    className={"col-12 col-sm-10 col-md-8"}
                    address={address}
                    dateOfBirth={dateOfBirth}
                    lastName={lastName}
                    email={email}
                    firstName={firstName}
                    passportId={passportId}
                    paymentConfirmation={paymentConfirmation}
                    paymentTitle={paymentTitle}
                    phone={phone}
                    isVeteran={isVeteran}
                    sex={sex}
                    onAddress={(value) => this.setState({address: value})}
                    onDateOfBirth={(value) => this.setState({dateOfBirth: value})}
                    onLastName={(value) => this.setState({lastName: value})}
                    onEmail={(value) => this.setState({email: value})}
                    onFirstName={(value) => this.setState({firstName: value})}
                    onFlightId={(value) => this.setState({flightId: value})}
                    onPassportId={(value) => this.setState({passportId: value})}
                    onPhone={(value) => this.setState({phone: value})}
                    onIsVeteran={(value) => this.setState({isVeteran: value})}
                    onSex={(value) => this.setState({sex: value})}
                  />
                }

                {/* Previous & Next Buttons */}
                <FlexRow className="col-12 col-md-6 mt-3 bg-light rounded p-2" justify="around">
                  <button className={("btn btn-dark ") + (currentStage === 1 && "disabled")}
                    onClick={() => this.handlePagePrevious()}
                  >
                    Previous
                  </button>

                  <button className={("btn btn-dark ") + (currentStage === stageCount && "disabled")}
                    onClick={() => this.handlePageNext()}
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

  handlePageNext() {
    const { currentStage, stageCount } = this.state;
    this.setState({ currentStage: Math.min((currentStage + 1), stageCount) });
    if(currentStage === stageCount) KitUtils.soundAlert();
  }

  handlePagePrevious() {
    const { currentStage } = this.state;
    this.setState({ currentStage: Math.max((currentStage - 1), 1) });
    if(currentStage === 1) KitUtils.soundAlert();
  }

  handleSubmit = () => {
    const { airports } = Store.getState();
    AirportsDispatcher.onSearchAndFilter("/search", "", airports.search.filters);
    this.setState({redirectToFlightSearchPage: true});
  };
}
export default BookingsCreatePage;
