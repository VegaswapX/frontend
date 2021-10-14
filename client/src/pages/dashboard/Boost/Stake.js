// @flow
import React from 'react';
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Row, Col, Card, Form, Button} from 'react-bootstrap';
import { ethers } from "ethers";
// import { useWeb3React } from "@web3-react/core";
import VEGA_CONTRACT_ABI from "../../../abis/erc20.json";
import POOL_CONTRACT_ABI from "../../../abis/BoostPool.json";
import { VEGA_TOKEN_ADDRESS, POOL_TOKEN_ADDRESS } from "../../../chain/Contracts.js";
import ApproveButton from "../../../components/Buttons/ApproveButton";
import { useContract } from "../../../chain/eth.js";
import {parseEther} from "ethers/lib/utils";
import StakeInfo from "./StakeInfo";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// components
// import PageTitle from '../components/PageTitle';



const StakeForm = () => {
    const { account, library } = useWeb3React();
    const vegaContract = useContract(VEGA_TOKEN_ADDRESS, VEGA_CONTRACT_ABI, true);
    const poolContract = useContract(POOL_TOKEN_ADDRESS, POOL_CONTRACT_ABI, true);
    const [stakeAmount, setStakeamount] = React.useState(0);
    const [stakedAmount, setStakedAmount] = React.useState(0);
    const [loading, setLoading] = useState(false); 
    const [allowance, setAllowance] = useState(0);

    React.useEffect(() => {
        async function callStaticFunction() {
            if (!!account && !!library) {
                let x = await vegaContract.callStatic.allowance(account, poolContract.address)
                x = ethers.utils.formatEther(x)
                console.log("allownace " + x);
                setAllowance(x);
                const stakedAmount = await poolContract.callStatic.stakes(account)
                setStakedAmount(stakedAmount[1])
            }
        }

        callStaticFunction();
      }, [account, library, vegaContract, poolContract]);


    const stake = async () => {
        console.log("stake " + poolContract);
        setLoading(true);
        try {
          await poolContract.stake(stakeAmount);
          toast("Staking successful",{
            className: 'success',
            bodyClassName: "grow-font-size",
            progressClassName: 'fancy-progress-bar'
            });

        } catch (error) {
          toast("Staking error " + error.message,{
            className: 'success',
            bodyClassName: "grow-font-size",
            progressClassName: 'fancy-progress-bar'
        });
          // addToast({ title: 'Deposit Token error!', description: error.message, type: 'TOAST_ERROR' });
        } finally {
          setLoading(false);
          console.log("stake done");
          
        }
    };

    const unStake = async () => {
        setLoading(true);
        try {
            await poolContract.unstake();
            toast("Staking successful",{
                className: 'success',
                bodyClassName: "grow-font-size",
                progressClassName: 'fancy-progress-bar'
            });

        } catch (error) {
            toast("Staking error " + error.message,{
                className: 'success',
                bodyClassName: "grow-font-size",
                progressClassName: 'fancy-progress-bar'
            });
            // addToast({ title: 'Deposit Token error!', description: error.message, type: 'TOAST_ERROR' });
        } finally {
            setLoading(false);
            console.log("stake done");

        }
    };

    const approve = async () => {
        console.log("approve " + loading);

        setLoading(true);

        try {
            //TODO
            let approveAmount = parseEther("10000");
            // let approveAmount = 1000 * 10**18;
            console.log("approveAmount " + approveAmount);
            await vegaContract.approve(POOL_TOKEN_ADDRESS, approveAmount);
            // await depositLpToken(vegaContract, lpContract, account, amount);
            // addToast({ title: 'Deposit Success', description: "Successfully deposited", type: 'TOAST_SUCCESS' });
            // tokenBalance.refetch();
            // lpBalance.refetch();
            toast("approve successful",{
                className: 'success',
                bodyClassName: "grow-font-size",
                progressClassName: 'fancy-progress-bar'
            });

        } catch (error) {
            console.log({ error });
            toast("approve failed",{
                className: 'success',
                bodyClassName: "grow-font-size",
                progressClassName: 'fancy-progress-bar'
            });
            // addToast({ title: 'Deposit Token error!', description: error.message, type: 'TOAST_ERROR' });
        } finally {
            setLoading(false);
            //TODO reload amount
            //check allowance
            console.log("approve done");
            
        }
    };

    if (stakedAmount == 0 ) {
        return (
            <Card>

            <Card.Body>
             <h4 className="mb-3 header-title">Stake</h4>

            <Form>
             <Form.Group className="mb-3">
             <Form.Label htmlFor="exampleEmail2" column sm={2}>Amount: </Form.Label>
             
            <input
                 type="text"
                 value={stakeAmount}
                 onChange={e => setStakeamount(e.target.value)}
                 className="stakeInput" 
             />
            
             </Form.Group>

             <Button variant="primary" onClick={stake} className="m-1" disabled={stakedAmount > 0}>
                 Stake
             </Button>
        
             <ApproveButton allowance={allowance} approve={approve}/>            
         </Form>
            </Card.Body>
        </Card>
        )
    } else {
        return (
            <Card>
            <Card.Body>
                
            <h4 className="mb-3 header-title">Staked</h4>
            <StakeInfo staked={stakedAmount} />

            <Button variant="primary" onClick={unStake} className="m-1" disabled={stakedAmount <= 0}>
                Harvest
            </Button>
                
            </Card.Body>
        </Card>)
    }

};


const Stake = (): React$Element<React$FragmentType> => {
    return (
        <React.Fragment>            

            <Row>
                <Col lg={8}>
                    <StakeForm />
                </Col>

                {/* <Col lg={6}>
                    <HorizontalForm />
                </Col> */}
            </Row>

           
        </React.Fragment>
    );
};
export default Stake;
