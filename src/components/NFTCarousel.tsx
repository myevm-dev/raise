// NFTCarousel.tsx
import React, { useEffect, useState } from "react";
import "./Carousel.css";
import { fetchPoolNFTs } from "./nftUtils"; // Adjust the path as needed

type NFT = {
  id: string;
  image: string;
};

interface NFTCarouselProps {
  onNFTSelect: (nft: NFT) => void;
}

const NFTCarousel: React.FC<NFTCarouselProps> = ({ onNFTSelect }) => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const ITEMS_PER_PAGE = 24;

  const fetchNFTs = async () => {
    try {
      const nftData = await fetchPoolNFTs(); // Ensure fetchPoolNFTs is imported correctly from utils
      setNfts(nftData);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNFTs();
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

  const handleNFTClick = (nft: NFT) => {
    onNFTSelect(nft); // Pass selected NFT to parent
  };

  if (isLoading) {
    return <div className="loading-message">Loading NFTs..Running on Public Rpc's, Might take a Minute.</div>;
  }

  if (nfts.length === 0) {
    return <div className="no-nfts-message">No NFTs available at the moment.</div>;
  }

  return (
    <div className="carousel-container">
      <button className="carousel-button left" onClick={handlePrevious}>
        {"<"}
      </button>

      <div className="carousel-grid">
        {nfts.slice(currentIndex, currentIndex + ITEMS_PER_PAGE).map((nft) => (
          <div
            key={nft.id}
            className="carousel-item"
            onClick={() => handleNFTClick(nft)}
          >
            <img src={nft.image} alt={`NFT ${nft.id}`} className="nft-image" />
            <p className="nft-id">ID: {nft.id}</p>
          </div>
        ))}
      </div>

      <button className="carousel-button right" onClick={handleNext}>
        {">"}
      </button>
    </div>
  );
};

export default NFTCarousel;
