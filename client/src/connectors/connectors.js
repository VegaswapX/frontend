import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";

const CHAINS = {
  BSCTESTNET: 97
};

const TESTNET="https://data-seed-prebsc-1-s1.binance.org:8545"

const RPC_URLS = {
  // [CHAINS.BSCTESTNET]: process.env.REACT_APP_RPC_URL_LOCAL || "",
  [CHAINS.BSCTESTNET]: TESTNET || "",
};

// export const injected = new InjectedConnector({
//   supportedChainIds: Object.values(CHAINS),
// });

export const injected = new InjectedConnector({ supportedChainIds: [1337] });

// export const network = new NetworkConnector({
//   urls: Object.fromEntries(Object.values(CHAINS).map(i => [i, RPC_URLS[i]])),
//   defaultChainId: CHAINS.RINKEBY,
// });

// export const network = new NetworkConnector({
//   urls: Object.fromEntries(Object.values(CHAINS).map(i => [i, RPC_URLS[i]])),
//   defaultChainId: CHAINS.BSCTESTNET
// });

export const network = new NetworkConnector({
  urls: {
    1337: 'http://127.0.0.1:8545',
  },
  defaultChainId: 1,
});
