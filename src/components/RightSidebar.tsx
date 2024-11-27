import React from 'react';

import './RightSidebar.css';

const RightSidebar = () => {
  return (
    <div className="right-side-bar">
      <div className="water-tank">
        <div className="liquid">
          <svg className="water" viewBox="0 0 200 100">
            <defs>
              <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0" style={{ stopColor: '#A020F0' }} /> {/* Purple Start */}
                <stop offset="0.1643" style={{ stopColor: '#9B2DF8' }} />
                <stop offset="0.3574" style={{ stopColor: '#8B3CFD' }} />
                <stop offset="0.5431" style={{ stopColor: '#7A54FF' }} />
                <stop offset="0.7168" style={{ stopColor: '#5A3B92' }} />
                <stop offset="0.874" style={{ stopColor: '#3D256A' }} /> {/* Darker Purple */}
                <stop offset="1" style={{ stopColor: '#2B184A' }} /> {/* Deep Purple */}
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

export default RightSidebar;
