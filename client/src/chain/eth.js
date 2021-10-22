import { useState, useEffect, useMemo } from "react";
import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";

export const BSC_MAINNET = 56;
export const BSC_TESTNET = 97;
export const LOCAL_NET = 1337;
// ETH_MAINNET: 1,
// ETH_ROPSTEN: 3,
// ETH_RINKEBY: 4,
// ETH_KOVAN: 42,
export const supportedChains = [BSC_MAINNET, BSC_TESTNET, LOCAL_NET];

// const TESTNET="https://data-seed-prebsc-1-s1.binance.org:8545"

const LOCALNET_URL = 'http://127.0.0.1:8545';
const BSCMAIN_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545';

export const network = new NetworkConnector({  
  urls: {
    1337: LOCALNET_URL,
    97: BSCMAIN_URL
  },
  defaultChainId: LOCAL_NET,
});

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
  // console.log("useContract " + address);
  const { account, library } = useWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library) {
      console.log("cant load contract");
      console.log("address " + address);
      console.log("library " + library);
      return null;
    }

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

const useEagerConnect = () => {
  console.log("useEagerConnect");
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  function onError(error) {
    console.log("error ");
  }

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        console.log("activate");
        activate(injected, onError, true).catch(() => {
          setTried(true);
        });
      } else {
        console.log("tried activate");
        setTried(true);
      }
    });
  }, [activate]); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
};

export const injected = new InjectedConnector({
  supportedChainIds: supportedChains,
});

export const getEthereum = async () => {
  // event listener is not reliable
  while (document.readyState !== "complete") {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return window.ethereum;
};

const useInactiveListener = (suppress = false) => {
  const { active, error, activate } = useWeb3React();

  useEffect(() => {
    const { ethereum } = window;
    if (error) {
      console.log("> error " + error);
    }
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log("Handling 'connect' event");
        activate(injected);
      };
      const handleChainChanged = (chainId) => {
        console.log("Handling 'chainChanged' event with payload", chainId);
        if (chainId in supportedChains) {
          activate(injected);
        } else {
          alert("chain not supported");
        }
      };
      const handleAccountsChanged = (accounts) => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) {
          activate(injected);
        }
      };

      ethereum.on("connect", handleConnect);
      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("connect", handleConnect);
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
        }
      };
    }
  }, [active, error, suppress, activate]);
};

export function Web3ConnectionManager({ children }) {
  const context = useWeb3React();
  const { connector, activate, active } = context;

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  //network?
  useEffect(() => {
    if (triedEager && !active) {
      activate(network);
    }
  }, [triedEager, active, connector, activate]);

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);

  return children;
}

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export function WrappedWeb3ReactProvider({ children }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
  );
}

// Array of available nodes to connect to

// const POLLING_INTERVAL = 12000;
// const RPC_URLS = {
//   BSC_MAINNET: 
// };

// export const network = new NetworkConnector({
//   urls: Object.fromEntries(
//     Object.values<number>(CHAINS).map(i => [i, RPC_URLS[i]])
//   ),
//   defaultChainId: CHAINS.MAINNET,
//   pollingInterval: POLLING_INTERVAL,
// });



// const RPC_URLS = {
//   CHAINS.BSCTESTNET
// };

// export const network = new NetworkConnector({
//   urls: Object.fromEntries(Object.values(CHAINS).map(i => [i, RPC_URLS[i]])),
//   defaultChainId: CHAINS.RINKEBY,
// });

// export const network = new NetworkConnector({
//   urls: Object.fromEntries(Object.values(CHAINS).map(i => [i, RPC_URLS[i]])),
//   defaultChainId: CHAINS.BSCTESTNET
// });
