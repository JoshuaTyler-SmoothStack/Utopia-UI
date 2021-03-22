// Libraries
import React, { Component } from "react";
import Store from "../../reducers/Store";
import AirportsDispatcher from "../../dispatchers/AirportsDispatcher";

// Components
import FlexColumn from "../../components/FlexColumn";
import FlexRow from "../../components/FlexRow";
import NavBar from "../../componentgroups/NavBar";
import StageDislay from "../../components/StageDisplay";
import InputText from "../../components/InputText";

class BookingsCreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStage: 0,
    };
  }

  render() {
    const { breakPoint } = Store.getState();
    const { currentStage } = this.state;

    return (
      <div className="container-fluid" style={{ height: "100vh", width: "100vw", maxWidth:"1400px",  overflowY: "hidden" }}>
        <div className="row">

          {/* Navbar */}
          <NavBar className="col-12"  />

          {/* Body */}
          <div className="col-12">
            <div className="row">
              
              {/* Header */}
              <FlexRow className="col-12 p-3">
                <StageDislay
                  className="col-10 bg-info rounded"
                  disableStageNameNumber={true}
                  stageSelected={currentStage}
                  stageCount={5}
                  stageNames={["Login/Guest", "Passneger Info", "Regulations", "Payment", "Complete"]}
                  stageNamesClassName={"text-white kit-text-shadow-thin"}
                  stageClassName={"bg-light rounded"}
                  stageSelectedClassName={"bg-primary rounded"}
                  stageStyle={{height:"1rem"}}
                />
              </FlexRow>

              {/* Body */}
              <FlexRow className="col-12">
                {/* Stage 1 */}
                {currentStage === 0 &&
                  <div className="row">
                    {/* User Login */}
                    <FlexColumn className="col-12 col-sm-5">
                      <h5>Login to an account</h5>
                      <button className="btn btn-primary">
                        Already a user?
                      </button>
                    </FlexColumn>

                    {/* Divider */}
                    {breakPoint.includes("small")
                      ? <hr className="w-100 mt-2"></hr>
                      : <div className="bg-light rounded h-100" style={{minHeight:"20rem", width:"0.5rem"}}/>
                    }

                    {/* Guest Information */}
                    <FlexColumn className="col-5">
                      <h5>Create Booking as a guest</h5>

                      {/* First Name */}
                      <InputText
                        className="rounded kit-border-shadow m-3"
                        label={"First Name"}
                        labelClassName={"text-info"}
                        fontClass={"h4"}
                        isHidden={true}
                        style={{
                          height: "4rem",
                          width: "100%",
                        }}
                        onChange={(e) => this.setState({ firstName: e })}
                      />

                      {/* Last Name */}
                      <InputText
                        className="rounded kit-border-shadow m-3"
                        label={"Last Name"}
                        labelClassName={"text-info"}
                        fontClass={"h4"}
                        isHidden={true}
                        style={{
                          height: "4rem",
                          width: "100%",
                        }}
                        onChange={(e) => this.setState({ lastName: e })}
                      />

                      {/* Email */}
                      <InputText
                        className="rounded kit-border-shadow m-3"
                        label={"Email"}
                        labelClassName={"text-info"}
                        fontClass={"h4"}
                        isHidden={true}
                        style={{
                          height: "4rem",
                          width: "100%",
                        }}
                        onChange={(e) => this.setState({ emailName: e })}
                      />
                    </FlexColumn>
                  </div>
                }

                {/* Verify User */}
                {/* Create Passenger */}
                {/* Agree to Terms */}
                {/* Pay for Booking */}
                {/* Confirm Success & Redirect to Bookings Page */}



                {/* Create Booking as guest */}

              </FlexRow>

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
