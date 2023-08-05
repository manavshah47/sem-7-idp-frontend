import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import '../Header.css'; // Import the CSS file for styling

const Header = () => {
  return (
    <header>
      <div className="header-info">
        <div className="icon-text">
          <FontAwesomeIcon icon={faEnvelope} />
          <span>Email: BD@ERDA.ORG</span>
        </div>
        <div className="icon-text">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <span>Address: ERDA ROAD, MAKARPURA GIDC, VADODARA – 390010, GUJARAT, INDIA.</span>
        </div>
        <div className="icon-text">
          <FontAwesomeIcon icon={faPhone} />
          <span>Phone: 1800 233 2668</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
