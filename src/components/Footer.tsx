import React, { useState } from "react";
import { ethers } from "ethers";
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
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("MetaMask is not installed!");
    }
  };

  return (
    <footer className="footer">
      {/* Swap From Card */}
      <div className="swap-card-container">
      <div className="swap-card">
  <div className="nft-preview">
    <img src={selectedNFT?.image || '/default-image.png'} alt={`NFT ${selectedNFT?.id || 'No NFT'}`} />
    <div className="card-text">
      <h3>Swap To</h3> {/* or "Swap From" for the other card */}
      <p>ID: {selectedNFT?.id || 'No NFT Selected'}</p>
    </div>
  </div>
</div>

      </div>

      {/* Swap Arrow */}
      <div className="swap-arrow-container">
        <p className="swap-arrow">⇄</p>
        <button className="wallet-button" onClick={connectWallet}>
          {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
        </button>
      </div>

      {/* Swap To Card */}
      <div className="swap-card-container">
      <div className="swap-card">
  <div className="nft-preview">
    <img src={selectedNFT?.image || '/default-image.png'} alt={`NFT ${selectedNFT?.id || 'No NFT'}`} />
    <div className="card-text">
      <h3>Swap To</h3> {/* or "Swap From" for the other card */}
      <p>ID: {selectedNFT?.id || 'No NFT Selected'}</p>
    </div>
  </div>
</div>

      </div>
    </footer>
  );
};

export default Footer;
