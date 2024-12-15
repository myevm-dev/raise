import React, { useState } from "react";
import { ethers } from "ethers";

import Background from "./components/Background";
import Footer from "./components/Footer";
import DropDownPanel from "./components/DropDownPanel";
import "./main.css";

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

  const handleWrapApe = () => {
    alert("Wrap Ape functionality initiated!");
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

          <div className="card-detail">
            <p className="card-detail">Supply: 8</p>
            <p className="card-detail">Price: 3500 APE</p>
          </div>

          <div className="button-container">
            <button className="wrap-button" onClick={handleWrapApe}>
              Wrap Ape
            </button>
            <button
              className="mint-button"
              onClick={() => alert("Minting initiated!")}
            >
              Mint NFT
            </button>
          </div>
          <p className="non-transferable-text">
            
            <a
              href="https://apescan.io/address/0x82d22b3affdc6b743916a10de096bf6e985fd6c7#code" // Replace with your desired Etherscan link
              target="_blank"
              rel="noopener noreferrer"
              className="etherscan-link"
            >
              <img
                src="https://etherscan.io/images/brandassets/etherscan-logo-circle.svg"
                alt="Etherscan"
                className="etherscan-logo"
              />
            </a>
            NFTs are non-transferable while minting,<br /> an address can never hold more than one.
            <a
              href="https://etherscan.io" // Replace with your desired Etherscan link
              target="_blank"
              rel="noopener noreferrer"
              className="etherscan-link"
            >
              <img
                src="https://etherscan.io/images/brandassets/etherscan-logo-circle.svg"
                alt="Etherscan"
                className="etherscan-logo"
              />
            </a>
          </p>
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
