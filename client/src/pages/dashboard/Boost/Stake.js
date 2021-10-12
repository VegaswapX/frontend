// @flow
import React from 'react';
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Row, Col, Card, Form, Button} from 'react-bootstrap';
// import { useWeb3React } from "@web3-react/core";
import VEGA_CONTRACT_ABI from "../../../abis/erc20.json";
import POOL_CONTRACT_ABI from "../../../abis/BoostPool.json";
import { VEGA_TOKEN_ADDRESS, POOL_TOKEN_ADDRESS } from "../../../chain/Contracts.js";
import { useContract } from "../../../chain/eth.js";
import {parseEther} from "ethers/lib/utils";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// components
// import PageTitle from '../components/PageTitle';

function Amounts(props) {
    console.log("?? " + props.staked)
    if (props.staked === null) {return "Loading"}
    return (    
    <>
        Staked: {props.staked === 0 ? "0": props.staked}
    </>
    )
}

function ApproveButton(props){
    console.log("> " + props.allowance)
    if (props.allowance === 0) {
        <Button variant="primary" onClick={props.approve}>
            Approve
        </Button>    
    }        
    return (        
        <Button variant="secondary">
            Approved
        </Button> 
    )
}

const StakeForm = () => {
    const { account, library } = useWeb3React();

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
    const [allowance, setAllowance] = useState(false); 
    const [mystake, setMyStake] = useState(false); 
    const [myreward, setMyReward] = useState(false); 
    
    React.useEffect(() => {
        if (!!account && !!library) {
          let stale = false;
    
          vegaContract.callStatic
            .allowance(account, poolContract.address)
            .then((x) => {
              if (!stale) {
                console.log("?? allowance: " + x);
                x = x / 10 ** 18;
                setAllowance(x);
              } else {
                  console.log("...")
              }
            })
            .catch(() => {
              if (!stale) {
                setAllowance(null);
              }
            });
    
          return () => {
            stale = true;
            setAllowance(undefined);
          };
        }
      }, [account, library, vegaContract, poolContract]);

      React.useEffect(() => {
        if (!!account && !!library) {
          let stale = false;
    
          poolContract.callStatic
            .stakes(account)
            .then((x) => {
              if (!stale) {
                // console.log("?? stakes: " + x + " " + account); 
                console.log("!! stakes: " + x);
                // setMyStake(x[1]);
                // setMyReward(x[3]);
              }
            })
            .catch(() => {
              if (!stale) {
                setMyStake(null);
              }
            });
    
          return () => {
            stale = true;
            setMyStake(undefined);
          };
        }
      }, [account, library, poolContract]);


    const stake = async () => {
        console.log("stake " + poolContract);
    
        setLoading(true);
    
        try {
          // let approveAmount = 10000 * 10**18;
        //   let stakeAmountS = parseEther(stakeAmount);
        //   let stakeAmountDec = stakeAmount * 10**18;
            console.log("!!! stakeAmount " + stakeAmount);
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

    return (
        <Card>
            <Card.Body>
                <h4 className="mb-3 header-title">Stake</h4>

            {/* <span>allowance: 
                {allowance === null
              ? "Error"
              : `${allowance}`}
              </span> */}

                <Form>
                  <>
                  {<ApproveButton allowance={allowance} approve={approve}/>
                  }

                    <Form.Group className="mb-3">
                    <Form.Label htmlFor="exampleEmail2">Amount: </Form.Label>
                    <input
                        type="text"
                        value={stakeAmount}
                        onChange={e => setStakeamount(e.target.value)}
                    />
                    
                    </Form.Group>

                    <Button variant="primary" onClick={stake}>
                        Stake
                    </Button> 
                    </>                
                    
                    {/* <Form.Text>Amount to stake</Form.Text> */}
                                        
                    {/* Staked amount: {mystake.toLocaleString()} USDT */}
                    <br />
                    <Amounts staked={mystake}/>
                    {/* Reward amount: {myreward === null ? 0 : myreward} VGA */}
                    
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
