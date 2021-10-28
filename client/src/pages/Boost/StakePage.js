// @flow
import React, { useEffect, useMemo, useReducer, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { ethers } from "ethers";
import {
  changeAllowanceAmount,
  changeStakeAmount,
} from "../../redux/poolinfo/actions";

// import { useWeb3React } from "@web3-react/core";
import VEGA_CONTRACT_ABI from "../../abis/erc20.json";
import POOL_CONTRACT_ABI from "../../abis/BoostPool.json";
import { VEGA_TOKEN_ADDRESS } from "../../chain/Contracts.js";
import ApproveButton from "../../components/Buttons/ApproveButton";
import { getContractA } from "../../chain/eth.js";
import { parseEther } from "ethers/lib/utils";
import StakeInfo from "./StakeInfo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import poolReducer, { INIT_STATE } from "../../redux/poolinfo/reducers";
import { PoolInfo } from "./PoolInfo";
import { hasEnoughAllowance } from "./StakeFunctions";
import { MULTICALL_ADDR } from "../../chain/constant";
import { useContract } from "../../chain/eth.js";
import MULTICALL_ABI from "../../abis/Multicall.json";
import { stakeF, approveF } from "./StakeFunctions";
import _ from "underscore";

const StakeForm = ({ pool }) => {
  console.log(" pool " + pool.address);

  const { account, library } = useWeb3React();
  const [modalStatus, setModalStatus] = useState(false);
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
  const multiCallContract = useContract(MULTICALL_ADDR, MULTICALL_ABI, true);
  const [stakeAmount, setStakeamount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reducerState, dispatch] = useReducer(poolReducer, INIT_STATE);

  const [approveEnabled, setApproveEnabled] = useState(false);

  //reducerState.stakeAmount > 0 || reducerState.allowance <= 0

  // useEffect(async () => {
  //   //console.log("pool.address " + poolContract.address);

  //   //vegaContract.allowance.
  //   const allowance = await hasEnoughAllowance(
  //     multiCallContract,
  //     VEGA_TOKEN_ADDRESS,
  //     account,
  //     poolContract.address
  //   ); // always check token0
  //   console.log(!allowance);
  //   setApproveEnabled(!allowance);
  // }, [poolContract]);

  const stake = async () => {
    //TODO check balance first
    setLoading(true);
    // let stakeAmountDEC = stakeAmount * 10**18;
    //TODO
    console.log("?? " + poolContract)
    stakeF(stakeAmount, poolContract);
  };

  const debounceOnChange = useMemo(
    () =>
      _.debounce(async (e) => {
        //await setOutputAmountText(routerContract, e); 
        console.log(">> " + e);
      }, 300),
    []
  );

  function handleStakeInput(e){
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
    //approveF
  };

  if (reducerState.stakeAmount < 1) {
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

          <Button
            variant="primary"
            onClick={stake}
            className="m-1"
            // disabled={approveEnabled}
          >
            Stake
          </Button>

          <ApproveButton
            approveEnabled={approveEnabled}
            approve={approve}
            //disabled={approveEnabled}
          />
         
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
      <Card>
        <Card.Body>
          <h4 className="mb-3 header-title">Staked</h4>
          <StakeInfo staked={reducerState.stakeAmount} />

          <Button
            variant="primary"
            //onClick={unStake}
            className="m-1"
            disabled={reducerState.stakeAmount <= 0}
          >
            Harvest
          </Button>
        </Card.Body>
      </Card>
    );
  }
};

const StakePage = ({ pool }) => {
  const { account, library } = useWeb3React();
  if (!account || !library) return <div>Waiting</div>;
  return <StakeForm pool={pool} />;
};
export default StakePage;
