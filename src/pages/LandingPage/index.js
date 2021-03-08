// Libraries
import React, { Component } from "react";
import Store from "../../reducers/Store";
import FlightsDispatcher from "../../dispatchers/FlightsDispatcher";

// Components
import NavBar from "../../componentgroups/NavBar";
import PopContent from "../../components/PopContent";
import FlexColumn from "../../components/FlexColumn";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: "",
      origin: "",
      date: "",
      dateReturn: "",
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

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  }

  onSortChange = (e) => {
		const { currentSort } = this.state;
		let nextSort;

		if (currentSort === 'down') nextSort = 'up';
		else if (currentSort === 'up') nextSort = 'down';

		this.setState({
			currentSort: nextSort,
      sortedItem: e.target.value
		});
	};

  searchClick = (e) => {
    e.preventDefault();

    var req = {
      destination: this.state.destination,
      origin: this.state.origin,
      date: this.state.date,
      dateReturn: this.state.dateReturn,
      adultSelect: this.state.adultSelect,
      seniorSelect: this.state.seniorSelect,
      childrenSelect: this.state.childrenSelect,
    }

    if(this.state.flightType === "One-way")
      FlightsDispatcher.onSearchOneWayFlights(req);
    else{
      FlightsDispatcher.onSearchRoundTripFlights(req);
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
            onClick={
              this.handleFlightTableOnClick  
            }
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
            <th scope="col"><button value="date" onClick={this.onSortChange}>Date</button></th>
            <th scope="col"><button value="seatPrice" onClick={this.onSortChange}>Price</button></th>
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
    const flightsList = flights.returnFlights.searchResults;
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

  render() {
    const { flights } = Store.getState();

    const departureFlights = flights.departureFlights;
    const returnFlights = flights.returnFlights;

    const departureStatus = departureFlights.status || "INACTIVE";
    const returnStatus = returnFlights.status || "INACTIVE";

    return (
      <div className="container-fluid kit-bg-blue" style={{height:"100vh", width:"100vw"}}>
        <div className="row">
        {/* Navbar */}
        <NavBar className="col-12" hideSearchBar={true} />

        {/* Content */}
        <FlexColumn className="col-12" style={{height: "auto"}}>
              
              {/* Flights Search & Tables */}
              <div className="rounded kit-bg-smoke mt-4 p-3">
                <form>
                  <div className="row mt-4 flex-row-around">
                    <div className="col">
                      <div className="form-group check">
                        <label check>
                          <input
                            type="radio"
                            value="One-way"
                            onChange={(e) => this.handleInputChange(e)}
                            defaultChecked
                            name="flightType"
                          />
                          One-way
                        </label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group" check>
                        <label check>
                          <input
                            type="radio"
                            value="Round-trip"
                            onChange={(e) => this.handleInputChange(e)}
                            name="flightType"
                          />
                          Round-trip
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row flex-row-around mt-4">
                    <div className="col">
                      <div className="form-group">
                        <label for="origin">From: </label> {'   '}
                        <input
                          type="text"
                          onChange={(e) => this.handleInputChange(e)}
                          name="origin"
                          id="origin"
                          placeholder="e.g: JFK, MIA"
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label for="destination">To:</label> {'   '}
                        <input
                          type="text"
                          onChange={(e) => this.handleInputChange(e)}
                          name="destination"
                          id="destination"
                          placeholder="e.g: DCA, SFO "
                        />
                      </div>
                    </div>
                  </div>

                  <hr className="w-100"></hr>

                  <div className="row flex-row-around mt-4 traveler-row">
                    <div className="col">Travelers: </div>
                    <div className="col">
                      <div className="form-group">
                        <label for="adultSelect">Adult: </label>
                        <input
                          type="number"
                          onChange={(e) => this.handleInputChange(e)}
                          name="adultSelect"
                          id="adultSelect"
                          defaultValue = "1"
                          min="1"
                          max="5"
                        >
                        </input>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label for="childrenSelect">Children: </label>
                        <input
                          type="number"
                          onChange={(e) => this.handleInputChange(e)}
                          name="childrenSelect"
                          defaultValue = "0"
                          id="childrenSelect"
                          min="0"
                          max="5"
                        >
                        </input>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label for="seniorSelect">Senior: </label>
                        <input
                          type="number"
                          onChange={(e) => this.handleInputChange(e)}
                          name="seniorSelect"
                          defaultValue = "0"
                          id="seniorSelect"
                          min="0"
                          max="5"
                        >
                        </input>
                      </div>
                    </div>
                  </div>

                  <hr className="w-100"></hr>

                  <div className="row flex-row-around mt-4">
                    <div className="col">
                      <div className="form-group">
                        Departure Date:
                        <input
                          type="date"
                          name="date"
                          placeholder="date placeholder"
                          onChange={(e) => this.handleInputChange(e)}
                        /> 
                      </div>
                    </div>
                  </div>

                  {this.state.flightType !== "One-way" &&
                   <div className="row flex-row-around mt-4">
                    <div className="col">
                      <div className="form-group">
                        Return Flight Departure Date:
                        <input
                          type="date"
                          name="dateReturn"
                          placeholder="date placeholder"
                          onChange={(e) => this.handleInputChange(e)}
                        />
                      </div>
                    </div>
                  </div> }

                  <div className="row flex-row mt-4">
                    <div className="col">
                      <button
                        onClick={this.searchClick}
                        className="btn btn-primary"
                        size="lg"
                      >
                        Search for flights
                      </button>
                    </div>
                  </div>
                </form>
              </div>

             {departureStatus !== "INACTIVE" && 
             <div>
               <div className="text-center rounded overflow-hidden kit-bg-smoke mt-2 p-1">
                  <h1>Flights</h1>
                </div> 
                <div className="rounded overflow-hidden kit-bg-smoke mt-2 mb-1 p-3">
                  {this.handleRenderFlightList(departureFlights.searchResults)}
                </div> 
              </div>} 

              
              {returnStatus !== "INACTIVE" && this.state.flightType !== "One-way"  &&
              <div>
                <div className="text-center rounded overflow-hidden kit-bg-smoke mt-2 p-1">
                  <h1>Return Flights</h1>
                </div> 
                <div className="rounded overflow-hidden kit-bg-smoke mt-2 mb-3 p-3">
                  {this.handleRenderReturnFlightList(returnFlights.searchResults)}
                </div>
              </div>}
            </FlexColumn>
            </div>

            {/* Flights Info Modal */}
            {this.state.viewAirplaneId !== "" &&
            <FlexColumn 
              style={{position: "absolute", zIndex:"1", height:"100vh", width:"100vw", top:"0"}}
            >
              {/* Background */}
              <div className="h-100 w-100 kit-bg-smoke kit-opacity-50"
              style={{position: "absolute", height:"100%", width:"100vw", top:"0"}}/>

              {/* Content */}
              <PopContent 
                className="bg-light rounded mt-auto mb-auto" 
                style={{zIndex: "2"}}
                onClose={() => this.setState({viewAirplaneId: ""})}
              >
                <div className="text-center overflow-hidden p-1">
                  <div className="row flex-row">
                    <div className="col">
                      <div className="row flex-row">
                        <div className="col">
                        Route: {this.state.viewIataOrig} - {this.state.viewIataDest} 
                        </div>
                      </div>
                      <div className="row flex-row">
                        <div className="col">
                        {this.state.viewCityOrig} - {this.state.viewCityDest}
                        </div>
                      </div>
                      
                    </div>
                    
                    <div className="col">
                      <div className="row flex-row">
                        <div className="col">
                        Price: ${this.state.viewPrice} 
                        </div>
                      </div>
                      <div className="row flex-row">
                        <div className="col">
                        Seats Open: {this.state.viewSeats} 
                        </div>
                      </div>                   
                    </div>
                    
                    <div className="col">
                      <div className="row flex-row">
                        <div className="col">
                        Date: {this.state.viewDepartureDate} 
                        </div>
                      </div>
                      <div className="row flex-row">
                        <div className="col">
                        Time: {this.state.viewDepartureTime} 
                        </div>
                      </div>   
                    
                    </div>
                  </div>
                </div> 
              </PopContent>
            </FlexColumn>
            }
      </div>
    );
  }
}
export default LandingPage;