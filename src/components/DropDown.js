import React, { useState }  from 'react';

const DropDown = (props) => {
  // @PROP: selection - num
  // @PROP: options - [num]

  // @PROP: isActive - bool
  // @PROP: onSelect - f()

  const [isDropDownActive, setDropDownActive] = useState(props.isActive || false);
  const { options, selection } = props;

  let optionsRender = [];
  if(isDropDownActive && options) {
    if(options.length) {
      for(var i in options) {
        const option = options[i];
        let optionRender = 
        <li><button 
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
    <div className={"dropdown " + (props.className || "")} style={props.style}>
      <button 
        className="btn btn-secondary dropdown-toggle" 
        type="button"
        onClick={() => setDropDownActive(!isDropDownActive)}
        onBlur={() => setTimeout(() => setDropDownActive(false), 100)}
      >
        {selection ? selection + " items" : "No items available."}
      </button>
      <ul className={"dropdown-menu" + (isDropDownActive ? " show" : "")}>
        {optionsRender}
      </ul>
    </div>
  );
}
export default DropDown;