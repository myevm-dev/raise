import { JsonRpcProvider, Contract, Wallet } from "ethers";

// Contract addresses
export const NFT_CONTRACT_ADDRESS = "0x0e342F41e1B96532207F1Ad6D991969f4b58e5a1";
export const NFT_BACKED_TOKEN_CONTRACT_ADDRESS = "0xb736fd496c15c7285a0e61d0ae24b6020d0da387";

// ABIs
const NFT_ABI = [
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

const TOKEN_CONTRACT_ABI = [
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

// Fetch NFTs from the pool contract
export const fetchPoolNFTs = async (): Promise<{ id: string; image: string }[]> => {
  const contract = new Contract(NFT_CONTRACT_ADDRESS, NFT_ABI, provider);
  const tokenIds: number[] = await contract.getNFTs(); // Assume this function exists in the pool contract

  const nftData = await Promise.all(
    tokenIds.map(async (tokenId) => {
      const tokenURI = await contract.tokenURI(tokenId);
      const response = await fetch(tokenURI);
      const metadata = await response.json();
      return { id: tokenId.toString(), image: metadata.image };
    })
  );

  return nftData;
};

// Set approval for the NFT-backed token contract
export const setApprovalForAll = async (signer: Wallet) => {
  try {
    const nftContract = new Contract(NFT_CONTRACT_ADDRESS, NFT_ABI, signer);

    // Check approval status
    const ownerAddress = await signer.getAddress();
    const isApproved = await nftContract.isApprovedForAll(ownerAddress, NFT_BACKED_TOKEN_CONTRACT_ADDRESS);

    if (!isApproved) {
      const tx = await nftContract.setApprovalForAll(NFT_BACKED_TOKEN_CONTRACT_ADDRESS, true);
      await tx.wait();
      console.log("Approval set successfully.");
    } else {
      console.log("Approval already set.");
    }
  } catch (error) {
    console.error("Error setting approval:", error);
  }
};

// Swap NFTs
export const swapNFTs = async (signer: Wallet, tokenIds: number[]) => {
  try {
    const tokenContract = new Contract(NFT_BACKED_TOKEN_CONTRACT_ADDRESS, TOKEN_CONTRACT_ABI, signer);

    const tx = await tokenContract.swap(tokenIds);
    await tx.wait();
    console.log("NFTs swapped successfully.");
  } catch (error) {
    console.error("Error swapping NFTs:", error);
  }
};
