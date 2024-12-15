import React, { useState, useEffect } from "react";
import "./DropDownPanel.css";

// Extend the Window interface for Calendly
declare global {
  interface Window {
    Calendly?: {
      initBadgeWidget: (options: {
        url: string;
        text: string;
        color: string;
        textColor: string;
      }) => void;
    };
  }
}

const DropDownPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;

    script.onload = () => {
      if (window.Calendly) {
        window.Calendly.initBadgeWidget({
          url: "https://calendly.com/yo-myevm/30min",
          text: "Schedule time with me",
          color: "#0069ff",
          textColor: "#ffffff",
        });
      }
    };

    document.body.appendChild(script);
  }, []);

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
          {/* Calendly Badge Widget */}
          <a
            href="https://calendly.com/yo-myevm/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="panel-button"
            style={{ backgroundColor: "#0069ff" }}
          >
            Schedule time with me
          </a>
          <a
            href="https://myevm.xyz"
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
