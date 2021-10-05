import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';

import { IChain, IRPC_URLS } from './type';

const CHAINS = {
  LOCALHOST: 1337,
};

const RPC_URLS = {
  // [CHAINS.BSCMAIN]: process.env.REACT_APP_RPC_URL_BSCMAIN || '',
  // [CHAINS.RINKEBY]: process.env.REACT_APP_RPC_URL_BSCMAIN || '',
  [CHAINS.LOCALHOST]: process.env.REACT_APP_RPC_URL_LOCAL || '',
};

export const injected = new InjectedConnector({
  supportedChainIds: Object.values(CHAINS),
});

// export const network = new NetworkConnector({
//   urls: Object.fromEntries(Object.values(CHAINS).map(i => [i, RPC_URLS[i]])),
//   defaultChainId: CHAINS.RINKEBY,
// });

export const network = new NetworkConnector({
  urls: {
    1337: 'http://127.0.0.1:8545'
  }
});