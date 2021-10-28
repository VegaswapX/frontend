// @flow
import React, { useEffect, useMemo, useReducer, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { ethers } from "ethers";
import { getAllowance } from "./StakeFunctions";
// import {
//   changeAllowanceAmount,
//   changeStakeAmount,
// } from "../../redux/poolinfo/actions";

// import { useWeb3React } from "@web3-react/core";
import VEGA_CONTRACT_ABI from "../../abis/erc20.json";
import POOL_CONTRACT_ABI from "../../abis/BoostPool.json";
import { VEGA_TOKEN_ADDRESS } from "../../chain/Contracts.js";
import ApproveButton from "../../components/Buttons/ApproveButton";
import { getContractA } from "../../chain/eth.js";
import "react-toastify/dist/ReactToastify.css";
import poolReducer, { INIT_STATE } from "../../redux/poolinfo/reducers";
import { PoolInfo } from "./PoolInfo";
import { MULTICALL_ADDR } from "../../chain/constant";
import { useContract } from "../../chain/eth.js";
import MULTICALL_ABI from "../../abis/Multicall.json";
import { stakeF, approveF } from "./StakeFunctions";
import _ from "underscore";
import { toast } from "react-toastify";

const StakeForm = ({ pool }) => {
  console.log(" pool " + pool.address);

  const { account, library } = useWeb3React();
  const [modalStatus, setModalStatus] = useState(false);

  //const multiCallContract = useContract(MULTICALL_ADDR, MULTICALL_ABI, true);
  const [stakeAmount, setStakeamount] = useState(0);
  const [canStake, setCanStake] = useState(0);
  const [stakeToken, setStakeToken] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [loading, setLoading] = useState(false);
  //const [harvestActive, setHarvestActive] = useState(false);
  const [stakedAmount, setStakedamount] = useState(0);
  const [reducerState, dispatch] = useReducer(poolReducer, INIT_STATE);
  const [approveEnabled, setApproveEnabled] = useState(false);

  const multiCallContract = useContract(MULTICALL_ADDR, MULTICALL_ABI, true);

  let poolContract, vegaContract;
  vegaContract = getContractA(
    account,
    library,
    VEGA_TOKEN_ADDRESS,
    VEGA_CONTRACT_ABI
  );
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

  useEffect(async () => {
    const allowance = await getAllowance(
      multiCallContract,
      VEGA_TOKEN_ADDRESS,
      account,
      poolContract.address
    );
    setAllowance(allowance);
    setApproveEnabled(allowance == 0);
    console.log("allowance >> " + allowance);
  });

  //

  useEffect(async () => {
    const stake = await poolContract.callStatic.stakes(account);
    console.log("stake " + stake[1]);
    setCanStake(stake[1] == 0);
  });

  useEffect(async () => {
    const x = await poolContract.callStatic.StakeToken();
    setStakeToken(x);
  });

  // useEffect(async () => {
  //   //console.log("pool.address " + poolContract.address);

  //   // setApproveEnabled(!allowance);

  //   poolContract.callStatic.stakes(account).then((x) => {
  //     //let z = ethers.utils.formatEther(x[1].toString());
  //     let amount = x[1];
  //     setStakedamount(amount);
  //   });
  // }, [poolContract]);

  const stake = async () => {
    //TODO check balance first
    setLoading(true);
    // let stakeAmountDEC = stakeAmount * 10**18;
    //TODO
    console.log("?? " + poolContract);
    //stakeF(stakeAmount, poolContract);
  };

  const debounceOnChange = useMemo(
    () =>
      _.debounce(async (e) => {
        //await setOutputAmountText(routerContract, e);
        console.log(">> " + e);
      }, 300),
    []
  );

  function handleStakeInput(e) {
    console.log(e);
    const amountText = e.target.value;
    console.log(amountText);
    setStakeamount(amountText);
    debounceOnChange(e);
  }

  // const unStake = async () => {
  //   setLoading(true);
  //   try {
  //     await poolContract.unstake();
  //     toast("Staking successful", {
  //       className: "success",
  //       bodyClassName: "grow-font-size",
  //       progressClassName: "fancy-progress-bar",
  //     });
  //   } catch (error) {
  //     toast("Staking error " + error.message, {
  //       className: "success",
  //       bodyClassName: "grow-font-size",
  //       progressClassName: "fancy-progress-bar",
  //     });
  //     // addToast({ title: 'Deposit Token error!', description: error.message, type: 'TOAST_ERROR' });
  //   } finally {
  //     setLoading(false);
  //     console.log("stake done");
  //   }
  // };

  const approve = async () => {
    console.log("call approve");
    console.log("stakeToken " + stakeToken);
    console.log("account, library " + account);
    //TODO contract depends on address of the pool
    let status, statusInfo;
    try {
      [status, statusInfo] = approveF(account, library, stakeToken, poolContract.address)
      // console.log(">>> " + status)
      // console.log(">>> " + statusInfo )
      if (!status){
        toast.error(statusInfo);
      }
    } catch(error){
      // console.log("???");
      // console.log(statusInfo);
      // toast.error(statusInfo);
    }
  };

  if (canStake) {
    return (
      <>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="" column sm={2}>
              Amount:{" "}
            </Form.Label>

            <input
              type="text"
              value={stakeAmount}
              onChange={handleStakeInput}
              className="stakeInput"
            />
          </Form.Group>
          <ApproveButton
            approveEnabled={approveEnabled}
            approve={approve}
            //disabled={approveEnabled}
          />
          allowance: {allowance}
          staked: {stakedAmount}
          <Button
            variant="primary"
            onClick={stake}
            className="m-1"
            // disabled={approveEnabled}
          >
            Stake
          </Button>
        </Form>

        <Modal
          show={modalStatus}
          onHide={() => setModalStatus(false)}
          // dialogClassName={className}
          size={100}
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
  } else if (loading) {
    return <> Loading</>;
  } else {
    return (
      <>
        StakedAmount: {rounded(stakedAmount)} {pool.stakedUnit}
        <br />
        <Button
          variant="primary"
          //onClick={unStake}
          className="m-1"
          disabled={reducerState.stakeAmount <= 0}
        >
          Harvest
        </Button>
      </>
    );
  }
};

const StakePage = ({ pool }) => {
  const { account, library } = useWeb3React();
  if (!account || !library) return <div>Waiting</div>;
  return <StakeForm pool={pool} />;
};
export default StakePage;
