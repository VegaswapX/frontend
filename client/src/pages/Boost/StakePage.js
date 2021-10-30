// @flow
import React, { useEffect, useMemo, useReducer, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { ethers } from "ethers";
import { getAllowance, unstake } from "../../chain/StakeFunctions";
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
import { stake, approve } from "../../chain/StakeFunctions";
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
  const [isStaked, setIsStaked] = useState(0);
  const [hasStaked, setHasStaked] = useState(0);
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
    try {
      console.log("stakeToken " + stakeToken)
      const allowance = await getAllowance(
        multiCallContract,
        stakeToken,
        account,
        poolContract.address
      );
      setAllowance(allowance);
      setApproveEnabled(allowance == 0);
      console.log("allowance >> " + allowance);
    } 
      catch(error){

      }
  }, [stakeToken]);

  useEffect(async () => {
    const stake = await poolContract.callStatic.stakes(account);
    console.log("stake " + stake[1]);
    //isadded
    setHasStaked(stake[4]);
    //staked flag
    setIsStaked(stake[5]);
    console.log(">> stake " + stake);
    setCanStake(stake[1] == 0);
  });

  useEffect(async () => {
    const x = await poolContract.callStatic.stakeToken();
    setStakeToken(x);
  });

  useEffect(async () => {

    poolContract.callStatic.stakes(account).then((x) => {
      let amount = x[1];
      let damount =  amount/10**18;

      setStakedamount(damount);
    });
  }, [poolContract]);

  const stakeClick = async () => {
    console.log("stakeClick " + stakeAmount);
    if (stakeAmount < 10){
      toast.error("Staking amount too low");
    }
    //TODO check balance first
          
    try {
      setLoading(true);
      let [receipt, receiptstatus] = await stake(stakeAmount, poolContract);
     
      console.log("receipt >>> " + receipt);
      console.log(">>> " + receiptstatus);
      if (!receipt){
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

      if (!receipt){
        toast.error(receiptstatus.data.message);
      } else {
        toast.success("unstaked successfully");
      }
    } catch {
      toast.error("error with unstake");
    }

    setLoading(false);
  }

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

  const approveClick = async () => {
    console.log("call approve" + stakeToken);
    let status, statusInfo, result;
    try {
      setLoading(true);
      result = await approve(account, library, stakeToken, poolContract.address);
      [status, statusInfo] = result;
      console.log(">>> " + status)
      console.log(">>> " + statusInfo.message )
      
      if (!status){
        toast.error(statusInfo.message);
      } else {        
        toast.success("approved successfully");
      }
      setLoading(false);
    } catch{
      toast.error("error with approve");
    }
       
  };

  if (loading) {
    return <> Loading</>;
  }

  else {

    if (hasStaked) {
      if (isStaked){
      return (<>
             {/* StakedAmount: {rounded(stakedAmount)} {pool.stakedUnit} */}
             StakedAmount: {stakedAmount} {pool.stakedUnit}
             <br />
             <Button
               variant="primary"
               onClick={unstakeClick}
               className="m-1"
               // disabled={reducerState.stakeAmount <= 0}
             >
               Harvest
             </Button>
           </>
    )
      } 
      else {
      return (<>Harvested</>)
      }
    } else {
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
            
            <span style={{fontSize: "14pt"}}>Staked amount: {stakedAmount}</span>

            <ApproveButton
              approveEnabled={approveEnabled}
              approve={approveClick}
              //disabled={approveEnabled}
            />
            {/* allowance: {allowance} */}
            
            <br/>
            <Button
              variant="primary"
              onClick={stakeClick}
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
    }

    
    // return <>?? canStake: {canStake}
    // hasStaked {hasStaked}

        
  }

    // if (canStake) {
    
    // } else {
    //   //hasStaked
    //   if (!hasStaked){
    
    //     );
    //   } else{
    //     return (<>Stake harvested</>)
    //   }
    // }
};

const StakePage = ({ pool }) => {
  const { account, library } = useWeb3React();
  if (!account || !library) return <div>Waiting</div>;
  return <StakeForm pool={pool} />;
};
export default StakePage;
