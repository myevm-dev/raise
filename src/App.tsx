import React, { useState, useEffect } from "react";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import Background from "./components/Background";
import Footer from "./components/Footer";
import DropDownPanel from "./components/DropDownPanel";
import NFTCarousel from "./components/NFTCarousel";
import OwnedNFTCarousel from "./components/OwnedNFTCarousel";
import { ethers } from "ethers";
import "./main.css";

type NFT = {
  id: string;
  image: string;
};

function App() {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [showOwnedNFTs, setShowOwnedNFTs] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    connectWallet();
  }, []);

  const handleNFTSelect = (nft: NFT) => {
    setSelectedNFT(nft);
  };

  const handleToggle = (owned: boolean) => {
    setShowOwnedNFTs(owned);
    setIsLoading(true); // Reset loading state
    setTimeout(() => setIsLoading(false), 500); // Simulate loading delay
  };

  return (
    <div className="app-container">
      <DropDownPanel />
      <Background />
      <main className="main-container">
        <LeftSidebar />

        <div className="main-content">
          {/* Render appropriate carousel */}
          <div className="carousel-container">
            {isLoading ? (
              <div className="carousel-placeholder">Loading...</div>
            ) : account ? (
              showOwnedNFTs ? (
                <OwnedNFTCarousel
                  onNFTSelect={handleNFTSelect}
                  account={account}
                />
              ) : (
                <NFTCarousel onNFTSelect={handleNFTSelect} />
              )
            ) : (
              <div className="carousel-placeholder">
                Connect your wallet to view NFTs.
              </div>
            )}
          </div>

          {/* Toggle Buttons */}
          <div className="toggle-buttons">
            <button
              className={!showOwnedNFTs ? "active" : ""}
              onClick={() => handleToggle(false)}
            >
              Pool NFTs
            </button>
            <button
              className={showOwnedNFTs ? "active" : ""}
              onClick={() => handleToggle(true)}
            >
              My NFTs
            </button>
          </div>
        </div>

        <RightSidebar />
      </main>
      <Footer onSwapToSelect={handleNFTSelect} selectedNFT={selectedNFT} />
    </div>
  );
}

export default App;
