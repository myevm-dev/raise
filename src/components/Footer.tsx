import React from 'react';
import './Footer.css';
import TicksComponent from './TicksComponent';
import WhiteTickComponent from './WhiteTickComponent';
import WalletComponent from './WalletComponent';
import AccountComponent from './AccountComponent';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="ticks-container">
        <TicksComponent />
        <WhiteTickComponent />
      </div>
      <AccountComponent />
      <WalletComponent />
    </footer>
  );
};

export default Footer;
