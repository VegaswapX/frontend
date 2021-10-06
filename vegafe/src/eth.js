import Web3 from "web3";
import { useMemo } from "react";
import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

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

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 1337],
});

// https://assets.coingecko.com/coins/images/18397/small/big_logo.png?1631769696

export const getEthereum = async () => {
  // event listener is not reliable
  while (document.readyState !== "complete") {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return window.ethereum;
};

//TODO remove?
export const getWeb3 = async () => {
  const ethereum = await getEthereum();
  let web3;

  if (ethereum) {
    web3 = new Web3(ethereum);
  } else if (window.web3) {
    web3 = window.web3;
  } else {
    //TODO
    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
    web3 = new Web3(provider);
  }

  return web3;
};
