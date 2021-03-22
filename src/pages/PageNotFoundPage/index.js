// Libraries
import React, { Component } from "react";
import { Link } from 'react-router-dom';

// Components
import NavBar from "../../componentgroups/NavBar";
import FlexRow from "../../components/FlexRow";

class PageNotFoundPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container-fluid" style={{ height: "100vh", width: "100vw",  overflowY: "hidden" }}>
        <div className="row">

          {/* Navbar */}
          <NavBar className="col-12" />

          {/* Page Not Found Card */}
          <FlexRow className="col-12">
            {/* Card */}
            <div className="card p-2 mt-3 mt-5" style={{maxWidth:"25rem"}}>

              {/* Header */}
              <h2 className="card-title">404 - Page Not Found</h2>
              <hr className="w-100 mt-0"></hr>

              {/* Body */}
              <div className="card-body">
                It seems the page you're looking for may have moved or does not exist.
              </div>

              {/* Button */}
              <FlexRow justify="end">
                <Link to="/home">
                  <button className="btn btn-success text-white kit-text-shadow-thin">
                    Home
                  </button>
                </Link>
              </FlexRow>
            </div>
          </FlexRow>
          
        </div>
      </div>
    );
  }
}
export default PageNotFoundPage;
