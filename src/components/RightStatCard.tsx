import React, { useState } from 'react';
import { ethers } from 'ethers';

const RightStatCard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<string>('');

  const handleWrap = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed or unavailable.');
      return;
    }

    try {
      setLoading(true);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        '0x82d22b3afFdc6b743916a10de096BF6E985fD6c7',
        [
          { name: 'deposit', type: 'function', inputs: [], outputs: [], stateMutability: 'payable' },
        ],
        signer
      );

      const tx = await contract.deposit({ value: ethers.parseEther(amount) });
      await tx.wait();

      alert('Wrapped successfully!');
    } catch (error) {
      const err = error as Error; // Type assertion
      console.error('Error wrapping:', err);
      alert(`Failed to wrap: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUnwrap = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed or unavailable.');
      return;
    }

    try {
      setLoading(true);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        '0x82d22b3afFdc6b743916a10de096BF6E985fD6c7',
        [
          {
            name: 'withdraw',
            type: 'function',
            inputs: [{ name: 'amount', type: 'uint256' }],
            outputs: [],
            stateMutability: 'nonpayable',
          },
        ],
        signer
      );

      const tx = await contract.withdraw(ethers.parseEther(amount));
      await tx.wait();

      alert('Unwrapped successfully!');
    } catch (error) {
      const err = error as Error; // Type assertion
      console.error('Error unwrapping:', err);
      alert(`Failed to unwrap: ${err.message}`);
    } finally {
      setLoading(false);
    }
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
        alignItems: 'center',
        gap: '10px',
        transition: 'border-color 0.3s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#5200A3')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#6600CC')}
    >
      <input
        type="text"
        placeholder="Enter amount (in APE)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{
          padding: '5px',
          borderRadius: '4px',
          border: '1px solid #6600CC',
          marginBottom: '2px',
          width: '200px',
          backgroundColor: '#121212',
          color: '#fff',
          fontSize: '1rem',
          textAlign: 'center',
        }}
      />
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={handleWrap}
          style={{
            width: '110px', // Set equal width for both buttons
            padding: '10px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#6600CC',
            color: '#fff',
            cursor: 'pointer',
          }}
          disabled={loading}
        >
          {loading ? 'Wrapping...' : 'Wrap APE'}
        </button>
        <button
          onClick={handleUnwrap}
          style={{
            width: '110px', // Set equal width for both buttons
            padding: '10px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#6600CC',
            color: '#fff',
            cursor: 'pointer',
          }}
          disabled={loading}
        >
          {loading ? 'Unwrapping...' : 'Unwrap APE'}
        </button>
      </div>
      <img
        src="/lootbox.png"
        alt="Lootbox"
        style={{
          marginTop: '-25px',
          width: '180px',
          height: '180px',
          objectFit: 'cover',
        }}
      />
      <button
        style={{
          marginTop: '-30px',
          padding: '10px 40px',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: '#6600CC',
          color: '#fff',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
        disabled
      >
        Soon Buy Lootbox
      </button>
    </div>
  );
};

export default RightStatCard;
