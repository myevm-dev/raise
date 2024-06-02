import React, { useState } from 'react';
import './DropDownPanel.css';

const DropDownPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-panel-container">
      <div className={`panel ${isOpen ? 'open' : ''}`}>
        <br />
        <br />
        <p>Open Positions</p>
      </div>
      <div className="slide">
        <a href="#" className="pull-me" onClick={togglePanel}>POSITIONS</a>
      </div>
    </div>
  );
};

export default DropDownPanel;
