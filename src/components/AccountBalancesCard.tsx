import React, { useState } from 'react';
import './SparkleButton.css'; // Import the CSS for the sparkle effect

const AccountBalancesCard: React.FC = () => {
  const [selectedCollection, setSelectedCollection] = useState('Collection 1');

  const handleCollectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCollection(event.target.value);
    console.log(`Selected collection: ${event.target.value}`);
  };

  return (
    <div
      style={{
        backgroundColor: '#1c1f26',
        color: '#fff',
        border: '2px solid #6600CC',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'border-color 0.3s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#5200A3')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#6600CC')}
    >
      {/* Daily Check-In Button */}
      <div className="sparkle-button">
        <button>
          <span className="spark"></span>
          <span className="backdrop"></span>
          
          <span className="text">Daily Check-In</span>
        </button>
        <div className="bodydrop"></div>
      </div>

      {/* Collection List with Balances */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          paddingBottom: '20px',
          borderBottom: '2px solid #6600CC',
          marginBottom: '10px',
        }}
      >
        <ul
          style={{
            listStyleType: 'none',
            padding: 0,
            margin: 0,
            textAlign: 'left',
          }}
        >
          <li>Collection 1</li>
          <li>Collection 2</li>
          <li>Collection 3</li>
        </ul>
        <ul
          style={{
            listStyleType: 'none',
            padding: 0,
            margin: 0,
            textAlign: 'right',
          }}
        >
          <li>100 mNFT</li>
          <li>200 mNFT</li>
          <li>50 mNFT</li>
        </ul>
      </div>

      {/* Bottom Section */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '30%',
          width: '100%',
        }}
      >
        <p style={{ margin: '10px 0', fontSize: '1.2rem' }}>
          1 NFT = 1000 mNFT Erc20 Tokens
        </p>
        <select
          value={selectedCollection}
          onChange={handleCollectionChange}
          style={{
            margin: '10px 0',
            padding: '10px',
            borderRadius: '4px',
            border: '2px solid #6600CC',
            backgroundColor: '#351036',
            color: '#fff',
            width: '80%',
            outline: 'none',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          <option value="Collection 1">Collection 1</option>
          <option value="Collection 2">Collection 2</option>
          <option value="Collection 3">Collection 3</option>
        </select>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button
            style={{
              backgroundColor: '#6600CC',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '10px 20px',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Deposit Liquidity
          </button>
          <button
            style={{
              backgroundColor: '#6600CC',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '10px 20px',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Remove Liquidity
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountBalancesCard;
