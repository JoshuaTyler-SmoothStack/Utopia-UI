// Libraries
import Orchestration from '../../Orchestration';
import React, { Component } from 'react';

// Components
import NavBar from '../../componentgroups/NavBar_v0.0.1';
import OrchestratorDashboard from './OrchestrationDashboard';

// Styles
import "../../styles_v0.0.1/KitStyles.css";
import KitUtils from '../../kitutils/KitUtils_v1.0.0';
import ServicesDisplay from './ServiceDisplay';

class OrchestrationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // InputText
      isActive_InputText: false,
      inputTextLabel: "",
    };
  }

  render() { 
    const { state, reduce } = this.props;
    const { orchestration, sizing } = state;

    const isActive_OrchestrationDashboard = orchestration
      ? orchestration.status === "ACTIVE"
      : false;

    const services = orchestration
    ? orchestration.services
    : {list: [], status: "UNKNOWN"};

    return ( 
      <div 
        className={"bg-blue flex-column"}
        style={{ 
          position: "absolute", 
          height: "100vh", 
          width: "100vw",
        }}
       >

        {/* Content */}
        <div 
          className={"flex-column-around"}
          style={{
            height: (sizing.buttonLarge * 4 + sizing.button * 8) + "px",
            width: (sizing.buttonLarge * 7) + "px",
            maxHeight: "100%",
            maxWidth: "100%",
          }}
        >
          {/* OrchestratorMS */}
          <div 
              style={{
                height: isActive_OrchestrationDashboard
                  ? "200px"
                  : "100px",
                width: "100%",
                marginBottom: sizing.button + "px"
              }}
            >
            <OrchestratorDashboard
              state={state}
              reduce={reduce}
            />
          </div>

          {/* MS Container */}
          {isActive_OrchestrationDashboard &&
          <div
              style={{
                height: "auto",
                width: "100%",
              }}
            >
            <ServicesDisplay 
              reduce={reduce}
              state={state}
            />
          </div>}         
        </div>

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

  handleSetPopContent = (context) => {
    this.setState({isActive_PopContent: true, popContext: JSON.stringify(context)});
  }
  
  handleServicesReload = () => {
    Orchestration.findActiveServices(
      onError => {
      this.handleAirportDashboardUpdate(null);
      this.handleRouteDashboardUpdate(null);
      this.handleUserDashboardUpdate(null); 
    }, onSuccess => {
      const services = onSuccess.toUpperCase()
      .replace("[", "").replace("]", "").split(", ");
      
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
      this.handleSetPopContent(onError);
    }, onSuccess => {
      this.handleSetPopContent(onSuccess);
    });
  }
  //#endregion

  //#region Airport Buttons
  handleFindAllAirports = () => {
    Orchestration.findAllAirports(onError => {
      this.handleSetPopContent(onError);
    }, onSuccess => {
      this.handleSetPopContent(onSuccess);
    });
  }

  handleFindAirportByIataId = () => {
    const onCancel = () => this.setState({isActive_InputText: false});
    const onConfirm = (iataId) => {
      this.setState({isActive_InputText: false});
      Orchestration.findAirportByIataId(iataId,
      onError => {
        this.handleSetPopContent(onError);
      }, onSuccess => {
        this.handleSetPopContent(onSuccess);
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
      this.handleSetPopContent(onError);
    }, onSuccess => {
      this.handleSetPopContent(onSuccess);
    });
  }
  //#endregion

  //#region User Buttons
  handleFindAllUsers = () => {
    Orchestration.findAllUsers(onError => {
      this.handleSetPopContent(onError);
    }, onSuccess => {
      this.handleSetPopContent(onSuccess);
    });
  }
  //#endregion

}
export default OrchestrationPage;