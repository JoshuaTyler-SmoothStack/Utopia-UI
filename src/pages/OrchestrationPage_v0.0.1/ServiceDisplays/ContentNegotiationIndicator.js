// Libraries
import React from 'react';
import FlexBox from '../../../components/FlexBox';

const ContentNegotiationIndicator = (props) => {
  // @PROP: contentNegotiation - string
  // @PROP: onSelectContentNegotiation - f()
  const contentNegotiation = props.contentNegotiation || "JSON";

  return ( 
    <FlexBox 
      className={"kit-gradient-smoke kit-border-shadow p-1"}
      justify={"start"}
    >
      {/* "Send Request As" Label */}
      <FlexBox>
        {"Send requests as: "}
      </FlexBox >

      {/* JSON / XML Toggle */}
      <FlexBox 
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
      </FlexBox >
    </FlexBox >
  );
}
export default ContentNegotiationIndicator;