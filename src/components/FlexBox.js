import React from "react";

const FlexBox = (props) => {
  // @PROP: align - string
  // @PROP: grow - num
  // @PROP: justify - string
  // @PROP: reverse - bool
  // @PROP: size - string
  // @PROP: type - string

  let align = "center";
  if(props.align === "baseline")  align = "baseline";
  if(props.align === "end")       align = "end";
  if(props.align === "start")     align = "start";
  if(props.align === "stretch")   align = "stretch";

  let justify = "center";
  if(props.justify === "around")  justify = "around";
  if(props.justify === "between") justify = "between";
  if(props.justify === "end")     justify = "end";
  if(props.justify === "evenly")  justify = "evenly";
  if(props.justify === "start")   justify = "start";

  let reverse = "";
  if(props.reverse) reverse = "-reverse";

  let size = "";
  if(props.size === "sm") size = "sm-";
  if(props.size === "md") size = "md-";
  if(props.size === "lg") size = "lg-";
  if(props.size === "xl") size = "xl-";

  let type = "row";
  if(props.type === "column") type = "column";

  let wrap = "wrap"
  if(props.wrap === "no-wrap") wrap = "no-wrap";

  return (
    <div
      className={
        "d-flex flex-" +
        size +
        type +
        reverse + " " +
        "justify-content-" +
        size +
        justify + " " +
        "align-items-" +
        size +
        align + " " +
        "flex-" +
        size +
        wrap + 
        reverse +
        (props.className 
          ? " " + props.className
          : ""
        )
      }
      style={{
        ...props.style, 
        flexGrow: props.grow ? props.grow : 0
      }}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};
export default FlexBox;