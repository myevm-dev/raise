import React, { useState } from "react";
import "./DropDownPanel.css";

const DropDownPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-panel-container">
      <div className={`panel ${isOpen ? "open" : ""}`}>
        {/* Image */}
        <div className="panel-image-container">
          <img
            src="/tokennomics.svg"
            alt="Tokenomics"
            className="panel-image"
          />
        </div>

        {/* Buttons */}
        <div className="panel-buttons-container">
          <a
            href="https://myevm.casa"
            target="_blank"
            rel="noopener noreferrer"
            className="panel-button"
          >
            Ecosystem
          </a>
          <a
            href="https://calendly.com/yo-myevm/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="panel-button"
            style={{ backgroundColor: "#0069ff" }}
          >
            Schedule a Call
          </a>
          <a
            href="https://myevm.gitbook.io/myevm/"
            target="_blank"
            rel="noopener noreferrer"
            className="panel-button"
          >
            Whitepaper
          </a>
        </div>
      </div>

      {/* Slide Trigger */}
      <div className="slide">
        <a href="#" className="pull-me" onClick={togglePanel}>
          <span
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#6600CC",
              marginRight: "5px",
              verticalAlign: "middle",
            }}
          >
            Details
          </span>
        </a>
      </div>
    </div>
  );
};

export default DropDownPanel;
