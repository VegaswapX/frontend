import React from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import VEGA_CONTRACT_ABI from "../../abis/erc20.json";
import { useContract } from "../../chain/eth.js";
import {
  VEGA_TOKEN_ADDRESS,
  LP_TOKEN_ADDRESS,
  BSC_USDT,
} from "../../chain/Contracts.js";
import { formatEther } from "@ethersproject/units";
import BalanceInfo from "../BalanceInfo";

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

  console.log(">> " + chainId + " " + VEGA_TOKEN_ADDRESS);

  const vegaContract = useContract(VEGA_TOKEN_ADDRESS, VEGA_CONTRACT_ABI, true);
  //const vegaContract = useContract(contractMap[chainId]["VEGA_TOKEN"], VEGA_CONTRACT_ABI, true);

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

      <>
        <BalanceInfo
          description="Campaign Sent"
          title="VGA"
          stats={Math.round(vgabal)}
          bimg={
            "https://assets.coingecko.com/coins/images/18397/small/big_logo.png?1631769696"
          }
          // trend={{ textClass: 'text-success', icon: 'mdi mdi-arrow-up-bold', value: '3.27%' }}
          colors={["#0acf97"]}
          data={[25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]}
        ></BalanceInfo>

        {/* <span>VGA Balance</span>
      
      <span style={{fontSize: "10pt"}}>{vgabal === null ? "Error" : vgabal ? `${vgabal}` : ""}</span> 
      */}
      </>
    </>
  );
}

export function Lpbalance() {
  const { account, library, chainId } = useWeb3React();

  // console.log(">> " + chainId + " " + contractMap[chainId]["VEGA_TOKEN"]);
  //CONTRACT_MAP["BoostPool"]

  const vegaContract = useContract(LP_TOKEN_ADDRESS, VEGA_CONTRACT_ABI, true);
  //const vegaContract = useContract(contractMap[chainId]["VEGA_TOKEN"], VEGA_CONTRACT_ABI, true);

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

      <>
        <BalanceInfo
          description="Campaign Sent"
          title="LP token"
          stats={Math.round(vgabal)}
          bimg={
            "https://assets.coingecko.com/coins/images/18397/small/big_logo.png?1631769696"
          }
          // trend={{ textClass: 'text-success', icon: 'mdi mdi-arrow-up-bold', value: '3.27%' }}
          colors={["#0acf97"]}
          data={[25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]}
        ></BalanceInfo>
      </>
    </>
  );
}

export function BNBBalance() {
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
      <BalanceInfo
        description="Campaign Sent"
        title="BNB"
        stats={Math.round(balance * 10) / 10}
        bimg={
          "https://assets.coingecko.com/coins/images/825/thumb_2x/binance-coin-logo.png?1547034615"
        }
        // trend={{ textClass: 'text-success', icon: 'mdi mdi-arrow-up-bold', value: '3.27%' }}
        colors={["#727cf5"]}
        data={[25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]}
      ></BalanceInfo>
    </>
  );
}

export function USDTBalance() {
  const { account, library, chainId } = useWeb3React();

  const [balance, setBalance] = React.useState();

  const usdtontract = useContract(BSC_USDT, VEGA_CONTRACT_ABI, true);

  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false;

      usdtontract.callStatic
        .balanceOf(account)
        .then((x) => {
          if (!stale) {
            //   let z = ethers.utils.formatEther(x);
            x = x / 10 ** 18;
            setBalance(x);
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
  }, [account, library, chainId, usdtontract]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <>
      <BalanceInfo
        description="Campaign Sent"
        title="USDT"
        stats={Math.round(balance * 10) / 10}
        bimg={
          "https://assets.coingecko.com/coins/images/325/small/Tether-logo.png?1598003707"
        }
        colors={["#727cf5"]}
        data={[12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14]}
      ></BalanceInfo>
    </>
  );
}
