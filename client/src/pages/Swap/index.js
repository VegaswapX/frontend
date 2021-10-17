// @flow
import React, {useEffect} from 'react';
import { Row, Col, Button, Form} from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { useWeb3React } from "@web3-react/core";
// import VEGA_CONTRACT_ABI from "../../../abis/erc20.json";
// import POOL_CONTRACT_ABI from "../../../abis/BoostPool.json";
import FACTORY_ABI from "../../abis/Factory.json";
import ROUTER_ABI from "../../abis/Router.json";
// import { VEGA_TOKEN_ADDRESS, POOL_TOKEN_ADDRESS } from "../../../chain/Contracts.js";
import { useContract } from "../../chain/eth.js";
import { ethers } from "ethers";

function SwapButton(props){
    return (
    <Button variant="primary" onClick={props.swapIn}>
            SwapIn
        </Button>    
    )        
}

function SwapOutButton(props){
    return (
    <Button variant="primary" onClick={props.swapIn}>
            SwapOut
        </Button>    
    )        
}

const config = {
  wbnb: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  usdt: '0x55d398326f99059ff775485246999027b3197955',
  pancakeSwapRouter: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
  vga: '0x4EfDFe8fFAfF109451Fc306e0B529B088597dd8d',
  slippage: 12,
}

let WBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
let VGA = "0x4EfDFe8fFAfF109451Fc306e0B529B088597dd8d";


const PageSwap = (): React$Element<React$FragmentType> => {

    const { account, library } = useWeb3React();
    
    const [amount, setAmount] = React.useState(0);
    const [amountOut, setAmountout] = React.useState(0);
    const [pairslength, setPairslength] = React.useState(0);    

    // const ROUTER = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
    const FACTORY_ADDRESS = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
    const PCS_ROUTER_ADDRESS = '0x10ed43c718714eb63d5aa57b78b54704e256024e';
    
    const factoryContract = useContract(FACTORY_ADDRESS, FACTORY_ABI, true);
    const routerContract = useContract(PCS_ROUTER_ADDRESS, ROUTER_ABI, true);

    async function getPrice(amount){      
      if (amount > 0){
        let x = await routerContract.callStatic
              .getAmountsOut(amount, [WBNB, VGA]);                      
        return x[1];   
      }
    }

    async function setAmountPrice(amount){
        let am = parseInt(amount);
        let pm = parseInt(amountOut);        
        setAmount(am.toString());
        let v= am * pm;        
        setAmount(amount);
        let z = await getPrice(amount);        
        setAmountout(z.toString());
    }

    async function swapIn(){
      console.log(amount);
      console.log(amountOut);

      // const amountIn = 1000;      
      // console.log(amounts[1])
      // slippage = 2;
      // let z = amounts[1].div(slippage);
      // console.log("? " + z + " " + amounts[1]);
      // let slip = 7787;
      // amountOutMin = amounts[1] - slip;
      // let z = amounts[1].div(slippage);
      let slip = 1000;
      let amountOutMin = amountOut - slip; //slipapge set here 
      console.log('Calculated Amounts out: ' + amountOutMin);
      const to = account;
      const deadline = Math.floor(Date.now() / 1000) + 60 * 10; //10min
      console.log(amountOutMin,
        [WBNB, VGA],
        to,
        deadline);
      const tx = await routerContract.swapExactETHForTokens(
          amountOutMin,
          [WBNB, VGA],
          to,
          deadline,
          {value: amount, gasPrice: 10e9}
      );
      console.log('Transaction Submitted, heres the hashcode '+ tx.hash)
      let receipt = await tx.wait();
      console.log(receipt);
    }

    useEffect(() => {
        if (!!account && !!library) {
          let stale = false;
    
          factoryContract.callStatic
            .allPairsLength()
            .then((x) => {
              if (!stale) {
                console.log("allPairsLength: " + x);
                setPairslength(x.toString());
              } else {
                  console.log("...")
              }
            })
            .catch(() => {
              if (!stale) {
                setPairslength(null);
              }
            });
    
          return () => {
            stale = true;
            console.log("...")
            setPairslength(undefined);
          };
        }
      }, [account, library, factoryContract]);

      useEffect(() => {

        if (!!account && !!library) {
          (async () => {
            let pricef = await getPrice(amount, routerContract);
            console.log("price: " + pricef);
            // setPrice(pricef);                        
          })()
          
        }
      }, [account, library, routerContract]);      

    // function swapIn() {
    //     console.log("swap in " + amount);    
    // }

    function swapOut() {
        console.log("swap out " + amount);    
    }

    // price = router.functions.getAmountsIn(qty, route).call()[0]

    return (
        <>
        <h1>Swap VGA</h1>
            <Row>
                <Col lg={7}>                    

                    <Form.Group className="mb-3">
                    <Form.Label htmlFor="">BNB VGA</Form.Label>
                    <div style={{backgroundColor: "rgb(19,20,25)", borderRadius: "10px", height: "120px", width: "200px"}}>
                    <span style={{marginLeft: "30px"}}>BNB</span>
                    <input
                        type="text"
                        value={amount}
                        onChange={e => setAmountPrice(e.target.value)}
                        className="" 
                        style={{fontSize: "20px", borderRadius: "10px", backgroundColor: "rgb(19,20,25)", color: "white", marginTop: "20px",  marginLeft: "30px", border: "0px", width: "100px"}}
                    />
                    <br/>
                    <div style={{marginLeft: "30px", marginTop: "10px"}}>VGA
                    <span style={{marginLeft: "30px", fontSize: "20px", color: "white"}}>
                    {amountOut !== null ? amountOut : "NA"}
                    </span>
                    </div>
                    </div>

                                       
                    </Form.Group>

                    <SwapButton swapIn={swapIn}></SwapButton>
                    <SwapOutButton swapIn={swapOut}></SwapOutButton>

                    {/* <br />
                    pairslength: {pairslength !== null ? pairslength : "NA"} */}
                    <br />
                    
                </Col>
            </Row>
        </>
    );
};

export default PageSwap;
