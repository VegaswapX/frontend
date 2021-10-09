// @flow
import React from 'react';
import { useState } from "react";
import { Row, Col, Card, Form, Button} from 'react-bootstrap';
// import { useWeb3React } from "@web3-react/core";
import VEGA_CONTRACT_ABI from "../../../abis/erc20.json";
import POOL_CONTRACT_ABI from "../../../abis/BoostPool.json";
import { useContract } from "../../../chain/eth.js";
import { VEGA_TOKEN_ADDRESS, POOL_TOKEN_ADDRESS } from "../../../chain/Contracts.js";
import {parseEther} from "ethers/lib/utils";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// components
// import PageTitle from '../components/PageTitle';


const StakeForm = () => {

    // const { account, library } = useWeb3React();
    // const [stakeBalance, setStakeBalance] = useState(0)
    //CONTRACT_MAP["BoostPool"]
    const vegaContract = useContract(VEGA_TOKEN_ADDRESS, VEGA_CONTRACT_ABI, true);

    const poolContract = useContract(POOL_TOKEN_ADDRESS, POOL_CONTRACT_ABI, true);

    // const [loading, setLoading] = useState(false);

    // const [vgaallow, setVgaAllowance] = React.useState();

    const [stakeAmount, setStakeamount] = React.useState(0);

    // const [poolStaked, setPoolstaked] = React.useState()

    const [loading, setLoading] = useState(false);    

    const stake = async () => {
        console.log("stake " + poolContract);
        
    
        setLoading(true);
    
        try {
          // let approveAmount = 10000 * 10**18;
          let stakeAmountDec = stakeAmount * 10**18;
          alert(stakeAmountDec);
          await poolContract.stake(stakeAmount);
          // await depositLpToken(vegaContract, lpContract, account, amount);
          // addToast({ title: 'Deposit Success', description: "Successfully deposited", type: 'TOAST_SUCCESS' });
          // tokenBalance.refetch();
          // lpBalance.refetch();
          toast("Staking successful",{
            className: 'success',
            bodyClassName: "grow-font-size",
            progressClassName: 'fancy-progress-bar'
            });

        } catch (error) {
          console.log("error " + { error });
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
        //check allowance
        console.log("approve done");
        toast("approve successful",{
            className: 'success',
            bodyClassName: "grow-font-size",
            progressClassName: 'fancy-progress-bar'
        });
    }
    };

    return (
        <Card>
            <Card.Body>
                <h4 className="mb-3 header-title">Stake (if staked show staked)</h4>

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="exampleEmail2">Amount</Form.Label>
                        {/* <Form.Control type="email" name="email" id="exampleEmail2" placeholder="... $" /> */}
                        <input
                            type="text"
                            value={stakeAmount}
                            onChange={e => setStakeamount(e.target.value)}
                        />
                        <Form.Text>Amount to stake</Form.Text>
                    </Form.Group>

                    {/* <Form.Group className="mb-3">
                        <Form.Label htmlFor="examplePassword2">Duration</Form.Label>
                        <Form.Control                            
                            name="duration"
                            id="duration"
                            placeholder="duration"
                            defaultValue="30"
                        />
                        <Form.Text>Days to stake</Form.Text>
                    </Form.Group> */}

                    {/* <Form.Group className="mb-3" id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}
                    <Button variant="primary" onClick={approve}>
                        Approve
                    </Button>

                    <Button variant="primary" onClick={stake}>
                        Stake
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
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
