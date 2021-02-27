// Libraries
import Store from "../../../reducers/Store";

// Components
import FlexRow from "../../../components/FlexRow";
import StatusAsyncIndicator from "../../../components/StatusAsyncIndicator";
import StatusIndicator from "../../../components/StatusIndicator";

const OrchestrationHeader = (props) => {
  // @PROP: name - string
  // @PROP: status - string (ERROR, PENDING, SUCCESS)
  // @PROP: onTriggerError - f()
  // @PROP: onTriggerFakeAPICall - f()

  const { orchestration } = Store.getState();

  const name = props.name || "Unkown";

  const isMSActive = name !== "Unkown"
    ? orchestration
      ? orchestration.services.list.includes(name.toLowerCase().split(" ")[0] + "-service")
      : false
    : false;

  const status = props.status || "INACTIVE";

  return(
    <FlexRow className={props.className || ""} style={props.style}>
      
      {/* MS Indicator */}
      <FlexRow 
        className="col-6 bg-dark rounded kit-border-shadow p-2"
        style={{maxWidth: "15rem", overflowX: "clip"}}
        wrap="no-wrap"
      >
        {/* Nameplate */}
        <div 
          className={"btn btn-sm kit-border-shadow kit-pointer-none " + 
          (isMSActive? "btn-success" : "btn-warning")}
          style={{whiteSpace: "nowrap"}}
        >
          {name}
        </div>

        {/* IO Indicator */}
        <StatusAsyncIndicator 
          className="ml-auto ml-1"
          status={status}
        />

        {/* Status Indicator */}
        <StatusIndicator 
          className="ml-1"
          status={isMSActive ? "ACTIVE" : "INACTIVE"}
        />
      </FlexRow>

      {/* Buttons */}
      <FlexRow className="col-6 p-1" wrap={"no-wrap"}>
        {/* Error Trigger */}
        <button className="btn btn-primary ml-2"
          onClick={() => props.onTriggerError()}
        >
          !Error!
        </button>

        {/* Fake API Call */}
        <button className="btn btn-info ml-2"
          onClick={() => props.onTriggerFakeAPICall()}
        >
          Fake API
        </button>
      </FlexRow>
    </FlexRow>
  );
}
export default OrchestrationHeader;