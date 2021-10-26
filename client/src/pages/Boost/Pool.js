import React, { useState, useEffect, useReducer } from "react";
import { useWeb3React } from "@web3-react/core";
// import VEGA_CONTRACT_ABI from "../../../abis/erc20.json";
import POOL_CONTRACT_ABI from "../../abis/BoostPool.json";
import { getContractA, Chains } from "../../chain/eth.js";
import { ethers } from "ethers";
import { Table } from "react-bootstrap";

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

  console.log(pool.address);
  console.log(POOL_CONTRACT_ABI);

  //TODO

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
      poolContract.callStatic.stakes(account).then((x) => {
        let z = ethers.utils.formatEther(x[1].toString());
        setTotalAmountStaked(z.toString());
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

  function addressLink(addr){    
    const link = `https://bscscan.com/address/${addr}`;
    return link;
  }

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
            <tr key={1}>
              <th scope="row">Pool name</th>
              <td> {pool === null ? "Error" : pool.poolName}</td>
            </tr>
            <tr key={1}>
              <th scope="row">Description</th>
              <td> {pool === null ? "Error" : pool.description}</td>
            </tr>
            {/* <tr key={2}>
              <th scope="row">Status</th>
              <td>{poolStatus}</td>
            </tr> */}
            <tr key={3}>
              <th scope="row">Current reward ({pool.per})</th>
              <td> {reward}</td>
            </tr>
            <tr key={4}>
              <th scope="row">Start time</th>
              <td> {startTimeF}</td>
            </tr>
            <tr key={5}>
              <th scope="row">End time</th>
              <td> {endTimeF}</td>
            </tr>
            <tr key={6}>
              <th scope="row">totalAmountStaked</th>
              <td> {totalAmountStaked}</td>
            </tr>

            <tr key={7}>
              <th scope="row">Max stake</th>
              <td>
                {" "}
                {poolMaxStake === null
                  ? "Error"
                  : poolMaxStake
                  ? `${poolMaxStake}`
                  : ""}
              </td>
            </tr>

            <tr key={8}>
              <th scope="row">Pool yield</th>
              <td>
                {" "}
                {poolYield === null ? "Error" : poolYield ? `${poolYield}` : ""}
              </td>
            </tr>

            <tr key={9}>
              <th scope="row">% staked</th>
              <td>
                {" "}
                {totalAmountStaked / poolMaxStake > -1
                  ? `${totalAmountStaked / poolMaxStake}%`
                  : ""}
              </td>
            </tr>

            <tr key={10}>
              <th scope="row">Pool address</th>
              <td>
                {" "}
                {
                  pool === null ? "Error" : 
                  <>
                  {shortenAddress(pool.address)}&nbsp;
                  <a target="_blank" href={addressLink(pool.address)}>
                  {/* {shortenAddress(pool.address)} */}
                  (Block explorer)
                  </a>
                  </>
                  
                  // ? `${pool.address.substring(0, 10)}`
                  // : ""
                }
              </td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  }
}

// export function PoolInfoSummary({ pool }) {
//   const { account, library, chainId } = useWeb3React();
//   console.log(`account`, library);

//   //CONTRACT_MAP["BoostPool"]

//   const vegaContract = useContract(VEGA_TOKEN_ADDRESS, VEGA_CONTRACT_ABI, true);

//   const [loading, setLoading] = useState(false);
//   const [supported, setSupported] = useState(false);

//   const [startTime, setStartTime] = useState();
//   const [endTime, setEndTime] = useState();
//   const [totalAmountStaked, setTotalAmountStaked] = useState(0);
//   const [reward, setReward] = useState();
//   const [poolStatus, setPoolstatus] = useState();
//   const [poolMaxStake, setMaxStake] = useState();
//   const [poolYield, setMaxyield] = useState();

//   console.log(pool.address);
//   console.log(POOL_CONTRACT_ABI);

//   //TODO

//   async function loadData() {
//     console.log("try load contract");

//     poolContract = getContractA(
//       account,
//       library,
//       pool.address,
//       POOL_CONTRACT_ABI
//     );
//     if (poolContract) {
//       poolContract.callStatic.startTime().then((x) => {
//         var formattedTime = timeConverter(x);
//         setStartTime(formattedTime);
//       });
//       poolContract.callStatic.endTime().then((x) => {
//         var formattedTime = timeConverter(x);
//         setEndTime(formattedTime);
//         let z = statusPool(startTime, x);
//         setPoolstatus(z);
//       });
//       poolContract.callStatic.stakes(account).then((x) => {
//         let z = ethers.utils.formatEther(x[1].toString());
//         setTotalAmountStaked(z.toString());
//       });
//       let rewardStep = 0;
//       poolContract.callStatic.rewardSteps(rewardStep).then((x) => {
//         setReward(x.toString());
//       });
//       poolContract.callStatic.maxYield().then((x) => {
//         x = x / 10 ** 18;
//         setMaxyield(x);
//       });
//       poolContract.callStatic.maxStake().then((x) => {
//         x = x / 10 ** 18;
//         setMaxStake(x);
//       });
//     }
//   }

//   let poolContract;
//   useEffect(() => {
//     //poolContract = useContractA(pool.address, POOL_CONTRACT_ABI, true);
//     console.log(chainId);
//     console.log(chainId === Chains.LOCAL_NET.chainId);
//     if (chainId === Chains.LOCAL_NET.chainId) {
//       try {
//         setLoading(true);
//         loadData();
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to get contract", error);
//         return null;
//       }
//     } else {
//       setSupported(false);
//     }
//   }, [account, library]);

//   if (loading) {
//     if (supported) {
//       return <>Loading</>;
//     } else {
//       return <>Chain not supported</>;
//     }
//   } else {
//     return (
//       <>

//         <Table className="mb-0">
//           <tbody>
//             <tr key={8}>
//               <th scope="row">Pool name</th>
//               <td>
//                 {" "}
//                 {
//                   pool === null ? "Error" : pool.poolName
//                   // ? `${pool.address.substring(0, 10)}`
//                   // : ""
//                 }
//               </td>
//               <td><button className={classNames("btn", "btn-sm", [`btn-primary`])}>
//                 Details
//       </button></td>
//             </tr>
//           </tbody>
//         </Table>
//       </>
//     );
//   }
// }
