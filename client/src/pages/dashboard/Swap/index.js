// @flow
import React from 'react';
import { Row, Col, Button, Form} from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { useWeb3React } from "@web3-react/core";
// import VEGA_CONTRACT_ABI from "../../../abis/erc20.json";
// import POOL_CONTRACT_ABI from "../../../abis/BoostPool.json";
import FACTORY_ABI from "../../../abis/Factory.json";
// import { VEGA_TOKEN_ADDRESS, POOL_TOKEN_ADDRESS } from "../../../chain/Contracts.js";
import { useContract } from "../../../chain/eth.js";

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


const PageSwap = (): React$Element<React$FragmentType> => {

    const { account, library } = useWeb3React();
    
    const [amount, setAmount] = React.useState(0);
    const [pairslength, setPairslength] = React.useState(0);

    // const ROUTER = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
    const FACTORY_ADDRESS = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
    
    const factoryContract = useContract(FACTORY_ADDRESS, FACTORY_ABI, true);

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
                    />
                    
                    </Form.Group>

                    <SwapButton swapIn={swapIn}></SwapButton>
                    <SwapOutButton swapIn={swapOut}></SwapOutButton>

                    pairslength: {pairslength !== null ? pairslength : "NA"}
                </Col>
            </Row>
        </>
    );
};

export default PageSwap;
