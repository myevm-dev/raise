import React, { useState } from "react";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import Background from "./components/Background";
import Footer from "./components/Footer";
import DropDownPanel from "./components/DropDownPanel";
import NFTCarousel from "./components/NFTCarousel";
import "./main.css";

type NFT = {
  id: string;
  image: string;
};

function App() {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);

  const handleNFTSelect = (nft: NFT) => {
    setSelectedNFT(nft); // Set the selected NFT for "swap to"
  };

  return (
    <div className="app-container">
      <DropDownPanel />
      <Background />
      <main className="main-container">
        <LeftSidebar />

        <div className="main-content">
          <NFTCarousel onNFTSelect={handleNFTSelect} />
        </div>

        <RightSidebar />
      </main>
      <Footer onSwapToSelect={handleNFTSelect} selectedNFT={selectedNFT} />
    </div>
  );
}

export default App;
