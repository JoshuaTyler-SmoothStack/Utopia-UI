// Libraries
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Components
import FlexBox from '../../components/FlexBox';

class ForgotPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() { 
    return ( 
      <div>
        <FlexBox
          className={"kit-bg-blue"}
          type={"column"}
          style={{ 
            position: "absolute", 
            height: "100vh", 
            width: "100vw",
          }}
        >
          {/* Content */}
          <input type="text" placeholder="insert forgot password code" ></input>
          <div className="text-white">forgot password</div>
          <Link to="/home">
            <button className="btn btn-light m-5">
              Home Page
            </button>
          </Link>
        </FlexBox>
      </div>
    );
  }
}
export default ForgotPasswordPage;