// nftUtils.ts

import { JsonRpcProvider, Contract } from "ethers";

// Contract addresses
export const DEGEN_CONTRACT_ADDRESS = "0x0e342F41e1B96532207F1Ad6D991969f4b58e5a1";
export const DEGEN_NFT_BACKED_TOKEN_CONTRACT_ADDRESS = "0xb736fd496c15c7285a0e61d0ae24b6020d0da387";

export const GLITCH_CONTRACT_ADDRESS = "0x7cA094eB7E2e305135A0c49835e394b0daca8C56";
export const GLITCH_NFT_BACKED_TOKEN_CONTRACT_ADDRESS = "0x25fcaceB144227A341C2E621369346247EE7F902";

export const AKID_CONTRACT_ADDRESS = "0x2bEa2b6Bad866b5cA62117855D4b5D8A6C996Db2";
export const AKID_NFT_BACKED_TOKEN_CONTRACT_ADDRESS = "0x1eD327c0FAD66dB2258268D9841001853cD13Ff1";

// ABIs
export const NFT_ABI = [
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
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
];

export const TOKEN_CONTRACT_ABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
    ],
    name: "Redeem",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256[]", name: "tokenIds", type: "uint256[]" }],
    name: "swap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Provider setup
export const provider = new JsonRpcProvider("https://apechain.calderachain.xyz/http");

// IPFS gateway that supports CORS
const IPFS_GATEWAY = "https://nftstorage.link/ipfs/";

export const fetchPoolNFTs = async (): Promise<{ id: string; image: string }[]> => {
  try {
    const nftContract = new Contract(DEGEN_CONTRACT_ADDRESS, NFT_ABI, provider);
    const tokenContract = new Contract(DEGEN_NFT_BACKED_TOKEN_CONTRACT_ADDRESS, TOKEN_CONTRACT_ABI, provider);

    // Fetch Deposit events
    const depositFilter = tokenContract.filters.Deposit(null, null);
    const depositEvents = await tokenContract.queryFilter(depositFilter);

    // Fetch Redeem events
    const redeemFilter = tokenContract.filters.Redeem(null, null);
    const redeemEvents = await tokenContract.queryFilter(redeemFilter);

    // Build a set of token IDs currently in the pool
    const depositedTokenIds = new Set<string>();

    // Parse Deposit events to get token IDs
    for (const event of depositEvents) {
      const parsedEvent = tokenContract.interface.parseLog(event);
      if (parsedEvent) {
        const tokenIds = parsedEvent.args.tokenIds as bigint[];
        tokenIds.forEach((tokenId) => {
          depositedTokenIds.add(tokenId.toString());
        });
      } else {
        console.warn("Could not parse deposit event:", event);
      }
    }

    // Parse Redeem events to remove token IDs
    for (const event of redeemEvents) {
      const parsedEvent = tokenContract.interface.parseLog(event);
      if (parsedEvent) {
        const tokenIds = parsedEvent.args.tokenIds as bigint[];
        tokenIds.forEach((tokenId) => {
          depositedTokenIds.delete(tokenId.toString());
        });
      } else {
        console.warn("Could not parse redeem event:", event);
      }
    }

    const tokenIds = Array.from(depositedTokenIds);

    // Now fetch metadata for each token ID
    const nftData = await Promise.all(
      tokenIds.map(async (tokenId) => {
        try {
          let tokenURI = await nftContract.tokenURI(tokenId);

          // Replace 'ipfs://' with the CORS-enabled IPFS gateway
          if (tokenURI.startsWith("ipfs://")) {
            tokenURI = tokenURI.replace("ipfs://", IPFS_GATEWAY);
          }

          // Fetch the metadata
          const response = await fetch(tokenURI);
          if (!response.ok) {
            console.error(`Failed to fetch metadata for token ${tokenId}`);
            return null;
          }

          const metadata = await response.json();

          let imageUrl = metadata.image;

          // Replace 'ipfs://' in the image URL as well
          if (imageUrl.startsWith("ipfs://")) {
            imageUrl = imageUrl.replace("ipfs://", IPFS_GATEWAY);
          }

          return { id: tokenId.toString(), image: imageUrl };
        } catch (error) {
          console.error(`Error fetching metadata for token ${tokenId}`, error);
          return null;
        }
      })
    );

    // Filter out any null entries resulting from errors
    const nftDataFiltered = nftData.filter((nft) => nft !== null) as { id: string; image: string }[];

    console.log("Fetched NFT Data:", nftDataFiltered);
    return nftDataFiltered;
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return [];
  }
};
