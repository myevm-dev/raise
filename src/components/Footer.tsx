import React from "react";
import { ethers } from "ethers";
import {
  NFT_BACKED_TOKEN_CONTRACT_ADDRESS,
  TOKEN_CONTRACT_ABI,
  provider,
} from "./nftUtils";
import "./Footer.css";

type NFT = {
  id: string;
  image: string;
};

interface FooterProps {
  onSwapFromSelect: (nft: NFT | null) => void;
  onSwapToSelect: (nft: NFT | null) => void;
  swapFromNFT: NFT | null;
  swapToNFT: NFT | null;
  connectWallet: () => Promise<void>;
  account: string | null;
}

const Footer: React.FC<FooterProps> = ({
  onSwapFromSelect,
  onSwapToSelect,
  swapFromNFT,
  swapToNFT,
  connectWallet,
  account,
}) => {
  const handleSwap = async () => {
    if (!swapFromNFT || !swapToNFT) {
      alert("Both 'Swap From' and 'Swap To' NFTs must be selected.");
      return;
    }

    try {
      const signer = await provider.getSigner();

      const nftBackedTokenContract = new ethers.Contract(
        NFT_BACKED_TOKEN_CONTRACT_ADDRESS,
        TOKEN_CONTRACT_ABI,
        signer
      );

      const fromTokenId = BigInt(swapFromNFT.id);
      const toTokenId = BigInt(swapToNFT.id);

      const tx = await nftBackedTokenContract.swap([fromTokenId], [toTokenId]);
      await tx.wait();

      alert("Swap completed successfully!");
      onSwapFromSelect(null);
      onSwapToSelect(null);
    } catch (error: any) {
      console.error("Error swapping NFTs:", error);
      alert(
        `An error occurred while swapping NFTs. Please try again.\n${error.reason || error.message || "Unknown error"}`
      );
    }
  };

  return (
    <footer className="footer">
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

      <div className="swap-arrow-container">
        {swapFromNFT && swapToNFT ? (
          <button className="swap-button" onClick={handleSwap}>
            Swap
          </button>
        ) : (
          <p className="swap-arrow">⇄</p>
        )}
        <button className="wallet-button" onClick={connectWallet}>
          {account
            ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
            : "Connect Wallet"}
        </button>
      </div>

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
