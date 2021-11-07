import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
// import VEGA_CONTRACT_ABI from "../../../abis/erc20.json";
import POOL_CONTRACT_ABI from "../../abis/BoostPool.json";
import { getContractA, Chains } from "../../chain/eth.js";
import { statusPool } from "../../chain/StakeFunctions";
import { Table } from "react-bootstrap";
import { agetPrices } from "../../api/data";
import { BigNumber, ethers } from "ethers";

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

export function PoolInfo({ pool }) {
  const { account, library, chainId } = useWeb3React();
  console.log(`account`, library);

  const [loading, setLoading] = useState(false);

  const [startTime, setStartTime] = useState();
  const [startTimeF, setStartTimeF] = useState();
  const [endTime, setEndTime] = useState();
  const [endTimeF, setEndTimeF] = useState();
  const [totalAmountStaked, setTotalAmountStaked] = useState(0);
  const [reward, setReward] = useState();
  const [poolStatus, setPoolstatus] = useState();
  const [poolMaxStake, setMaxStake] = useState();
  const [poolYield, setMaxyield] = useState();
  const [rq, setRQ] = useState();

  async function loadData() {
    console.log("try load pool contract data " + pool.address);
    setLoading(true);

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
        x = x / 10 ** 18;
        setTotalAmountStaked(x.toString());
      });
      //TODP call current reward instead?
      let curentStep = 0;

      poolContract.callStatic.currentStep().then((x) => {
        //setReward(x.toString());
        curentStep = x;
        console.log("curentStep ? " + curentStep);

        poolContract.callStatic.rewardSteps(curentStep).then((x) => {
          let b = BigNumber.from(x);
          console.log(">>>>> rewardSteps " + b.toString());
          setReward(b);
        });
      });

      // poolContract.callStatic.currentReward().then((x) => {
      //   setReward(x.toString());
      // });
      poolContract.callStatic.maxYield().then((x) => {
        x = x / 10 ** 18;
        setMaxyield(x);
      });
      poolContract.callStatic.maxStake().then((x) => {
        x = x / 10 ** 18;
        setMaxStake(x);
        setLoading(false);
      });

      poolContract.callStatic.rewardQuote().then((x) => {
        console.log(">> RQ" + x.toNumber());
        setRQ(x.toNumber());
      });
    }
  }

  //TODO fix
  useEffect(() => {
    agetPrices();
  }, []);

  let poolContract;
  useEffect(() => {
    //poolContract = useContractA(pool.address, POOL_CONTRACT_ABI, true);
    console.log(">>> " + chainId);
    console.log(chainId === Chains.BSC_MAINNET.chainId);
    if (chainId === Chains.BSC_MAINNET.chainId) {
      try {
        setLoading(true);
        loadData();
        setLoading(false);
      } catch (error) {
        console.error("Failed to get contract", error);
        return null;
      }
    } else {
      console.log("not connected");
      //   setSupported(false);
    }
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
    ["Status", poolStatus],
    ["Description", pool.description],
    ["Current reward", reward / rq + " " + pool.per],
    ["Start time", startTimeF],
    ["End time", endTimeF],
    ["totalAmountStaked", totalAmountStaked + " " + pool.stakedUnit],
    ["Maximum total to stake", poolMaxStake + " " + pool.stakedUnit],
    ["Yield token to distribute", poolYield + " " + pool.yieldUnit],
    ["% staked", pstaked],
    //["Pool address", shortenAddress(pool.address)],
  ];

  //alert(chainId);

  if (loading) {
    return <>Loading</>;
    // if (supported) {
    // } else {
    //   return <>Chain not supported</>;
    // }
  } else {
    if (chainId !== Chains.BSC_MAINNET.chainId) {
      alert("login");
      return (
        <>
          <p>Not logged in</p>
        </>
      );
    } else {
      return (
        <>
          <Table className="mb-0" style={{ color: "white" }}>
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
}

{
  /* <tr key={2}>
              <th scope="row">Status</th>
              <td>{poolStatus}</td>
            </tr> */
}
