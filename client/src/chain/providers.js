import { ethers } from "ethers";

export const nodes = [
  "https://bsc-dataseed1.ninicoin.io",
  "https://bsc-dataseed1.defibit.io",
  "https://bsc-dataseed.binance.org",
];

const getRandomIndex = () => {
  const lower = 0;
  const upper = nodes.length - 1;
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getNodeUrl = () => {
  const randomIndex = getRandomIndex();
  return nodes[randomIndex];
};

export const RPC_URL = getNodeUrl();

const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL);

export default simpleRpcProvider;
