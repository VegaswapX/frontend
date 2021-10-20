//TODO
//set logo

import React, { useState, createContext, useMemo } from "react";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import "react-toastify/dist/ReactToastify.css";
import _ from "underscore";
import ROUTER_ABI from "../../abis/Router.json";
import { useContract } from "../../chain/eth.js";
import { default as contracts } from "../../chain/Contractsdef";
import { getAmountsOut, swapExactETHForTokens } from "./trade.js";
import Tokentable from "./tokentable.js";

import { WBNB, VGA, PCS_ROUTER_ADDRESS } from "./addr";

const defaultTokenPath = ["WBNB", "VGA"];

// import Tokens from './Tokens';

function SwapButton(props) {
  return (
    <Button
      variant="primary"
      onClick={props.swapIn}
      style={{ width: "180px", fontSize: "20pt" }}
    >
      Swap
    </Button>
  );
}

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

function toUnit256(amount, token) {
  return BigNumber.from(Math.round(amount * 1000000)).mul(
    BigNumber.from(10).pow(token.decimals - 6)
  );
}

function toFloatNumber(amount, token) {
  // check token decimals
  const y = amount.div(BigNumber.from(10).pow(12));
  return y.toNumber() / Math.pow(10, 6);
}

const CurrencySelect = (props) => {
  const [modal, setModal] = useState(false);
  const [size] = useState(null);
  const [className] = useState(null);
  const [scroll] = useState(null);

  // const { xmodal, xsetModal } = useContext(ModalContext);

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
    // setcurrencyName("ZZZZ")
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
          </Button>{" "}
        </Modal.Footer>
      </Modal>
    </span>
  );
};


// const defaultSlippage = 0.5 / 100;

const PageSwap = () => {
  const { account } = useWeb3React();

  const chainId = 56;

  // TODO: Set token0, token1 properly

  // TODO: Clean all this
  const [amount] = React.useState(0);
  const [amountOut] = React.useState(0);

  const token0 = contracts[chainId][defaultTokenPath[0]];
  const token1 = contracts[chainId][defaultTokenPath[1]];

  const [token0Input, setToken0Input] = useState(0);
  // const [token1Input, setToken1Input] = useState(0);
  const [setToken1Input] = useState(0);

  const routerContract = useContract(PCS_ROUTER_ADDRESS, ROUTER_ABI, true);

  // async function getRate(amount, path) {
  //   if (amount > 0) {
  //     let x = await routerContract.callStatic.getAmountsOut(amount, path);
  //     return x[1];
  //   }
  // }

  const debounceHandleChange = _.debounce(async (amountText) => {
    console.log(`amountText`, amountText);
    // setToken0Input(amountText);
    console.log(`Running debounce`);
    let amount;
    try {
      amount = parseFloat(amountText); // why parseInt
    } catch (e) {
      console.log("Cannot parse float", amountText);
    }

    // function swapIn() {
    //     console.log("swap in " + amount);
    // }
    if (isNaN(amount) || amount <= 0) {
      return;
    }

    console.log(`amount`, amount);

    let etherAmount = toUnit256(amount, token0);
    console.log(`etherAmount`, etherAmount.toString());
    const outAmount = await getAmountsOut(routerContract, etherAmount, [
      token0,
      token1,
    ]);
    const outAmountFloat = toFloatNumber(outAmount, token1);
    console.log(`outAmount`, outAmountFloat);
    setToken1Input(outAmountFloat.toFixed(2));
    // convert back to float
  }, 500);

  function handleChange(e) {
    const amountText = e.target.value;
    console.log(`amountText`, amountText);
    setToken0Input(amountText);
    debounceHandleChange(amountText);
  }

  // TODO: Clean this up
  async function swapIn() {
    console.log(amount);
    console.log(amountOut);

    // 1%

    let slip = Math.floor((amountOut * 990) / 1000);
    let amountOutMin = amountOut - slip;
    console.log("Calculated Amounts out: " + amountOutMin);
    const to = account;
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10min
    console.log(amountOutMin, [WBNB, VGA], to, deadline);
    let receipt = await swapExactETHForTokens(
      routerContract, 
      amount,
      amountOutMin,
      to,
      deadline
    );
    console.log("tx " + receipt);
  }

  // useEffect(() => {
  //   if (!!account && !!library) {
  //     (async () => {
  //       let pricef = await getRate(amount, routerContract);
  //       console.log("price: " + pricef);
  //       // setPrice(pricef);
  //     })();
  //   }
  // }, [account, library, routerContract, amount, getRate]);

  // const currencySelect = 'BNB';

  // const value = 'BNB';

  const [currencyName, setcurrencyName] = useState("BNB");

  // const { xmodal, xsetModal } = useContext(ModalContext);

  const value = useMemo(
    () => ({ currencyName, setcurrencyName }),
    [currencyName]
  );

  // const mvalue = useMemo(
  //   () => ({ xmodal, xsetModal }),
  //   [xmodal]
  // );

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
                {/* 
  //TODO fix
  //               <input
  //                 value={}
  //                 
  //               />
  //                   {token1Input} */}

                <input
                  type="text"
                  value={token0Input}
                  // onChange={e => setAmountOut(e.target.value)}
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
                    {amountOut !== null ? amountOut : "NA"}
                  </span>

                  <span
                    style={{
                      marginLeft: "80px",
                      textAlign: "right",
                      fontSize: "22px",
                    }}
                  >
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
