import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <img src="/degenlogo.png" alt="Left Icon" />
      </div>
      <div className="footer-right">
        <img src="/degenlogo.png" alt="Right Icon" />
      </div>
    </footer>
  );
};

export default Footer;
