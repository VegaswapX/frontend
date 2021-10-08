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


export function PoolInfo() {
  const { account, library } = useWeb3React();

  //CONTRACT_MAP["BoostPool"]
  const vegaContract = useContract(VEGA_TOKEN_ADDRESS, VEGA_CONTRACT_ABI, true);

  const poolContract = useContract(POOL_TOKEN_ADDRESS, POOL_CONTRACT_ABI, true);

  // const [loading, setLoading] = useState(false);

  const [poolStaked, setPoolstaked] = React.useState();
  const [poolYield, setMaxyield] = React.useState();
  const [startTime, setStartTime] = React.useState();
  const [endTime, setEndTime] = React.useState();
  const [totalAmountStaked, setTotalAmountStaked] = React.useState();
  const [reward, setReward] = React.useState();

  // const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false;

      poolContract.callStatic
        .totalAmountStaked()
        .then((x) => {
          if (!stale) {
            setPoolstaked(x);
          }
        })
        .catch(() => {
          if (!stale) {
            setPoolstaked(null);
          }
        });

      return () => {
        stale = true;
        setPoolstaked(undefined);
      };
    }
  }, [account, library, vegaContract, poolContract]); 

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
        .totalAmountStaked()
        .then((x) => {
          if (!stale) {
            setTotalAmountStaked(x);
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
        .endTime()
        .then((x) => {
          if (!stale) {
            setEndTime(x);
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
        .reward()
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
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                <tr key={1}>
                                    <th scope="row">Total amount staked</th>
                                    <td>{" "}
            {totalAmountStaked === null
              ? "Error"
              : totalAmountStaked
              ? `${totalAmountStaked}`
              : ""}</td>
                    </tr>

                    <tr key={2}>
                                    <th scope="row">Reward</th>
                                    <td>{" "}
            {reward === null
              ? "Error"
              : reward
              ? `${reward}`
              : ""}</td>
                    </tr>

                        {/* {records.map((record, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{record.id}</th>
                                    <td>{record.username}</td>
                                </tr>
                            );
                        })} */}
                    </tbody>
                </Table>

      <ListGroup>
        {/* loading={loading} */}
        <ListGroup.Item>
          Balance in the pool
        </ListGroup.Item>
        <ListGroup.Item>
          % of total staked
        </ListGroup.Item>
        <ListGroup.Item>
          time info
        </ListGroup.Item>
        <ListGroup.Item>
          duration
          Total distribution
                                Total amount staked
        </ListGroup.Item>
        <ListGroup.Item>
            totalAmountStaked:{" "}
            {totalAmountStaked === null
              ? "Error"
              : totalAmountStaked
              ? `${totalAmountStaked}`
              : ""}
        </ListGroup.Item>
        <ListGroup.Item>
          percentStaked:{" "}
          {totalAmountStaked === null
            ? "Error"
            : poolStaked / totalAmountStaked
            ? `${poolStaked / totalAmountStaked}`
            : ""}
        </ListGroup.Item>
        <ListGroup.Item>
          startTime:{" "}
          {startTime === null ? "Error" : startTime ? `${startTime}` : ""}
        </ListGroup.Item>
        <ListGroup.Item>
          endTime: {endTime === null ? "Error" : endTime ? `${endTime}` : ""}
        </ListGroup.Item>
        <ListGroup.Item>
          poolStaked:{" "}
          {poolStaked === null ? "Error" : poolStaked ? `${poolStaked}` : ""}
        </ListGroup.Item>
        <ListGroup.Item>
          poolYield:{" "}
          {poolYield === null ? "Error" : poolYield ? `${poolYield}` : ""}
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}
