import React, { useState } from "react";
import FlexColumn from "../../components/FlexColumn";

const LocalSidebar = (props) => {
  // @PROP: activeDisplay - string
  // @PROP: onSelectDisplay - f()

  
  const activeDisplay = props.activeDisplay || "";
  
  const isMediumSize = window.innerWidth >= 576;
  const [isSidebarActive, setSidebarActive] = useState(props.isActive || false);
  const sidebarItemClassName = "btn btn-dark text-white mt-2";
  const sidebarItemSelectedClassName = "btn btn-light text-white mt-2";
  
  return (
    <nav className={"navbar align-items-start p-0 kit-border-shadow " + (props.className || "")}
      style={props.style}
    >
      {/* Popout Button - Inactive Nav */}
      {(!isSidebarActive && !isMediumSize) &&
        <FlexColumn style={{position: "absolute", zIndex:"2"}}>
          <button className="btn btn-sm btn-info"
            onClick={() => setSidebarActive(true)}
          >
            {"▼"}
          </button>
        </FlexColumn>
      }

      {/* Nav Items */}
      {(isSidebarActive || isMediumSize) &&
        <div>
          {/* Popout Button - Active Nav */}
          {(isSidebarActive && !isMediumSize) &&
            <FlexColumn style={{position: "absolute", zIndex:"2"}}>
              <button className="btn btn-sm btn-info"
                onClick={() => setSidebarActive(false)}
              >
                {"▲"}
              </button>
            </FlexColumn>
          }

          <ul className="h-100 navbar-nav bg-secondary kit-no-user"
            style={{position: "absolute", width:"16.67vw", zIndex:"1"}}
          >
            {/* Airplanes */}
            <li 
              className={activeDisplay === "AIRPLANES" 
                ? sidebarItemSelectedClassName
                : sidebarItemClassName}
              onClick={() => props.onSelectDisplay("AIRPLANES")}
            >
              Airplanes
            </li>

            {/* Airports */}
            <li 
              className={activeDisplay === "AIRPORTS" 
                ? sidebarItemSelectedClassName
                : sidebarItemClassName}
              onClick={() => props.onSelectDisplay("AIRPORTS")}
            >
              Airports
            </li>

            {/* Authentication */}
            <li 
              className={activeDisplay === "AUTHENTICATION" 
                ? sidebarItemSelectedClassName
                : sidebarItemClassName}
              onClick={() => props.onSelectDisplay("AUTHENTICATION")}
            >
              Authentication
            </li>

            {/* Bookings */}
            <li 
              className={activeDisplay === "BOOKINGS" 
                ? sidebarItemSelectedClassName
                : sidebarItemClassName}
              onClick={() => props.onSelectDisplay("BOOKINGS")}
            >
              Bookings
            </li>

            {/* Flights */}
            <li 
              className={activeDisplay === "FLIGHTS" 
                ? sidebarItemSelectedClassName
                : sidebarItemClassName}
              onClick={() => props.onSelectDisplay("FLIGHTS")}
            >
              Flights
            </li>

            {/* Passengers */}
            <li 
              className={activeDisplay === "PASSENGERS" 
                ? sidebarItemSelectedClassName
                : sidebarItemClassName}
              onClick={() => props.onSelectDisplay("PASSENGERS")}
            >
              Passengers
            </li>

            {/* Payments */}
            <li 
              className={activeDisplay === "PAYMENTS" 
                ? sidebarItemSelectedClassName
                : sidebarItemClassName}
              onClick={() => props.onSelectDisplay("PAYMENTS")}
            >
              Payments
            </li>

            {/* Routes */}
            <li 
              className={activeDisplay === "ROUTES" 
                ? sidebarItemSelectedClassName
                : sidebarItemClassName}
              onClick={() => props.onSelectDisplay("ROUTES")}
            >
              Routes
            </li>

            {/* Users */}
            <li 
              className={activeDisplay === "USERS" 
                ? sidebarItemSelectedClassName
                : sidebarItemClassName}
              onClick={() => props.onSelectDisplay("USERS")}
            >
              Users
            </li>
          </ul>
        </div>
      }
    </nav>
  );
};
export default LocalSidebar;