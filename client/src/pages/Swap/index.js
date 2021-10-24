// TODO
// set logo

import { useWeb3React } from "@web3-react/core";
// import { BigNumber } from "ethers";
import React, { createContext, useMemo, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { toast } from "react-toastify";
import _ from "underscore";
import ROUTER_ABI from "../../abis/Router.json";
import { Chains, Contracts } from "../../chain/constants";
import { useContract } from "../../chain/eth.js";
import { PCS_ROUTER_ADDRESS } from "./addr";

import { CurrencySelect } from "./CurrencySelect";
import { SettingsModal } from "./SettingsModal.js";
import * as trade from "./trade.js";
import { store } from "../../redux/store";


function TokenInputUI(
  token0Input,
  tokenType,
  handleChange,
  opts = { disabled: false }
) {
  //console.log("store state is: " + store.getState());

  store.subscribe(() => {
    let i = store.getState().tokenReducer.tokenIn;
    let o = store.getState().tokenReducer.tokenOut;
    console.log(">> " + i + " " + o);
  })

  const { disabled } = opts;

  return (
    <div
      style={{
        background: "#22262c",
        height: "70px",
        borderRadius: "10px",
        width: "100%",
        padding: "5px",
      }}
    >
      <InputGroup className="mb-3">
        
          <div
            style={{
              marginLeft: "5px",
              marginTop: "5px",
            }}
          >{tokenType=="TokenIn" ? 
          <CurrencySelect currency={store.getState().tokenReducer.tokenIn} tokenType={tokenType}/> :
          <CurrencySelect currency={store.getState().tokenReducer.tokenOut} tokenType={tokenType}/>
        }
          </div>
        
        <FormControl
          size="lg"
          type="number"
          placeholder="Amount"
          aria-label="Amount"
          aria-describedby="token0Input"
          value={token0Input}
          disabled={disabled}
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
    </div>
  );
}

//const defaultSlippage = 0.5 / 100;
const defaultTokenPath = ["WBNB", "VGA"];
// const defaultState = {
//   loading: false,
//   currentState: "connect-network", // wrong-network, enter-amount, waiting-for-swapping-results
// };

const swapButtonStates = {
  wrongNetwork: {
    disabled: true,
    text: "Connect to BSC network",
  },
  correctNetwork: {
    disabled: false,
    text: "Swap",
  },
};

const PageSwap = () => {
  const { account, chainId } = useWeb3React();

  
  const routerContract = useContract(PCS_ROUTER_ADDRESS, ROUTER_ABI, true);

  // const [state, setState] = useState(defaultState);
  const [token0Input, setToken0Input] = useState(0);
  const [token1Input, setToken1Input] = useState(0);

  

  // ui
  // const [slippage, setSlippage] = useState(defaultSlippage);

  // const slippageRadios = [
  //   { name: "0.3%", value: 0.3 / 100 },
  //   { name: "0.5%", value: 0.5 / 100 },
  //   { name: "1%", value: 1 / 100 },
  // ];

  const debounceOnChange = useMemo(
    () =>
      _.debounce(async (e) => {
        console.log(`running debounce`);
        await setOutputAmountText(routerContract, e); // add routerContract here  because of network changes
      }, 500),
    [routerContract]
  );

  let swapButtonState, tokenInputDisabled;
  //TODO remove and handle elsewhere
  if (chainId === Chains.BSC_MAINNET.chainId) {    
    swapButtonState = swapButtonStates["correctNetwork"];
    tokenInputDisabled = false;
  } else {
    // token0 = null;
    // token1 = null;
    swapButtonState = swapButtonStates["wrongNetwork"];
    tokenInputDisabled = true;
  }

  async function setOutputAmountText(routerContract, e) {
    console.log("setOutputAmountText " + e);

    if (routerContract === null) {
      console.log("You don't connect to bsc mainnet");
      return;
    }

    let token0 = store.getState().tokenReducer.tokenIn;
    let token1 = store.getState().tokenReducer.tokenOut;
    // console.log("token0 " + token0.contract);
    // console.log("token1 " + token1.contract);

    const amountText = e.target.value;
    //console.log("amountText " + amountText);
    const token0AmountEther = trade.convertTextToUnint256(amountText, token0);
    if (token0AmountEther === null) {
      setToken1Input(0);
      return;
    }

    const outAmount = await trade.getAmountsOut(
      routerContract,
      token0AmountEther,
      [token0, token1]
    );
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
    let slip = store.getState().slippageReducer.value;
    let token0 = store.getState().tokenReducer.tokenIn;
    let token1 = store.getState().tokenReducer.tokenOut;
    console.log(`slippage`, slip);
    console.log(`token0`, token0);
    console.log(`token1`, token1);
    let executeTrade = false;

    if (executeTrade) {
      if (routerContract === null) {
        console.log("You don't connect to bsc mainnet");
        return;
      }

      const amountIn = trade.convertTextToUnint256(token0Input, token0);

      if ((amountIn == 0) | (amountIn == null)) {
        toast.error("Amount is 0");
        return;
      }
      console.log(`amountIn: ${amountIn}`);
      const amountOut = await trade.getAmountsOut(routerContract, amountIn, [
        token0,
        token1,
      ]);
      // calculate slippage
      const amountOutMin = amountOut
        .mul(Math.round((1 - slip) * 1000))
        .div(1000);
      const [status, statusInfo] = await trade.swap(
        routerContract,
        amountIn,
        amountOutMin,
        [token0, token1],
        account
      );
      if (status === 1) {
        const link = `https://bscscan.com/tx/${statusInfo.transactionHash}`;
        const msg = (
          <a target="_blank" href={link}>
            Swap successfully with transction.
          </a>
        );
        toast.success(msg);
      } else {
        toast.error(statusInfo.message);
      }
    }
  }

  // DEBUG
  // const link = `https://bscscan.com/tx/test`;
  // const msg = <a target="_blank" href={link}>Swap successfully with transction.</a>;
  // const notify = () => toast(msg);

  return (
    <>
      <Row>
        {/*DEBUG*/}
        {/*<button onClick={notify}>Notify!</button>*/}

        <Col lg={12}>
          <div
            style={{
              height: "350px",
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
              <Row>
                <Col
                  style={{
                    textAlign: "center",
                    marginLeft: "100px",
                  }}
                >
                  <span style={{ fontSize: "20pt" }}>Swap</span>
                </Col>
                <Col>
                  <SettingsModal />
                </Col>
              </Row>

              <div className={"swapMain"}>
                <div className={"swapInput"}>
                  {TokenInputUI(
                    token0Input,
                    "TokenIn",
                    handleChange,
                    { disabled: tokenInputDisabled }
                  )}
                  <br />
                  {TokenInputUI(token1Input, "TokenOut", () => {}, {
                    disabled: tokenInputDisabled,
                  })}
                </div>
              </div>
            </Form.Group>

            <div
              className={"buttons"}
              style={{
                textAlign: "center",
              }}
            >
              <Button
                variant="primary"
                onClick={swap}
                disabled={swapButtonState.disabled}
                style={{ width: "100%", height: "55px", fontSize: "1.5em" }}
              >
                {swapButtonState.text}
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PageSwap;
