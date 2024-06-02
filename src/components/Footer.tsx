import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="center-button">
        <input id="check-for-clicking" type="checkbox" />
        <label className="main-add-button-plus" htmlFor="check-for-clicking">
          <div className="menu-add-button-title">🔌</div>
        </label>
        <label className="main-add-button-minus" htmlFor="check-for-clicking">
          <div className="menu-add-button-title">🔌</div>
        </label>
        <div className="menu-add-items">
          <span className="plate"><i>ETH</i></span>
          <span className="plate"><i>ARB</i></span>
          <span className="plate"><i>OP</i></span>
          <span className="plate"><i>BASE</i></span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
