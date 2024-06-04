import React from 'react';
import RoundCard from './RoundCard';
import './Navbar.css';

const NavBar: React.FC = () => {
  return (
    <nav className="side-bar">
      <div className="water-tank">
        <div className="liquid">
          <svg className="water" viewBox="0 0 200 100">
            <defs>
              <linearGradient id="ethGradient" x1="0%" y1="0%" x2="100%">
                <stop offset="0" style={{ stopColor: '#444444' }} />
                <stop offset="1" style={{ stopColor: '#000000' }} />
              </linearGradient>
            </defs>
            <path fill="url(#ethGradient)" d="M 0,0 v 100 h 200 v -100 c -10,0 -15,5 -25,5 c -10,0 -15,-5 -25,-5 c -10,0 -15,5 -25,5 c -10,0 -15,-5 -25,-5 c -10,0 -15,5 -25,5 c -10,0 -15,-5 -25,-5 c -10,0 -15,5 -25,5 c -10,0 -15,-5 -25,-5" />
          </svg>
        </div>
        <div className="label"></div>
      </div>
      <div className="nav-items">
        <div className="nav-item" data-glow></div>
        <div className="nav-item" data-glow></div>
        <div className="nav-item" data-glow></div>
        <div className="nav-item" data-glow></div>
        <RoundCard>
          <img src="/ethlogo40px.png" alt="pepelogo" className="roundcard-image" />
        </RoundCard>
      </div>
    </nav>
  );
};

export default NavBar;
