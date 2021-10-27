import { useWeb3React } from "@web3-react/core";
import React, { useMemo, useState, useEffect } from "react";
import { Button, Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import _ from "underscore";
import ROUTER_ABI from "../../abis/Router.json";
import ERC20_ABI from "../../abis/erc20.json";
import { useContract } from "../../chain/eth.js";
import { PCS_ROUTER_ADDRESS } from "./addr";
import "./style.css";
import VEGA_CONTRACT_ABI from "../../abis/erc20.json";

import { Chains } from "../../chain/constant";
import { store } from "../../redux/store";
import { SettingsModal } from "./SettingsModal.js";
import { TokenInput } from "./TokenInput";
import * as trade from "./trade.js";
import {useSelector} from "react-redux";

function TokenInputUI(
  tokenInput,
  tokenSelect,
  handleChange,
  opts = { disabled: false },
) {
  const { disabled } = opts;

  const { account, library, chainId } = useWeb3React();

  let currencyIn = store.getState().tokenReducer.tokenIn;
  let currencyOut = store.getState().tokenReducer.tokenOut;

  console.log("currencyIn.contract " + currencyIn.contract);  

  const tokenContractIn = useContract(currencyIn.contract, VEGA_CONTRACT_ABI, true);
  const tokenContractOut = useContract(currencyOut.contract, VEGA_CONTRACT_ABI, true);

  // const [bal, setBalance] = useState();
  // const [balOut, setBalanceOut] = useState();

  // useEffect(() => {
  //   if (!!account && !!library) {
  //     let stale = false;

  //     tokenContractIn.callStatic
  //       .balanceOf(account)
  //       .then((x) => {
  //         if (!stale) {
  //           x = x / 10 ** 18;
  //           x = Math.round(x*100)/100;
  //           setBalance(x);
  //         }
  //       })
  //       .catch(() => {
  //         if (!stale) {
  //           setBalance(null);
  //         }
  //       });

  //     return () => {
  //       stale = true;
  //       setBalance(undefined);
  //     };
  //   }
  // }, [account, library, chainId, tokenContractIn]);

  // useEffect(() => {
  //   if (!!account && !!library) {
  //     let stale = false;

  //     tokenContractOut.callStatic
  //       .balanceOf(account)
  //       .then((x) => {
  //         if (!stale) {
  //           x = x / 10 ** 18;
  //           x = Math.round(x*100)/100;
  //           setBalanceOut(x);
  //         }
  //       })
  //       .catch(() => {
  //         if (!stale) {
  //           setBalanceOut(null);
  //         }
  //       });
      
  //   }
  // }, [account, library, chainId, tokenContractOut]);

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

        
        <div
          style={{
            marginLeft: "5px",
            marginTop: "5px",
          }}
        >
          {/* {tokenSelect === "tokenIn" ? currencyIn.symbol : currencyOut.symbol} */}
          {/* <p>Balance {tokenSelect === "tokenIn" ? bal : balOut}</p> */}
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

// TODO: Rework on reducer to make this work properly
const PageSwapInner = () => {
  const { account, chainId } = useWeb3React();

  const routerContract = useContract(PCS_ROUTER_ADDRESS, ROUTER_ABI, true);
  const erc20Contract = useContract(`0x4EfDFe8fFAfF109451Fc306e0B529B088597dd8d`, ERC20_ABI, true);
  const [token0, token1] = useSelector((state) => state.swapReducer.tokenPath );

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
  if (chainId === Chains.BSC_MAINNET.chainId) {
    swapButtonState = swapButtonStates["correctNetwork"];
    tokenInputDisabled = false;
  } else {
    swapButtonState = swapButtonStates["wrongNetwork"];
    tokenInputDisabled = true;
  }

  async function setOutputAmountText(routerContract, e) {
    if (routerContract === null) {
      console.log("You don't connect to bsc mainnet");
      return;
    }

    const amountText = e.target.value;
    const [token0, token1] = store.getState().swapReducer.tokenPath;
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
      const outAmount = result.data;
      const outAmountText = trade.toFloatNumber(outAmount, token1);
      setToken1Input(outAmountText.toFixed(2));
      // setLoadingAmount(false);
    }

    // TODO: Set proper error message, it can be anything
    // else {
    //   toast.error("Error Pair not available");
    //   // setLoadingAmount(false);
    // }
  }

  function handleTokenInputChange(e) {
    const amountText = e.target.value;
    setToken0Input(amountText);
    debounceOnChange(e);
  }

  // Rewrite swap that supports both ETH->Token and Token->Token
  // float number should work properly
  // TODO handle in tokenui
  async function swap() {
    // TODO: Duplicate code
    try {
      let slip = store.getState().tradingReducer.slippage;
      let token0 = store.getState().tokenReducer.tokenIn;
      let token1 = store.getState().tokenReducer.tokenOut;
      console.log(`slippage`, slip);
      console.log(`token0`, token0);
      console.log(`token1`, token1);

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
    } catch {
      toast.error("error with swap")
    }
  }

  useEffect(async () => {
    if (erc20Contract === null) {
      console.log(`User doesn't connect to bsc network`);
      return;
    }
    console.log(`check allowance`);
    const res = await trade.hasEnoughAllowance(erc20Contract, token1, account);

  }, [erc20Contract, token0, token1, account])

  const tokenInputUI = TokenInput(token0Input, token0, handleTokenInputChange, {
    disabled: tokenInputDisabled,
  });

  const tokenOutputUI = TokenInput(token1Input, token1, () => {}, {
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
              {tokenInputUI}
              <br />
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
