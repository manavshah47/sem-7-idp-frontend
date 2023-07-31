import React, { useState } from "react";
import "../Navbar.css";

const Navbar = () => {
  const li = [
    ["Dashboard", "images/dashboard.svg"],
    ["Profile", "images/profile.svg"],
    ["Membership Form", "images/member.svg"],
    ["Magazine", "images/Magazine.svg"],
    ["Log Out", "images/btn2.png"],
  ];

  const window = true;
  const [showTooltip, setShowTooltip] = useState(null);

  const handleMouseEnter = (index) => {
    setShowTooltip(index);
  };

  const handleMouseLeave = () => {
    setShowTooltip(null);
  };

  return (
    <nav className="navbar-menu" style={{ width: window ? 60 : 250 }}>
      <div className="burger">
        <img src="images/title_logo.png" alt="burger" />
      </div>
      <ul className="navbar__list">
        {li.map((item, i) => (
          <div
            className="navbar__li-box"
            key={i}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={item[1]}
              alt={item[1]}
              style={{
                paddingLeft: window ? 13 : 27,
                paddingRight: "6px",
                paddingTop: "3px",
                paddingBottom: "3px",
              }}
            />
            <li
              className="navbar__li"
              style={{ display: window ? "none" : "inline-block" }}
            >
              {item[0]}
            </li>
            {showTooltip === i && (
              <div className="tooltip">
                {item[0]}
              </div>
            )}
          </div>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
