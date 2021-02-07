// Libraries
import React, { Component } from 'react';

// Styles
import "../../styles_v0.0.1/KitStyles.css";

class RouteDashboard extends Component {
  constructor(props) {
    super(props);
    // @PROP: isActive - Boolean
    // @PROP: sizing - Object{}
    // @PROP: status  - String

    // @PROP: onSelectButton1 - Function()

    this.state = {};
  }

  render() {
    const { isActive, sizing, status } = this.props;

    const column = "d-flex flex-column justify-content-center align-items-center";
    const row = "d-flex flex-row justify-content-center align-items-center";
    const rowStart = "d-flex flex-row justify-content-start align-items-center";
    
    return ( 
      <div
        className={column + " gradient-lightgrey90 border-radius-sm border-shadow"}
        style={{height:"100%", width:"100%"}}
      >
        {/* Header */}
        <div
          className={rowStart}
          style={{height: "30%", width:"100%"}}
        >
          {/* Service Name */}
          <div 
            className={"bg-custom-teal border-radius-xsm border-shadow ml-2 " + row}
            style={{
              height: sizing.buttonSmall + "px",
              width: (sizing.button * 3) +"px",
              marginRight: sizing.button + "px"
            }}
          >
            {"RouteMS"}
          </div>

          {/* Status Indicator */}
          {isActive
            ? <div 
                className={"bg-custom-green ml-auto mr-2 border-shadow"}
                style={{
                  height: sizing.buttonSmall + "px",
                  width: sizing.buttonSmall + "px",
                  borderRadius: "50%"
                }}
              />
            : <div 
                className={"bg-custom-red ml-auto mr-2 border-shadow"}
                style={{
                  height: sizing.buttonSmall + "px",
                  width: sizing.buttonSmall + "px",
                  borderRadius: "50%"
                }}
              />
          }

          {/* URI Path Text */}
          <div 
            className={"bg-custom-smoke border-radius-xsm border-shadow " + row}
            style={{
              height: sizing.buttonSmall + "px",
              width: (sizing.button * 5) +"px",
              marginRight: sizing.button + "px"
            }}
          >
            {isActive ? status : "No connection."}
          </div>
        </div>

        {/* Divider */}
        {isActive &&
        <div
          className={"gradient-yellow"}
          style={{
            height: "2%",
            width: "100%",
          }}
        >
        </div>}

        {/* Function Buttons */}
        {isActive &&
        <div
          className={column}
          style={{height: "60%", width:"95%"}}
        >
          {/* Row 1 */}
          <div
            className={rowStart}
            style={{
              height: sizing.button + "px", 
              width:"100%"
            }}
          >
            {/* Button 1 */}
            <button
              className={"btn-custom bg-custom-cream border-radius-sm border-shadow"}
              style={{
                height: sizing.buttonSmall + "px", 
                width: (sizing.button * 3.5) + "px",
              }}
              onClick={() => this.props.onFindAllRoutes()}
            >
              {"findAllRoutes()"}
            </button>
          </div>

          {/* Row 2 */}
          <div
            className={row}
            style={{
              height: sizing.button + "px", 
              width:"100%"
            }}
          >
          </div>
        </div>}
      </div>
     );
  }
}
export default RouteDashboard;