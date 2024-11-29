import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./Carousel.css";

type NFT = {
  id: string;
  image: string;
};

interface OwnedNFTCarouselProps {
  onNFTSelect: (nft: NFT) => void;
  account: string | null;
}

const OwnedNFTCarousel: React.FC<OwnedNFTCarouselProps> = ({ onNFTSelect, account }) => {
  const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOwnedNFTs = async () => {
    if (!window.ethereum) {
      setError("No Ethereum wallet detected. Please install MetaMask.");
      setIsLoading(false);
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum as ethers.Eip1193Provider); // Ensure proper type assertion
      const signer = await provider.getSigner();

      if (!account) {
        setError("No wallet connected.");
        setIsLoading(false);
        return;
      }

      // Replace with your NFT contract address and ABI
      const nftContract = new ethers.Contract(
        "0xYourNFTContractAddressHere",
        [
          {
            inputs: [{ internalType: "address", name: "owner", type: "address" }],
            name: "balanceOf",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [{ internalType: "address", name: "owner", type: "address" }, { internalType: "uint256", name: "index", type: "uint256" }],
            name: "tokenOfOwnerByIndex",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
            name: "tokenURI",
            outputs: [{ internalType: "string", name: "", type: "string" }],
            stateMutability: "view",
            type: "function",
          },
        ],
        signer
      );

      const balance = await nftContract.balanceOf(account);

      const nftData: NFT[] = [];
      for (let i = 0; i < balance; i++) {
        const tokenId = await nftContract.tokenOfOwnerByIndex(account, i);
        const tokenURI = await nftContract.tokenURI(tokenId);

        let imageUrl = tokenURI;
        if (tokenURI.startsWith("ipfs://")) {
          imageUrl = tokenURI.replace("ipfs://", "https://nftstorage.link/ipfs/");
        }

        nftData.push({ id: tokenId.toString(), image: imageUrl });
      }

      setOwnedNFTs(nftData);
    } catch (err) {
      console.error("Error fetching owned NFTs:", err);
      setError("Failed to fetch owned NFTs.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (account) {
      setIsLoading(true);
      setError(null);
      fetchOwnedNFTs();
    }
  }, [account]);

  if (isLoading) {
    return <div className="loading-message">Loading owned NFTs...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (ownedNFTs.length === 0) {
    return <div className="no-nfts-message">You currently don't own any NFTs in this collection.</div>;
  }

  return (
    <div className="carousel-container">
      {ownedNFTs.map((nft) => (
        <div
          key={nft.id}
          className="carousel-item"
          onClick={() => onNFTSelect(nft)}
        >
          <img src={nft.image} alt={`NFT ${nft.id}`} className="nft-image" />
          <p className="nft-id">ID: {nft.id}</p>
        </div>
      ))}
    </div>
  );
};

export default OwnedNFTCarousel;
