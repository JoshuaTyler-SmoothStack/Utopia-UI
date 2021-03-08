// Libraries
import React, { Component } from "react";
import Store from "../../reducers/Store";
import FlightsDispatcher from "../../dispatchers/FlightsDispatcher";

// Components
import DropDown from "../../components/DropDown";
import NavBar from "../../componentgroups/NavBar";
import FlexRow from "../../components/FlexRow";
import InputText from "../../components/InputText";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: "",
      destinationDate: "",
      origin: "",
      originDate: "",
      flightType: "One-way",
      adultSelect: 1,
      seniorSelect: 0,
      childrenSelect: 0,
      viewAirplaneId: "",
      viewIataOrig: "",
      viewIataDest: "",
      viewCityOrig: "",
      viewCityDest: "",
      viewPrice: "",
      viewSeats: 0,
      viewDepartureDate: "",
      viewDepartureTime: "",
      currentSort: "down",
      sortedItem: "seatPrice",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  render() {
    const { flights } = Store.getState();
    const { flightType, destination, origin, isFocus_Destination, isFocus_Origin } = this.state;

    const departureFlights = flights.search.originToDestination;
    const returnFlights = flights.search.destinationToOrigin;

    const isActive_OriginRecommendations = isFocus_Origin && origin.trim() !== "";
    const isActive_DestinationRecommendations = isFocus_Destination && destination.trim() !== "";

    return (
      <div className="container-fluid kit-bg-blue" style={{ height: "100vh", width: "100vw"}}>
        <div className="row">
          {/* Navbar */}
          <NavBar className="col-12" hideSearchBar={true} />

          {/* Content */}
          <div className="card col-12 col-sm-10 col-md-8 col-lg-6 mt-5 ml-auto mr-auto">
            
            {/* Title */}
            <div className="card-title mb-0">Search Flights</div>
            <hr className="w-100 mt-2"></hr>

            {/* Card Body */}
            <div className="card-body">

              {/* DropDown One-way/Round-Trip */}
              <div className="row">
                <FlexRow className="col-6" justify="around" wrap="no-wrap">
                  
                  {/* One-Way */}
                  <div>
                    <input className="form-check-input" type="radio" name="flightType"
                    defaultChecked onChange={(e) => this.handleInputChange(e)}/>
                    <label className="form-check-label">
                      One-Way
                    </label>
                  </div>

                  {/* Round-Trip */}
                  <div>
                    <input className="form-check-input" type="radio" name="flightType"
                    onChange={(e) => this.handleInputChange(e)}/>
                    <label className="form-check-label">
                      Round-Trip
                    </label>
                  </div>
                </FlexRow>
              </div>

              {/* Origin & Destination */}
              <div className="row mt-3">
                {/* Origin */}
                <div className="col-12 col-sm-6">
                  <InputText
                    className="rounded kit-border-shadow m-3"
                    label={"Origin"}
                    labelClassName={"text-info"}
                    fontClass={"h4"}
                    name="origin"
                    style={{height: "3rem"}}
                    onBlur={() => {
                      setTimeout(() => {
                        this.setState({isFocus_Origin: false})
                      }, 100);
                    }}
                    onFocus={() => this.setState({isFocus_Origin: true})}
                    onChange={(e) => this.setState({origin: e})}
                    value={origin}
                  />
                  <ul className={"dropdown-menu " + 
                    (isActive_OriginRecommendations ? "show" : "")}
                  >
                    {this.handleRenderAirportRecommendations(origin, "origin")}
                  </ul>
                </div>

                {/* Destination */}
                <div className="col-12 col-sm-6">
                  <InputText
                    className="rounded kit-border-shadow m-3"
                    label={"Destination"}
                    labelClassName={"text-info"}
                    fontClass={"h4"}
                    name="destination"
                    style={{height: "3rem"}}
                    onBlur={() => {
                      setTimeout(() => {
                        this.setState({isFocus_Destination: false})
                      }, 100);
                    }}
                    onFocus={() => this.setState({isFocus_Destination: true})}
                    onChange={(e) => this.setState({destination: e})}
                  />
                  <ul className={"dropdown-menu " + 
                    (isActive_DestinationRecommendations ? "show" : "")}
                  >
                    {this.handleRenderAirportRecommendations(destination, "destination")}
                  </ul>
                </div>
              </div>

              {/* Date Pickers */}
              <div className="col-12">
                <div className="row">

                  {/* One-Way */}
                  <div className="col-6">
                    <FlexRow>
                      <input className="form-check-input" type="date" name="originDate"
                      defaultChecked onChange={(e) => this.handleInputChange(e)}/>
                      <label className="form-check-label">
                        One-Way
                      </label>
                    </FlexRow>
                  </div>


                  {/* Round-Trip */}
                  {flightType === "Round-Trip" &&
                  <div className="col-6">
                    <FlexRow>
                      <input className="form-check-input" type="date" name="destinationDate"
                      onChange={(e) => this.handleInputChange(e)}/>
                      <label className="form-check-label">
                        Round-Trip
                      </label>
                    </FlexRow>
                  </div>}
                </div>
              </div>

              {/* Search Button */}
              <div className="row mt-4">
                <div className="col-4 ml-auto">
                  <button className="btn btn-success text-white kit-border-shadow-thin"
                  onClick={() => this.handleSearchSubmit()}>
                    Search Flights
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSortChange = (e) => {
		const { currentSort } = this.state;
		let nextSort;

		if (currentSort === 'down') nextSort = 'up';
		else if (currentSort === 'up') nextSort = 'down';

		this.setState({
			currentSort: nextSort,
      sortedItem: e.target.value
		});
	};

  handleSearchSubmit = (e) => {
    const { destination, destinationDate, origin, originDate, 
    adultSelect, seniorSelect, childrenSelect } = this.state;

    if(this.state.flightType === "One-way")
      FlightsDispatcher.onSearchOneWayFlights(destination, destinationDate, 
        origin, originDate, adultSelect, seniorSelect, childrenSelect);
    else {
      FlightsDispatcher.onSearchRoundTripFlights(destination, destinationDate, 
        origin, originDate, adultSelect, seniorSelect, childrenSelect);
    }
  };

  handleRenderFlightList = (flightsList) => {
    let flightsTable = [];

    if(this.state.sortedItem === "seatPrice") {
      flightsList.sort((a, b) => {
        return this.state.currentSort === 'up' ? a.seatPrice-b.seatPrice : b.seatPrice-a.seatPrice;
      });
    }

    else if(this.state.sortedItem === "date") {
      flightsList.sort((a, b) => {
        return this.state.currentSort === 'up' ? new Date(a.date)-new Date(b.date) : new Date(b.date)-new Date(a.date);
      });
    }

    
    for (var i in flightsList) {
      const index = Number(i) + 1;
      flightsTable.push(
        <tr key={index}>
          <th>{index}</th>
          <td>{flightsList[i].routeId.origin.city}</td>
          <td>{flightsList[i].routeId.destination.city}</td>
          <td>{flightsList[i].date}</td>
          <td>{"$" + flightsList[i].seatPrice}</td>
          <td>
            <button
            onClick={this.handleFlightTableOnClick}
            className="btn btn-primary" 
            value = {i}
          >
            Details
          </button></td>
        </tr>
      );
    }

    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Origin</th>
            <th scope="col">Destination</th>
            <th scope="col"><button value="date" onClick={this.handleSortChange}>Date</button></th>
            <th scope="col"><button value="seatPrice" onClick={this.handleSortChange}>Price</button></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{flightsTable}</tbody>
      </table>
    );
  };

  handleRenderReturnFlightList = (flightsList) => {
    let flightsTable = [];


    if(this.state.sortedItem === "seatPrice") {
      flightsList.sort((a, b) => {
        return this.state.currentSort === 'up' ? a.seatPrice-b.seatPrice : b.seatPrice-a.seatPrice;
      });
    }

    else if(this.state.sortedItem === "date") {
      flightsList.sort((a, b) => {
        return this.state.currentSort === 'up' ? new Date(a.date)-new Date(b.date) : new Date(b.date)-new Date(a.date);
      });
    }

    for (var i in flightsList) {
      const index = Number(i) + 1;
      flightsTable.push(
        <tr key={index}>
          <th>{index}</th>
          <td>{flightsList[i].routeId.origin.city}</td>
          <td>{flightsList[i].routeId.destination.city}</td>
          <td>{flightsList[i].date}</td>
          <td>{"$" + flightsList[i].seatPrice}</td>
          <td>
          <button
            onClick={
              this.handleReturnFlightTableOnClick
            }
            className="btn btn-primary" 
            value = {i}
          >
            Details
          </button>
          </td>
        </tr>
      );
    }

    return (
      <table className="table">
        <thead>
          <tr>
          <th scope="col">#</th>
            <th scope="col">Origin</th>
            <th scope="col">Destination</th>
            <th scope="col">Date</th>
            <th scope="col">Price</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{flightsTable}</tbody>
      </table>
    );
  };

  handleFlightTableOnClick = (e) => {
    const { flights } = Store.getState();
    const flightsList = flights.departureFlights.searchResults;
    let index = e.target.value;
    this.setState({
      viewAirplaneId: flightsList[index].airplaneId,
      viewIataOrig: flightsList[index].routeId.origin.airportCode,
      viewCityOrig: flightsList[index].routeId.origin.city,
      viewIataDest: flightsList[index].routeId.destination.airportCode,
      viewCityDest: flightsList[index].routeId.destination.city,
      viewPrice: flightsList[index].seatPrice,
      viewSeats: flightsList[index].availableSeats,
      viewDepartureDate: flightsList[index].date,
      viewDepartureTime: flightsList[index].time,
    });
  }

  handleReturnFlightTableOnClick = (e) => {
    const { flights } = Store.getState();
    const flightsList = flights.search.return.results;
    let index = e.target.value;
    this.setState({
      viewAirplaneId: flightsList[index].airplaneId,
      viewIataOrig: flightsList[index].routeId.origin.airportCode,
      viewCityOrig: flightsList[index].routeId.origin.city,
      viewIataDest: flightsList[index].routeId.destination.airportCode,
      viewCityDest: flightsList[index].routeId.destination.city,
      viewPrice: flightsList[index].seatPrice,
      viewSeats: flightsList[index].availableSeats,
      viewDepartureDate: flightsList[index].date,
      viewDepartureTime: flightsList[index].time,
    });
    
  }

  handleRenderAirportRecommendations = (inputText, type) => {
    return (
      <li><button 
          className={"dropdown-item"}
          type="button" 
          onClick={() => this.setState({[type]: "San Francisco"})}
        >
          {"San Francisco"}
      </button></li>
    );
  }
}
export default LandingPage;