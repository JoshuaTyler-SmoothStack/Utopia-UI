import React, { Component } from "react";
import FlexBox from "./FlexBox";

class PopContent extends Component {
  constructor(props) {
    super(props);
    // @PROP: buttonClassName - string
    // @PROP: onClose - f()

    this.state = {
      isDisabled: false,
    };
  }

  render() {
    const { buttonClassName, children, className, style } = this.props;
    const { isDisabled } = this.state;

    return (
      <div>
        {!isDisabled && (
          <FlexBox
            className={className}
            style={style}
          >
            {/* Content */}
            <FlexBox
              type={"column"}
              style={{
                height: "100%",
                width: "100%",
                overflowX: "visible",
                overflowY: "auto",
              }}
            >
              {children}
            </FlexBox>

            {/* Close Button */}
            <svg
              className="kit-icon kit-svg-color-grey"
              style={{marginBottom: "auto"}}
              height={"2.5rem"}
              viewBox="0 0 16 16"
              onClick={() => this.handleCloseButton()}
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </FlexBox>
        )}
      </div>
    );
  }

  handleCloseButton = () => {
    const { onClose } = this.props;
    try {
      onClose();
    } catch (err) {
      this.setState({ isDisabled: true });
    }
  };
}
export default PopContent;