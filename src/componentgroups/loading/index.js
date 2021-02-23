import React, { useEffect, useState } from 'react';

import anime from '../../images/EarthWithHotAirBalloon.gif'
import './style.css'


const LoadingPage = (props) => {

  return (

    <div className="anime-container">

      <img src={anime} className="animeStyle" alt="" />
    </div>

  )


}


export default LoadingPage;