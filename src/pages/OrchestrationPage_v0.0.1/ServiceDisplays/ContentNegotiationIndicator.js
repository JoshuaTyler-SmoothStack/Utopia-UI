// Libraries
import React from 'react';
import FlexRow from '../../../components/FlexRow';

const ContentNegotiationIndicator = (props) => {
  // @PROP: contentNegotiation - string
  // @PROP: onSelectContentNegotiation - f()
  const contentNegotiation = props.contentNegotiation || "JSON";

  return ( 
    <FlexRow 
      className={"kit-gradient-smoke kit-border-shadow p-1"}
      justify={"start"}
    >
      {/* "Send Request As" Label */}
      <FlexRow>
        {"Send requests as: "}
      </FlexRow >

      {/* JSON / XML Toggle */}
      <FlexRow 
        className={"rounded kit-bg-grey kit-border-shadow ml-2"}
        justify={"start"}
      >
        {/* JSON */}
        <button
          className={"btn" + (contentNegotiation === "JSON" ? " btn-success" : "")}
          style={{width: "4rem"}}
          onClick={() => props.onSelectContentNegotiation("JSON")}
        >
          {"JSON"}
        </button>

        {/* XML */}
        <button
          className={"btn" + (contentNegotiation === "XML" ? " btn-success" : "")}
          style={{width: "4rem"}}
          onClick={() => props.onSelectContentNegotiation("XML")}
        >
          {"XML"}
        </button>
      </FlexRow >
    </FlexRow >
  );
}
export default ContentNegotiationIndicator;