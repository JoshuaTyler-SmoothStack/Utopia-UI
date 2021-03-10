// Libraries
import React from "react";

// Components
import Modal from "../../components/Modal";

const FlightModal = (props) => {

  const align = props.align || "center"
  const background = props.background || "kit-bg-smoke-light";
  const zIndex = props.zIndex || 2;

    return (
      <Modal
        align={align}
        background={background}
        zIndex={zIndex}
        onClose={props.onClose}
      >
        {props.children}
      </Modal>
    );
}
export default FlightModal;