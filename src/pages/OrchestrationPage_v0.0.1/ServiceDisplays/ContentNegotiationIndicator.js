// Libraries
import React from 'react';
import FlexBox from '../../../components/FlexBox';

const ContentNegotiationIndicator = (props) => {
  // @PROP: contentNegotiation - string
  // @PROP: onSelectContentNegotiation - f()
  const contentNegotiation = props.contentNegotiation || "JSON";

  return ( 
    <FlexBox 
      className={"kit-gradient-smoke kit-border-shadow"}
      justify={"start"}
    >
      {/* "Send Request As" Label */}
      <FlexBox>
        {"Send requests as: "}
      </FlexBox >

      {/* JSON / XML Toggle */}
      <FlexBox 
        className={"rounded kit-border-shadow"}
        justify={"start"}
        style={{overflow: "hidden"}}
      >
        {/* JSON */}
        <button
          className={"btn " + (contentNegotiation === "JSON" && "kit-bg-green")}
          style={{
            height: "150%",
            width: "49%",
          }}
          onClick={() => props.onSelectContentNegotiation("JSON")}
        >
          {"JSON"}
        </button>

        {/* Divider */}
        <div
          className="kit-bg-yellow"
          style={{
            height: "100%",
            width: "2%",
          }}
        />

        {/* XML */}
        <button
          className={"btn " + (contentNegotiation === "XML" && "kit-bg-green")}
          style={{
            height: "150%",
            width: "49%",
          }}
          onClick={() => props.onSelectContentNegotiation("XML")}
        >
          {"XML"}
        </button>
      </FlexBox >
    </FlexBox >
  );
}
export default ContentNegotiationIndicator;