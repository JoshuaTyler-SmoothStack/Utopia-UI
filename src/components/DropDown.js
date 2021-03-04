import React, { useState }  from 'react';

const DropDown = (props) => {
  // @PROP: align - string
  // @PROP: options - [num]
  // @PROP: selection - num
  // @PROP: type - string

  // @PROP: isActive - bool
  // @PROP: onSelect - f()

  const [isDropDownActive, setDropDownActive] = useState(props.isActive || false);
  const { options, selection } = props;

  let optionsRender = [];
  if(options) {
    if(options.length) {
      for(var i in options) {
        const option = options[i];
        let optionRender = 
        <li key={"option-" + i}><button 
          className={"dropdown-item " + (selection === option && "active")}
          type="button" 
          onClick={() => {
            props.onSelect(option);
            setDropDownActive(false);
          }}
        >
          {option}
        </button></li>;
        optionsRender.push(optionRender);
      }
    } else {
      optionsRender = 
      <li><button 
          className={"dropdown-item " + (selection === options && "active")}
          type="button" 
          onClick={() => {
            props.onSelect(options);
            setDropDownActive(false);
          }}
        >
          {options}
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
        className="btn btn-secondary dropdown-toggle w-100"
        style={{textAlign:"left"}}
        type="button"
        onClick={() => setDropDownActive(!isDropDownActive)}
        onBlur={() => setTimeout(() => setDropDownActive(false), 100)}
      >
        {selection ? selection : "No selection available."}
      </button>
      <ul className={"dropdown-menu " + 
        (props.align ? "dropdown-menu-" + props.align : "")+ " " + 
        (isDropDownActive ? "show" : "")
      }>
        {optionsRender}
      </ul>
    </div>
  );
}
export default DropDown;