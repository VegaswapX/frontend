// @flow
import React, { useEffect, useRef, useMemo, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import {
  getAllowance,
  getAllowanceX,
  unstake,
} from "../../chain/StakeFunctions";
import { getTokensPrices } from "../../api/data";
import {
  statusPool,
  poolStakeable,
  poolHarvestable,
} from "../../chain/StakeFunctions";
import { Chains } from "../../chain/eth";

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
import { BSC_USDT, VEGA_TOKEN_ADDRESS } from "../../chain/Contracts";

const MIN_USDT = 10;
const MIN_VGA = 1000;

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
  setModalStatus,
}) => {
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

const HarvestPending = ({ stakedAmount, yaAmount, rewardCurrency, pool }) => {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        {/* StakedAmount: {rounded(stakedAmount)} {pool.stakedUnit} */}
        Staked Amount: {stakedAmount} {pool.stakedUnit}
        <br />
        <br />
        Yield Amount: {yaAmount} {rewardCurrency}
        <br />
        <br />
        Please wait for harvest
      </div>
    </>
  );
};

const OpenPending = ({ }) => {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        Please wait for the pool to open
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

  const { account, library, chainId } = useWeb3React();
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

  //TODO pull from contract
  const duration = 7;

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

  function calculateRoiUSDT(reward) {
    return Math.round(reward * yieldPrice * 10000) / 100;
  }

  function calculateRoiVGA(reward, rq) {
    return Math.round((reward / rq) * 10000);
  }

  function calculateApy() {
    return Math.round((roi * 365) / duration);
  }

  useEffect(async () => {
    try {
      console.log("stakeToken " + stakeToken);
      //account, library, tokenAddress, froma, toa
      const allowance = await getAllowanceX(
        account,
        library,
        stakeToken,
        account,
        poolContract.address
      );
      setAllowance(allowance);
      console.log("allowance >> " + allowance);
      let enabled = allowance == 0;
      console.log("enabled >> " + enabled);
      setApproveEnabled(enabled);
    } catch (error) {}
  }, [stakeToken]);

  useEffect(async () => {
    try {
      const stake = await poolContract.callStatic.stakes(account);
      let stakeAmount = stake[1];
      console.log("!!! >> stake account " + account);
      console.log("!!! >> stake " + stake);

      console.log("!>> added " + stake[4]);
      console.log("!>> staked " + stake[5]);

      sethasHarvested(!stake[4]);

      let ya = stake[2] / 10 ** 18;
      setYamount(ya);

      //isadded
      //setHasStaked(stake[4]);
      setHasStaked(stakeAmount > 0);
      //staked flag
      setIsStaked(stake[5]);
      setCanStake(stake[1] == 0);
    } catch {}
  }, [account]);

  useEffect(async () => {
    try {
      const x = await poolContract.callStatic.rewardQuote();
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
  const [restTime, setRestTime] = useState();
  const [poolStatus, setPoolstatus] = useState();
  const [ispoolStakeable, setPoolStakeable] = useState();
  const [ispoolHarvestable, setIsPoolHarvestable] = useState();

  async function loadTime(isCancelled) {
    try {
      const st = await poolContract.callStatic.startTime();

      const et = await poolContract.callStatic.endTime();

      if (isCancelled()) return;

      setStartTime(st);
      setEndTime(et);

      setRestTime(et - st);

      let z = statusPool(startTime, endTime);
      setPoolstatus(z);

      let x1 = poolStakeable(startTime, endTime);
      let x2 = poolHarvestable(endTime);

      setPoolStakeable(x1);
      setIsPoolHarvestable(x2);

      setLoading(false);
    } catch {}
  }

  useInterval(
    async (isCancelled) => {
      loadTime(isCancelled);
    },
    1000,
    true
  );

  useInterval(
    async (isCancelled) => {
      if (step == undefined) {
        return;
      }
      try {
        const result = await poolContract.callStatic.rewardSteps(step);

        if (isCancelled()) return;

        setReward(result.toNumber() / rq);

        //alert("stakeCurrency " + stakeCurrency);

        if (stakeCurrency == "USDT") {
          setRoi(calculateRoiUSDT(reward, rq));
        } else if (stakeCurrency == "VGA") {
          setRoi(calculateRoiVGA(reward, rq));
        }
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
    2000,
    true
  );

  const stakeClick = async () => {
    console.log("stakeClick " + stakeAmount);
    let mamount;
    //TODO
    if (stakeCurrency == "USDT") {
      mamount = MIN_USDT;
    } else {
      mamount = MIN_VGA;
    }
    if (stakeAmount < mamount) {
      toast.error("Staking amount too low");
      return;
    }
    //TODO check balance first

    try {
      setLoading(true);
      //TODO double check receipt and tx handling here
      let [receipt, receiptstatus] = await stake(stakeAmount, poolContract);

      console.log("receipt >>> " + receipt);
      console.log(">>> " + receiptstatus);
      if (!receipt) {
        toast.error(receiptstatus.data.message);
        setLoading(false);
      } else {
        toast.info("staked successfully");
      }
    } catch (error) {
      console.log("error with stake " + error);
      toast.error("error with stake");
      setLoading(false);
    }
  };

  const unstakeClick = async () => {
    console.log("unstakeClick");
    console.log("unstake: " + account);
    try {
      setLoading(true);
      let [receipt, receiptstatus] = await unstake(poolContract);

      if (!receipt) {
        toast.error(receiptstatus.data.message);
        setLoading(false);
      } else {
        toast.success("unstaked successfully");
        setLoading(false);
      }
    } catch (error) {
      console.log("error with unstake" + error);
      toast.error("error with unstake");
    }
  };

  // const debounceOnChange = useMemo(
  //   () =>
  //     _.debounce(async (e) => {
  //       try {
  //         let z = e.target.value;
  //         //TOOD
  //         //const amountx = parseInt(z);
  //         //setStakeamount(z);
  //         //setTotalreward(z*reward);
  //       } catch {}
  //     }, 300),
  //   []
  // );

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
    if (chainId !== Chains.BSC_MAINNET.chainId) {
      return (
        <>
          <p>Not logged in</p>
        </>
      );
    } else {
      if (!ispoolStakeable){
        return (<OpenPending />)
      }
      if (ispoolStakeable && !isStaked) {
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
            if (hasStaked) {
              return (
                <>
                  <div style={{ textAlign: "center" }}>
                    Harvested: {yaAmount} {pool.yieldUnit}
                  </div>
                </>
              );
            } else {
              return (
                <>
                  <div style={{ textAlign: "center" }}>Pool closed</div>
                </>
              );
            }
          }
        } else {
          return (
            <HarvestPending
              stakedAmount={stakedAmount}
              yaAmount={yaAmount}
              rewardCurrency={rewardCurrency}
              pool={pool}
            />
          );
        }
      }
    }
  }
};

const StakePage = ({ pool }) => {
  const { account, library } = useWeb3React();
  if (!account || !library) return <div>Waiting</div>;
  return <StakeForm pool={pool} />;
};
export default StakePage;
