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
  const [swapFromNFT, setSwapFromNFT] = useState<NFT | null>(null); // For "Swap From"
  const [swapToNFT, setSwapToNFT] = useState<NFT | null>(null); // For "Swap To"
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
    setSwapFromNFT(null); // Reset Swap From NFT
    setSwapToNFT(null); // Reset Swap To NFT
  };

  const handleSwap = async () => {
    if (!swapFromNFT || !swapToNFT) {
      alert("Both 'Swap From' and 'Swap To' NFTs must be selected.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum as ethers.Eip1193Provider);
      const signer = await provider.getSigner();

      const nftBackedTokenContract = new ethers.Contract(
        "0xb736fd496c15c7285a0e61d0ae24b6020d0da387", // Replace with your contract address
        [
          {
            inputs: [
              { internalType: "uint256[]", name: "tokensIn", type: "uint256[]" },
              { internalType: "uint256[]", name: "tokensOut", type: "uint256[]" },
            ],
            name: "swap",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        signer
      );

      const tx = await nftBackedTokenContract.swap(
        [BigInt(swapFromNFT.id)], // `tokensIn`
        [BigInt(swapToNFT.id)] // `tokensOut`
      );

      await tx.wait();

      alert("Swap completed successfully!");
      setSwapFromNFT(null);
      setSwapToNFT(null);
    } catch (error) {
      console.error("Error during swap:", error);
      alert("Swap failed. Please try again.");
    }
  };

  return (
    <div className="app-container">
      <DropDownPanel />
      <Background />
      <main className="main-container">
        <div className="card-container">
          {/* Left card with image */}
          <div className="card">
            <img src="./mocknft.png" alt="Mock NFT" className="card-image" />
          </div>
          {/* Right card with centered content */}
          <div className="card">
            <div className="card-content">
              <h2 className="card-title">Round One NFT</h2>
              <p className="card-detail">Supply: 8</p>
              <p className="card-detail">Price: 3500 APE</p>
              <button className="mint-button" onClick={() => alert("Minting initiated!")}>
                Mint
              </button>
            </div>
          </div>
        </div>
      </main>



      <Footer
        onSwapToSelect={setSwapToNFT} // Swap To handler
        onSwapFromSelect={setSwapFromNFT} // Swap From handler
        swapToNFT={swapToNFT} // Selected Swap To NFT
        swapFromNFT={swapFromNFT} // Selected Swap From NFT
        connectWallet={connectWallet} // Connect wallet function
        disconnectWallet={disconnectWallet} // Disconnect wallet function
        account={account} // Current wallet account
        handleSwap={handleSwap} // Swap handler
      />
    </div>
  );
}

export default App;
