import React, { useState }  from 'react';

const DropDown = (props) => {
  // @PROP: align - string
  // @PROP: options - [string]
  // @PROP: optionsName - string
  // @PROP: selection - string
  // @PROP: type - string

  // @PROP: isActive - bool
  // @PROP: onSelect - f()

  const [isButtonFocus, setButtonFocus] = useState(false);
  const [isDropDownActive, setDropDownActive] = useState(props.isActive || false);
  const [isListeningForMouseLeave, setIsListeningForMouseLeave] = useState(false);
  const { options, selection } = props;

  const handleBlur = () => {
    setTimeout(() => {
      console.log(isButtonFocus);
      if(!isButtonFocus) {
        setDropDownActive(false);
      }
    }, 100);
  };

  const handleSelect = (option) => {
    if(props.onSelect && option) props.onSelect(option);
    setDropDownActive(false);
    setButtonFocus(false);
  };

  let optionsRender = [];
  if(options) {
    if(options.length) {
      for(var i in options) {
        const option = options[i];
        let optionRender = 
        <li key={"option-" + i}><button 
          className={"dropdown-item " + (selection === option && "active")}
          type="button"
          onMouseDown={() => {setButtonFocus(true); setIsListeningForMouseLeave(true);}}
          onMouseUp={() => handleSelect(option)}
          onTouchStart={() => setButtonFocus(true)}
          onTouchEnd={() => handleSelect(option)}
        >
          {option + (props.optionsName ? (" " + props.optionsName) : "")}
        </button></li>;
        optionsRender.push(optionRender);
      }
    } else {
      optionsRender = 
      <li><button 
          className={"dropdown-item " + (selection === options && "active")}
          type="button"
          onMouseDown={() => {setButtonFocus(true); setIsListeningForMouseLeave(true);}}
          onMouseUp={() => handleSelect(options)}
          onTouchStart={() => setButtonFocus(true)}
          onTouchEnd={() => handleSelect(options)}
        >
          {options + (props.optionsName ? (" " + props.optionsName) : "")}
      </button></li>;
    }
  } else {
    optionsRender = <div>{"No options available."}</div>
  }

  return ( 
    <div className={"drop" + 
      (props.type || "down") + " " +
      (props.className || "")} 
      style={props.style}
    >
      <button 
        className={"btn dropdown-toggle w-100 " + (props.buttonClassName || "btn-secondary")}
        style={{textAlign:"left"}}
        type="button"
        onBlur={() => handleBlur()}
        onClick={() => setDropDownActive(true)}
      >
        {selection ? (selection + (props.optionsName ? (" " + props.optionsName) : "")) : "No selection available."}
      </button>
      <ul className={"dropdown-menu " + 
        (props.align ? "dropdown-menu-" + props.align : "")+ " " + 
        (isDropDownActive ? "show" : "")}
        onMouseLeave={() => (isListeningForMouseLeave && handleSelect(null))}
      >
        {optionsRender}
      </ul>
    </div>
  );
}
export default DropDown;