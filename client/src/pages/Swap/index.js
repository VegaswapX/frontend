// @flow
import React from 'react';
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
    const [pairslength, setPairslength] = React.useState(0);
    const [price, setPrice] = React.useState(0);

    // const ROUTER = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
    const FACTORY_ADDRESS = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
    const PCS_ROUTER_ADDRESS = '0x10ed43c718714eb63d5aa57b78b54704e256024e';
    
    const factoryContract = useContract(FACTORY_ADDRESS, FACTORY_ABI, true);

    const routerContract = useContract(PCS_ROUTER_ADDRESS, ROUTER_ABI, true);

    
    React.useEffect(() => {
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

      React.useEffect(() => {
        if (!!account && !!library) {
          let stale = false;

          // const amounts = await pancakeswap.getAmountsOut(amountIn, [
          //   tokenIn,
          //   tokenOut,
          // ])
    
          routerContract.callStatic
            .getAmountsOut(1, [WBNB, VGA])
            .then((x) => {
              if (!stale) {
                console.log("router >>>>: " + x);
                setPrice(x[1].toString());                
                // setPairslength(x.toString());
              } else {
                  console.log("...")
              }
            })
            .catch(() => {
              if (!stale) {
                // setPairslength(null);
              }
            });
    
          return () => {
            stale = true;
            console.log("...")
            // setPairslength(undefined);
          };
        }
      }, [account, library, routerContract]);      

    function swapIn() {
        console.log("swap in " + amount);    
    }

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
                    <input
                        type="text"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        className="" 
                    />
                    
                    </Form.Group>

                    <SwapButton swapIn={swapIn}></SwapButton>
                    <SwapOutButton swapIn={swapOut}></SwapOutButton>

                    <br />
                    pairslength: {pairslength !== null ? pairslength : "NA"}
                    <br />
                    Price: {price !== null ? price : "NA"}
                </Col>
            </Row>
        </>
    );
};

export default PageSwap;
