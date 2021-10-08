import React from "react";
import { useWeb3React } from "@web3-react/core";
import VEGA_CONTRACT_ABI from "../../../abis/erc20.json";
import POOL_CONTRACT_ABI from "../../../abis/BoostPool.json";
import { useContract } from "../../../eth.js";
// import { VEGA_TOKEN_ADDRESS, POOL_TOKEN_ADDRESS } from "../../Constant/Contracts.js";

import {ListGroup} from "react-bootstrap";
import { Table } from 'react-bootstrap';

// import { ethers } from "ethers";
import { VEGA_TOKEN_ADDRESS, POOL_TOKEN_ADDRESS } from "../../../Contracts.js";
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

export function PoolInfo() {
  const { account, library } = useWeb3React();

  //CONTRACT_MAP["BoostPool"]
  const vegaContract = useContract(VEGA_TOKEN_ADDRESS, VEGA_CONTRACT_ABI, true);

  const poolContract = useContract(POOL_TOKEN_ADDRESS, POOL_CONTRACT_ABI, true);

  // const [loading, setLoading] = useState(false);

  const [poolStaked, setPoolstaked] = React.useState();
  const [poolMaxStake, setMaxStake] = React.useState();
  const [poolYield, setMaxyield] = React.useState();
  const [startTime, setStartTime] = React.useState();
  const [endTime, setEndTime] = React.useState();
  const [totalAmountStaked, setTotalAmountStaked] = React.useState();
  const [reward, setReward] = React.useState();

//   const [myArray, dispatchValue] = React.useReducer((myArray, { type, value }) => {
//     switch (type) {
//       case "add":
//         return [...myArray, value];
//       case "remove":
//         return myArray.filter((_, index) => index !== value);
//       default:
//         return myArray;
//     }
//   }, []);

//   const [nameArray, dispatchName] = React.useReducer((nameArray, { type, value }) => {
//     switch (type) {
//       case "add":
//         return [...nameArray, value];
//       case "remove":
//         return nameArray.filter((_, index) => index !== value);
//       default:
//         return nameArray;
//     }
//   }, []);

  // const [loading, setLoading] = useState(false);  

  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false;

      poolContract.callStatic
        .maxYield()
        .then((x) => {
          if (!stale) {
            x = x / 10 ** 18;
            setMaxyield(x);
          }
        })
        .catch(() => {
          if (!stale) {
            setMaxyield(null);
          }
        });

      return () => {
        stale = true;
        setMaxyield(undefined);
      };
    }
  }, [account, library, poolContract]); 

  

  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false;

      poolContract.callStatic
        .startTime()
        .then((x) => {
          if (!stale) {
            
            var formattedTime = timeConverter(x);
            setStartTime(formattedTime);
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
        .totalAmountStaked()
        .then((x) => {
          if (!stale) {
            console.log("totalAmountStaked " + x)
            // setTotalAmountStaked(x/10**18);
            setTotalAmountStaked(x/10**18);
          }
        })
        .catch(() => {
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
  }, [account, library, poolContract]); 

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
        <tr key={1}>
        <th scope="row">Total amount staked</th>
            <td>
            {totalAmountStaked == 0 ? `${totalAmountStaked}`: ""}                
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
              : startTime
              ? `${startTime}`
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
          Balance in the pool
        </ListGroup.Item>
               
        <ListGroup.Item>
          duration
          Total distribution
          Max Yield
        </ListGroup.Item>
                
      </ListGroup>
    </>
  );
}
