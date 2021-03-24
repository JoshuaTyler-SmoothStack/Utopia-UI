import React from 'react';
import EarthGif from '../images/EarthWithHotAirBalloon.gif';

const LogoGif = (props) => {
  return (
    <img src={EarthGif} alt=""
      className={(props.className || "") + " rounded-circle"} 
      style={props.style}
    />
  );
}
export default LogoGif;
