// Libraries
import React, { Component } from 'react';
import AirplanesDispatcher from '../../../dispatchers/AirplanesDispatcher';
import Store from '../../../reducers/Store';

// Components
import PopContent from '../../../components/PopContent';
import ErrorMessage from '../../../components/ErrorMessage';
import FlexRow from '../../../components/FlexRow';
import FlexColumn from '../../../components/FlexColumn';
// import Orchestration from '../../../Orchestration';

class AirplanesDashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      onCancel: null,
      onConfirm: null,
      isActive_PopContent: false,
    };
  }

  render() {
    const { airplanes } = Store.getState();
    const searchResults = airplanes.search.results;
    const status = airplanes.status;

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
          onClick={() => AirplanesDispatcher.onFakeAPICall()}
        >
          {"fakeAPICall()"}
        </button>

        {/* Find All */}
        <button
          className={"btn btn-info rounded m-1"}
          onClick={() => this.findAllAirplanes()}
        >
          {"findAllAirplanes()"}
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
            this.handleRenderAirplanesList(searchResults)
          }
        </PopContent>
      }
    </div>);
  }

  findAllAirplanes = () => {
    AirplanesDispatcher.onRequest();
    this.setState({isActive_PopContent: true});
  }

  handleRenderAirplanesList = (airplanesList) => {
    const { airplanes } = Store.getState();
    const resultsDisplayed = airplanes.search.resultsPerPage;
    const resultsStart = airplanes.search.resultsPerPage * (airplanes.search.resultsPage - 1);

    let airplanesTable = [];
    if(!airplanesList.length) airplanesList = [airplanesList];
    for(var i = resultsStart; i < airplanesList.length; i++) {
      if(i < resultsStart + resultsDisplayed) {
        
        const airplane = airplanesList[i];
        const airplaneId = airplane.id;
        if(!airplaneId) continue;

        const index = Number(i) + 1;
        airplanesTable.push(
          <tr key={index}>
            <th scrop="row">{index}</th>
            <td>{airplaneId}</td>
            <td>{airplanesList[i].typeId}</td>
          </tr>
        );
      } else {
        break;
      }
    }

    return (
      <FlexColumn justify={"start"} style={{height: "99%", width: "99%"}}>
        <table className="table kit-border-shadow m-3">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">TypeID</th>
            </tr>
          </thead>
          <tbody>
            {airplanesTable}
            <tr><td colSpan="3"></td>{/* Space at end of table for aesthetic */}</tr>
          </tbody>
        </table>
      </FlexColumn>
    );
  };
}
export default AirplanesDashboard;