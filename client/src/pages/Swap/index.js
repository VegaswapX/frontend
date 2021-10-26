import { useWeb3React } from "@web3-react/core";
import React, { useMemo, useState } from "react";
import { Button, Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import _ from "underscore";
import ROUTER_ABI from "../../abis/Router.json";
import { Chains, useContract } from "../../chain/eth.js";
import { PCS_ROUTER_ADDRESS } from "./addr";

import { store } from "../../redux/store";
import { CurrencySelectIn, CurrencySelectOut } from "./CurrencySelect";
import { SettingsModal } from "./SettingsModal.js";
import * as trade from "./trade.js";

function TokenInputUI(
  tokenInput,
  tokenSelect,
  handleChange,
  opts = { disabled: false },
) {
  const { disabled } = opts;

  const [loadingAmount, setLoadingAmount] = useState(false);

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
        >
          {tokenSelect === "tokenIn" ? <CurrencySelectIn /> : <CurrencySelectOut />}
        </div>

        <FormControl
          size="lg"
          type="number"
          placeholder="Amount"
          aria-label="Amount"
          aria-describedby="token0Input"
          value={tokenInput}
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

// const defaultSlippage = 0.5 / 100;
// const defaultState = {
//   loading: false,
//   currentState: "connect-network", // wrong-network, enter-amount, waiting-for-swapping-results
// };

// const slippageRadios = [
//   { name: "0.3%", value: 0.3 / 100 },
//   { name: "0.5%", value: 0.5 / 100 },
//   { name: "1%", value: 1 / 100 },
// ];

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

const PageSwapInner = () => {
  const { account, chainId } = useWeb3React();

  const routerContract = useContract(PCS_ROUTER_ADDRESS, ROUTER_ABI, true);

  const [token0Input, setToken0Input] = useState(0);
  const [token1Input, setToken1Input] = useState(0);

  const [loading, setLoading] = useState(false);

  const debounceOnChange = useMemo(
    () =>
      _.debounce(async (e) => {
        console.log(`running debounce`);
        await setOutputAmountText(routerContract, e); // add routerContract here  because of network changes
      }, 500),
    [routerContract],
  );

  let swapButtonState, tokenInputDisabled;
  // TODO remove and handle elsewhere
  if (chainId === Chains.BSC_MAINNET.chainId) {
    swapButtonState = swapButtonStates["correctNetwork"];
    tokenInputDisabled = false;
  } else {
    swapButtonState = swapButtonStates["wrongNetwork"];
    tokenInputDisabled = true;
  }

  async function setOutputAmountText(routerContract, e) {
    console.log("setOutputAmountText " + e);

    if (routerContract === null) {
      console.log("You don't connect to bsc mainnet");
      return;
    }

    // TODO: Duplicate code
    let token0 = store.getState().tokenReducer.tokenIn;
    let token1 = store.getState().tokenReducer.tokenOut;

    const amountText = e.target.value;
    // console.log("amountText " + amountText);
    const token0AmountEther = trade.convertTextToUnint256(amountText, token0);
    if (token0AmountEther === null) {
      setToken1Input(0);
      return;
    }

    let result = await trade.getAmountsOut(
      routerContract,
      token0AmountEther,
      [token0, token1],
    );
    if (!result.error) {
      let outAmount = result.data;
      const outAmountText = trade.toFloatNumber(outAmount, token1);
      setToken1Input(outAmountText.toFixed(2));
      // setLoadingAmount(false);
    } else {
      toast.error("Error Pair not available");
      // setLoadingAmount(false);
    }
  }

  function handleChange(e) {
    const amountText = e.target.value;
    setToken0Input(amountText);
    debounceOnChange(e);
  }

  // Rewrite swap that supports both ETH->Token and Token->Token
  // float number should work properly
  // TODO handle in tokenui
  async function swap() {
    // TODO: Duplicate code
    let slip = store.getState().slippageReducer.value;
    let token0 = store.getState().tokenReducer.tokenIn;
    let token1 = store.getState().tokenReducer.tokenOut;
    console.log(`slippage`, slip);
    console.log(`token0`, token0);
    console.log(`token1`, token1);

    if (routerContract === null) {
      console.log("You don't connect to bsc mainnet");
      return;
    }

    const amountIn = trade.convertTextToUnint256(token0Input, token0);

    console.log(`amountIn: ${amountIn}`);
    const result = await trade.getAmountsOut(routerContract, amountIn, [
      token0,
      token1,
    ]);

    // TODO: didn't the case we have error
    if (!result.error) {
      let amountOut = result.data;
      console.log("amountOut " + amountOut);
      // calculate slippage
      const amountOutMin = amountOut
        .mul(Math.round((1 - slip) * 1000))
        .div(1000);
      console.log("amountOutMin " + amountOutMin);

      // TODO set loading while pending
      try {
        setLoading(true);
        const result = await trade.swap(
          routerContract,
          amountIn,
          amountOutMin,
          [token0, token1],
          account,
        );
        const [status, statusInfo] = result;
        if (status === 1) {
          const link = `https://bscscan.com/tx/${statusInfo.transactionHash}`;
          const msg = (
            <a target="_blank" href={link}>
              Swap successful
            </a>
          );
          toast.success(msg);
          setLoading(false);
        } else {
          toast.error(statusInfo.message);
          setLoading(false);
        }
      } catch {
        toast.error("error with trade");
        setLoading(false);
      }
    }
  }

  let tokenInput;
  let tokenOutput;

  tokenInput = TokenInputUI(token0Input, "tokenIn", handleChange, {
    disabled: tokenInputDisabled,
  });

  tokenOutput = TokenInputUI(token1Input, "tokenOut", () => {}, {
    disabled: tokenInputDisabled,
  });

  // DEBUG
  // const link = `https://bscscan.com/tx/test`;
  // const msg = <a target="_blank" href={link}>Swap successfully with transction.</a>;
  // const notify = () => toast(msg);

  if (loading) {
    return (
      <>
        <h1 style={{ textAlign: "center" }}>Transaction Pending</h1>
      </>
    );
  } else {
    return (
      <>
        <Form.Group className="mb-3">
          <Row>
            <div class="d-flex justify-content-between">
              <div></div>
              <div>
                <span
                  style={{
                    fontSize: "20pt",
                    marginTop: "5px",
                    marginLeft: "50%",
                  }}
                >
                  Swap
                </span>
              </div>
              <div>
                <span style={{ marginRight: "10px" }}>
                  <SettingsModal />
                </span>
              </div>
            </div>
          </Row>

          <div className={"swapMain"} style={{ marginTop: "15px" }}>
            <div className={"swapInput"}>
              {tokenInput}
              <br />
              {tokenOutput}
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
            style={{ width: "90%", height: "55px", fontSize: "1.5em" }}
          >
            {swapButtonState.text}
          </Button>
        </div>
      </>
    );
  }
};

const PageSwap = () => {
  return (
    <>
      <Row>
        <Col lg={12}>
          <div
            style={{
              height: "360px",
              width: "580px",
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
            <PageSwapInner />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PageSwap;
