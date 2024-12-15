import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import Background from "./components/Background";
import Footer from "./components/Footer";
import DropDownPanel from "./components/DropDownPanel";
import "./main.css";

type NFT = {
  id: string;
  image: string;
};

function App() {
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

  const disconnectWallet = () => {
    setAccount(null); // Reset account state
  };

  return (
    <div className="app-container">
      <DropDownPanel />
      <Background />
      <main className="main-container">
        {/* Single card with all content */}
        <div className="card">
          <h2 className="card-title">Round One NFT</h2>
          <img src="./mocknft.png" alt="Mock NFT" className="card-image" />
          <div className="card-content">
            <p className="card-detail">Supply: 8</p>
            <p className="card-detail">Price: 3500 APE</p>
            <button className="mint-button" onClick={() => alert("Minting initiated!")}>
              Mint
            </button>
            
            <p className="non-transferable-text">
              NFTs are non-transferable while mint is active
            </p>
          </div>
        </div>
      </main>


      <Footer
        connectWallet={connectWallet} // Connect wallet function
        disconnectWallet={disconnectWallet} // Disconnect wallet function
        account={account} // Current wallet account
      />
    </div>
  );
}

export default App;
