// Libraries
import React, { Component } from 'react';

// Styles
import "../../styles_v0.0.1/KitStyles.css";

class OrchestratorDashboard extends Component {
  constructor(props) {
    super(props);
    // @PROP: contentNegotiation - String
    // @PROP: isActive - Boolean
    // @PROP: sizing - Object{}
    // @PROP: status  - String

    // @PROP: onSelectButton1 - Function()
    // @PROP: onSelectContentNegotiation - Function()
    // @PROP: onSelectOrchestratorConnect - Function()
    // @PROP: onSelectOrchestratorDisconnect - Function()

    this.state = {};
  }

  render() {
    const { contentNegotiation, isActive, sizing, status } = this.props;

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
          {/* Connection Button */}
          {isActive
            ? <button 
                className={"btn-custom bg-custom-red color-custom-cream m-2 no-user"}
                style={{
                  height: sizing.button + "px",
                  width: (sizing.button * 4.5) + "px",
                }}
                onClick={() => this.props.onSelectOrchestratorDisconnect()}
              >
                {"Disconnect Orchestrator"}
              </button>
            : <button 
                className={"btn-custom bg-custom-green m-2 no-user"}
                style={{
                  height: sizing.button + "px",
                  width: (sizing.button * 4.5) + "px",
                }}
                onClick={() => this.props.onSelectOrchestratorConnect()}
              >
                {"Connect Orchestrator"}
              </button>
          }

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

        {/* XML / JSON Toggle */}
        {isActive &&
        <div
          className={"gradient-yellow " + rowStart}
          style={{
            height: "20%",
            width: "100%",
          }}
        >
          {/* "Send Request As" Label */}
          <div 
            className={"color-custom-cream " + row}
            style={{
              height: sizing.buttonSmall + "px",
              width: (sizing.button * 3) +"px",
            }}
          >
            {"Send requests as: "}
          </div>

          {/* JSON / XML Toggle */}
          <div
            className={"border-radius-sm border-shadow " + rowStart}
            style={{
              height: "85%",
              width: (sizing.button * 3.5) + "px",
              overflow: "hidden",
            }}
          >
            {/* JSON */}
            <button
              className={"btn-custom " + (contentNegotiation === "JSON" && "bg-custom-green")}
              style={{
                height: "150%",
                width: "49%",
              }}
              onClick={() => this.props.onSelectContentNegotiation("JSON")}
            >
              {"JSON"}
            </button>

            {/* Divider */}
            <div
              style={{
                height: "100%",
                width: "2%",
              }}
            />

            {/* XML */}
            <button
              className={"btn-custom " + (contentNegotiation === "XML" && "bg-custom-green")}
              style={{
                height: "150%",
                width: "49%",
              }}
              onClick={() => this.props.onSelectContentNegotiation("XML")}
            >
              {"XML"}
            </button>
          </div>
        </div>}

        {/* Function Buttons */}
        {isActive &&
        <div
          className={column}
          style={{height: "60%", width:"100%"}}
        >
          {/* Row 1 */}
          <div
            className={rowStart}
            style={{
              height: "45%", 
              width:"95%"
            }}
          >
            {/* Button 1 */}
            <button
              className={"btn-custom bg-custom-cream border-radius-sm border-shadow"}
              style={{
                height: sizing.buttonSmall + "px", 
                width: (sizing.button * 3.5) + "px",
              }}
              onClick={() => this.props.onSelectButton1()}
            >
              {"findActiveServices()"}
            </button>

          </div>

          {/* Row 2 */}
          <div
            className={row}
            style={{
              height: "45%", 
              width:"100%"
            }}
          >
          </div>
        </div>}
      </div>
     );
  }
}
export default OrchestratorDashboard;