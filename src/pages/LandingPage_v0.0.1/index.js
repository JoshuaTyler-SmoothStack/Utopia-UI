// Libraries
import React, { Component } from "react";
import { Button, Row, Col, Label, Form, FormGroup, Input } from "reactstrap";
import RootReducer from "../../reducers/RootReducer";
import FlightsDispatcher from "../../dispatchers/FlightsDispatcher";

// Components
import NavBar from "../../componentgroups/NavBar_v0.0.1";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: "",
      origin: "",
      date: "",
      flightType: "One-way",
      adultSelect: 1,
      seniorSelect: 0,
      childrenSelect: 0,
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

  handleDateChange(val) {
    this.setState({ value: val });
  }

  clicked = () => {
    /*alert("flight-type : " + this.state.flightType);
    alert("origin : " + this.state.origin);
    alert("destination : " + this.state.destination);
    alert("date : " + this.state.date);
    alert("adult : " + this.state.adultSelect);
    alert("children : " + this.state.childrenSelect);
    alert("senior: " + this.state.seniorSelect);*/
    FlightsDispatcher.onFindAll();
    //FlightsDispatcher.onSearchFlights
  };

  handleRenderFlightList = (flightsList) => {
    let flightsTable = [];
    for (var i in flightsList) {
      const index = Number(i) + 1;
      flightsTable.push(
        <tr key={index}>
          <th scrop="row">{index}</th>
          <td>{flightsList[i].routeId.origin.city}</td>
          <td>{flightsList[i].routeId.destination.city}</td>
          <td>{flightsList[i].airplaneId}</td>
          <td>{flightsList[i].date}</td>
          <td>{flightsList[i].seatPrice}</td>
          <td>{flightsList[i].availableSeats}</td>
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
            <th scope="col">AirplaneId</th>
            <th scope="col">Date</th>
            <th scope="col">Price</th>
            <th scope="col">Seats Available</th>
          </tr>
        </thead>
        <tbody>{flightsTable}</tbody>
      </table>
    );
  };

  render() {
    const { flights } = RootReducer.getState();

    const searchResults = flights ? flights.searchResults : [];

    const status = flights ? flights.status : "INACTIVE";

    return (
      <div
        className="container-fluid overflow-hidden kit-bg-blue"
        style={{ height: "100vh", width: "100vw" }}
      >
        {/* Navbar */}
        <div className="row">
          <NavBar className="col" hideSearchBar={true} />
        </div>

        {/* Content */}
        <div className="row justify-content-center">
          <div className="col-6 d-flex flex-column justify-content-center" style={{height: "85vh"}}>
              {/* Content */}

              <div className="rounded kit-bg-smoke mt-4 p-3">
                <Form>
                  <Row className="mt-4 flex-row-around">
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            value="One-way"
                            onChange={(e) => this.handleInputChange(e)}
                            defaultChecked
                            name="flightType"
                          />
                          One-way
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            value="Round-trip"
                            onChange={(e) => this.handleInputChange(e)}
                            name="flightType"
                          />
                          Round-trip
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row className="flex-row-around mt-4">
                    <Col>
                      <FormGroup>
                        <Label for="origin">From: </Label>
                        <Input
                          type="text"
                          onChange={(e) => this.handleInputChange(e)}
                          name="origin"
                          id="origin"
                          placeholder="e.g: JFK, MIA"
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="destination">To: </Label>
                        <Input
                          type="text"
                          onChange={(e) => this.handleInputChange(e)}
                          name="destination"
                          id="destination"
                          placeholder="e.g: DCA, SFO "
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row className="flex-row-around mt-4 traveler-row">
                    <Col>Travelers: </Col>
                    <Col>
                      <FormGroup>
                        <Label for="adultSelect">Adult: </Label>
                        <Input
                          type="select"
                          onChange={(e) => this.handleInputChange(e)}
                          name="adultSelect"
                          id="adultSelect"
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="childrenSelect">Children: </Label>
                        <Input
                          type="select"
                          onChange={(e) => this.handleInputChange(e)}
                          name="childrenSelect"
                          id="childrenSelect"
                        >
                          <option>0</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="seniorSelect">Senior: </Label>
                        <Input
                          type="select"
                          onChange={(e) => this.handleInputChange(e)}
                          name="seniorSelect"
                          id="seniorSelect"
                        >
                          <option>0</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row className="flex-row-around mt-4">
                    <Col>
                      {/*} <DatePicker
                              onChange={(e) => this.handleDateChange(e)}
                              value={this.state.value}
                        />*/}
                      <FormGroup>
                        Departure Date:
                        <Input
                          type="date"
                          name="date"
                          placeholder="date placeholder"
                          onChange={(e) => this.handleInputChange(e)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="flex-row mt-4">
                    <Col>
                      <Button
                        onClick={this.clicked}
                        className="btn-primary"
                        size="lg"
                      >
                        Search for flights
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>

              <div className="rounded flightPanel kit-bg-smoke mt-4 p-3">
                {this.handleRenderFlightList(searchResults)}
              </div>
            </div>
        </div>
      </div>
    );
  }
}
export default LandingPage;
