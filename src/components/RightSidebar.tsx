import React from 'react';
import RoundCard from './RoundCard';
import './RightSidebar.css';

const RightSidebar = () => {
  const unipools = new Array(4).fill(null);
  return (
    <div className="right-side-bar">
      <div className="water-tank">
        <div className="liquid">
          <svg className="water" viewBox="0 0 200 100">
            <defs>
              <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0" style={{ stopColor: '#29ABE2' }} />
                <stop offset="0.1643" style={{ stopColor: '#28A6E3' }} />
                <stop offset="0.3574" style={{ stopColor: '#2496E6' }} />
                <stop offset="0.5431" style={{ stopColor: '#1E7DEA' }} />
                <stop offset="0.7168" style={{ stopColor: '#1559F0' }} />
                <stop offset="0.874" style={{ stopColor: '#0B2CF7' }} />
                <stop offset="1" style={{ stopColor: '#0000FF' }} />
              </linearGradient>
            </defs>
            <path fill="url(#waterGradient)" d="
              M 0,0 v 100 h 200 v -100 
              c -10,0 -15,5 -25,5 c -10,0 -15,-5 -25,-5
              c -10,0 -15,5 -25,5 c -10,0 -15,-5 -25,-5
              c -10,0 -15,5 -25,5 c -10,0 -15,-5 -25,-5
              c -10,0 -15,5 -25,5 c -10,0 -15,-5 -25,-5
            " />
          </svg>
        </div>
      </div>

      <div className="unipools-container">
        {unipools.map((_, index) => (
          <div key={index} className="unipool-item" data-glow>
            {index + 1}
          </div>
        ))}
        <RoundCard /> {/* Place RoundCard at the bottom */}
      </div>
    </div>
  );
};

export default RightSidebar;
