import React from "react";

const LocalSidebar = (props) => {
  // @PROP: activeDisplay - string
  // @PROP: onSelectDisplay - f()

  const activeDisplay = props.activeDisplay || "";

  const sidebarItemClassName = "btn btn-dark text-white mt-2";
  const sidebarItemSelectedClassName = "btn btn-light text-white mt-2";
  
  return (
    <nav className="col-4 col-md-2 navbar bg-secondary align-items-start p-0" style={{height:"100vh"}}>
      {/* Links */}
      <ul className="w-100 navbar-nav kit-no-user">
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
    </nav>
  );
};
export default LocalSidebar;