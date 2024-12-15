import React from "react";
import "./Footer.css";

interface FooterProps {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  account: string | null;
}

const Footer: React.FC<FooterProps> = ({
  connectWallet,
  disconnectWallet,
  account,
}) => {
  return (
    <footer className="footer">
      <div className="wallet-container">
        {account ? (
          <button className="wallet-button" onClick={disconnectWallet}>
            Disconnect Wallet
          </button>
        ) : (
          <button className="wallet-button" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;
