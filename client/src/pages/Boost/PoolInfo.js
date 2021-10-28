import React, { useState, useEffect, useReducer } from "react";
import { useWeb3React } from "@web3-react/core";
// import VEGA_CONTRACT_ABI from "../../../abis/erc20.json";
import POOL_CONTRACT_ABI from "../../abis/BoostPool.json";
import { getContractA } from "../../chain/eth.js";
import { ethers } from "ethers";
import { Table } from "react-bootstrap";
import { Chains } from "../../chain/constant";

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}

function statusPool(startTime, endTime) {
  let n = Date.now() / 1000;
  let isopen = n > startTime;
  console.log(">> statusPool: " + isopen + " " + startTime + " N: " + n);

  if (isopen) {
    return "open";
  } else {
    return "not open";
  }
}

export function PoolInfo({ pool }) {
  const { account, library, chainId } = useWeb3React();
  console.log(`account`, library);

  const [loading, setLoading] = useState(false);
  const [supported, setSupported] = useState(false);

  const [startTime, setStartTime] = useState();
  const [startTimeF, setStartTimeF] = useState();
  const [endTime, setEndTime] = useState();
  const [endTimeF, setEndTimeF] = useState();
  const [totalAmountStaked, setTotalAmountStaked] = useState(0);
  const [reward, setReward] = useState();
  const [poolStatus, setPoolstatus] = useState();
  const [poolMaxStake, setMaxStake] = useState();
  const [poolYield, setMaxyield] = useState();

  async function loadData() {
    console.log("try load pool contract data " + pool.address);

    poolContract = getContractA(
      account,
      library,
      pool.address,
      POOL_CONTRACT_ABI
    );
    if (poolContract) {
      poolContract.callStatic.startTime().then((x) => {
        var formattedTime = timeConverter(x);
        setStartTime(x);
        setStartTimeF(formattedTime);
      });
      poolContract.callStatic.endTime().then((x) => {
        var formattedTime = timeConverter(x);
        setEndTime(x);
        setEndTimeF(formattedTime);
        let z = statusPool(startTime, endTime);
        setPoolstatus(z);
      });
      poolContract.callStatic.totalAmountStaked().then((x) => {
        //let z = ethers.utils.formatEther(x[1].toString());
        console.log(">>> " + x);
        x  = x/10**18;
        setTotalAmountStaked(x.toString());
      });
      let rewardStep = 0;
      poolContract.callStatic.rewardSteps(rewardStep).then((x) => {
        setReward(x.toString());
      });
      poolContract.callStatic.maxYield().then((x) => {
        x = x / 10 ** 18;
        setMaxyield(x);
      });
      poolContract.callStatic.maxStake().then((x) => {
        x = x / 10 ** 18;
        setMaxStake(x);
      });
    }
  }

  let poolContract;
  useEffect(() => {
    //poolContract = useContractA(pool.address, POOL_CONTRACT_ABI, true);
    console.log(chainId);
    console.log(chainId === Chains.BSC_MAINNET.chainId);
    //if (chainId === Chains.BSC_MAINNET.chainId) {
    try {
      setLoading(true);
      loadData();
      setLoading(false);
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
    // } else {
    //   setSupported(false);
    // }
  }, [account, library]);

  function shortenAddress(addr) {
    let l = addr.length;
    return addr.substring(0, 5) + "..." + addr.substring(l - 3, l);
  }

  function addressLink(addr) {
    const link = `https://bscscan.com/address/${addr}`;
    return link;
  }

  let pstaked = Math.round(100 * (totalAmountStaked / poolMaxStake));

  let data = [
    ["Name", pool.poolName],
    ["Description", pool.description],
    ["Current reward", reward + " " + pool.per],
    ["Start time", startTimeF],
    ["End time", endTimeF],
    ["totalAmountStaked", totalAmountStaked],
    ["Max stake", poolMaxStake],
    ["Pool yield", poolYield],
    ["% staked", pstaked],
    //["Pool address", shortenAddress(pool.address)],
  ];

  if (loading) {
    if (supported) {
      return <>Loading</>;
    } else {
      return <>Chain not supported</>;
    }
  } else {
    return (
      <>
        <Table className="mb-0">
          <tbody>
            {data.map((row) => {
              return (
                <tr>
                  <td scope="row">{row[0]}</td>
                  <td> {row[1]}</td>
                </tr>
              );
            })}
            <tr>
              <td>Pool address</td>
              <td>
                <a target="_blank" href={addressLink(pool.address)}>
                  {shortenAddress(pool.address)}
                </a>
              </td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  }
}

{
  /* <tr key={2}>
              <th scope="row">Status</th>
              <td>{poolStatus}</td>
            </tr> */
}
