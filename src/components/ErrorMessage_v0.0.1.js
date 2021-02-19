import React, { useEffect } from "react";
import KitUtils from "../kitutils/KitUtils_v1.0.0";

const ErrorMessage = (props) => {
  useEffect(() => {
    if(props.soundAlert) {
      KitUtils.soundAlert();
    }
  });

  const message = props.message || "Error";
  return (
    <div>
      {message}
    </div>
  );
};
export default ErrorMessage;