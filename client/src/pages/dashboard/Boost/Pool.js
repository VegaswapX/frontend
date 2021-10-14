import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
// import VEGA_CONTRACT_ABI from "../../../abis/erc20.json";
import POOL_CONTRACT_ABI from "../../../abis/BoostPool.json";
import { POOL_TOKEN_ADDRESS } from "../../../chain/Contracts.js";
import { useContract } from "../../../chain/eth.js";

import {ListGroup} from "react-bootstrap";
import { Table } from 'react-bootstrap';

// import { ethers } from "ethers";
// import { formatEther } from "@ethersproject/units";

// const chainId = 1137;
// const records = [
//     { id: 1, username: '@mdo' },
//     { id: 2, username: '@fat' }
// ];

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

function statusPool(startTime, endTime){
  let n = Date.now() /1000;
  let status = n > startTime;
  console.log(">> " + status);
  
  if (status) {
    return "open";
  }
}

export function PoolInfo() {
  const { account, library } = useWeb3React();

  //CONTRACT_MAP["BoostPool"]
  // const vegaContract = useContract(VEGA_TOKEN_ADDRESS, VEGA_CONTRACT_ABI, true);

  const poolContract = useContract(POOL_TOKEN_ADDRESS, POOL_CONTRACT_ABI, true);

  // const [loading, setLoading] = useState(false);

  // const [poolStaked, setPoolstaked] = React.useState();
  const [poolMaxStake, setMaxStake] = useState();
  const [poolYield, setMaxyield] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [totalAmountStaked, setTotalAmountStaked] = useState(0);
  const [reward, setReward] = useState();
  const [poolStatus, setPoolstatus] = useState();
  let startTimex;

  useEffect(() => {
      let stale = false;
      async function getMaxYield() {
          if (!!account && !!library) {
              try {
                  let x = await poolContract.callStatic.maxYield()
                  if (!stale) {
                      x = x / 10 ** 18;
                      setMaxyield(x);
                  }
              } catch (e) {
                  console.log(e)
                  if (!stale) {
                      setMaxyield(null);
                  }
              }
          }
      }

      getMaxYield()
    if (!!account && !!library) {
        setMaxyield(undefined);
    }
  }, [account, library, poolContract]); 
  

  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false;

      poolContract.callStatic
        .startTime()
        .then((x) => {
          if (!stale) {            
            // var formattedTime = timeConverter(x);
            // startTimex = x;
            setStartTime(x);
          }
        })
        .catch(() => {
          if (!stale) {
            setStartTime(null);
          }
        });

      return () => {
        stale = true;
        setStartTime(undefined);
      };
    }
  }, [account, library, poolContract]);

  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false;
      poolContract.callStatic
        .stakes(account)
        .then((x) => {
          if (!stale) {
            // setTotalAmountStaked(x/10**18);
            // setTotalAmountStaked(x/10**18);
            setTotalAmountStaked(x[1]/10**18);
          }
        })
        .catch((e) => {
            console.log(e)
          if (!stale) {
            setTotalAmountStaked(null);
          }
        });

      return () => {
        stale = true;
        setTotalAmountStaked(undefined);
      };
    }
  }, [account, library, poolContract]); 

  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false;

      poolContract.callStatic
        .maxStake()
        .then((x) => {
          if (!stale) {
            setMaxStake(x/10**18);
          }
        })
        .catch(() => {
          if (!stale) {
            setMaxStake(null);
          }
        });

      return () => {
        stale = true;
        setMaxStake(undefined);
      };
    }
  }, [account, library, poolContract]); 

  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false;

      poolContract.callStatic
        .endTime()
        .then((x) => {
          if (!stale) {
            var formattedTime = timeConverter(x);
            setEndTime(formattedTime);
            let z = statusPool(startTimex, x);         
            setPoolstatus(z)
          }
        })
        .catch(() => {
          if (!stale) {
            setEndTime(null);
          }
        });

      return () => {
        stale = true;
        setEndTime(undefined);
      };
    }
  }, [account, library, poolContract, startTimex]); 

  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false;

      poolContract.callStatic
        .rewardSteps(0)
        .then((x) => {
          if (!stale) {
            setReward(x);
          }
        })
        .catch(() => {
          if (!stale) {
            setReward(null);
          }
        });

      return () => {
        stale = true;
        setReward(undefined);
      };
    }
  }, [account, library, poolContract]); 


  return (
    <>
    <Table className="mb-0" striped>
        {/* <thead>
            <tr>
                <th>#</th>
                <th>data</th>
            </tr>
        </thead> */}
        <tbody>

        <tr key={0}>
        <th scope="row">Status</th>
            <td>
            {poolStatus}
                </td>
        </tr>

        <tr key={1}>
        <th scope="row">Total amount staked</th>
            <td>
            {totalAmountStaked !== null ? `${totalAmountStaked}`: "0"}
                </td>
        </tr>

        <tr key={2}>
        <th scope="row">Max stake</th>
            <td>{" "}
            {poolMaxStake === null
                ? "Error"
                : poolMaxStake
                ? `${poolMaxStake}`
                : ""}</td>
          </tr>
              

        <tr key={3}>
        <th scope="row">% staked</th>
            <td>{" "}
            {totalAmountStaked / poolMaxStake > -1
            ? `${totalAmountStaked / poolMaxStake}%`
            : ""}
                </td>
          </tr>              

        <tr key={4}>
            <th scope="row">Reward</th>
                        <td>{" "}
            {reward === null
              ? "Error"
              : reward
              ? `${reward}`
              : ""}</td>
        </tr>

        <tr key={5}>
            <th scope="row">StartTime</th>
                        <td>{" "}
            {startTime === null
              ? "Error"
              : timeConverter(startTime)
              ? `${timeConverter(startTime)}`
              : ""}</td>
        </tr>

        <tr key={6}>
            <th scope="row">EndTime</th>
              <td>{" "}
            {endTime === null
              ? "Error"
              : endTime
              ? `${endTime}`
              : ""}</td>
        </tr>

        <tr key={7}>
            <th scope="row">poolYield</th>
          <td>{" "}                        
          {poolYield === null ? "Error" : poolYield ? `${poolYield}` : ""}
          </td>
        </tr>

        <tr key={8}>
            <th scope="row">Pool address</th>
          <td>{" "}                        
          {POOL_TOKEN_ADDRESS === null ? "Error" : POOL_TOKEN_ADDRESS ? `${POOL_TOKEN_ADDRESS.substring(0,10)}` : ""}...
          </td>
        </tr>


                       
        </tbody>
    </Table>


                    {/* {myArray.map((item, index) => (
                        <tr key={index}>
                            <td>{nameArray[index]}</td>
                            <td>{item}</td>
                            </tr>
                    ))} */}

      <ListGroup>
        {/* loading={loading} */}
        <ListGroup.Item>
          VGA Balance in the pool
        </ListGroup.Item>

        <ListGroup.Item>
          VGA Balance in the pool
        </ListGroup.Item>
               
        <ListGroup.Item>
          Total distribution
        </ListGroup.Item>
                
      </ListGroup>
    </>
  );
}
