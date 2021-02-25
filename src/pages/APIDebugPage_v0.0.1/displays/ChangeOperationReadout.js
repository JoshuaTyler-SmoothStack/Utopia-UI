import FlexRow from "../../../components/FlexRow";

const ChangeOperationReadout = (props) => {
  // @PROP: name - string
  // @PROP: result - string
  // @PROP: status - string (DISABLED, ERROR, PENDING, SUCCESS)

  return(
    <FlexRow className={props.className || ""} style={props.style}>
      
      {/* Disabled */}
      {props.status === "DISABLED" &&
      <FlexRow>
        <span className="h3">{props.name}</span>
        <span className="h1 text-light ml-3">-</span>
        <span className="h5 text-light kit-border-shadow-sm rounded ml-3 p-2">{props.result}</span>
      </FlexRow>}
      
      {/* Error */}
      {props.status === "ERROR" &&
      <FlexRow>
        <span className="h3">{props.name}</span>
        <span className="h1 text-danger ml-3">X</span>
        <span className="h5 text-danger kit-border-shadow-sm rounded ml-3 p-2">{props.result}</span>
      </FlexRow>}

      {/* Pending */}
      {props.status === "PENDING" &&
      <div>
        <span className="h3 mr-3">{props.name + " . . ."}</span>
        <div className="spinner-border"/>
      </div>}

      {/* Success */}
      {props.status === "SUCCESS" &&
      <FlexRow>
        <span className="h3">{props.name}</span>
        <span className="h1 text-success ml-3">✔</span>
        <span className="h5 kit-border-shadow-sm rounded ml-3 p-2">{props.result}</span>
      </FlexRow>}
    </FlexRow>
  );
}
export default ChangeOperationReadout;