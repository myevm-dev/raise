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
  // Manual configuration for collection images
  const collectionImages: { [key: string]: string } = {
    degen: "/degenlogo.png", // Default collection logo
    // Add more collections as needed:
    // "another-collection": "/another-collection-logo.png"
  };

  const currentCollection = "degen"; // Set the current collection here

  const collectionImage = collectionImages[currentCollection]; // Get the corresponding logo

  return (
    <footer className="footer">
      {/* Collection image on the left */}
      <div className="collection-image">
        {collectionImage && <img src={collectionImage} alt="Collection" />}
      </div>

      {/* Swap From Card */}
      <div className="swap-card-container">
        <div className="swap-card">
          <h3>Swap From</h3>
          <div className="nft-preview">
            <p>No NFT Selected</p>
          </div>
        </div>
      </div>

      {/* Swap Arrow */}
      <div className="swap-arrow-container">
        <p className="swap-arrow">⇄</p>
      </div>

      {/* Swap To Card */}
      <div className="swap-card-container">
        <div className="swap-card">
          <h3>Swap To</h3>
          {selectedNFT ? (
            <div className="nft-preview">
              <img src={selectedNFT.image} alt={`NFT ${selectedNFT.id}`} />
              <p>ID: {selectedNFT.id}</p>
            </div>
          ) : (
            <p>No NFT Selected</p>
          )}
        </div>
      </div>

      {/* Collection image on the right */}
      <div className="collection-image">
        {collectionImage && <img src={collectionImage} alt="Collection" />}
      </div>
    </footer>
  );
};

export default Footer;
