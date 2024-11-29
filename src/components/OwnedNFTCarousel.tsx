import React, { useEffect, useState } from "react";
import "./Carousel.css";

type NFT = {
  id: string;
  image: string;
};

interface OwnedNFTCarouselProps {
  onNFTSelect: (nft: NFT) => void;
  account: string | null; // Pass wallet account as prop
}

const OwnedNFTCarousel: React.FC<OwnedNFTCarouselProps> = ({ onNFTSelect, account }) => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const ITEMS_PER_PAGE = 24;

  const fetchOwnedNFTs = async () => {
    if (!account) return; // No account connected
    try {
      setIsLoading(true);
      // Fetch owned NFTs for the account from the contract or API (mock data for now)
      const ownedNFTs = await fetch(`https://api.example.com/owned-nfts?account=${account}`).then((res) =>
        res.json()
      );
      setNfts(ownedNFTs);
    } catch (error) {
      console.error("Error fetching owned NFTs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOwnedNFTs();
  }, [account]);

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

  if (!account) {
    return <div className="no-account-message">Connect your wallet to view your NFTs.</div>;
  }

  if (isLoading) {
    return <div className="loading-message">Loading NFTs...</div>;
  }

  if (nfts.length === 0) {
    return <div className="no-nfts-message">Please Connect Wallet</div>;
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

export default OwnedNFTCarousel;
