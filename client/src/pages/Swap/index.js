//TODO
//set logo

import React, {useEffect, useState, createContext, useContext, useMemo} from 'react';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { useWeb3React } from "@web3-react/core";
// import VEGA_CONTRACT_ABI from "../../../abis/erc20.json";
// import POOL_CONTRACT_ABI from "../../../abis/BoostPool.json";
import FACTORY_ABI from "../../abis/Factory.json";
import ROUTER_ABI from "../../abis/Router.json";
import { useContract } from "../../chain/eth.js";
import { ethers } from "ethers";
import {swapETH} from './trade.js';
// import { useTable } from "react-table";
import Tokentable from "./tokentable.js";
import {someData} from './graphinfo'

import {WBNB, VGA, FACTORY_ADDRESS, PCS_ROUTER_ADDRESS} from './addr'

// import Tokens from './Tokens';

function SwapButton(props){
    return (
    <Button variant="primary" onClick={props.swapIn}  style={{width: "180px", fontSize: "20pt"}}>
            Swap
        </Button>    
    )        
}

// const CurrencyContext = createContext('Default Value');


export const UserContext = createContext({
  userName: '',
  setUserName: () => {},
});

export const ModalContext = createContext({
  xmodal: "1",
  xsetModal: () => {},
});


const CurrencySelect = (props) => {
    const [modal, setModal] = useState(false);
    const [size] = useState(null);
    const [className] = useState(null);
    const [scroll] = useState(null);

    // const { xmodal, xsetModal } = useContext(ModalContext);
    const { userName, setUserName } = useContext(UserContext);

    // const currencySelectValue = CurrencyContext(Context);
    // console.log(currencySelectValue);    

    // const currency = "test";
    /**
     * Show/hide the modal
     */
    const toggle = () => {
        // console.log(">>??? " + modal);
        // if (modal == "false"){
        //   console.log("?? " + modal);
        //   setModal("true");
        // } else {          
        //   setModal("true");
        //   console.log("?? " + modal);
        // }
        setModal(!modal);
        // xsetModal(!xmodal);
        // xsetModal("2");
        // console.log(modal);
        // console.log(xmodal);
        // setUserName("ZZZZ")
    };


    return (
        <span>          
              {/* <div className="button-list"> */}
                  <Button style={{backgroundColor:"black"}} onClick={toggle}>
                      {props.currency}
                  </Button>
                  
                  
              <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                  <Modal.Header onHide={toggle} closeButton>
                      <h4 className="modal-title">Select a token</h4>
                  </Modal.Header>
                  <Modal.Body>

                  {/* <span> {{currencySelectValue}}</span> */}                  
                                  

                      <Tokentable />                                            
                      
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="light" onClick={toggle}>
                          Close
                      </Button>{' '}                      
                  </Modal.Footer>
              </Modal>
          
        </span>
    );
};


const PageSwap = () => {

    const { account, library } = useWeb3React();
    
    const [amount] = React.useState(0);
    const [amountOut] = React.useState(0);
    const [setPairslength] = React.useState(0);    

    // const ROUTER = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
        
    const factoryContract = useContract(FACTORY_ADDRESS, FACTORY_ABI, true);
    const routerContract = useContract(PCS_ROUTER_ADDRESS, ROUTER_ABI, true);

    async function getPrice(amount){      
      if (amount > 0 && routerContract){
        let x = await routerContract.callStatic
              .getAmountsOut(amount, [WBNB, VGA]);                      
        return x[1];   
      } else {
        return 0;
      }
    }

    async function setAmountOut(amountStr){

        // let am = parseInt(amount);
        // let x = ethers.utils.parseUnits('0.01', 'ether');
        try {
          let x = ethers.utils.parseUnits(amountStr, 'ether');
          console.log("?? " + x);

          console.log(">>> " + amountStr);    
          let am = parseFloat(amountStr);
          // const b = ethers.utils.parseUnits(am, 18)

          // let am = ethers.utils.formatEth(amount.toString());
          // let am = parseFloat(amount);
          // am = am * 10**18;
          // console.log(">>> " + b);    
          console.log(">>> " + am);    
          // console.log(">>> " + am / 10**18);    
          // let pm = parseInt(amountOut);        
          // setAmount(am.toString());
          // setAmount(amount);
          // setAmountDec(am);
          // let z = await getPrice(am);        
          // setAmountout(z.toString());
        } catch {
            console.log("error")
        }
    }


    async function swapIn(){
      console.log(amount);
      console.log(amountOut);

      //1%

      let slip = Math.floor(amountOut * 990 / 1000);
      let amountOutMin = amountOut - slip;
      console.log('Calculated Amounts out: ' + amountOutMin);
      const to = account;
      const deadline = Math.floor(Date.now() / 1000) + 60 * 10; //10min
      console.log(amountOutMin,[WBNB, VGA],to,deadline);
      let receipt = await swapETH(routerContract, amount, amountOutMin, to, deadline);
      console.log("tx " + receipt);
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
      }, [account, library, factoryContract, setPairslength]);

      useEffect(() => {

        if (!!account && !!library) {
          (async () => {
            let pricef = await getPrice(amount, routerContract);
            console.log("price: " + pricef);
            // setPrice(pricef);                        
          })()
          
        }
      }, [account, library, routerContract, amount]);      

      useEffect(() => {
        async function fetchData() {
          // let globalData = await getGlobalData(ethPrice, oldEthPrice)
          // globalData && update(globalData)

          let d= await someData();
          console.log(">> " + d);
      
          // let allTokens = await getAllTokensOnUniswap()
         
          // updateAllTokensInUniswap(allTokens)
        }
        // if (!data && ethPrice && oldEthPrice) {
        //   fetchData()
        // }
        fetchData();
      }, [])
      

    // function swapIn() {
    //     console.log("swap in " + amount);    
    // }

    // function swapOut() {
    //     console.log("swap out " + amount);    
    // }


    // const currencySelect = 'BNB';

    // const value = 'BNB';

    const [userName, setUserName] = useState('BNB');

    const { xmodal, xsetModal } = useContext(ModalContext);

    const value = useMemo(
      () => ({ userName, setUserName }), 
      [userName]
    );

    // const mvalue = useMemo(
    //   () => ({ xmodal, xsetModal }), 
    //   [xmodal]
    // );

    return (
        <>
        
            <Row>
                <Col lg={7}>                    
                  <div style={{height: "400px", width: "400px", backgroundColor: "#1c1f27", color: "white"}}>
                    
                  <Form.Group className="mb-3">

                    <h1>Swap</h1>                    
                    
                    <div style={{backgroundColor: "rgb(19,20,25)", borderRadius: "10px", height: "120px", width: "200px"}}>
                    
                    <input
                        type="text"
                        value={amount}
                        onChange={e => setAmountOut(e.target.value)}
                        className="" 
                        step="0.01"
                        style={{fontSize: "22px", borderRadius: "10px", backgroundColor: "rgb(19,20,25)", color: "white", marginTop: "20px",  marginLeft: "30px", border: "0px", width: "100px"}}
                    />

                    {/* <span style={{marginLeft: "10px", fontSize: "22px"}}> */}
                    <span style={{fontSize: "22px"}}>
                      {/* <Context.Provider currencySelect={value} value={value}> */}
                        <ModalContext.Provider mvalue={false}>
                        <UserContext.Provider value={value}>
                        <CurrencySelect currency={userName}/>
                        </UserContext.Provider>
                        </ModalContext.Provider>
                       {/* </Context.Provider> */}
                       {/* {userName !== null ? userName : ""} */}
                    </span>

                    <br/>

                    <div style={{marginLeft: "30px", marginTop: "10px"}}>
                      
                    <span style={{marginLeft: "3px", width: "100px", fontSize: "22px", color: "white"}}>
                    {amountOut !== null ? amountOut : "NA"}
                    </span>

                    <span style={{marginLeft: "80px", textAlign: "right", fontSize: "22px"}}>
                    {/* <Context.Provider currencySelect={currencySelect}>
                      <CurrencySelect currency={"VGA"}/>
                      </Context.Provider> */}
                    </span>
                    </div>

                    </div>

                                       
                    </Form.Group>

                    <SwapButton swapIn={swapIn}></SwapButton>

                    

                  </div>
                                        
                </Col>
            </Row>
        </>
    );
};

export default PageSwap;
