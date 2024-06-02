import React from 'react';
import './RoundCard.css';


interface RoundCardProps {
  children: React.ReactNode;
}

const RoundCard: React.FC<RoundCardProps> = ({ children }) => {
  return <div className="round-card">{children}</div>;
};

export default RoundCard;
