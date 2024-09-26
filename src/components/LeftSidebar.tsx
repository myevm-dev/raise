import React from 'react';
import './LeftSidebar.css';

const LeftSidebar = () => {
  return (
    <div className="left-side-bar">
      <div className="water-tank">
        <div className="liquid">
          <svg className="water" viewBox="0 0 200 100">
            <defs>
              <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0" style={{ stopColor: '#C4FFBA' }} />
                <stop offset="0.1643" style={{ stopColor: '#9FE194' }} />
                <stop offset="0.3574" style={{ stopColor: '#A2E897' }} />
                <stop offset="0.5431" style={{ stopColor: '#4D9441' }} />
                <stop offset="0.7168" style={{ stopColor: '#53864B' }} />
                <stop offset="0.874" style={{ stopColor: '#4D9441' }} />
                <stop offset="1" style={{ stopColor: '#4D9441' }} />
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
    </div>
  );
};

export default LeftSidebar;
