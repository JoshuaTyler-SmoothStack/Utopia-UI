// Libraries
import React, { Component } from 'react';
import AirportsDispatcher from '../../../dispatchers/AirportsDispatcher';
import RootReducer from '../../../reducers/RootReducer';

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
    const { airports } = RootReducer.getState();

    const searchResults = airports
    ? airports.searchResults
    : [];

    const status = airports
    ? airports.status
    : "INACTIVE";

    return (
    <div style={{height:" 100%", width: "100%"}}>
      <FlexRow
        className={"kit-gradient-lightgrey90 rounded kit-border-shadow p-2"}
        justify={"start"}
        style={{height:" 100%", overflow: "hidden"}}
      >
        <button
          className={"btn btn-info rounded"}
          onClick={() => this.findAllAirports()}
        >
          {"findAllAirports()"}
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
            overflow: "hidden"
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

          {this.handleRenderAirportList(searchResults)}
        </PopContent>
      }
    </div>);
  }

  findAllAirports = () => {
    AirportsDispatcher.onFindAll();

    // RootReducer.setState((state) => ({
    //   ...state,
    //   airports: {status: "PENDING"}
    // }));

    // Orchestration.createRequest("/airports", onSuccess => {
    //   RootReducer.setState((state) => ({
    //     ...state,
    //     airports: {
    //       searchresults: onSuccess,
    //       status: "REGISTERED"
    //     }
    //   }));
    // }, onError => {
    //   RootReducer.setState((state) => ({
    //     ...state,
    //     airports: {
    //       searchresults: onSuccess,
    //       status: "REGISTERED"
    //     }
    //   }));
    // });

    this.setState({isActive_PopContent: true});
  }

  handleRenderAirportList = (airportsList) => {
    let airportsTable = [];
    for(var i in airportsList) {
      const index = Number(i) + 1;
      airportsTable.push(
        <tr key={index}>
          <th scrop="row">{index}</th>
          <td>{airportsList[i].iataId}</td>
          <td>{airportsList[i].city}</td>
        </tr>
      );
    }

    return (
      <FlexColumn justify={"start"} style={{height: "99%", width: "99%"}}>
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
      </FlexColumn>
    );
  };

}
export default AirportsDashboard;