import React, { useState } from 'react';
import './DropDownPanel.css';
import TickerComponent from './TickerComponent';

const DropDownPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-panel-container">
      {/* The panel that drops down */}
      <div className={`panel ${isOpen ? 'open' : ''}`}>
        {/* Add TickerComponent inside the panel */}
        <TickerComponent />
      </div>

      {/* Button to toggle the panel */}
      <div className="slide">
        <a href="#" className="pull-me" onClick={togglePanel}>...</a>
      </div>
    </div>
  );
};

export default DropDownPanel;
