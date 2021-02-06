// Libraries
import _ from 'lodash';

// Images
import defaultMapPin from '../images/PlaneLowPoly.png';

class Maps {
  // Ronald Reagan Washington National Airport
  static defaultLat = 38.8512;
  static defaultLng = -77.0424;
  static defaultZoom = 13;

  /*
  ====================
  Initialize Maps
  ====================
  */
  static init(onValidate) {
    const apiKey = "AIzaSyBmktysD66bYkld0DchhYhW2Qi-CCDEGk8";
    const mapsURL = "https://maps.googleapis.com/maps/api/js?key="+apiKey;
    
    let isMapsMounted = false;
    const activeScripts = window.document.getElementsByTagName('script');
    for (var i in activeScripts) {
      if(activeScripts[i].src === mapsURL) {
        isMapsMounted = true;
      }
    }

    if(isMapsMounted) {
      onValidate(); 
    } else {
      const mapsScript = window.document.createElement('script');
      mapsScript.src = mapsURL;
      window.document.body.appendChild(mapsScript);
      mapsScript.addEventListener('load', () => {onValidate();});
    }
  }

  static createMap(inputID, inputCenter, inputZoom, inputControlSize, onCompleteMapObj) {
    Maps.init(onValidate => {
      const mapID = inputID ? inputID : _.uniqueId("prefix-");
      const formattedCenter = Maps.formatLocation(inputCenter);
      const center = formattedCenter ? formattedCenter : {lat: Maps.defaultLat, lng: Maps.defaultLng};
      const zoom = !isNaN(parseFloat(inputZoom)) ? inputZoom : Maps.defaultZoom;
      const controlSize = !isNaN(parseFloat(inputControlSize)) ? inputControlSize : Math.floor(window.innerHeight * 0.05);

      // Create Map Parameters
      const mapParams = {
        center: center,
        controlSize: controlSize,
        disableDefaultUI: false,
        mapTypeControlOptions: {position: window.google.maps.ControlPosition.TOP_RIGHT, style: window.google.maps.MapTypeControlStyle.DEFAULT},
        fullscreenControl: false,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: false,
        zoom: zoom,
      };

      // Create the map
      const map = new window.google.maps.Map(Maps.getMapDiv(mapID), mapParams);

      // onMapLoad()
      new window.google.maps.event.addListenerOnce(map, 'idle', () => {
        
        // Create marker layer overlay
        const overlay = new window.google.maps.OverlayView();
        overlay.draw = function() {
          this.getPanes().markerLayer.id = 'markerLayer';
        } 
        overlay.setMap(map);

        // Callback with the mapObject
        onCompleteMapObj(map);
      });
    });
  }

  /*====================
  Map Pin Methods
  ====================*/
  static clearMapPins(mapPins) {
    var clonedMapPins = mapPins;
    if(clonedMapPins !== null) {
      for(var i = 0; i < clonedMapPins.length; i++) {
        clonedMapPins[i] = null;
      }
      clonedMapPins = null;
    }
  }

  static createMapPin(inputMap, inputLat, inputLng, inputDraggable, inputSize, inputAnimation, inputCustomImage, inputCustomArgs, inputCustomClickEvent) {    
    const map = inputMap ? inputMap : null;   
    if(!map) {
      console.error("Cannot Create MapPin! - Invalid Map");
      return null;
    }

    const formattedLocation = Maps.formatLocation({lat: inputLat, lng: inputLng});
    const position = formattedLocation ? formattedLocation : {lat: Maps.defaultLat, lng: Maps.defaultLng};
    const draggable = inputDraggable ? inputDraggable : false;
    const size = !isNaN(parseFloat(inputSize)) ? inputSize : 40;  // @MAGIC: if no size, set to 40px
    const image = inputCustomImage ? inputCustomImage : defaultMapPin;
    const animation = inputAnimation ? inputAnimation : null;
    const customArgs = inputCustomArgs ? inputCustomArgs : null;
    const customClickEvent = inputCustomClickEvent ? inputCustomClickEvent : null;
    
    // Create the Map Pin's Icon
    const icon = {
      url: image,
      size: new window.google.maps.Size(size, size),
      scaledSize: new window.google.maps.Size(size, size),
    };

    // Create the Map Pin
    const newMapPin = new window.google.maps.Marker({
      map: map,
      draggable: draggable,
      animation: animation,
      position: position,
      icon: icon,
      customArgs: customArgs,
    });

    // Bind the custom click event
    if(customClickEvent) {
      newMapPin.addListener('click', () => {customClickEvent(newMapPin)});
    }
    return newMapPin;
  }

  static defaultClickEvent = (mapPin) => {
    if (mapPin.getAnimation() !== window.google.maps.Animation.BOUNCE) {
      mapPin.setAnimation(null);
      mapPin.setAnimation(window.google.maps.Animation.BOUNCE);
    } else {
      mapPin.setAnimation(null);
    }
    setTimeout(() => {
      if (mapPin.getAnimation() !== window.google.maps.Animation.BOUNCE) {
        mapPin.setAnimation(null);
        mapPin.setAnimation(window.google.maps.Animation.BOUNCE);
      } else {
        mapPin.setAnimation(null);
      }
    }, 200);
    DatabaseManager.setActiveArtpiece(mapPin.customArgs);
  }

  static findValidMapPinLocation(locationsInUse, lat, lng) {
    var originLat = lat;
    var originLng = lng;
    var iteration = 0;
    var expander = 1;

    while(!Maps.validateMapPinLocation(locationsInUse, lat, lng)) {
      iteration += 1;
      if(iteration > 8) {
        expander += 1;
        iteration = 1;
      }

      if(iteration === 1) {
          lat = originLat + 0.000025 * expander;
          lng = originLng - 0.000025 * expander;
      } else if (iteration === 2) {
          lat = originLat + 0.000025 * expander;
      } else if (iteration === 3) {
          lat = originLat + 0.000025 * expander;
          lng = originLng + 0.000025 * expander;
      } else if (iteration === 4) {
          lng = originLng - 0.000025 * expander;
      } else if (iteration === 5) {
          lng = originLng + 0.000025 * expander;
      } else if (iteration === 6) {
          lat = originLat - 0.000025 * expander;
          lng = originLng - 0.000025 * expander;
      } else if (iteration === 7) {
          lat = originLat - 0.000025 * expander;
      } else if (iteration === 8) {
          lat = originLat - 0.000025 * expander;
          lng = originLng + 0.000025 * expander;
      }
    }
    return {lat: lat, lng: lng};
  }

  static validateMapPinLocation(locationsInUse, lat, lng) {
    var isLocationValid = true;
    for(var i = 0; i < locationsInUse.length; i++) {
      if(locationsInUse[i].lat.toFixed(6) === lat.toFixed(6) && locationsInUse[i].lng.toFixed(6) === lng.toFixed(6)) {
        isLocationValid = false;
        break;
      }
    }
    return isLocationValid;
  }

  /*====================
  Helper Functions
  ====================*/
  static formatLocation(location) {
    try {
      const testObjectKeys = Object.keys(location);
      if(testObjectKeys[0] === "lat" && testObjectKeys[1] === "lng") {
        if(!isNaN(parseFloat(location.lat)) && !isNaN(parseFloat(location.lng))) {
          return location;
        }
      }
    } catch (error) {return null;}
    try {
      const nospace = location.split(' ');
      const latlng = (nospace[0] + nospace[1]).split(',');
      return {lat: parseFloat(latlng[0]), lng: parseFloat(latlng[1])};
    } catch(error) {return null;}
  }

  static getDefaultMapPin() {
    return defaultMapPin;
  }

  static getMapDiv(input) {
    // Try to get the map by element
    try {
      const mapMethod = input.getDiv();
      if(mapMethod) {return mapMethod;}
    } catch(error){};

    // Try to get the map by ID
    try {
      const idMethod = window.document.getElementById(input);
      if(idMethod) {return idMethod;}
    } catch(error){};
    
    // Try to get the map with ID 'map' if all else fails
    try {
      const noIDMethod = window.document.getElementById("map");
      if(noIDMethod) {return noIDMethod;}
    } catch(error){};
    return null;
  }
}
export default Maps;