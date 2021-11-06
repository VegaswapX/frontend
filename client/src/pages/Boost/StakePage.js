// @flow
import React, { useEffect, useRef, useMemo, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { getAllowance, unstake } from "../../chain/StakeFunctions";
import { getTokensPrices } from "../../api/data";
import {
  statusPool,
  poolStakeable,
  poolHarvestable,
} from "../../chain/StakeFunctions";

// import { useWeb3React } from "@web3-react/core";
import POOL_CONTRACT_ABI from "../../abis/BoostPool.json";
import ApproveButton from "../../components/Buttons/ApproveButton";
import { getContractA } from "../../chain/eth.js";
import "react-toastify/dist/ReactToastify.css";
//import poolReducer, { INIT_STATE } from "../../redux/poolinfo/reducers";
import { PoolInfo } from "./PoolInfo";
import { useContract, MULTICALL_ADDR } from "../../chain/eth.js";
import MULTICALL_ABI from "../../abis/Multicall.json";
import { stake, approve } from "../../chain/StakeFunctions";
import _ from "underscore";
import { toast } from "react-toastify";
import BigNumber from "bignumber.js";

const LoadingSpinner = () => {
  return (
    <>
      <Spinner
        animation="border"
        role="status"
        style={{
          marginLeft: "45%",
          marginTop: "20px",
          width: "60px",
          height: "60px",
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  );
};

const StakeableForm = ({
  stakeAmount,
  handleStakeInput,
  totalReward,
  reward,
  rewardCurrency,
  stakeCurrency,
  yieldPrice,
  roi,
  apy,
  approveEnabled,
  approveClick,
  stakeClick,
  pool,
  modalStatus,
  setModalStatus
}) => {
  //return <>stakeable</>;

  return (
    <>
      <div style={{ marginLeft: "10px", fontSize: "15pt" }}>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="" column sm={3}>
              Stake Amount:{" "}
            </Form.Label>
            <input
              type="text"
              value={stakeAmount}
              onChange={handleStakeInput}
              className="stakeInput"
            />{" "}
            {stakeCurrency}
            {/* <br />
            //TODO
              <span style={{fontSize: "14pt"}}>Yield amount: {yieldAmount}</span> */}
            <br />
          </Form.Group>

          <div>
            <span style={{ color: "white" }}>
              Yield amount: {totalReward} {rewardCurrency}
            </span>
          </div>
          <br />

          <div>
            Yield multiplier: {reward ? reward.toString() : ""} {rewardCurrency}{" "}
            per {stakeCurrency}
          </div>

          <br />

          <div>VGA price: {yieldPrice}$</div>

          <br />
          <div>Yield ROI: {roi} %</div>

          <br />
          <div>Yield APY: {apy} %</div>

          {/* <div>
            Duration: {duration}
            </div> */}

          <br />

          <span style={{ marginLeft: "40%" }}>
            <ApproveButton
              approveEnabled={approveEnabled}
              approve={approveClick}
              //disabled={approveEnabled}
            />
            {/* allowance: {allowance} */}
            {/* <br/> */}
            &nbsp;&nbsp;
            <Button
              variant="primary"
              onClick={stakeClick}
              className="m-1"
              style={{ marginLeft: "100px" }}
              // disabled={approveEnabled}
            >
              Stake
            </Button>
          </span>
        </Form>
      </div>

      <Modal
        show={modalStatus}
        onHide={() => setModalStatus(false)}
        // dialogClassName={className}
        scrollable={true}
      >
        <Modal.Header onHide={() => setModalStatus(false)}>
          <h4 className="modal-title">Pool Information</h4>
        </Modal.Header>
        <Modal.Body>
          <PoolInfo pool={pool} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setModalStatus(false)}>
            Close
          </Button>{" "}
        </Modal.Footer>
      </Modal>
    </>
  );
};

const HarvestPending = ({ stakedAmount, yaAmount, pool }) => {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        {/* StakedAmount: {rounded(stakedAmount)} {pool.stakedUnit} */}
        Staked Amount: {stakedAmount} {pool.stakedUnit}
        <br />
        <br />
        Yield Amount: {yaAmount}
        <br />
        <br />
        Wait for staking end to harvest
      </div>
    </>
  );
};

const HarvestForm = ({ stakedAmount, yaAmount, pool, unstakeClick }) => {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        {/* StakedAmount: {rounded(stakedAmount)} {pool.stakedUnit} */}
        Staked Amount: {stakedAmount} {pool.stakedUnit}
        <br />
        <br />
        Yield Amount: {yaAmount}
        <br />
        <br />
        <Button variant="primary" onClick={unstakeClick} className="m-1">
          Harvest
        </Button>
      </div>
    </>
  );
};

const StakeForm = ({ pool }) => {
  //console.log(" pool " + pool.address);

  const { account, library } = useWeb3React();
  const [modalStatus, setModalStatus] = useState(false);

  //const multiCallContract = useContract(MULTICALL_ADDR, MULTICALL_ABI, true);
  const [stakeAmount, setStakeamount] = useState(0);
  const [canStake, setCanStake] = useState(0);
  const [stakeToken, setStakeToken] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [loading, setLoading] = useState(true);
  //const [harvestActive, setHarvestActive] = useState(false);
  const [stakedAmount, setStakedamount] = useState(0);
  const [yaAmount, setYamount] = useState(0);

  const [isStaked, setIsStaked] = useState(0);
  const [hasStaked, setHasStaked] = useState(0);
  const [hasHarvested, sethasHarvested] = useState(0);
  //const [reducerState, dispatch] = useReducer(poolReducer, INIT_STATE);
  const [approveEnabled, setApproveEnabled] = useState(false);

  const [loaded, setLoaded] = useState();

  const [reward, setReward] = useState(0);
  const [step, setStep] = useState();
  const [totalReward, setTotalreward] = useState();
  const [roi, setRoi] = useState();
  const [apy, setApy] = useState();
  const [yieldPrice, setYieldPrice] = useState(0);

  const [rq, setRQ] = useState(0);
  //const [duration, setDuration] = useState(0);

  //TODO rewardQuote

  const multiCallContract = useContract(MULTICALL_ADDR, MULTICALL_ABI, true);

  //TODO!
  const stakeCurrency = pool.stakedUnit;
  const rewardCurrency = pool.yieldUnit;

  let poolContract;

  try {
    poolContract = getContractA(
      account,
      library,
      pool.address,
      POOL_CONTRACT_ABI
    );
  } catch {
    console.log("error loading contract");
  }

  //reducerState.stakeAmount > 0 || reducerState.allowance <= 0
  function rounded(amount) {
    amount = amount / 10 ** 18;
    let rounded_amount = Math.round(amount * 100) / 100;
    return rounded_amount;
  }

  function calculateRoi(reward) {
    return Math.round(reward * yieldPrice * 10000) / 100;
  }

  function calculateApy() {
    return Math.round((roi * 365) / 7);
  }

  useEffect(async () => {
    try {
      console.log("stakeToken " + stakeToken);
      const allowance = await getAllowance(
        multiCallContract,
        stakeToken,
        account,
        poolContract.address
      );
      setAllowance(allowance);
      setApproveEnabled(allowance == 0);
      console.log("allowance >> " + allowance);
    } catch (error) {}
  }, [stakeToken]);

  useEffect(async () => {
    try {
      const stake = await poolContract.callStatic.stakes(account);
      console.log(">> stake " + stake);
      console.log("!>> added " + stake[4]);
      console.log("!>> staked " + stake[5]);

      sethasHarvested(!stake[4]);

      let ya = stake[2] / 10 ** 18;
      setYamount(ya);
      console.log("106: stake " + stake[1]);
      //isadded
      setHasStaked(stake[4]);
      //staked flag
      setIsStaked(stake[5]);
      setCanStake(stake[1] == 0);
    } catch {}
  }, []);

  useEffect(async () => {
    try {
      const x = await poolContract.callStatic.rewardQuote();
      console.log(">>>RQ " + x);
      setRQ(x.toNumber());
    } catch {}
  }, []);

  useEffect(async () => {
    try {
      const x = await poolContract.callStatic.stakeToken();
      setStakeToken(x);
    } catch {}
  });

  useEffect(async () => {
    try {
      poolContract.callStatic.stakes(account).then((x) => {
        let amount = x[1];
        let damount = amount / 10 ** 18;

        setStakedamount(damount);
      });
    } catch {}
  }, [poolContract]);

  const useInterval = (callback, interval, immediate) => {
    const ref = useRef();

    // keep reference to callback without restarting the interval
    useEffect(() => {
      ref.current = callback;
    }, [callback]);

    useEffect(() => {
      // when this flag is set, closure is stale
      let cancelled = false;

      // wrap callback to pass isCancelled getter as an argument
      const fn = () => {
        ref.current(() => cancelled);
      };

      // set interval and run immediately if requested
      const id = setInterval(fn, interval);
      if (immediate) fn();

      // define cleanup logic that runs
      // when component is unmounting
      // or when or interval or immediate have changed
      return () => {
        cancelled = true;
        clearInterval(id);
      };
    }, [interval, immediate]);
  };

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [poolStatus, setPoolstatus] = useState();
  const [ispoolStakeable, setPoolStakeable] = useState();
  const [ispoolHarvestable, setIsPoolHarvestable] = useState();

  async function loadTime(isCancelled) {
    try {
      console.log("useInterval ");

      const st = await poolContract.callStatic.startTime();

      const et = await poolContract.callStatic.endTime();

      if (isCancelled()) return;

      setStartTime(st);
      setEndTime(et);

      //.then((x) => {
      //setEndTime(x);
      //setEndTimeF(formattedTime);
      let z = statusPool(startTime, endTime);
      console.log(">>> " + z);
      setPoolstatus(z);

      let x1 = poolStakeable(startTime, endTime);
      let x2 = poolHarvestable(endTime);

      console.log("startTime: " + st);
      console.log("endTime: " + et);

      console.log("stakeable: " + x1);
      console.log("harvestable: " + x2);

      setPoolStakeable(x1);
      setIsPoolHarvestable(x2);

      setLoading(false);
      //});
    } catch {}
  }

  useInterval(
    async (isCancelled) => {
      loadTime(isCancelled);
    },
    1000,
    true
  );

  //loadTime();

  useInterval(
    async (isCancelled) => {
      if (step == undefined) {
        return;
      }
      try {
        const result = await poolContract.callStatic.rewardSteps(step);

        if (isCancelled()) return;

        setReward(result.toNumber() / rq);

        setRoi(calculateRoi(reward));
        setApy(calculateApy());
      } catch (err) {
        console.log("call contract error:", step, err);
      }
    },
    1000,
    true
  );

  useInterval(
    async (isCancelled) => {
      try {
        let result = await poolContract.callStatic.currentStep();
        console.log("result currentStep " + result);

        if (isCancelled()) return;

        setStep(result.toNumber());
      } catch (err) {
        console.log("call contract error:", step, err);
      }
    },
    1000,
    true
  );

  useInterval(
    async (isCancelled) => {
      try {
        let result = await getTokensPrices();
        const json = await result.json();
        if (isCancelled()) return;
        setYieldPrice(Math.round(json.vegaswap.usd * 10000) / 10000);
      } catch (err) {
        console.log("call error:", err);
      }
    },
    1000,
    true
  );

  const stakeClick = async () => {
    console.log("stakeClick " + stakeAmount);
    if (stakeAmount < 10) {
      toast.error("Staking amount too low");
    }
    //TODO check balance first

    try {
      setLoading(true);
      let [receipt, receiptstatus] = await stake(stakeAmount, poolContract);

      console.log("receipt >>> " + receipt);
      console.log(">>> " + receiptstatus);
      if (!receipt) {
        toast.error(receiptstatus.data.message);
      }
    } catch {
      toast.error("error with stake");
    }

    setLoading(false);

    // } else {
    //   toast.info("staked successfully")
    // }
    //console.log(">>> " + statusInfo.message )

    //stakeF(stakeAmount, poolContract);
  };

  const unstakeClick = async () => {
    try {
      setLoading(true);
      let [receipt, receiptstatus] = await unstake(poolContract);

      if (!receipt) {
        toast.error(receiptstatus.data.message);
      } else {
        toast.success("unstaked successfully");
      }
    } catch {
      toast.error("error with unstake");
    }

    setLoading(false);
  };

  const debounceOnChange = useMemo(
    () =>
      _.debounce(async (e) => {
        try {
          let z = e.target.value;
          //TOOD
          //const amountx = parseInt(z);
          //setStakeamount(z);
          //setTotalreward(z*reward);
        } catch {}
      }, 300),
    []
  );

  function handleStakeInput(e) {
    try {
      console.log(e);
      const amountText = e.target.value;
      console.log(">> stake amountText " + amountText);
      let amountInt = parseInt(amountText);
      setStakeamount(amountText);
      setTotalreward(amountInt * reward);

      //debounceOnChange(e);
    } catch {}
  }

  const approveClick = async () => {
    console.log("call approve" + stakeToken);
    let status, statusInfo, result;
    try {
      setLoading(true);
      result = await approve(
        account,
        library,
        stakeToken,
        poolContract.address
      );
      [status, statusInfo] = result;
      console.log(">>> " + status);
      console.log(">>> " + statusInfo.message);

      if (!status) {
        toast.error(statusInfo.message);
      } else {
        toast.success("approved successfully");
      }
      setLoading(false);
    } catch {
      toast.error("error with approve");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  } else {
    if (ispoolStakeable) {
      return (
        <StakeableForm
          stakeAmount={stakeAmount}
          handleStakeInput={handleStakeInput}
          totalReward={totalReward}
          rewardCurrency={rewardCurrency}
          reward={reward}          
          stakeCurrency={stakeCurrency}
          yieldPrice={yieldPrice}
          roi={roi}
          apy={apy}
          approveEnabled={approveEnabled}
          approveClick={approveClick}
          stakeClick={stakeClick}
          pool={pool}
          modalStatus={modalStatus}
          setModalStatus={setModalStatus}
        />
      );
    } else {
      if (ispoolHarvestable) {
        if (!hasHarvested) {
          return (
            <HarvestForm
              stakedAmount={stakedAmount}
              yaAmount={yaAmount}
              pool={pool}
              unstakeClick={unstakeClick}
            />
          );
        } else {
          return (
            <>
              <div style={{ textAlign: "center" }}>
                Harvested: {yaAmount} {pool.yieldUnit}
              </div>
            </>
          );
        }
      } else {
        return (
          <HarvestPending
            stakedAmount={stakedAmount}
            yaAmount={yaAmount}
            pool={pool}
          />
        );
        //return <>Not stakeable yet</>;
      }
    }

    // else {
  }
};

const StakePage = ({ pool }) => {
  const { account, library } = useWeb3React();
  if (!account || !library) return <div>Waiting</div>;
  return <StakeForm pool={pool} />;
};
export default StakePage;
