// Libraries
import React, { Component } from "react";
import Store from "../../reducers/Store";
import AirportsDispatcher from "../../dispatchers/AirportsDispatcher";

// Components
import FlightSearch from "../../componentgroups/FlightSearch";
import NavBar from "../../componentgroups/NavBar";
import FlexRow from "../../components/FlexRow";
import { Redirect } from "react-router";

// Images
import TropicalBeach from "../../images/TropicalBeach.jpg";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToFlightSearchPage: false,
    };
  }

  render() {
    const { redirectToFlightSearchPage } = this.state;

    return (
      <div className="container-fluid" style={{ height: "100vh", width: "100vw", maxWidth:"1400px",  overflowY: "hidden" }}>
        <div className="row">

          {/* Navbar */}
          <NavBar className="col-12"  />

          {/* Body */}
          <div className="col-12">
            <img alt="" src={TropicalBeach} style={{position:"absolute", right:"0", width:"100%", minWidth:"700px", opacity:"75%"}} />
            <div className="row">
              
              {/* Search Flights Header */}
              <FlexRow className="col-12 col-md-8 col-lg-6 p-3" justify="start">
                <FlightSearch 
                  className="bg-white p-2 rounded"
                  isResultsPending={redirectToFlightSearchPage}
                  onSubmit={() => this.handleSubmit()}
                />
              </FlexRow>

              {/* Tropical Vacations Sign */}
              <FlexRow 
                className="col-10 col-md-4 mt-2 ml-auto mr-auto m-md-auto rounded kit-bg-blue kit-border-shadow"
                style={{height: "15rem"}}
              >
                <h1 className="text-center kit-cursive text-white kit-text-shadow-sm">
                  {"Tropical Vacations"}
                </h1>
                <h5 className="text-center text-white w-75">Limited time get-away fares as low $120!</h5>
                <span className="text-white">*select flights only</span>
              </FlexRow>

            </div>
          </div> {/* Body-End */}
          
          {/* Redirects */}
          {redirectToFlightSearchPage && <Redirect to={"/flights"}/>}

        </div>
      </div>
    );
  }

  componentDidMount() {
    const { airports } = Store.getState();
    if(!airports.search.results) AirportsDispatcher.onRequest();
  }

  handleSubmit = () => {
    this.setState({redirectToFlightSearchPage: true});
  }
}
export default LandingPage;