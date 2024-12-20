import React, { useState } from 'react';

const StakeCard: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>('ApeUSD');
  const [amount, setAmount] = useState<string>('');
  const [selectedToken, setSelectedToken] = useState<string>('mDegen'); // Default selected token

  const handleCurrencyToggle = (currency: string) => {
    setSelectedCurrency(currency);
  };

  const handleTokenToggle = (token: string) => {
    setSelectedToken(token);
  };

  return (
    <div
      style={{
        backgroundColor: '#1c1f26',
        color: '#fff',
        border: '2px solid #6600CC',
        borderRadius: '8px',
        padding: '5px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        alignItems: 'center',
        transition: 'border-color 0.3s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#5200A3')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#6600CC')}
    >
      {/* Title */}
      <p style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0' }}>Stake</p>

      {/* Toggle Buttons for ApeUSD, APE, ApeETH */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {['ApeUSD', 'WAPE', 'ApeETH'].map((currency) => (
          <button
            key={currency}
            onClick={() => handleCurrencyToggle(currency)}
            style={{
              padding: '6px 20px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: selectedCurrency === currency ? '#6600CC' : '#3a3d45',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease',
            }}
          >
            {currency}
          </button>
        ))}
      </div>

      {/* "Get" Text */}
      <p style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0' }}>Get</p>

      {/* Centered mDegen Button */}
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <button
          onClick={() => handleTokenToggle('mDegen')}
          style={{
            padding: '5px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: selectedToken === 'mDegen' ? '#6600CC' : '#3a3d45',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
          }}
        >
          mDegen
        </button>
      </div>

      {/* Amount Input Box */}
      <input
        type="text"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{
          padding: '6px',
          borderRadius: '4px',
          border: '1px solid #6600CC',
          width: '220px',
          backgroundColor: '#121212',
          color: '#fff',
          fontSize: '1rem',
          textAlign: 'center',
        }}
      />

      {/* Stake and Unstake Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <button
          style={{
            width: '120px', // Ensures equal width for both buttons
            padding: '6px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#6600CC',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Stake
        </button>
        <button
          style={{
            width: '120px', // Ensures equal width for both buttons
            padding: '6px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#6600CC',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Unstake
        </button>
      </div>

      {/* Amount Earned */}
      <p
        style={{
          fontSize: '1rem',
          fontWeight: 'bold',
          margin: '10px 0 0 0',
          color: '#fff',
        }}
      >
        Amount Earned: <span style={{ color: '#6600CC' }}>Coming Soon</span>
      </p>
    </div>
  );
};

export default StakeCard;
