import React, { useEffect } from "react";
import KitUtils from "../kitutils/KitUtils_v1.0.0";

const ErrorMessage = (props) => {
  useEffect(() => props.soundAlert && KitUtils.soundAlert(), [props.soundAlert]);

  const message = props.message || props.children;
  return (
    <div className={"text-danger " + (props.className || "")}>
      {message || "Error"}
    </div>
  );
};
export default ErrorMessage;