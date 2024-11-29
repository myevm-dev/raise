import React from "react";
import "./Footer.css";

type NFT = {
  id: string;
  image: string;
};

interface FooterProps {
  onSwapFromSelect: (nft: NFT) => void;
  onSwapToSelect: (nft: NFT) => void;
  swapFromNFT: NFT | null;
  swapToNFT: NFT | null;
  connectWallet: () => Promise<void>;
  account: string | null;
}

const Footer: React.FC<FooterProps> = ({
  onSwapFromSelect,
  onSwapToSelect,
  swapFromNFT,
  swapToNFT,
  connectWallet,
  account,
}) => {
  return (
    <footer className="footer">
      {/* Swap From Card */}
      <div className="swap-card-container">
        <div className="swap-card">
          <div className="nft-preview">
            <img
              src={swapFromNFT?.image || "/default-image.png"}
              alt={`NFT ${swapFromNFT?.id || "No NFT"}`}
            />
            <div className="card-text">
              <h3>Swap From</h3>
              <p>ID: {swapFromNFT?.id || "No NFT Selected"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Swap Arrow and Connect Wallet */}
      <div className="swap-arrow-container">
        <p className="swap-arrow">⇄</p>
        <button className="wallet-button" onClick={connectWallet}>
          {account
            ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
            : "Connect Wallet"}
        </button>
      </div>

      {/* Swap To Card */}
      <div className="swap-card-container">
        <div className="swap-card">
          <div className="nft-preview">
            <img
              src={swapToNFT?.image || "/default-image.png"}
              alt={`NFT ${swapToNFT?.id || "No NFT"}`}
            />
            <div className="card-text">
              <h3>Swap To</h3>
              <p>ID: {swapToNFT?.id || "No NFT Selected"}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
