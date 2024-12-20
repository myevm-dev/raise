import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './AccountBalancesCard.css';
import { Collection, initialCollections } from './collections'; // Import the collections

const ERC721_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function setApprovalForAll(address operator, bool approved) external',
  'function isApprovedForAll(address owner, address operator) view returns (bool)',
];

const ERC20_ABI = [
  'function balanceOf(address account) view returns (uint256)',
];

const CONTRACT_ABI = [
  'function deposit(uint256[] tokenIds) external',
  'function redeem(uint256[] tokenIds) external',
];

const AccountBalancesCard: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>(initialCollections);
  const [selectedCollectionId, setSelectedCollectionId] = useState<number>(1);
  const [tokenIds, setTokenIds] = useState<string>('');
  const [userAddress, setUserAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const getProvider = (): ethers.BrowserProvider | undefined => {
    if (typeof window.ethereum !== 'undefined') {
      return new ethers.BrowserProvider(window.ethereum);
    } else {
      console.error('Ethereum provider not found');
      return undefined;
    }
  };

  const fetchBalances = async () => {
    const provider = getProvider();
    if (!provider) return;

    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    setUserAddress(address);

    const updatedCollections = await Promise.all(
      collections.map(async (collection) => {
        try {
          const nftContract = new ethers.Contract(collection.nftAddress, ERC721_ABI, provider);
          const mnftContract = new ethers.Contract(collection.mnftAddress, ERC20_ABI, provider);

          const nftBalance = await nftContract.balanceOf(address);
          const mnftBalance = await mnftContract.balanceOf(address);

          return {
            ...collection,
            nftBalance: nftBalance.toString(),
            mnftBalance: parseFloat(ethers.formatEther(mnftBalance)).toFixed(3), // Convert balance to human-readable format
          };
        } catch (error) {
          console.error(`Error fetching balances for ${collection.name}:`, error);
          return collection;
        }
      })
    );

    setCollections(updatedCollections);
  };

  useEffect(() => {
    fetchBalances();
  }, []);

  const handleDeposit = async () => {
    const collection = collections.find((c) => c.id === selectedCollectionId);
    if (!collection) return;

    const tokenIdArray = tokenIds.split(',').map((id) => id.trim()).map(Number);
    if (tokenIdArray.some(isNaN)) {
      alert('Invalid token IDs');
      return;
    }

    const provider = getProvider();
    if (!provider) return;

    try {
      setIsProcessing(true);

      const signer = await provider.getSigner();
      const nftContract = new ethers.Contract(collection.nftAddress, ERC721_ABI, signer);
      const depositContract = new ethers.Contract(collection.mnftAddress, CONTRACT_ABI, signer);

      const isApproved = await nftContract.isApprovedForAll(userAddress, collection.mnftAddress);
      if (!isApproved) {
        const approvalTx = await nftContract.setApprovalForAll(collection.mnftAddress, true);
        await approvalTx.wait();
      }

      const tx = await depositContract.deposit(tokenIdArray);
      await tx.wait();

      alert('Deposit successful!');
      await fetchBalances();
    } catch (error) {
      console.error('Error during deposit:', error);
      alert('Deposit failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRedeem = async () => {
    const collection = collections.find((c) => c.id === selectedCollectionId);
    if (!collection) return;

    const tokenIdArray = tokenIds.split(',').map((id) => id.trim()).map(Number);
    if (tokenIdArray.some(isNaN)) {
      alert('Invalid token IDs');
      return;
    }

    const provider = getProvider();
    if (!provider) return;

    try {
      setIsProcessing(true);

      const signer = await provider.getSigner();
      const redeemContract = new ethers.Contract(collection.mnftAddress, CONTRACT_ABI, signer);

      const tx = await redeemContract.redeem(tokenIdArray);
      await tx.wait();

      alert('Redeem successful!');
      await fetchBalances();
    } catch (error) {
      console.error('Error during redeem:', error);
      alert('Redeem failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="account-balances-card">
      <div className="collection-grid">
        {collections.map((collection) => (
          <div className="collection-card" key={collection.id}>
            <img src={collection.logo} alt={`${collection.name} Logo`} />
            <p>{collection.name}</p>
            <p>NFTs: {collection.nftBalance}</p>
            <p>{`m${collection.symbol}: ${collection.mnftBalance}`}</p> {/* Use m + symbol */}
          </div>
        ))}
      </div>

      <div className="bottom-section">
        <p>1 NFT = 1000 mNFT ERC20 Tokens</p>

        <select
          value={selectedCollectionId}
          onChange={(e) => setSelectedCollectionId(Number(e.target.value))}
          className="collection-selector"
        >
          {collections.map((collection) => (
            <option key={collection.id} value={collection.id}>
              {collection.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter Token IDs (comma-separated)"
          value={tokenIds}
          onChange={(e) => setTokenIds(e.target.value)}
          className="token-id-input"
        />

        <div className="action-buttons">
          <button className="action-button" onClick={handleDeposit} disabled={isProcessing}>
            {isProcessing ? 'Processing...' : 'Deposit Liquidity'}
          </button>
          <button className="action-button" onClick={handleRedeem} disabled={isProcessing}>
            {isProcessing ? 'Processing...' : 'Remove Liquidity'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountBalancesCard;
