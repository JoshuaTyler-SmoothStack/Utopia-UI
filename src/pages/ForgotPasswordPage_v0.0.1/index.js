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

        </FlexBox>
      </div>
    );
  }
}
export default ForgotPasswordPage;