// NFTCarousel.tsx
import React, { useEffect, useState } from "react";
import { fetchPoolNFTs } from "./nftUtils";
import "./Carousel.css"; // Ensure this path is correct based on your project structure

type NFT = {
  id: string;
  image: string;
};

const NFTCarousel: React.FC = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const ITEMS_PER_PAGE = 6; // Number of NFTs visible at a time

  useEffect(() => {
    const loadNFTs = async () => {
      try {
        const nftData = await fetchPoolNFTs();
        setNfts(nftData);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNFTs();
  }, []);

  const handleNext = () => {
    if (currentIndex + ITEMS_PER_PAGE < nfts.length) {
      setCurrentIndex(currentIndex + ITEMS_PER_PAGE);
    }
  };

  const handlePrevious = () => {
    if (currentIndex - ITEMS_PER_PAGE >= 0) {
      setCurrentIndex(currentIndex - ITEMS_PER_PAGE);
    }
  };

  if (isLoading) {
    return <div className="loading-message">Loading NFTs...</div>;
  }

  if (nfts.length === 0) {
    return <div className="no-nfts-message">No NFTs available at the moment.</div>;
  }

  return (
    <div className="carousel-container">
      <button
        className="carousel-button"
        onClick={handlePrevious}
        disabled={currentIndex === 0}
      >
        {"<"}
      </button>

      <div className="carousel-grid">
        {nfts.slice(currentIndex, currentIndex + ITEMS_PER_PAGE).map((nft) => (
          <div key={nft.id} className="carousel-item">
            <img src={nft.image} alt={`NFT ${nft.id}`} className="nft-image" />
            <p className="nft-id">ID: {nft.id}</p>
          </div>
        ))}
      </div>

      <button
        className="carousel-button"
        onClick={handleNext}
        disabled={currentIndex + ITEMS_PER_PAGE >= nfts.length}
      >
        {">"}
      </button>
    </div>
  );
};

export default NFTCarousel;
