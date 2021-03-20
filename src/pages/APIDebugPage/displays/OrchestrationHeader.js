// Libraries
import Store from "../../../reducers/Store";

// Components
import FlexRow from "../../../components/FlexRow";
import StatusAsyncIndicator from "../../../components/StatusAsyncIndicator";
import StatusIndicator from "../../../components/StatusIndicator";

const OrchestrationHeader = (props) => {
  // @PROP: name - string
  // @PROP: health - string (HEALTHY, UNHEALTHY)
  // @PROP: status - string (ERROR, PENDING, SUCCESS)
  // @PROP: onTriggerError - f()
  // @PROP: onTriggerFakeAPICall - f()

  const name = props.name || "Unkown";
  const status = props.status || "INACTIVE";
  const isMobileSize = Store.getState().breakPoint.includes("small");
  const isMSHealthy = props.health === "HEALTHY";

  return (
    <FlexRow
      className={props.className || ""}
      style={props.style}
      wrap="no-wrap"
    >
      {/* MS Indicator */}
      <FlexRow
        className="bg-dark rounded kit-border-shadow p-2"
        style={{ maxWidth: "15rem", overflowX: "clip" }}
        wrap="no-wrap"
      >
        {/* Nameplate */}
        <div
          className={
            "btn btn-sm mr-auto kit-border-shadow kit-pointer-none " +
            (isMSHealthy ? "btn-success" : "btn-warning")
          }
          style={{ whiteSpace: "nowrap" }}
        >
          {name}
        </div>

        {/* IO Indicator */}
        <StatusAsyncIndicator className="ml-1" status={status} />

        {/* Status Indicator */}
        <StatusIndicator
          className="ml-1"
          status={isMSHealthy ? "SUCCESS" : "INACTIVE"}
        />
      </FlexRow>

      {/* Buttons */}
      <FlexRow className="ml-2" wrap="no-wrap">
        {/* Error Trigger */}
        <button
          className={"btn-primary " + (isMobileSize ? "btn-sm" : "btn")}
          onClick={() => props.onTriggerError()}
        >
          !Error!
        </button>

        {/* Fake API Call */}
        <button
          className={"btn-info ml-2 " + (isMobileSize ? "btn-sm" : "btn")}
          onClick={() => props.onTriggerFakeAPICall()}
        >
          FakeAPI
        </button>
      </FlexRow>
    </FlexRow>
  );
};
export default OrchestrationHeader;
