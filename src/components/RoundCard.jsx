import React from 'react';
import './RoundCard.css';

const RoundCard = ({ children }) => {
  return (
    <div className="round-card">
      {children}
    </div>
  );
};

export default RoundCard;
