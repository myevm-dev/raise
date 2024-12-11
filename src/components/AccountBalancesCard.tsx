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

const ERC20_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: 'balance', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    name: 'transfer',
    type: 'function',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' },
    ],
    outputs: [{ name: 'success', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
];

const ERC721_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function setApprovalForAll(address operator, bool approved) external',
  'function isApprovedForAll(address owner, address operator) view returns (bool)',
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
            mnftBalance: parseFloat(ethers.formatEther(mnftBalance)).toFixed(3), // Round to 3 decimal places
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

  const handleCollectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCollectionId(Number(event.target.value));
  };

  const handleTokenIdsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokenIds(event.target.value);
  };

  const handleWrap = async () => {
    const provider = getProvider();
    if (!provider) {
      alert('Ethereum provider not found');
      return;
    }

    try {
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        '0x82d22b3afFdc6b743916a10de096BF6E985fD6c7',
        [
          { name: 'deposit', type: 'function', inputs: [], outputs: [], stateMutability: 'payable' },
        ],
        signer
      );

      const tx = await contract.deposit({ value: ethers.parseEther('1') });
      await tx.wait();
      alert('Successfully wrapped APE to WAPE!');
    } catch (error) {
      console.error('Error during wrapping APE:', error);
      alert('Failed to wrap APE');
    }
  };

  const handlePay = async () => {
    const provider = getProvider();
    if (!provider) {
      alert('Ethereum provider not found');
      return;
    }

    try {
      const signer = await provider.getSigner();
      const wapeContractAddress = '0x82d22b3afFdc6b743916a10de096BF6E985fD6c7';
      const recipientAddress = '0x23b55E2E37A035578a3cE2122b81aAd1714ebaEf';

      const contract = new ethers.Contract(wapeContractAddress, ERC20_ABI, signer);

      const tx = await contract.transfer(recipientAddress, ethers.parseUnits('1', 18));
      await tx.wait();
      alert('Successfully paid 1 WAPE!');
    } catch (error) {
      console.error('Error during WAPE transfer:', error);
      alert('Failed to pay WAPE. Ensure you have enough balance.');
    }
  };

  return (
    <div className="account-balances-card">
      <div className="sparkle-button">
        <h2>Daily Check-In: Pay 1 APE</h2>
        <h5 style={{ color: 'grey', fontWeight: 'normal' }}>Check-ins are recorded on-chain. <br /> Funds will support liquidity and play a critical role in allocations at TGE.</h5>
        <div className="button-container" style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={handleWrap} style={{ width: '50%' }}>Wrap 1 APE</button>
          <button onClick={handlePay} style={{ width: '50%' }}>Pay 1 WAPE</button>
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
              {collection.name}</option>
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
          <button className="action-button" disabled>
            Deposit Liquidity
          </button>
          <button className="action-button" disabled>
            Remove Liquidity
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountBalancesCard;
