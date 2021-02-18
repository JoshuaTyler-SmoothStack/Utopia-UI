// Libraries
import React, { Component } from 'react';

// Components
import InputText from "../../components/InputText_0.0.1";

// Styles
import "../../styles/KitStyles.css";

class ConfirmationMenu extends Component {
  constructor(props) {
    super(props);
    // @PROP: isTextInput - bool
    // @PROP: passedText - string
    // @PROP: sizing - obj{}
    // @PROP: onCancel - f()
    // @PROP: onConfirm - f()

    this.state = {
      isDisabled: false,
      textInput: "",
    };
  }

  render() {
    const { passedText, sizing, isTextInput, onConfirm } = this.props;
    const { isDisabled } = this.state;
    const buttonStyle = {height: sizing.button+"px", width: "45%", fontSize: sizing.fontlarge+"px"};
    const kit-iconStyle = sizing.button*0.67+"px";
    return ( 
      <div>
        {/* Smoke Background */}
        {!isDisabled && <div className="bg-custom-smoke-light d-flex flex-column justify-content-center align-items-center" 
          style={{position:"fixed", top:"0", left:"0", zIndex:"2147483647", height:"100vh", width:"100vw"}}>

          {/* Confirmation Frame */}
          <div className="bg-white border-shadow rounded d-flex flex-column justify-content-around align-items-center" 
            style={{position:"absolute", height: sizing.screenbarLarge*2+"px", width:sizing.screenbarLarge*3+"px", maxWidth:"90vw"}}>
            
            {/* Header text */}
            {!isTextInput && 
            <div style={{fontSize:sizing.h1+"px", textAlign:"center", width:"90%"}}>
              {passedText || "Error, please hit cancel."}
            </div>}

            {/* Input Text */}
            {isTextInput && 
            <div className="gradient-lightgrey border-shadow rounded overflow-hidden" style={{height:sizing.h1*3+"px", width:"90%"}}>
              <InputText label={passedText} onChange={(e) => this.setState({textInput: e})}/>
            </div>}

            {/* Buttons */}
            <div className="d-flex flex-row justify-content-around align-items-center" style={{width:"90%"}}>
              <button className="bg-custom-red btn-custom d-flex flex-row justify-content-around align-items-center" 
                style={buttonStyle} onClick={() => this.handleCancelButton()}>
                {"Cancel"}
                <svg width={kit-iconStyle} height={kit-iconStyle} viewBox="0 0 16 16" fill="white">
                  <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                  <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
              {onConfirm && <button className="bg-custom-green btn-custom d-flex flex-row justify-content-around align-items-center" 
                style={buttonStyle} onClick={() => this.handleConfirmButton()}>
                {"Confirm"}
                <svg width={kit-iconStyle} height={kit-iconStyle} viewBox="0 0 16 16" fill="white">
                  <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                  <path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                </svg>
              </button>}
            </div>

          </div>
        </div>}
      </div>
     );
  }

  handleCancelButton = () => {
    const { onCancel } = this.props;
    try {
      onCancel();
    } catch(error) {}
    this.setState({isDisabled: true});
  }

  handleConfirmButton = () => {
    const { onConfirm } = this.props;
    const { textInput } = this.state;
    try {
      onConfirm(textInput);
    } catch(error) {
      console.error("Failed to Confirm on menu option!\n" + error);
    }
    this.setState({isDisabled: true});
  }
}
export default ConfirmationMenu;