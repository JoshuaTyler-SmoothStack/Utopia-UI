import React, { useState } from "react";
import Store from "../../reducers/Store";
import FlexColumn from "../../components/FlexColumn";

const LocalSidebar = (props) => {
  // @PROP: activeDisplay - string
  // @PROP: onSelectDisplay - f()

  const activeDisplay = props.activeDisplay || "";
  const isMobileSize = Store.getState().breakPoint.includes("small");
  const [isSidebarActive, setSidebarActive] = useState(props.isActive || false);
  const sidebarItemClassName = "btn btn-dark text-white mt-2";
  const sidebarItemSelectedClassName = "btn btn-light text-white mt-2";

  const setSiderbarState = (isActive) => {
    setSidebarActive(isActive);
    if (props.onToggle) {
      props.onToggle(isActive);
    }
  };

  return (
    <nav className={props.className || ""} style={props.style}>
      {/* Popout Button - Inactive Nav */}
      {!isSidebarActive && isMobileSize && (
        <FlexColumn style={{ position: "absolute", zIndex: "2" }}>
          <button
            className="btn btn-sm btn-info"
            onClick={() => setSiderbarState(true)}
          >
            {"▼"}
          </button>
        </FlexColumn>
      )}

      {/* Nav Items */}
      {(isSidebarActive || !isMobileSize) && (
        <div>
          {/* Popout Button - Active Nav */}
          {isSidebarActive && isMobileSize && (
            <FlexColumn style={{ position: "absolute", zIndex: "2", top: "0" }}>
              <button
                className="btn btn-sm btn-info"
                onClick={() => setSiderbarState(false)}
              >
                {"▲"}
              </button>
            </FlexColumn>
          )}

          <ul className="navbar-nav rounded-bottom p-0 bg-dark overflow-hidden kit-no-user">
            {/* Airplanes */}
            <li
              className={
                activeDisplay === "AIRPLANES"
                  ? sidebarItemSelectedClassName
                  : sidebarItemClassName
              }
              onClick={() => props.onSelectDisplay("AIRPLANES")}
            >
              Airplanes
            </li>

            {/* Airports */}
            <li
              className={
                activeDisplay === "AIRPORTS"
                  ? sidebarItemSelectedClassName
                  : sidebarItemClassName
              }
              onClick={() => props.onSelectDisplay("AIRPORTS")}
            >
              Airports
            </li>

            {/* Bookings */}
            <li
              className={
                activeDisplay === "BOOKINGS"
                  ? sidebarItemSelectedClassName
                  : sidebarItemClassName
              }
              onClick={() => props.onSelectDisplay("BOOKINGS")}
            >
              Bookings
            </li>

            {/* Flights */}
            <li
              className={
                activeDisplay === "FLIGHTS"
                  ? sidebarItemSelectedClassName
                  : sidebarItemClassName
              }
              onClick={() => props.onSelectDisplay("FLIGHTS")}
            >
              Flights
            </li>

            {/* Passengers */}
            <li
              className={
                activeDisplay === "PASSENGERS"
                  ? sidebarItemSelectedClassName
                  : sidebarItemClassName
              }
              onClick={() => props.onSelectDisplay("PASSENGERS")}
            >
              Passengers
            </li>

            {/* Payments */}
            <li
              className={
                activeDisplay === "PAYMENTS"
                  ? sidebarItemSelectedClassName
                  : sidebarItemClassName
              }
              onClick={() => props.onSelectDisplay("PAYMENTS")}
            >
              Payments
            </li>

            {/* Routes */}
            <li
              className={
                activeDisplay === "ROUTES"
                  ? sidebarItemSelectedClassName
                  : sidebarItemClassName
              }
              onClick={() => props.onSelectDisplay("ROUTES")}
            >
              Routes
            </li>

            {/* Users */}
            <li
              className={
                activeDisplay === "USERS"
                  ? sidebarItemSelectedClassName
                  : sidebarItemClassName
              }
              onClick={() => props.onSelectDisplay("USERS")}
            >
              Users
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
export default LocalSidebar;
