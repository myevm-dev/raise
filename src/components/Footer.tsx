import React from "react";
import "./Footer.css";

type NFT = {
  id: string;
  image: string;
};

interface FooterProps {
  onSwapToSelect: (nft: NFT | null) => void;
  onSwapFromSelect: (nft: NFT | null) => void;
  swapToNFT: NFT | null;
  swapFromNFT: NFT | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  account: string | null;
  handleSwap: () => Promise<void>; // Add a handleSwap prop
}

const Footer: React.FC<FooterProps> = ({
  onSwapToSelect,
  onSwapFromSelect,
  swapToNFT,
  swapFromNFT,
  connectWallet,
  disconnectWallet,
  account,
  handleSwap, // Swap handler passed from App
}) => {
  const isSwapReady = !!swapFromNFT && !!swapToNFT; // Check if both NFTs are selected

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

      {/* Swap Arrow or Swap Button */}
      <div className="swap-arrow-container">
        {isSwapReady ? (
          <button className="swap-button" onClick={handleSwap}>
            Swap
          </button>
        ) : (
          <p className="swap-arrow">⇄</p>
        )}

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
