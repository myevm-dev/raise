import React, { useState } from 'react';
import './DropDownPanel.css';
import TickerComponent from './TickerComponent';
import AccountBalancesCard from './AccountBalancesCard';
import AccountLevel from './AccountLevel';
import StakeCard from './LeftStatCard'; // Updated
import RightStatCard from './RightStatCard';

const DropDownPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-panel-container">
      <div className={`panel ${isOpen ? 'open' : ''}`}>
        <TickerComponent />

        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '30%',
            height: '80%',
          }}
        >
          <AccountBalancesCard />
        </div>

        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: '45%',
            height: '35%',
          }}
        >
          <AccountLevel />
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '10%',
            width: '45%',
            height: '35%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ width: '48%', height: '100%' }}>
            <StakeCard /> {/* Updated */}
          </div>
          <div style={{ width: '48%', height: '100%' }}>
            <RightStatCard />
          </div>
        </div>
      </div>

      <div className="slide">
        <a href="#" className="pull-me" onClick={togglePanel}>
          <img
            src="/viplogo.png"
            alt="VIP Logo"
            style={{
              width: '55px',
              height: '55px',
              marginRight: '5px',
              verticalAlign: 'middle',
            }}
          />
        </a>
      </div>
    </div>
  );
};

export default DropDownPanel;
