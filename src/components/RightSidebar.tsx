import React, { useState } from "react";
import "./RightSidebar.css";

const RightSidebar = () => {
  // Define the possible logo keys
  type LogoKey =  "Degen" ;

  const [selectedLogo, setSelectedLogo] = useState<LogoKey>("Degen");

  const logos: Record<LogoKey, string> = {
    Degen: "/degenlogo.svg",

  };

  const handleSelection = (selection: LogoKey) => {
    setSelectedLogo(selection);
    console.log(`Selected logo: ${selection}`);
  };

  return (
    <div className="right-side-bar">
      <div className="logo-dropdown">
        <img src={logos[selectedLogo]} alt={`${selectedLogo} Logo`} className="sidebar-logo" />
        <select
          className="logo-selector"
          value={selectedLogo}
          onChange={(e) => handleSelection(e.target.value as LogoKey)}
        >
          <option value="Degen">Degen</option>
        </select>
      </div>
      <div className="water-tank">
        <div className="liquid">
          <svg className="water" viewBox="0 0 200 100">
            <defs>
              <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0" style={{ stopColor: "#A020F0" }} />
                <stop offset="1" style={{ stopColor: "#2B184A" }} />
              </linearGradient>
            </defs>
            <path
              fill="url(#waterGradient)"
              d="M 0,0 v 100 h 200 v -100 c -10,0 -15,5 -25,5 c -10,0 -15,-5 -25,-5 c -10,0 -15,5 -25,5 c -10,0 -15,-5 -25,-5 c -10,0 -15,5 -25,5 c -10,0 -15,-5 -25,-5 c -10,0 -15,5 -25,5 c -10,0 -15,-5 -25,-5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
