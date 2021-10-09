import React from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import VEGA_CONTRACT_ABI from "../../abis/erc20.json";
import { useContract } from "../../web3/eth.js";
import { VEGA_TOKEN_ADDRESS } from "../../Constant/Contracts.js";
import { formatEther } from "@ethersproject/units";

export const formatCurrency = (balance) => {
  return balance ? formatEther(balance) : "0";

  //   if(currency === TCurrency.ETHER) {
  //     return balance ? formatEther(balance) : '0';
  //   }
  //   if(currency === TCurrency.WEI) {
  //     return balance ? balance.toString() : '0';
  //   }
  //   return balance ? formatEther(balance) : '0';
};

export function Vgabalance() {
  const { account, library, chainId } = useWeb3React();

  //CONTRACT_MAP["BoostPool"]
  //contractMap[chainId]["VEGA_TOKEN"],
  const vegaContract = useContract(VEGA_TOKEN_ADDRESS, VEGA_CONTRACT_ABI, true);

  // const [loading, setLoading] = useState(false);

  const [vgabal, setVgaBalance] = React.useState();

  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false;

      vegaContract.callStatic
        .balanceOf(account)
        .then((x) => {
          if (!stale) {
            //   let z = ethers.utils.formatEther(x);
            x = x / 10 ** 18;
            setVgaBalance(x);
          }
        })
        .catch(() => {
          if (!stale) {
            setVgaBalance(null);
          }
        });

      return () => {
        stale = true;
        setVgaBalance(undefined);
      };
    }
  }, [account, library, chainId, vegaContract]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <>
      {/* <span>VGA Balance {vgabalance}</span> */}
      <span>
        VGA balance: {vgabal === null ? "Error" : vgabal ? `${vgabal}` : ""}
      </span>
    </>
  );
}

export function Balance() {
  const { account, library, chainId } = useWeb3React();

  const [balance, setBalance] = React.useState();
  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false;

      library
        .getBalance(account)
        .then((balance) => {
          if (!stale) {
            let z = ethers.utils.formatEther(balance);
            setBalance(z);
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null);
          }
        });

      return () => {
        stale = true;
        setBalance(undefined);
      };
    }
  }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <>
      <span>BNB Balance</span>
      <span role="img" aria-label="gold">
        {/* <img 
        src="https://assets.coingecko.com/coins/images/325/small/Tether-logo.png?1598003707"
        alt="new"
        /> */}
        <img
          src="https://assets.coingecko.com/coins/images/825/thumb_2x/binance-coin-logo.png?1547034615"
          alt="new"
        />
      </span>

      {/* <span>{balance === null ? 'Error' : balance ? `${formatEther(balance)}` : ''}</span> */}
      <span>{balance === null ? "Error" : balance ? `${balance}` : ""}</span>
    </>
  );
}
