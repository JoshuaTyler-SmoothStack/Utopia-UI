// Libraries
import React from 'react';
import FlexBox from '../../../components/FlexBox';

const PathIndicator = (props) => {
  //@PROP: location - string
  const location = props.location || "No connection.";

  return ( 
    <FlexBox 
      className={"kit-bg-smoke rounded kit-border-shadow"}
      style={props.style}
    >
      {location}
    </FlexBox>
  );
}
export default PathIndicator;