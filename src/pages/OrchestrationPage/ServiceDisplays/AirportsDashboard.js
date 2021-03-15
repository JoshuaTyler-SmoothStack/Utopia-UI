// Libraries
import React, { Component } from 'react';
import AirportsDispatcher from '../../../dispatchers/AirportsDispatcher';
import Store from '../../../reducers/Store';

// Components
import PopContent from '../../../components/PopContent';
import ErrorMessage from '../../../components/ErrorMessage';
import FlexRow from '../../../components/FlexRow';
import FlexColumn from '../../../components/FlexColumn';
// import Orchestration from '../../../Orchestration';

class AirportsDashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      onCancel: null,
      onConfirm: null,
      isActive_PopContent: false,
    };
  }

  render() {
    const { airports } = Store.getState();
    const searchResults = airports.search.results;
    const status = airports.status;

    return (
    <div style={{height:" 100%", width: "100%"}}>
      <FlexRow
        className={"kit-gradient-lightgrey90 rounded kit-border-shadow p-2"}
        justify={"start"}
        style={{height:" 100%", overflow: "hidden"}}
      >
        {/* Fake API Call */}
        <button
          className={"btn btn-info rounded m-1"}
          onClick={() => AirportsDispatcher.onFakeAPICall()}
        >
          {"fakeAPICall()"}
        </button>

        {/* Find All */}
        <button
          className={"btn btn-info rounded"}
          onClick={() => this.findAllAirports()}
        >
          {"findAllAirports(10)"}
        </button>
      </FlexRow>

      {/* Pop Content */}
      {this.state.isActive_PopContent &&
        <PopContent
          className="kit-bg-smoke kit-border-shadow rounded"
          style={{
            position: "absolute",
            height: window.innerHeight * 0.75,
            width: window.innerWidth * 0.9,
            top: (window.innerHeight - (window.innerHeight * 0.75)) * 0.5,
            left: (window.innerWidth - (window.innerWidth * 0.9)) * 0.5,
            overflow: "auto",
            zIndex: "1"
          }}
          onClose={() => this.setState({isActive_PopContent: false})}
        >
          {status === "PENDING" &&
            <div className="spinner-border text-light"/>
          }

          {status === "ERROR" &&
            <ErrorMessage soundAlert={true}>
              Error
            </ErrorMessage>
          }

          {status === "SUCCESS" && 
            this.handleRenderAirportsList(searchResults)
          }
        </PopContent>
      }
    </div>);
  }

  findAllAirports = () => {
    AirportsDispatcher.onRequest();
    this.setState({isActive_PopContent: true});
  }

  handleRenderAirportsList = (airportsList) => {
    const { airports } = Store.getState();
    const resultsDisplayed = Number(airports.search.resultsPerPage);
    const resultsStart = airports.search.resultsPerPage * (airports.search.resultsPage - 1);

    let airportsTable = [];
    if (!airportsList.length) airportsList = [airportsList];
    for (var i = resultsStart; (i < resultsStart + resultsDisplayed && i < airportsList.length); i++) {
      const airportIataId = airportsList[i].airportIataId;
      if (!airportIataId) continue;

      const index = Number(i) + 1;
      airportsTable.push(
        <tr key={index}>
          <th scrop="row">{index}</th>
          <td>{airportIataId}</td>
          <td>{airportsList[i].airportCityName}</td>
        </tr>
      );
    }

    return (
      <FlexColumn justify={"start"} style={{ height: "99%", width: "99%" }}>
        <table className="table kit-border-shadow m-3">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">IATA ID</th>
              <th scope="col">City</th>
            </tr>
          </thead>
          <tbody>
            {airportsTable}
            <tr><td colSpan="3"></td>{/* Space at end of table for aesthetic */}</tr>
          </tbody>
        </table>
      </FlexColumn>
    );
  }
}
export default AirportsDashboard;