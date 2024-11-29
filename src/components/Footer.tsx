import React from "react";
import "./Footer.css";

type NFT = {
  id: string;
  image: string;
};

interface FooterProps {
  onSwapToSelect: (nft: NFT) => void;
  selectedNFT: NFT | null;
}

const Footer: React.FC<FooterProps> = ({ onSwapToSelect, selectedNFT }) => {
  return (
    <footer className="footer">
      {/* Swap From Card */}
      <div className="swap-card-container">
        <div className="swap-card">
          <div className="nft-preview">
            <p>No NFT Selected</p>
          </div>
          <h3>Swap From</h3>
        </div>
      </div>

      {/* Swap Arrow */}
      <div className="swap-arrow-container">
        <p className="swap-arrow">⇄</p>
      </div>

      {/* Swap To Card */}
      <div className="swap-card-container">
        <div className="swap-card">
          {selectedNFT ? (
            <div className="nft-preview">
              <img src={selectedNFT.image} alt={`NFT ${selectedNFT.id}`} />
              <p>ID: {selectedNFT.id}</p>
            </div>
          ) : (
            <div className="nft-preview">
              <p>No NFT Selected</p>
            </div>
          )}
          <h3>Swap To</h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
