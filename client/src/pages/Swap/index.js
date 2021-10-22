// TODO
// set logo

import { useWeb3React } from "@web3-react/core";
// import { BigNumber } from "ethers";
import React, { createContext, useMemo, useState } from "react";
import { Button, ButtonGroup, Col, Form, FormControl, InputGroup, Modal, Row, ToggleButton } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import _ from "underscore";
import ROUTER_ABI from "../../abis/Router.json";
import { default as contracts } from "../../chain/Contractsdef";
import { useContract } from "../../chain/eth.js";
import { PCS_ROUTER_ADDRESS } from "./addr";
import Tokentable from "./tokentable.js";
import * as trade from "./trade.js";
// const CurrencyContext = createContext('Default Value');

export const CurrencyContext = createContext({
  currencyName: "",
  setcurrencyName: () => {},
});

// export const ModalContext = createContext({
//   xmodal: "1",
//   xsetModal: () => {},
// });
// const config = {
//   wbnb: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
//   usdt: '0x55d398326f99059ff775485246999027b3197955',
//   pancakeSwapRouter: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
//   vga: '0x4EfDFe8fFAfF109451Fc306e0B529B088597dd8d',
//   slippage: 12,
// }

// async function getAllTokensOnUniswap() {
// 	try {
// 		let allFound = false
// 		let skipCount = 0
// 		let tokens = []
// 		while (!allFound) {
// 			let result = await client.query({
// 				query: ALL_TOKENS,
// 				variables: {
// 					skip: skipCount,
// 				},
// 				fetchPolicy: 'cache-first',
// 			})
// 			tokens = tokens.concat(result?.data?.tokens)
//       allFound = true;
// 			// if (result?.data?.tokens?.length < TOKENS_TO_FETCH || tokens.length > TOKENS_TO_FETCH) {
// 			// 	allFound = true
// 			// }
// 			// skipCount = skipCount += TOKENS_TO_FETCH
// 		}
// 		return tokens
// 	} catch (e) {
// 		console.log(e)
// 	}
// }

const CurrencySelect = (props) => {
  const [modal, setModal] = useState(false);
  const [size] = useState(null);
  const [className] = useState(null);
  const [scroll] = useState(null);

  // const { xmodal, xsetModal } = useContext(ModalContext);

  // const currencySelectValue = CurrencyContext(Context);
  // console.log(currencySelectValue);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <span>
      {/* <div className="button-list"> */}
      
      <Button size="lg" style={{ backgroundColor: "#1f2125", border: "none", height: "50px" }} onClick={toggle}>
        {props.currency}
      </Button>

      <Modal
        show={modal}
        onHide={toggle}
        dialogClassName={className}
        size={size}
        scrollable={scroll}
      >
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
          </Button>
          {" "}
        </Modal.Footer>
      </Modal>
    </span>
  );
};

const defaultSlippage = 0.5 / 100;
const defaultTokenPath = ["WBNB", "VGA"];
const defaultState = {
  loading: false,
  currentState: "connect-network", // wrong-network, enter-amount, waiting-for-swapping-results
};

function TokenInputUI(value, currencyName, token0Input, handleChange) {
  return (
    <div style={{background: "#22262c", height: "70px", borderRadius: "10px", width: "100%", padding: "5px"}}>
  <InputGroup className="mb-3">
    <CurrencyContext.Provider value={value} >
      <div style={{          
          marginLeft: "5px" ,         
          marginTop: "5px"          
        }}>
      <CurrencySelect currency={currencyName} />
      </div>
    </CurrencyContext.Provider>
    <FormControl
        size="lg"
        type="number"
        placeholder="Input amount"
        aria-label="Input amount"
        aria-describedby="token0Input"
        value={token0Input}
        style={{
          textAlign: "left",
          fontFamily: "Helvetica",
          fontSize: "1.3rem",
          height: "50px",
          border: "none",
          marginTop: "5px",
          marginLeft: "20px",
          background: "#1f2125",
        }}
        onChange={handleChange}
    />
  </InputGroup>
  </div>);
}

const PageSwap = () => {
  const { account, chainId } = useWeb3React();
  // TODO: Set token0, token1 properly
  let token0, token1;
  const routerContract = useContract(PCS_ROUTER_ADDRESS, ROUTER_ABI, true);

  const [state, setState] = useState(defaultState);
  const [token0Input, setToken0Input] = useState(0);
  const [token1Input, setToken1Input] = useState(0);
  const [currencyName, setcurrencyName] = useState("BNB");
  const value = useMemo(
    () => ({ currencyName, setcurrencyName }),
    [currencyName],
  );

  // ui
  const [slippage, setSlippage] = useState(defaultSlippage);

  const slippageRadios = [
    { name: "0.3%", value: 0.3 / 100 },
    { name: "0.5%", value: 0.5 / 100 },
    { name: "1%", value: 1 / 100 },
  ];

  const debounceOnChange = useMemo(() =>
    _.debounce(async (e) => {
      console.log(`running debounce`);
      await setOutputAmountText(routerContract, e); // add routerContract here  because of network changes
    }, 500), [routerContract]);

  if (chainId !== 56) {
    return <></>;
  }

  token0 = contracts[chainId][defaultTokenPath[0]];
  token1 = contracts[chainId][defaultTokenPath[1]];

  async function setOutputAmountText(routerContract, e) {
    if (routerContract === null) {
      console.log("You don't connect to bsc mainnet");
      return;
    }

    const amountText = e.target.value;
    const token0AmountEther = trade.convertTextToUnint256(amountText, token0);
    if (token0AmountEther === null) {
      return;
    }

    const outAmount = await trade.getAmountsOut(routerContract, token0AmountEther, [
      token0,
      token1,
    ]);
    const outAmountText = trade.toFloatNumber(outAmount, token1);
    setToken1Input(outAmountText.toFixed(2));
  }

  function handleChange(e) {
    const amountText = e.target.value;
    setToken0Input(amountText);
    debounceOnChange(e);
  }

  // Rewrite swap that supports both ETH->Token and Token->Token
  // float number should work properly
  async function swap() {
    console.log(`slippage`, slippage);
    if (routerContract === null) {
      console.log("You don't connect to bsc mainnet");
      return;
    }

    const amountIn = trade.convertTextToUnint256(token0Input, token0);
    console.log(`amountIn: ${amountIn}`);
    const amountOut = await trade.getAmountsOut(routerContract, amountIn, [
      token0,
      token1,
    ]);
    // calculate slippage
    const amountOutMin = amountOut.mul(Math.round((1 - slippage) * 1000)).div(1000);
    const status = await trade.swap(routerContract, amountIn, amountOutMin, [token0, token1], account);
    if (status === 1) {
      // Toast
    } else {
      // Toast
    }
  }

  return (
    <>
      <Row>
        <Col lg={12}>
          <div
              style={{
                height: "400px",
                width: "500px",
                backgroundColor: "#1c1f27",
                color: "white",
                margin: "0 auto",
                marginTop: "2rem",
                padding: "10px",
                boxShadow:
                    "rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px",
                borderRadius: "24px",
                border: "1px solid #000",
              }}
          >
            <Form.Group className="mb-3">
              <h1
                  style={{
                    "textAlign": "center",
                  }}
              >
                Swap
              </h1>
              <div className={"swapMain"}>
                <div className={"swapInput"}>
                  {TokenInputUI(value, currencyName, token0Input, handleChange)}
                  <br />
                  {TokenInputUI(value, "VGA", token1Input, () => {})}
                </div>
              </div>
            </Form.Group>

            <ButtonGroup
                className={"expertOptions"}
                style={{
                  margin: "10px 0",
                }}
            >
              <h5
                  style={{
                    marginRight: "5px",
                  }}
              >
                Slippage
              </h5>
              {slippageRadios.map((radio, idx) => {
                return (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        name="radio"
                        value={radio.value}
                        checked={slippage === radio.value}
                        onChange={(e) => {
                          setSlippage(parseFloat(e.currentTarget.value));
                        }}
                    >
                      {radio.name}
                    </ToggleButton>
                );
              })}
            </ButtonGroup>

            <div
                className={"buttons"}
                style={{
                  textAlign: "center",
                }}
            >
              <Button
                  variant="primary"
                  onClick={swap}
                  style={{width: "100%", fontSize: "1.2em"}}
              >
                Swap
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PageSwap;
