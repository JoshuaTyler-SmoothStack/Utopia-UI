// Libraries
import React from 'react';

class InputText extends React.Component {
  constructor(props) {
    super(props);
    // @PROP: label - sitring
    // @PROP: error - string
    // @PROP: fontSize - num
    // @PROP: value - string

    // @PROP: isActive - bool
    // @PROP: islocked - bool

    // @PROP: onBlur - f()
    // @PROP: onChange - f()
    // @PROP: onFocus - f()
    // @PROP: onSetFocus - f()

    this.textInputRef = React.createRef();
    this.state = {
      isActive: props.isActive || false,
      isHover: false,
      value: props.value || ""
    };
  }

  render() {
    const { value, isActive, isHover } = this.state;
    const { error, fontSize, isLocked, label } = this.props;
    let backgroundColor = "rgba(250, 250, 250, 0.5)";

    // Locked
    let textInput = 
    <div 
      className="d-flex flex-row justify-content-start align-items-center" 
      style={{height:"100%", width:"100%", cursor:"text", fontSize:fontSize+"px", pointerEvents:"none"}}>
      
      {/* Lock Icon */}
      <svg 
        height={fontSize + "px"} 
        width={fontSize + "px"}
        viewBox="0 0 16 16" 
        fill="#373F47"
      >
        <path fill-rule="evenodd" d="M11.5 8h-7a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1zm-7-1a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-7zm0-3a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z"/>
      </svg>

      {/* Label */}
      <div style={{height:"66%", opacity:"50%"}}>
        {error || label}
      </div>
    </div>;

    // Unlocked 
    if(!isLocked) {

      // Active
      if(isActive || value) {
        backgroundColor = "rgba(250, 250, 250, 1)";
        textInput = 
        <div className="d-flex flex-column justify-content-start align-items-start" style={{height:"100%", width:"100%"}}>
          
          {/* Label */}
          <div className="d-flex flex-row justify-content-start align-items-start" style={{height:"25%", pointerEvents:"none", color:"#0660A8", fontSize:(fontSize*0.75)+"px", textShadow:"0 0 2px rgba(0,0,0,0.3)"}}>
            <div className="ml-3" style={{height:"100%"}}>
              -{error || label}-
            </div>
          </div>

          {/* Value */}
          <div className="d-flex flex-row justify-content-start align-items-start" style={{height:"75%", width:"100%", color:"#2E2A2B", fontSize:fontSize+"px", textShadow:"0 0 2px rgba(0,0,0,0.3)"}}>
            <input
              ref={this.textInputRef}
              className="ml-3" 
              style={{height:"100%", width:"100%", background:"none", border:"none", outline:"none"}}
              type="text"
              value={value}
              onChange={(e) => this.handleValueChange(e)}
              onFocus={() => this.handleOnFocus()}
              onBlur={() => this.handleOnBlur()}
            />
          </div>
        </div>;

      // Inactive
      } else {
        backgroundColor = isHover ? "rgba(250, 250, 250, 1)" : "rgba(250, 250, 250, 0.66)";
        textInput = 
        <div className="d-flex flex-row justify-content-start align-items-center" style={{height:"100%", width:"100%", cursor:"text", fontSize:fontSize}}>
          <div style={{height:"66%", width:"100%", textAlign:"center"}}>
            {error || label}
          </div>
        </div>;
      }
    }

    return (
      <div 
        className="d-flex flex-row justify-content-center align-items-center" 
        style={{height:"100%", width:"100%", overflow:"hidden", backgroundColor:backgroundColor, transition: "0.2s ease all"}}
        onClick={() => this.handleOnFocus()}
        onMouseEnter={() => this.setState({isHover: true})}
        onMouseLeave={() => this.setState({isHover: false})}
      >
        {textInput}
      </div>
    );
  }

  componentDidUpdate() {
    const { onSetFocus } = this.props;
    const { isActive } = this.state;
    const textInputRef = this.textInputRef.current;
    if(onSetFocus) {
      onSetFocus();
      this.handleOnFocus();
    }
    if(isActive && textInputRef !== window.document.activeElement) {
      textInputRef.focus();
    }
  }

  handleOnFocus = () => {
    const { isLocked, isActive, onFocus } = this.props;
    if(!isLocked && !isActive) {
      this.setState({isActive: true});
      if(onFocus) {
        onFocus();
      }
    }
  }

  handleOnBlur = () => {
    const { isActive } = this.state;
    const { onBlur } = this.props;
    if(isActive) {
      this.setState({isActive: false});
      if(onBlur) {
        onBlur();
      }
    }
  }

  handleValueChange = (event) => {
    const { onChange } = this.props;
    const value = event.target.value;
    this.setState({ value: value, error: "" });
    if(onChange) {
      onChange(value);
    }
  }
}
export default InputText;