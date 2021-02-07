// Libraries
import React, { Component } from 'react';

// Styles
import "../../styles_v0.0.1/KitStyles.css";

class ConfirmationMenu extends Component {
  constructor(props) {
    super(props);
    // @PROP: buttonSize - num
    // @PROP: elementHeight - num
    // @PROP: elementWidth - num
    // @PROP: elementOffsetX - num
    // @PROP: elementOffsetY - num
    // @PROP: passedContent - obj{}(HTML Elements)
    // @PROP: onClose - f()

    this.state = {
      isDisabled: false
    };
  }

  render() {
    const { elementHeight, elementWidth, elementOffsetX, elementOffsetY, passedContent, buttonSize } = this.props;
    const { isDisabled } = this.state;

    return (
      <div>
        {!isDisabled && 
        <div className="bg-custom-smoke border-radius-sm border-shadow overflow-hidden d-flex flex-row justify-content-start align-items-center" 
          style={{position:"absolute", height:elementHeight+"px", width:elementWidth+"px", bottom:elementOffsetY+"px", left:elementOffsetX+"px"}}>

          {/* Content */}
          <div 
            className="d-flex flex-column justify-content-center align-items-center"
            style={{height:"100%", width:"100%", overflowX:"visible", overflowY:"auto"}}
          >
            {passedContent}
          </div>

          {/* Close Button */}
          <svg 
            className="icon svg-color-custom-grey mb-auto" 
            width={buttonSize} 
            height={buttonSize} 
            viewBox="0 0 16 16"
            onClick={() => this.handleCloseButton()}
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </div>
        }
      </div>
     );
  }

  handleCloseButton = () => {
    const { onClose } = this.props;
    try {
      onClose();
    } catch(err) {
      this.setState({isDisabled: true});
    }
  }
}
export default ConfirmationMenu;