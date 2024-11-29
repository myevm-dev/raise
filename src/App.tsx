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
  const [swapFromNFT, setSwapFromNFT] = useState<NFT | null>(null); // For "Swap From"
  const [swapToNFT, setSwapToNFT] = useState<NFT | null>(null); // For "Swap To"
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

  // Handle selection from Pool NFTs (for Swap To)
  const handlePoolNFTSelect = (nft: NFT) => {
    setSwapToNFT(nft);
  };

  // Handle selection from User-Owned NFTs (for Swap From)
  const handleOwnedNFTSelect = (nft: NFT) => {
    setSwapFromNFT(nft);
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
            <NFTCarousel onNFTSelect={handlePoolNFTSelect} />
          ) : (
            <OwnedNFTCarousel
              onNFTSelect={handleOwnedNFTSelect}
              account={account}
            />
          )}
        </div>

        <RightSidebar />
      </main>
      <Footer
        onSwapToSelect={setSwapToNFT} // Swap To handler
        onSwapFromSelect={setSwapFromNFT} // Swap From handler
        swapToNFT={swapToNFT} // Selected Swap To NFT
        swapFromNFT={swapFromNFT} // Selected Swap From NFT
        connectWallet={connectWallet}
        account={account}
      />
    </div>
  );
}

export default App;
