import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './AccountBalancesCard.css';

interface Collection {
  id: number;
  name: string;
  logo: string;
  nftAddress: string;
  mnftAddress: string;
  nftBalance: string;
  mnftBalance: string;
}

const initialCollections: Collection[] = [
  {
    id: 1,
    name: 'DEGEN',
    logo: './degenlogo.svg',
    nftAddress: '0x0e342F41e1B96532207F1Ad6D991969f4b58e5a1',
    mnftAddress: '0xb736fd496c15c7285a0e61d0ae24b6020d0da387',
    nftBalance: '0',
    mnftBalance: '0',
  },
  {
    id: 2,
    name: 'GLITCH ON APE',
    logo: './glitchlogo.svg',
    nftAddress: '0x7cA094eB7E2e305135A0c49835e394b0daca8C56',
    mnftAddress: '0x25fcaceB144227A341C2E621369346247EE7F902',
    nftBalance: '0',
    mnftBalance: '0',
  },
  {
    id: 3,
    name: 'A KID ON APE',
    logo: './akidlogo.svg',
    nftAddress: '0x2bEa2b6Bad866b5cA62117855D4b5D8A6C996Db2',
    mnftAddress: '0x1eD327c0FAD66dB2258268D9841001853cD13Ff1',
    nftBalance: '0',
    mnftBalance: '0',
  },
];

const ERC20_ABI = ['function balanceOf(address owner) view returns (uint256)'];
const ERC721_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function setApprovalForAll(address operator, bool approved) external',
  'function isApprovedForAll(address owner, address operator) view returns (bool)',
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

  const getProvider = (): ethers.BrowserProvider | undefined => {
    if (typeof window.ethereum !== 'undefined') {
      return new ethers.BrowserProvider(window.ethereum);
    } else {
      console.error('Ethereum provider not found');
      return undefined;
    }
  };

  useEffect(() => {
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
              mnftBalance: ethers.formatEther(mnftBalance),
            };
          } catch (error) {
            console.error(`Error fetching balances for ${collection.name}:`, error);
            return collection;
          }
        })
      );

      setCollections(updatedCollections);
    };

    fetchBalances();
  }, []);

  const handleCollectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCollectionId(Number(event.target.value));
  };

  const handleTokenIdsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokenIds(event.target.value);
  };

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
      const signer = await provider.getSigner();
      const nftContract = new ethers.Contract(collection.nftAddress, ERC721_ABI, signer);
      const depositContract = new ethers.Contract(collection.mnftAddress, CONTRACT_ABI, signer);

      // Check if the contract is approved for all NFTs
      const isApproved = await nftContract.isApprovedForAll(userAddress, collection.mnftAddress);
      if (!isApproved) {
        console.log(`Setting approval for all NFTs to contract ${collection.mnftAddress}`);
        const approvalTx = await nftContract.setApprovalForAll(collection.mnftAddress, true);
        await approvalTx.wait();
        console.log('Approval for all NFTs set successfully');
      }

      // Call deposit function with approved token IDs
      console.log(`Depositing token IDs: ${tokenIdArray}`);
      const tx = await depositContract.deposit(tokenIdArray);
      await tx.wait();
      alert('Deposit successful');
    } catch (error) {
      console.error('Error during deposit:', error);
      alert('Deposit failed');
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
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(collection.mnftAddress, CONTRACT_ABI, signer);

      const tx = await contract.redeem(tokenIdArray);
      await tx.wait();
      alert('Redeem successful');
    } catch (error) {
      console.error('Error during redeem:', error);
      alert('Redeem failed');
    }
  };

  return (
    <div className="account-balances-card">
      <div className="sparkle-button">
        <div className="tooltip-container">
          <button>Daily Check-In</button>
          <span className="tooltip-text">Coming Soon</span>
        </div>
      </div>

      <div className="collection-grid">
        {collections.map((collection) => (
          <div className="collection-card" key={collection.id}>
            <img src={collection.logo} alt={`${collection.name} Logo`} />
            <p>{collection.name}</p>
            <p>NFTs: {collection.nftBalance}</p>
            <p>mNFTs: {collection.mnftBalance}</p>
          </div>
        ))}
      </div>

      <div className="bottom-section">
        <p>1 NFT = 1000 mNFT ERC20 Tokens</p>

        <select
          value={selectedCollectionId}
          onChange={handleCollectionChange}
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
          onChange={handleTokenIdsChange}
          className="token-id-input"
        />

        <div className="action-buttons">
          <button className="action-button" onClick={handleDeposit}>
            Deposit Liquidity
          </button>
          <button className="action-button" onClick={handleRedeem}>
            Remove Liquidity
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountBalancesCard;
