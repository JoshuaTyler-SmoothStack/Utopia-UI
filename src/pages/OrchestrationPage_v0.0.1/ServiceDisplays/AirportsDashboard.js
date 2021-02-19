// Libraries
import React, { Component } from 'react';
import AirportsDispatcher from '../../../dispatchers/AirportsDispatcher';

// Components
import FlexBox from '../../../components/FlexBox';
import PopContent from '../../../components/PopContent_v0.0.1';

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
    const { state } = this.props;

    const searchResults = state.airports
    ? state.airports.searchResults
    : [];

    const status = state.airports
    ? state.airports.status
    : "INACTIVE";

    return (
    <div style={{height:" 100%", width: "100%"}}>
      <FlexBox
        className={"kit-gradient-lightgrey90 rounded kit-border-shadow p-2"}
        justify={"start"}
        style={{height:" 100%", overflow: "hidden"}}
      >
        <button
          className={"btn btn-info rounded"}
          onClick={() => this.findAllAirports()}
        >
          {status === "PENDING" 
            ? <div className="spinner-border text-light"/>
            : "findAllAirports()"
          }
        </button>
      </FlexBox>

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
            overflow: "hidden"
          }}
          onClose={() => this.setState({isActive_PopContent: false})}
        >
          {this.handleRenderAirportList(searchResults)}
        </PopContent>
      }
    </div>);
  }

  findAllAirports = () => {
    const { reduce } = this.props;
    AirportsDispatcher.onFindAll(reduce);
    this.setState({isActive_PopContent: true});
  }

  handleRenderAirportList = (airportsList) => {
    let airportsTable = [];
    for(var i in airportsList) {
      airportsTable.push(
        <tr>
          <th scrop="row">{Number(i) + 1}</th>
          <td>{airportsList[i].iataId}</td>
          <td>{airportsList[i].city}</td>
        </tr>
      );
    }

    return (
      <FlexBox
        justify={"start"}
        style={{height: "99%", width: "99%"}}
        type={"column"}
      >
        <table className="table kit-border-shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">IATA Code</th>
              <th scope="col">City</th>
            </tr>
          </thead>
          <tbody>
            {airportsTable}
          </tbody>
        </table>
      </FlexBox>
    );
  };

}
export default AirportsDashboard;