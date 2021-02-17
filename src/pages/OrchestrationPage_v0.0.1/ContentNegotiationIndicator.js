// Libraries
import React from 'react';

// Styles
import "../../styles_v0.0.1/KitStyles.css";

const ContentNegotiationIndicator = (props) => {
  // @PROP: contentNegotiation - string
  // @PROP: size - num
  // @PROP: onSelectContentNegotiation - f()
  const contentNegotiation = props.contentNegotiation || "JSON";
  const size = props.size || 30;

  return ( 
    <div className={"gradient-smoke border-shadow flex-row-start"}>
      {/* "Send Request As" Label */}
      <div 
        className={"flex-row"}
        style={{
          height: size + "px",
          width: (size * 3) +"px",
        }}
      >
        {"Send requests as: "}
      </div>

      {/* JSON / XML Toggle */}
      <div
        className={"border-radius-sm border-shadow flex-row-start"}
        style={{
          height: size * 0.75 + "px",
          width: (size * 3.5) + "px",
          overflow: "hidden",
        }}
      >
        {/* JSON */}
        <button
          className={"btn " + (contentNegotiation === "JSON" && "bg-green")}
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
          className="bg-yellow"
          style={{
            height: "100%",
            width: "2%",
          }}
        />

        {/* XML */}
        <button
          className={"btn " + (contentNegotiation === "XML" && "bg-green")}
          style={{
            height: "150%",
            width: "49%",
          }}
          onClick={() => props.onSelectContentNegotiation("XML")}
        >
          {"XML"}
        </button>
      </div>
    </div>
  );
}
export default ContentNegotiationIndicator;