// Libraries
import React, { Component } from 'react';
import AirplanesDispatcher from '../../../dispatchers/AirplanesDispatcher';
import RootReducer from '../../../reducers/RootReducer';

// Components
import FlexBox from '../../../components/FlexBox';
import PopContent from '../../../components/PopContent';

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
    const { airplanes } = RootReducer.getState();

    const searchResults = airplanes
    ? airplanes.searchResults
    : [];

    const status = airplanes
    ? airplanes.status
    : "INACTIVE";

    return (
    <div>
      <FlexBox
        className={"kit-gradient-lightgrey90 rounded kit-border-shadow"}
        style={{overflow:"hidden"}}
      >
        <button
          className={"btn btn-light rounded"}
          onClick={() => this.findAllAirplanes()}
        >
          {status === "PENDING" 
            ? <div className="spinner-border text-light"/>
            : "findAllAirplanes()"
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
          {this.handleRenderAirplaneList(searchResults)}
        </PopContent>
      }
    </div>);
  }

  findAllAirplanes = () => {
    AirplanesDispatcher.onFindAll();
    this.setState({isActive_PopContent: true});
  }

  handleRenderAirplaneList = (airplanesList) => {
    let airplanesTable = [];
    for(var i in airplanesList) {
      const index = Number(i) + 1;
      airplanesTable.push(
        <tr key={index}>
          <th scrop="row">{index}</th>
          <td>{airplanesList[i].iataId}</td>
          <td>{airplanesList[i].city}</td>
        </tr>
      );
    }

    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">IATA Code</th>
            <th scope="col">City</th>
          </tr>
        </thead>
        <tbody>
          {airplanesTable}
        </tbody>
      </table>
    );
  };

}
export default AirplanesDashboard;