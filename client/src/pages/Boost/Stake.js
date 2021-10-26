// @flow
import React, { useReducer, useState } from "react";
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
import { PoolInfo } from "./Pool";

// components
// import PageTitle from '../components/PageTitle';

const StakeForm = ({ pool }) => {
  const { account, library } = useWeb3React();
  const [modalStatus, setModalStatus] = useState(false);
  //const poolContract = useContract(pool.address, pool.abi, true);
  let poolContract, vegaContract;
  vegaContract = getContractA(
    account,
    library,
    VEGA_TOKEN_ADDRESS,
    VEGA_CONTRACT_ABI
  );
  poolContract = getContractA(
    account,
    library,
    pool.address,
    POOL_CONTRACT_ABI
  );
  const [stakeAmount, setStakeamount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reducerState, dispatch] = useReducer(poolReducer, INIT_STATE);

  const stake = async () => {
    setLoading(true);
    // let stakeAmountDEC = stakeAmount * 10**18;
    var stakeAmountDEC = ethers.BigNumber.from(stakeAmount).pow(18);

    console.log("stake " + stakeAmountDEC);
    let minAmount = 1 * 10 ** 18;
    try {
      //TODO check maximum
      if (stakeAmountDEC >= 0) {
        await poolContract.stake(stakeAmountDEC);
        dispatch(changeStakeAmount(stakeAmountDEC));
        toast("Staking successful", {
          className: "success",
          bodyClassName: "grow-font-size",
          progressClassName: "fancy-progress-bar",
        });
      } else {
        toast("Minimum amount is " + minAmount, {
          className: "success",
          bodyClassName: "grow-font-size",
          progressClassName: "fancy-progress-bar",
        });
      }
    } catch (error) {
      toast("Staking error " + error.message, {
        className: "success",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
      // addToast({ title: 'Deposit Token error!', description: error.message, type: 'TOAST_ERROR' });
    } finally {
      setLoading(false);
      console.log("stake done");
    }
  };

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
    console.log("approve " + pool.address);
    // setLoading(true);

    try {
      //TODO
      let approveAmount = parseEther("10000");
      // let approveAmount = 1000 * 10**18;
      console.log(vegaContract, "vegaContract");
      await vegaContract.approve(pool.address, approveAmount);
      dispatch(changeAllowanceAmount(approveAmount));
      // await depositLpToken(vegaContract, lpContract, account, amount);
      // addToast({ title: 'Deposit Success', description: "Successfully deposited", type: 'TOAST_SUCCESS' });
      // tokenBalance.refetch();
      // lpBalance.refetch();
      toast("approve successful", {
        className: "success",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    } catch (error) {
      console.log({ error });
      toast("approve failed", {
        className: "success",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
      // addToast({ title: 'Deposit Token error!', description: error.message, type: 'TOAST_ERROR' });
    } finally {
      setLoading(false);
      //TODO reload amount
      //check allowance
      console.log("approve done");
    }
  };

  if (reducerState.stakeAmount < 1) {
    return (
      <>
        <Card>
          <Card.Body>
            <h4 className="mb-3 header-title">Stake</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="exampleEmail2" column sm={2}>
                  Amount:{" "}
                </Form.Label>

                <input
                  type="text"
                  value={stakeAmount}
                  onChange={(e) => setStakeamount(e.target.value)}
                  className="stakeInput"
                />
              </Form.Group>

              <Button
                variant="primary"
                onClick={stake}
                className="m-1"
                disabled={
                  reducerState.stakeAmount > 0 || reducerState.allowance <= 0
                }
              >
                Stake
              </Button>

              <ApproveButton
                allowance={reducerState.allowance}
                approve={approve}
              />

              <Button
                onClick={() => setModalStatus(true)}
                variant={"primary"}
                className="ms-1"
              >
                Details
              </Button>
            </Form>
          </Card.Body>
        </Card>
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

const Stake = ({ pool }) => {
  const { account, library } = useWeb3React();
  if (!account || !library) return <div>Waiting</div>;
  return <StakeForm pool={pool} />;
};
export default Stake;
