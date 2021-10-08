import React from "react";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import VEGA_CONTRACT_ABI from "../../abis/erc20.json";
import POOL_CONTRACT_ABI from "../../abis/BoostPool.json";
import { useContract } from "../../eth.js";
import { VEGA_TOKEN_ADDRESS, POOL_TOKEN_ADDRESS } from "../../Constant/Contracts.js";

import {Button, Row, Col, ListGroup} from "react-bootstrap";
import {parseEther} from "ethers/lib/utils";

// const chainId = 1137;

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
  }, [account, library, vegaContract, poolContract]); // ensures refresh if referential identity of library doesn't change across chainIds

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
  }, [account, library, poolContract]); // ensures refresh if referential identity of library doesn't change across chainIds

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
  }, [account, library, poolContract]); // ensures refresh if referential identity of library doesn't change across chainIds

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
  }, [account, library, poolContract]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <>
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

export function PoolStake() {
  const { account, library } = useWeb3React();
  const [stakeBalance, setStakeBalance] = useState(0)
  //CONTRACT_MAP["BoostPool"]
  const vegaContract = useContract(VEGA_TOKEN_ADDRESS, VEGA_CONTRACT_ABI, true);

  const poolContract = useContract(POOL_TOKEN_ADDRESS, POOL_CONTRACT_ABI, true);

  // const [loading, setLoading] = useState(false);

  const [vgaallow, setVgaAllowance] = React.useState();

  // const [poolStaked, setPoolstaked] = React.useState()

  const [loading, setLoading] = useState(false);

  const approve = async () => {
    console.log("approve " + loading);

    setLoading(true);

    try {
      //TODO
      let approveAmount = parseEther("1000");
      await vegaContract.approve(POOL_TOKEN_ADDRESS, approveAmount);
      // await depositLpToken(vegaContract, lpContract, account, amount);
      // addToast({ title: 'Deposit Success', description: "Successfully deposited", type: 'TOAST_SUCCESS' });
      // tokenBalance.refetch();
      // lpBalance.refetch();
    } catch (error) {
      console.log({ error });
      // addToast({ title: 'Deposit Token error!', description: error.message, type: 'TOAST_ERROR' });
    } finally {
      setLoading(false);
      //TODO reload amount
      console.log("approve done");
    }
  };

  const stake = async () => {
    console.log("stake " + poolContract);

    setLoading(true);

    try {
      // let approveAmount = 10000 * 10**18;
      await poolContract.stake(stakeBalance.toString());
      // await depositLpToken(vegaContract, lpContract, account, amount);
      // addToast({ title: 'Deposit Success', description: "Successfully deposited", type: 'TOAST_SUCCESS' });
      // tokenBalance.refetch();
      // lpBalance.refetch();
    } catch (error) {
      console.log({ error });
      // addToast({ title: 'Deposit Token error!', description: error.message, type: 'TOAST_ERROR' });
    } finally {
      setLoading(false);
      console.log("stake done");
    }
  };

  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false;

      vegaContract.callStatic
        .allowance(account, POOL_TOKEN_ADDRESS)
        .then((x) => {
          if (!stale) {
            // let z = ethers.utils.formatEther(x);
            setVgaAllowance(x);
          }
        })
        .catch(() => {
          if (!stale) {
            setVgaAllowance(null);
          }
        });

      return () => {
        stale = true;
        setVgaAllowance(undefined);
      };
    }
  }, [account, library, vegaContract]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <div>
      <span>
        VGA allowance:{" "}
        {vgaallow === null ? "Error" : vgaallow ? `${vgaallow}` : ""}
        <br />
        My stake?
        <br />
        {/* loading={loading} */}
        <Row>
          <Col>
            <input onChange={e => setStakeBalance(e.target.value)} value={stakeBalance} />
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <Button variant="secondary" onClick={approve}>
              Approve
            </Button>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button variant="secondary" onClick={stake}>
              Stake
            </Button>
          </Col>
        </Row>
      </span>
    </div>
  );
}
