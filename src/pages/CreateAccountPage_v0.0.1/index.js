// Libraries
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Components
import FlexColumn from '../../components/FlexColumn';

class CreateAccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() { 
    return ( 
      <div>
        <FlexColumn
          className={"kit-bg-blue"}
          style={{ 
            position: "absolute", 
            height: "100vh", 
            width: "100vw",
          }}
        >
          {/* Content */}
          <div className="text-white">create account</div>
          <Link to="/home">
            <button className="btn btn-light m-5">
              Home Page
            </button>
          </Link>
        </FlexColumn>
      </div>
    );
  }
}
export default CreateAccountPage;