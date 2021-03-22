import React, { useEffect } from "react";
import KitUtils from "../kitutils/KitUtils_v1.0.0";

const ErrorMessage = (props) => {
  useEffect(() =>  {
    if(props.soundAlert) KitUtils.soundAlert();
  }, [props.soundAlert]);

  const children = typeof(props.children) !== "object"
    ? props.children
    : null;

  const message = props.message || "Error";

  return (
    <div className={"text-danger " + (props.className || "")}>
      {children || message}
    </div>
  );
};
export default ErrorMessage;
