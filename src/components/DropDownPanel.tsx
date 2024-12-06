import React, { useState } from 'react';
import './DropDownPanel.css';
import TickerComponent from './TickerComponent';
import AccountBalancesCard from './AccountBalancesCard';
import AccountLevel from './AccountLevel';
import LeftStatCard from './LeftStatCard';
import RightStatCard from './RightStatCard';

const DropDownPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-panel-container">
      {/* The panel that drops down */}
      <div className={`panel ${isOpen ? 'open' : ''}`}>
        {/* Add TickerComponent at the top */}
        <TickerComponent />

        {/* Account Balances Card (Left 1/3, Full Height) */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '30%', // 1/3 width
            height: '80%', // Full height minus padding for viewport fit
          }}
        >
          <AccountBalancesCard />
        </div>

        {/* Account Level Card (Right 2/3, Top Half) */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: '45%', // 2/3 width
            height: '35%', // Top half height
          }}
        >
          <AccountLevel />
        </div>

        {/* Stat Cards (Bottom Right, Side by Side) */}
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '10%',
            width: '45%', // Total width of both cards
            height: '35%', // Bottom half height
            display: 'flex',
            justifyContent: 'space-between', // Space between cards
          }}
        >
          <div style={{ width: '48%', height: '100%' }}>
            <LeftStatCard />
          </div>
          <div style={{ width: '48%', height: '100%' }}>
            <RightStatCard />
          </div>
        </div>
      </div>

      {/* Button to toggle the panel */}
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
