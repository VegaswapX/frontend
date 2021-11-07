import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import _ from "underscore";
import MULTICALL_ABI from "../../abis/Multicall.json";
import ROUTER_ABI from "../../abis/Router.json";
import { PCS_ROUTER_ADDRESS } from "../../chain/Contracts";
import { useContract } from "../../chain/eth.js";
import "./style.css";

import { useSelector } from "react-redux";
import { getTokensPrices } from "../../api/data";
import { Chains, MULTICALL_ADDR } from "../../chain/eth";
import * as trade from "../../chain/trade.js";
//import { toUint256Dec } from "../../chain/trade.js";
import { store } from "../../redux/store";
import { CurrencySelectorModal } from "./CurrencySelect";
import { SettingsModal } from "./SettingsModal.js";
import { TokenInput } from "./TokenInput";

const actionButtonStates = {
  wrongNetwork: {
    name: "wrongNetwork",
    disabled: true,
    text: "Connect to BSC network",
  },
  needApprove: {
    name: "needApprove",
    disabled: false,
    text: "Approve ",
  },
  approving: {
    name: "approving",
    disabled: true,
    text: "Approving",
  },
  confirmSwap: {
    name: "confirmSwap",
    disabled: true,
    text: "Confirm swap",
  },
  swap: {
    name: "swap",
    disabled: false,
    text: "Swap",
  },
  insufficientBalance: {
    name: "insufficientBalance",
    disabled: true,
    text: "Insufficient balance",
  },
  insufficientLiquidity: {
    name: "insufficientLiquidity",
    disabled: true,
    text: "Insufficient liquidity",
  },
};

function TransactionPending() {
  return (
    <div
      style={{
        alignContent: "center",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Transaction Pending</h2>
      <Spinner
        animation="border"
        role="status"
        style={{
          marginLeft: "45%",
          marginTop: "20px",
          width: "60px",
          height: "60px",
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

const PageSwapInner = () => {
  const { account, library, chainId } = useWeb3React();

  const routerContract = useContract(PCS_ROUTER_ADDRESS, ROUTER_ABI, true);
  const multiCallContract = useContract(MULTICALL_ADDR, MULTICALL_ABI, true);
  const [token0, token1] = useSelector((state) => state.swapReducer.tokenPath);

  const [actionButtonState, setActionButtonState] = useState(
    actionButtonStates.wrongNetwork
  );

  const [token0Input, setToken0Input] = useState(0);
  const [token1Input, setToken1Input] = useState(0);

  const [token0Balance, setToken0Balance] = useState(undefined);
  const [token1Balance, setToken1Balance] = useState(undefined);

  const [loading, setLoading] = useState(false);

  const debounceSetToken1Input = useMemo(
    () =>
      _.debounce(async (token0Input) => {
        await setToken1InputBasedOnRate(
          routerContract,
          token0Input,
          token0Balance,
          actionButtonState
        ); // add routerContract here  because of network changes
      }, 500),
    [routerContract, token0Balance, actionButtonState]
  );

  async function checkAllowance(multiCallContract, chainId, account) {
    if (account === undefined) {
      return;
    }

    console.log("checkAllowance");
    if (chainId !== Chains.BSC_MAINNET.chainId) {
      setActionButtonState(actionButtonStates.wrongNetwork);
      return;
    }

    // no need to approve for native token
    if (token0.isNative === true) {
      setActionButtonState(actionButtonStates["swap"]);
      return;
    }
    let res;
    // check token0 balance
    try {
      res = await trade.hasEnoughAllowance(multiCallContract, token0, account);
    } catch {
      console.log("error with allowance");
      return;
    }

    if (!!res.error) {
      // Handle error message
    }

    if (!!res.data) {
      setActionButtonState(actionButtonStates["swap"]);
      return;
    }

    setActionButtonState(actionButtonStates.needApprove);
  }

  // TODO: Convert each to USDT value on the form
  useEffect(async () => {
    getTokensPrices().then(async (res) => {
      const json = await res.json();
      console.log(`res`, json);
    });
  }, []);

  // Set swapButton state
  useEffect(async () => {
    await checkAllowance(multiCallContract, chainId, account);
  }, [multiCallContract, chainId, account, token0]);

  // recalculate token0 when token is changed
  useEffect(async () => {
    if (token0Input !== undefined) {
      debounceSetToken1Input(token0Input);
    }
  }, [routerContract, token0, token0Input]);

  async function fetchAccountBalances(token0, token1, account) {
    if (account === undefined) {
      return;
    }

    try {
      const res = await trade.fetchAccountBalances(
        multiCallContract,
        [token0, token1],
        account
      );
      if (!!res.error) {
        // handle to get baalance eror
        return;
      }

      // wrong network error
      if (res.data === undefined) {
        return;
      }

      const [token0Balance_, token1Balance_] = res.data;
      setToken0Balance(token0Balance_);
      setToken1Balance(token1Balance_); // combine these 2
    } catch {
      console.log("cant fetch balances");
    }
  }

  // fetch user balances on token changes
  useEffect(async () => {
    if (account === undefined) {
      return;
    }
    await fetchAccountBalances(token0, token1, account);
    await setToken1InputBasedOnRate(
      routerContract,
      token0Input,
      token0Balance,
      actionButtonState
    );
  }, [
    routerContract,
    token0Input,
    token0Balance,
    actionButtonState,
    token0,
    token1,
    account,
  ]);

  const tokenInputDisabled = false;

  async function setToken1InputBasedOnRate(
    routerContract,
    token0Input,
    token0Balance,
    actionButtonState
  ) {
    if (routerContract === null) {
      console.log("You don't connect to bsc mainnet");
      return;
    }

    const [token0, token1] = store.getState().swapReducer.tokenPath;
    const token0Amount = parseFloat(token0Input); // why parseInt
    if (isNaN(token0Amount)) {
      setToken1Input("");
      return;
    }

    const token0AmountEther = trade.toUint256Dec(token0Amount, token0);
    if (token0AmountEther === null) {
      setToken1Input("");
      return;
    }

    let result = await trade.getAmountsOut(routerContract, token0AmountEther, [
      token0,
      token1,
    ]);

    if (result.error === "Amount below zero") {
      return;
    }

    if (result.error !== false) {
      const msgCode = result.error?.data?.code;
      // no pool found
      if (msgCode === -32000) {
        setActionButtonState(actionButtonStates.insufficientLiquidity);
      }
      return;
    }

    const outAmount = result.data;
    const outputFloat = trade.toFloatNumber(outAmount, token1);

    setToken1Input(outputFloat);
    // setLoadingAmount(false);

    // extraUI
    if (token0Amount > token0Balance) {
      setActionButtonState(actionButtonStates.insufficientBalance);
    } else if (actionButtonState !== actionButtonStates.swap) {
      setActionButtonState(actionButtonStates.swap);
    }

    // TODO: Set proper error message, it can be anything
    // else {
    //   toast.error("Error Pair not available");
    //   // setLoadingAmount(false);
    // }
  }

  function handleTokenInputChange(e) {
    const token0Input = e.target.value;
    setToken0Input(token0Input);
    debounceSetToken1Input(token0Input);
  }

  async function approveToken0() {
    const [token0] = store.getState().swapReducer.tokenPath;

    setActionButtonState(actionButtonStates.approving);
    const res = await trade.approve(account, library, token0);
    if (!!res.error) {
      toast.error(res.error.message);
      setActionButtonState(actionButtonStates.needApprove);
      return;
    }
    // TODO: Handle button state after approve success
    setActionButtonState(actionButtonStates.swap);
  }

  async function swap(token0_, token1_, account) {
    let slippage = store.getState().swapReducer.slippage;
    const [token0, token1] = store.getState().swapReducer.tokenPath;
    // TODO: Double check slippage value and display on the form minimum received amount

    // DEBUG
    // console.log(`slippage`, slippage);
    // console.log(`token0`, token0);
    // console.log(`token1`, token1);

    if (routerContract === null) {
      console.log("Not connected to BSC Mainnet");
      return;
    }

    const amountIn = trade.convertTextToUnint256(token0Input, token0);

    console.log(`amountIn: ${amountIn}`);
    const result = await trade.getAmountsOut(routerContract, amountIn, [
      token0,
      token1,
    ]);

    if (result.error === true) {
      return;
    }

    let amountOut = result.data;
    // calculate slippage
    const amountOutMin = amountOut
      .mul(Math.round((1 - slippage) * 1000))
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
        account
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
        resetInputs();
        await fetchAccountBalances(token0_, token1_, account);
      } else {
        toast.error(statusInfo.message);
        setLoading(false);
      }
    } catch {
      toast.error("error with trade");
      setLoading(false);
    }
  }

  function resetInputs() {
    setToken0Input(0);
    setToken1Input(0);
  }

  function reverseInput() {
    console.log("reverse");

    store.dispatch({ type: "swap/switchToken" });

    resetInputs();

    // store.dispatch({
    //   type: "swap/setToken",
    //   payload: {
    //     tokenIndex,
    //     symbol,
    //   },
    // });
  }

  const tokenInputUI = TokenInput(
    token0Input,
    token0,
    0,
    handleTokenInputChange,
    {
      disabled: tokenInputDisabled,
      fromTo: "From",
      balance: token0Balance,
      clickMaxHandler: async () => {
        setToken0Input(token0Balance);
        await setToken1Input(routerContract, token0Balance);
      },
    }
  );

  const tokenOutputUI = TokenInput(token1Input, token1, 1, () => {}, {
    disabled: tokenInputDisabled,
    fromTo: "To",
    balance: token1Balance,
    clickMaxHandler: async () => {
      setToken1Input(token1Balance);
    },
  });

  if (loading) {
    return <TransactionPending />;
  }

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
            {tokenInputUI}

            <div
              style={{
                textAlign: "center",
                padding: "10px 0",
              }}
            >
              <span className={"swap-inverseButton"} onClick={reverseInput}>
                <i className="uil-arrows-v-alt"></i>
              </span>
            </div>

            {tokenOutputUI}
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
          onClick={function (e) {
            if (actionButtonState.name === "swap") {
              swap(token0, token1, account);
            } else if (actionButtonState.name === "needApprove") {
              approveToken0();
            }
          }}
          disabled={actionButtonState.disabled}
          style={{
            width: "85%",
            height: "55px",
            fontSize: "1.5em",
            borderRadius: "10px",
            marginTop: "5px",
            marginBottom: "20px",
          }}
        >
          {actionButtonState.name === "needApprove"
            ? `${actionButtonState.text} ${token0.symbol}`
            : actionButtonState.text}
        </Button>
      </div>
    </>
  );
};

const PageSwap = () => {
  return (
    <>
      <Row>
        <Col lg={12}>
          <div
            style={{
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
            <CurrencySelectorModal />
            <PageSwapInner />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PageSwap;
