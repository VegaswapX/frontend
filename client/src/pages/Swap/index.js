// TODO
// set logo

import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import React, { createContext, useMemo, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import _ from "underscore";
import ROUTER_ABI from "../../abis/Router.json";
import { default as contracts } from "../../chain/Contractsdef";
import { useContract } from "../../chain/eth.js";
import { PCS_ROUTER_ADDRESS, VGA, WBNB } from "./addr";
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
      <Button style={{ backgroundColor: "black" }} onClick={toggle}>
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

const PageSwap = () => {
  const { account } = useWeb3React();
  // TODO: Set token0, token1 properly
  const chainId = 56; // whole app need to double check on account connection
  let token0, token1;
  const routerContract = useContract(PCS_ROUTER_ADDRESS, ROUTER_ABI, true);

  const [slippage, setSlippage] = useState(defaultSlippage);
  const [token0Input, setToken0Input] = useState(0);
  const [token1Input, setToken1Input] = useState(0);
  const [currencyName, setcurrencyName] = useState("BNB");
  const value = useMemo(
    () => ({ currencyName, setcurrencyName }),
    [currencyName],
  );

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

  // TODO: Clean all this
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
    const tx = await trade.swap(routerContract, amountIn, amountOutMin, [token0, token1], account);
  }

  // const { xmodal, xsetModal } = useContext(ModalContext);

  return (
    <>
      <Row>
        <Col lg={7}>
          <div
            style={{
              height: "400px",
              width: "450px",
              backgroundColor: "#1c1f27",
              color: "white",
            }}
          >
            <Form.Group className="mb-3">
              <h1>Swap</h1>
              <div
                style={{
                  backgroundColor: "rgb(19,20,25)",
                  borderRadius: "10px",
                  height: "120px",
                  width: "280px",
                }}
              >
                <input
                  type="text"
                  value={token0Input}
                  onChange={handleChange}
                  className=""
                  step="0.01"
                  style={{
                    fontSize: "22px",
                    borderRadius: "10px",
                    backgroundColor: "rgb(19,20,25)",
                    color: "white",
                    marginTop: "20px",
                    marginLeft: "30px",
                    border: "0px",
                    width: "100px",
                  }}
                />

                {/* <span style={{marginLeft: "10px", fontSize: "22px"}}> */}
                <span style={{ fontSize: "22px" }}>
                  {/* <ModalContext.Provider mvalue={false}> */}
                  <CurrencyContext.Provider value={value}>
                    <CurrencySelect currency={currencyName} />
                  </CurrencyContext.Provider>
                  {/* </ModalContext.Provider> */}
                </span>

                <br />

                <div style={{ marginLeft: "30px", marginTop: "10px" }}>
                  <span
                    style={{
                      marginLeft: "3px",
                      width: "100px",
                      fontSize: "22px",
                      color: "white",
                    }}
                  >
                    {token1Input}
                  </span>

                  <span
                    style={{
                      marginLeft: "80px",
                      textAlign: "right",
                      fontSize: "22px",
                    }}
                  >
                    {
                      // <Context.Provider currencySelect={currencySelect}>
                      //   <CurrencySelect currency={"VGA"} />
                      // </Context.Provider>
                    }
                  </span>
                </div>
              </div>
            </Form.Group>

            <Button
              variant="primary"
              onClick={swap}
              style={{ width: "180px", fontSize: "20pt" }}
            >
              Swap
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PageSwap;
