import { NetworkConnector } from "@web3-react/network-connector";
import { useMemo } from "react";
import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
// import { NetworkConnector } from "@web3-react/network-connector";

export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(address, ABI, library, account) {
  // if (!isAddress(address) || address === AddressZero) {
  //   throw Error(`Invalid 'address' parameter '${address}'.`);
  // }
  return new Contract(address, ABI, getProviderOrSigner(library, account));
}

export const useContract = (address, ABI, withSignerIfPossible = true) => {
  const { account, library } = useWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
};

const BSC_MAINNET = 56;
const BSC_TESTNET = 97;
const LCOAL_NET = 1337
export const injected = new InjectedConnector({
  supportedChainIds: [BSC_MAINNET, BSC_TESTNET, LCOAL_NET],  
});

export const getEthereum = async () => {
  // event listener is not reliable
  while (document.readyState !== "complete") {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return window.ethereum;
};




// const CHAINS = {
//   BSCTESTNET: 97
// };

// const TESTNET="https://data-seed-prebsc-1-s1.binance.org:8545"

// const RPC_URLS = {
//   // [CHAINS.BSCTESTNET]: process.env.REACT_APP_RPC_URL_LOCAL || "",
//   [CHAINS.BSCTESTNET]: TESTNET || "",
// };

// export const injected = new InjectedConnector({
//   supportedChainIds: Object.values(CHAINS),
// });

// export const injected = new InjectedConnector({ supportedChainIds: [1337] });

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

