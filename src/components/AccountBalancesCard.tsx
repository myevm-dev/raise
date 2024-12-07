import React, { useState } from 'react';
import './AccountBalancesCard.css'; // Import the CSS file

const collections = [
  {
    id: 1,
    name: 'DEGEN',
    logo: './degenlogo.svg',
    nftBalance: 0,
    mnftBalance: 0,
  },
  {
    id: 2,
    name: 'GLITCH ON APE',
    logo: './glitchlogo.svg',
    nftBalance: 0,
    mnftBalance: 0,
  },
  {
    id: 3,
    name: 'A KID ON APE',
    logo: './akidlogo.svg',
    nftBalance: 0,
    mnftBalance: 0,
  },
  {
    id: 4,
    name: 'DSNRS',
    logo: './dsnrslogo.svg',
    nftBalance: 0,
    mnftBalance: 0,
  },
  {
    id: 5,
    name: 'WYATTS WIDE WORLD',
    logo: './wyattslogo.svg',
    nftBalance: 0,
    mnftBalance: 0,
  },
  {
    id: 6,
    name: 'APETOONS',
    logo: '/path/to/logo6.png',
    nftBalance: 0,
    mnftBalance: 0,
  },
];

const AccountBalancesCard: React.FC = () => {
  const [selectedCollection, setSelectedCollection] = useState('Collection 1');
  const [tokenIds, setTokenIds] = useState('');

  const handleCollectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCollection(event.target.value);
    console.log(`Selected collection: ${event.target.value}`);
  };

  const handleTokenIdsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokenIds(event.target.value);
    console.log(`Entered Token IDs: ${event.target.value}`);
  };

  return (
    <div className="account-balances-card">
      {/* Daily Check-In Button */}
      <div className="sparkle-button">
        <button>Daily Check-In</button>
      </div>

      {/* Grid of Collection Cards */}
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

      {/* Bottom Section */}
      <div className="bottom-section">
        <p>1 NFT = 1000 mNFT Erc20 Tokens</p>
        <select
          value={selectedCollection}
          onChange={handleCollectionChange}
          className="collection-selector"
        >
          {collections.map((collection) => (
            <option key={collection.id} value={collection.name}>
              {collection.name}
            </option>
          ))}
        </select>

        {/* Text Box for Token IDs */}
        <input
          type="text"
          placeholder="Enter Token IDs (comma-separated)"
          value={tokenIds}
          onChange={handleTokenIdsChange}
          className="token-id-input"
        />

        <div className="action-buttons">
          <button className="action-button">Deposit Liquidity</button>
          <button className="action-button">Remove Liquidity</button>
        </div>
      </div>
    </div>
  );
};

export default AccountBalancesCard;
