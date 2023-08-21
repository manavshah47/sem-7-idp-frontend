import React, { useEffect, useState } from "react";
import "../Navbar.css";

import { useNavigate } from "react-router";

import { connect } from "react-redux";

import { logOutUser } from '../actions/session';

const mapStateToProps = ({ session }) => ({
  session
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logOutUser())
});

const Navbar = ({session, logout}) => {
  const [li, setLi] = useState([]);

  const navigate = useNavigate()

  const memberLi = [
    ["Dashboard", "images/dashboard.svg"],
    ["Profile", "images/profile.svg"],
    ["Member", "images/Magazine.svg"],
    ["Membership-Form", "images/member.svg"],
    ["Log Out", "images/btn2.png"]
  ];

  const adminLi = [
  ["Dashboard", "images/dashboard.svg"],
  ["Membership Zone", "images/Magazine.svg"],
  ["Control Pane", "images/member.svg"],
  ["Log Out", "images/btn2.png"]];

  const approverLi = [
  ["Dashboard", "images/dashboard.svg"],
  ["Membership Zone", "images/Magazine.svg"],
  ["Control Panel", "images/member.svg"],
  ["Log Out", "images/btn2.png"]];


  useEffect(() => {
    if(session.typeOfUser === "member"){
      setLi(memberLi)
    } else if(session.typeOfUser === "admin"){
      setLi(adminLi)
    }else{
      setLi(approverLi)
    }
  }, [])

  const window = true;
  const [showTooltip, setShowTooltip] = useState(null);

  const handleMouseEnter = (index) => {
    setShowTooltip(index);
  };

  const openPage = (index) => {
    if(li[index][0].toLowerCase() == "log out"){
      const userConfirmed = window.confirm("Are you sure you want to log out?");
      if (userConfirmed) {
        logout();
      }    } else {
      navigate(li[index][0].toLowerCase())
    }
  }

  const handleMouseLeave = () => {
    setShowTooltip(null);
  };

  const openHome = () => {
    navigate("/")
  }

  return (
    <nav className="navbar-menu" style={{ width: window ? 60 : 250 }}>
      <div className="burger">
        <img src="images/title_logo.png" onClick={openHome} alt="burger" />
      </div>
      <ul className="navbar__list">
        {li.map((item, i) => (
          <div
            className="navbar__li-box"
            key={i}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
            onClick={() => openPage(i)}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);