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
    <FlexRow className={props.className || ""} justify={"start"} style={props.style}>
      <FlexRow 
        className="bg-dark rounded kit-border-shadow" 
        justify={"start"} 
        style={{maxWidth: "15rem"}}
      >
        {/* Nameplate */}
        <div 
          className={"btn kit-border-shadow kit-pointer-none m-2 " + 
          (isMSActive? "bg-success" : "bg-warning")}
        >
          {name}
        </div>

        {/* IO Indicator */}
        <StatusAsyncIndicator 
          className="ml-auto mr-2"
          status={status}
        />

        {/* Status Indicator */}
        <StatusIndicator 
          className="mr-2"
          status={isMSActive ? "ACTIVE" : "INACTIVE"}
        />
      </FlexRow>

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
        Fake API Call
      </button>
    </FlexRow>
  );
}
export default OrchestrationHeader;