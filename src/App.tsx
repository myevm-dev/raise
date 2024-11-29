import React, { useState } from "react";
import { ethers } from "ethers";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import Background from "./components/Background";
import Footer from "./components/Footer";
import DropDownPanel from "./components/DropDownPanel";
import NFTCarousel from "./components/NFTCarousel";
import OwnedNFTCarousel from "./components/OwnedNFTCarousel";
import "./main.css";

type NFT = {
  id: string;
  image: string;
};

function App() {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isPooledView, setIsPooledView] = useState(true);

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

  const handleNFTSelect = (nft: NFT) => {
    setSelectedNFT(nft);
  };

  return (
    <div className="app-container">
      <DropDownPanel />
      <Background />
      <main className="main-container">
        <LeftSidebar />

        <div className="main-content">
          <div className="toggle-buttons">
            <button
              className={isPooledView ? "active" : ""}
              onClick={() => setIsPooledView(true)}
            >
              Pool NFTs
            </button>
            <button
              className={!isPooledView ? "active" : ""}
              onClick={() => setIsPooledView(false)}
            >
              My NFTs
            </button>
          </div>
          {isPooledView ? (
            <NFTCarousel onNFTSelect={handleNFTSelect} />
          ) : (
            <OwnedNFTCarousel onNFTSelect={handleNFTSelect} account={account} />
          )}
        </div>

        <RightSidebar />
      </main>
      <Footer
        onSwapToSelect={handleNFTSelect}
        selectedNFT={selectedNFT}
        connectWallet={connectWallet}
        account={account}
      />
    </div>
  );
}

export default App;
