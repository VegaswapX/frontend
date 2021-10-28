import { React, useState, useEffect } from "react";
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

const BNB_IMG =
  "https://assets.coingecko.com/coins/images/825/thumb_2x/binance-coin-logo.png?1547034615";
const VGA_IMG =
  "https://assets.coingecko.com/coins/images/18397/small/big_logo.png?1631769696";
const USDT_IMG =
  "https://assets.coingecko.com/coins/images/325/small/Tether-logo.png?1598003707";

export const formatCurrency = (balance) => {
  return balance ? formatEther(balance) : "0.01";

  //   if(currency === TCurrency.ETHER) {
  //     return balance ? formatEther(balance) : '0';
  //   }
  //   if(currency === TCurrency.WEI) {
  //     return balance ? balance.toString() : '0';
  //   }
  //   return balance ? formatEther(balance) : '0';
};

function BalanceInfo1({ bal, imgsrc, title }) {
  return (
    <>
      <BalanceInfo
        description=""
        title={title}
        stats={bal}
        bimg={imgsrc}
        colors={["#0acf97"]}
        data={[25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]}
      ></BalanceInfo>
    </>
  );
}

function BalanceInfo2({ bal, imgsrc, title }) {
  return (
    <>
      <BalanceInfo
        description=""
        title={title}
        stats={bal}
        bimg={imgsrc}
        colors={["#727cf5"]}
        data={[12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14]}
      ></BalanceInfo>
    </>
  );
}

export function Vgabalance() {
  const { account, library, chainId } = useWeb3React();

  const vegaContract = useContract(VEGA_TOKEN_ADDRESS, VEGA_CONTRACT_ABI, true);

  const [bal, setBalance] = useState();

  useEffect(() => {
    if (!!account && !!library) {
      let stale = false;

      vegaContract.callStatic
        .balanceOf(account)
        .then((x) => {
          if (!stale) {
            x = x / 10 ** 18;
            x = Math.round(x * 100) / 100;
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
  }, [account, library, chainId, vegaContract]);

  return (
    <>
      <BalanceInfo2 imgsrc={VGA_IMG} bal={bal} title="VGA" />
    </>
  );
}

export function Lpbalance() {
  const { account, library, chainId } = useWeb3React();
  const vegaContract = useContract(LP_TOKEN_ADDRESS, VEGA_CONTRACT_ABI, true);

  const [bal, setBalance] = useState();

  useEffect(() => {
    if (!!account && !!library) {
      let stale = false;

      vegaContract.callStatic
        .balanceOf(account)
        .then((x) => {
          if (!stale) {
            x = x / 10 ** 18;
            x = Math.round(x * 100) / 100;
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
  }, [account, library, chainId, vegaContract]);

  return (
    <BalanceInfo1
      imgsrc={
        "https://assets.coingecko.com/coins/images/18397/small/big_logo.png?1631769696"
      }
      bal={bal}
      title="LP token"
    />
  );
}

export function BNBBalance() {
  const { account, library, chainId } = useWeb3React();

  const [bal, setBalance] = useState();
  useEffect(() => {
    if (!!account && !!library) {
      let stale = false;

      library
        .getBalance(account)
        .then((balance) => {
          if (!stale) {
            let z = ethers.utils.formatEther(balance);
            z = Math.round(z * 100) / 100;
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
      <BalanceInfo1 bal={bal} imgsrc={BNB_IMG} title="BNB" />
    </>
  );
}

export function USDTBalance() {
  const { account, library, chainId } = useWeb3React();

  const [bal, setBalance] = useState();

  const usdtontract = useContract(BSC_USDT, VEGA_CONTRACT_ABI, true);

  useEffect(() => {
    if (!!account && !!library) {
      usdtontract.callStatic.balanceOf(account).then((x) => {
        x = x / 10 ** 18;
        x = Math.round(x * 100) / 100;
        setBalance(x);
      });
    }
  }, [account, library, chainId, usdtontract]);

  return (
    <>
      <BalanceInfo1 imgsrc={USDT_IMG} bal={bal} title="USDT" />
    </>
  );
}
