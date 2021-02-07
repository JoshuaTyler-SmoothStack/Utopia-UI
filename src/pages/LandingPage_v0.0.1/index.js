// Libraries
import Orchestration from '../../Orchestration';
import React, { Component } from 'react';

// Components
import AirportDashboard from './AirportDashboard';
import ConfirmationMenu from '../../components/ConfirmationMenu_v0.0.1';
import NavBar from '../../components/NavBar_v0.0.1';
import OrchestratorDashboard from './OrchestratorDashboard';
import PopContext from '../../components/PopContext_v0.0.1';
import RouteDashboard from './RouteDashboard';
import UserDashboard from './UserDashboard';

// Styles
import "../../styles_v0.0.1/KitStyles.css";
import KitUtils from '../../kitutils/KitUtils_v1.0.0';

class MapPage extends Component {
  constructor(props) {
    super(props);
    // @PROP: sizing - obj{}
    // @PROP: onSelectPage - f()

    this.state = {
      animationXOffset: 0,
      animationYOffset: 0,
      contentNegotiation: "JSON",
      onCancel: null,
      onConfirm: null,

      // Orchestrator
      isActive_Orchestrator: false,
      status_Orchestrator: "Not Connected",
      containerSize_Orchestrator: props.sizing.buttonLarge || 100,

      // Airport
      isActive_Airport: false,
      status_Airport: "Not Connected",
      containerSize_Airport: props.sizing.buttonLarge || 100,

      // Route
      isActive_Route: false,
      status_Route: "Not Connected",
      containerSize_Route: props.sizing.buttonLarge || 100,

      // User
      isActive_User: false,
      status_User: "Not Connected",
      containerSize_User: props.sizing.buttonLarge || 100,

      // InputText
      isActive_InputText: false,
      inputTextLabel: "",

      // PopContext
      isActive_PopContext: false,
      popContext: ""
    };
  }

  render() { 
    const { sizing } = this.props;
    const { animationXOffset, animationYOffset, 
      contentNegotiation, onCancel, onConfirm,
      isActive_Airport, status_Airport, containerSize_Airport,
      isActive_Orchestrator, status_Orchestrator, containerSize_Orchestrator,
      isActive_Route, status_Route, containerSize_Route,
      isActive_User, status_User, containerSize_User,
      isActive_InputText, inputTextLabel,
      isActive_PopContext, popContext,
    } = this.state;

    const column = "d-flex flex-column justify-content-center align-items-center";
    const columnAround = "d-flex flex-column justify-content-around align-items-center";
    // const columnStart = "d-flex flex-column justify-content-start align-items-center"
    // const row = "d-flex flex-row justify-content-center align-items-center";
    // const rowStart = "d-flex flex-row justify-content-start align-items-center";

    const pageClasses = column + " bg-custom-blue";
    const pageStyle = { 
      position: "absolute", 
      height: "100vh", 
      width: "100vw", 
      left: animationXOffset + "px", 
      top: animationYOffset + "px"
    }; 

    const popContent = 
    <div 
      className={"bg-custom-lightgrey border-radius-xsm border-shadow"}
      style={{
        fontSize: sizing.h1 + "px",
        height: "95%",
        width: "95%",
        padding: sizing.button + "px",
        overflow: "auto"
      }}
    >
      {popContext}
    </div>;

    return ( 
      <div className={pageClasses} style={pageStyle}>

        {/* Content */}
        <div 
          className={columnAround}
          style={{
            height: (sizing.buttonLarge * 4 + sizing.button * 8) + "px",
            width: (sizing.buttonLarge * 7) + "px",
            maxHeight: "100%",
            maxWidth: "100%",
          }}
        >
          {/* Orchestrator */}
          <div 
              className="m-2"
              style={{
                height: containerSize_Orchestrator + "px",
                width: "100%",
                maxHeight: "30%",
              }}
            >
            <OrchestratorDashboard
              contentNegotiation={contentNegotiation}
              isActive={isActive_Orchestrator}
              sizing={sizing}
              status={status_Orchestrator}
              onSelectButton1={this.handleOrchestratorButton1}
              onSelectOrchestratorConnect={() => this.handleSelectOrchestratorConnect()}
              onSelectContentNegotiation={(e) => this.handleSelectContentNegotiation(e)}
              onSelectOrchestratorDisconnect={() => this.handleSelectOrchestratorDisconnect()}
            />
          </div>

          {/* Airport Service */}
          <div 
            className="m-2"
            style={{
              height: containerSize_Airport + "px",
              width: "100%",
              maxHeight: "20%",
            }}
          >
            <AirportDashboard
              isActive={isActive_Airport}
              sizing={sizing}
              status={status_Airport}
              onFindAllAirports={() => this.handleFindAllAirports()}
              onFindAirportByIataId={() => this.handleFindAirportByIataId()}
            />
          </div>

          {/* Route Service */}
          <div 
            className="m-2"
            style={{
              height: containerSize_Route + "px",
              width: "100%",
              maxHeight: "20%",
            }}
          >
            <RouteDashboard
              isActive={isActive_Route}
              sizing={sizing}
              status={status_Route}
              onFindAllRoutes={() => this.handleFindAllRoutes()}
            />
          </div>

          {/* User Service */}
          <div 
            className="m-2"
            style={{
              height: containerSize_User + "px",
              width: "100%",
              maxHeight: "20%",
            }}
          >
            <UserDashboard
              isActive={isActive_User}
              sizing={sizing}
              status={status_User}
              onFindAllUsers={() => this.handleFindAllUsers()}
            />
          </div>
        </div>

        {/* PopContext */}
        {isActive_PopContext &&
        <PopContext
          buttonSize={sizing.button}
          elementHeight={window.innerHeight*0.85}
          elementWidth={window.innerWidth*0.85}
          elementOffsetX={(window.innerWidth - (window.innerWidth*0.85)) * 0.5}
          elementOffsetY={(window.innerHeight - (window.innerHeight*0.85)) * 0.5}
          passedContent={popContent}
          onClose={() => this.setState({isActive_PopContext: false})}
        />}

        {/* InputText */}
        {isActive_InputText &&
        <div 
          className="bg-custom-smoke border-radius-sm border-shadow"
          style={{
            position: "absolute",
            height: sizing.screenbarLarge + "px",
            width: sizing.screenbarLarge + "px",
            top: (window.innerHeight - (sizing.screenbarLarge)) * 0.5,
            left: (window.innerWidth - (sizing.screenbarLarge)) * 0.5
          }}
        >
          <ConfirmationMenu
            isTextInput={true}
            passedText={inputTextLabel}
            sizing={sizing}
            onCancel={onCancel} 
            onConfirm={onConfirm} 
          />
        </div>}

        {/* Navbar */}
        <div 
          style={{
            position: "absolute", 
            height: sizing.screenbar+"px",
            width: "100vw",
            top:"0", 
          }}
        >
          <NavBar
            sizing={sizing}
            onSelectPage={(e) => this.props.onSelectPage(e)}
          />
        </div>

      </div>
    );
  }

  handleOrchestrationError = (errMsg) => {
    this.handleSelectOrchestratorDisconnect();
    // this.handlePopulateInfoWindow(errMsg);
  }

  handleSelectContentNegotiation = (selectedType) => {
    const { currentType } = this.state;
    if(selectedType !== currentType) {
      this.setState({contentNegotiation: selectedType});
      Orchestration.setContentType(selectedType.toLowerCase());
      console.log(Orchestration.contentType);
    }
  }

  handleSelectOrchestratorConnect = () => {
    Orchestration.validate(
      onError => {
      this.handleOrchestrationError(onError);
    }, onSuccess => {
      this.handleOrchestratorDashboardUpdate(onSuccess["status"]);
      this.handleServicesReload();
    });
  }

  handleSelectOrchestratorDisconnect = () => {
    this.handleOrchestratorDashboardUpdate(null);
    this.handleAirportDashboardUpdate(null);
    this.handleRouteDashboardUpdate(null);
    this.handleUserDashboardUpdate(null);
  }

  handleSetPopContext = (context) => {
    this.setState({isActive_PopContext: true, popContext: JSON.stringify(context)});
  }
  
  handleServicesReload = () => {
    Orchestration.findActiveServices(
      onError => {
      this.handleAirportDashboardUpdate(null);
      this.handleRouteDashboardUpdate(null);
      this.handleUserDashboardUpdate(null); 
    }, onSuccess => {
      const services = onSuccess.map((i) => i.toUpperCase());
      for(var item in services) {
        if(services[item].includes("AIRPORT")) {
          this.handleAirportDashboardUpdate("http://" + services[item]);
        } else if(services[item].includes("ROUTE")) {
          this.handleRouteDashboardUpdate("http://" + services[item]);
        } else if(services[item].includes("USER")) {
          this.handleUserDashboardUpdate("http://" + services[item]);
        }
      }
    });
  }

  //#region Dashboard Updates
  handleOrchestratorDashboardUpdate = (status) => {
    let isSubtractive = false;
    if(status) {
      this.setState({
        isActive_Orchestrator: true,
        status_Orchestrator: "http://localhost:8080",
      });
    } else {
      isSubtractive = true;
      this.setState({
        isActive_Orchestrator: false,
        status_Orchestrator: "No connection."
      });
    }
    const { sizing } = this.props;
    const { containerSize_Orchestrator } = this.state;
    const minSize = parseFloat(sizing.buttonLarge);
    const maxSize = parseFloat(sizing.buttonLarge) + parseFloat(sizing.button * 2);
    KitUtils.lerp(containerSize_Orchestrator, (isSubtractive ? minSize : maxSize), 5, 10, isSubtractive, onChange => {
      this.setState({containerSize_Orchestrator: onChange});
    });
  }

  handleAirportDashboardUpdate = (status) => {
    let isSubtractive = false;
    if(status) {
      this.setState({
        isActive_Airport: true,
        status_Airport: status,
      });
    } else {
      isSubtractive = true;
      this.setState({
        isActive_Airport: false,
        status_Airport: "No connection.",
      });
    }
    const { sizing } = this.props;
    const { containerSize_Airport } = this.state;
    const minSize = parseFloat(sizing.buttonLarge);
    const maxSize = parseFloat(sizing.buttonLarge) + parseFloat(sizing.button * 2);
    KitUtils.lerp(containerSize_Airport, (isSubtractive ? minSize : maxSize), 5, 10, isSubtractive, onChange => {
      this.setState({containerSize_Airport: onChange});
    });
  }

  handleRouteDashboardUpdate = (status) => {
    let isSubtractive = false;
    if(status) {
      this.setState({
        isActive_Route: true,
        status_Route: status,
      });
    } else {
      isSubtractive = true;
      this.setState({
        isActive_Route: false,
        status_Route: "No connection.",
      });
    }
    const { sizing } = this.props;
    const { containerSize_Route } = this.state;
    const minSize = parseFloat(sizing.buttonLarge);
    const maxSize = parseFloat(sizing.buttonLarge) + parseFloat(sizing.button * 3);
    KitUtils.lerp(containerSize_Route, (isSubtractive ? minSize : maxSize), 10, 1, isSubtractive, onChange => {
      this.setState({containerSize_Route: onChange});
    });
  }

  handleUserDashboardUpdate = (status) => {
    let isSubtractive = false;
    if(status) {
      this.setState({
        isActive_User: true,
        status_User: status,
      });
    } else {
      isSubtractive = true;
      this.setState({
        isActive_User: false,
        status_User: "No connection.",
      });
    }
    const { sizing } = this.props;
    const { containerSize_User } = this.state;
    const minSize = parseFloat(sizing.buttonLarge);
    const maxSize = parseFloat(sizing.buttonLarge) + parseFloat(sizing.button * 2);
    KitUtils.lerp(containerSize_User, (isSubtractive ? minSize : maxSize), 5, 10, isSubtractive, onChange => {
      this.setState({containerSize_User: onChange});
    });
  }
  //#endregion

  //#region Orchestrator Buttons
  handleOrchestratorButton1 = () => {
    Orchestration.findActiveServices(onError => {
      this.handleSetPopContext(onError);
    }, onSuccess => {
      this.handleSetPopContext(onSuccess);
    });
  }
  //#endregion

  //#region Airport Buttons
  handleFindAllAirports = () => {
    Orchestration.findAllAirports(onError => {
      this.handleSetPopContext(onError);
    }, onSuccess => {
      this.handleSetPopContext(onSuccess);
    });
  }

  handleFindAirportByIataId = () => {
    const onCancel = () => this.setState({isActive_InputText: false});
    const onConfirm = (iataId) => {
      this.setState({isActive_InputText: false});
      Orchestration.findAirportByIataId(iataId,
      onError => {
        this.handleSetPopContext(onError);
      }, onSuccess => {
        this.handleSetPopContext(onSuccess);
      });
    }
    this.setState({
      isActive_InputText: true,
      inputTextLabel: "Search an IATA Code",
      onCancel: onCancel,
      onConfirm: onConfirm,
    })
  }
  //#endregion

  //#region Route Buttons
  handleFindAllRoutes = () => {
    Orchestration.findAllRoutes(onError => {
      this.handleSetPopContext(onError);
    }, onSuccess => {
      this.handleSetPopContext(onSuccess);
    });
  }
  //#endregion

  //#region User Buttons
  handleFindAllUsers = () => {
    Orchestration.findAllUsers(onError => {
      this.handleSetPopContext(onError);
    }, onSuccess => {
      this.handleSetPopContext(onSuccess);
    });
  }
  //#endregion

}
export default MapPage;