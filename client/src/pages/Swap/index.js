// @flow
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import _ from "underscore";
// import VEGA_CONTRACT_ABI from "../../../abis/erc20.json";
// import POOL_CONTRACT_ABI from "../../../abis/BoostPool.json";
import FACTORY_ABI from "../../abis/Factory.json";
import ROUTER_ABI from "../../abis/Router.json";
// import { VEGA_TOKEN_ADDRESS, POOL_TOKEN_ADDRESS } from "../../../chain/Contracts.js";
import { BigNumber, ethers } from "ethers";
import { useContract } from "../../chain/eth.js";
import { default as contracts } from "../../constants/contracts";
import { getAmountsOut, swapExactETHForTokens } from "./trade.js";

import { client, clientPCS } from "../../apollo/client";
import {
  // GLOBAL_DATA,
  // ETH_PRICE,
  ALL_TOKENS,
  FACTORY_PAIRS,
} from "../../apollo/queries";

// const config = {
//   wbnb: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
//   usdt: '0x55d398326f99059ff775485246999027b3197955',
//   pancakeSwapRouter: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
//   vga: '0x4EfDFe8fFAfF109451Fc306e0B529B088597dd8d',
//   slippage: 12,
// }

let WBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
let VGA = "0x4EfDFe8fFAfF109451Fc306e0B529B088597dd8d";
const FACTORY_ADDRESS = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
const PCS_ROUTER_ADDRESS = "0x10ed43c718714eb63d5aa57b78b54704e256024e";

async function getAllTokensOnUniswap() {
  try {
    let allFound = false;
    let skipCount = 0;
    let tokens = [];
    while (!allFound) {
      let result = await client.query({
        query: ALL_TOKENS,
        variables: {
          skip: skipCount,
        },
        fetchPolicy: "cache-first",
      });
      tokens = tokens.concat(result?.data?.tokens);
      allFound = true;
      // if (result?.data?.tokens?.length < TOKENS_TO_FETCH || tokens.length > TOKENS_TO_FETCH) {
      // 	allFound = true
      // }
      // skipCount = skipCount += TOKENS_TO_FETCH
    }
    return tokens;
  } catch (e) {
    console.log(e);
  }
}

async function someData() {
  try {
    let allFound = false;

    let tokens = [];
    while (!allFound) {
      let result = await clientPCS.query({
        query: FACTORY_PAIRS,
        variables: {},
        fetchPolicy: "cache-first",
      });

      console.log("totalPairs " + result.data.factory.totalPairs);
      console.log("totalTokens " + result.data.factory.totalTokens);
      return result;
      allFound = true;
    }
    return tokens;
  } catch (e) {
    console.log(e);
  }
}

function toUnit256(amount, token) {
  return BigNumber.from(Math.round(amount * 1000000)).mul(BigNumber.from(10).pow(token.decimals - 6));
}

function toFloatNumber(amount, token) {
  // check token decimals
  const y = amount.div(BigNumber.from(10).pow(12));
  const floatNumber = y.toNumber() / Math.pow(10, 6);
  return floatNumber;
}

const defaultTokenPath = ["WBNB", "VGA"];
const defaultSlippage = 0.5 / 100;

const PageSwap = (): React$Element<React$FragmentType> => {
  const { account, library } = useWeb3React();

  const chainId = 56;

  // TODO: Set token0, token1 properly

  // TODO: Clean all this
  const [amount, setAmount] = React.useState(0);
  const [amountDec, setAmountDec] = React.useState(0);
  const [amountOut, setAmountout] = React.useState(0);
  const [pairslength, setPairslength] = React.useState(0);

  const token0 = contracts[chainId][defaultTokenPath[0]];
  const token1 = contracts[chainId][defaultTokenPath[1]];

  const [token0Input, setToken0Input] = useState(0);
  const [token1Input, setToken1Input] = useState(0);

  // const ROUTER = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
  const factoryContract = useContract(FACTORY_ADDRESS, FACTORY_ABI, true);
  const routerContract = useContract(PCS_ROUTER_ADDRESS, ROUTER_ABI, true);

  async function getRate(amount, path) {
    if (amount > 0) {
      let x = await routerContract.callStatic
        .getAmountsOut(amount, path);
      return x[1];
    }
  }

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

    if (isNaN(amount) || amount <= 0) {
      return;
    }

    console.log(`amount`, amount);

    let etherAmount = toUnit256(amount, token0);
    console.log(`etherAmount`, etherAmount.toString());
    const outAmount = await getAmountsOut(routerContract, etherAmount, [token0, token1]);
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

  async function swap() {
  }

  // TODO: Clean this up
  async function swapIn() {
    console.log(amount);
    console.log(amountOut);

    // 1%

    let slip = Math.floor(amountOut * 990 / 1000);
    let amountOutMin = amountOut - slip;
    console.log("Calculated Amounts out: " + amountOutMin);
    const to = account;
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10min
    console.log(amountOutMin, [WBNB, VGA], to, deadline);
    let receipt = await swapExactETHForTokens(routerContract, amount, amountOutMin, to, deadline);
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
            console.log("...");
          }
        })
        .catch(() => {
          if (!stale) {
            setPairslength(null);
          }
        });

      return () => {
        stale = true;
        console.log("...");
        setPairslength(undefined);
      };
    }
  }, [account, library, factoryContract]);

  useEffect(() => {
    if (!!account && !!library) {
      (async () => {
        let pricef = await getRate(amount, routerContract);
        console.log("price: " + pricef);
        // setPrice(pricef);
      })();
    }
  }, [account, library, routerContract]);

  useEffect(() => {
    async function fetchData() {
      // let globalData = await getGlobalData(ethPrice, oldEthPrice)
      // globalData && update(globalData)

      let d = await someData();
      console.log(">> " + d);

      // let allTokens = await getAllTokensOnUniswap()
      // let t = allTokens[0];
      // console.log("allTokens " + t.id);
      // for (let key in t) {
      //   console.log(key, t[key]);
      // }
      // updateAllTokensInUniswap(allTokens)
    }
    // if (!data && ethPrice && oldEthPrice) {
    //   fetchData()
    // }
    fetchData();
  }, []);

  // function swapIn() {
  //     console.log("swap in " + amount);
  // }

  function swapOut() {
    console.log("swap out " + amount);
  }

  // price = router.functions.getAmountsIn(qty, route).call()[0]

  return (
    <>
      {/* <h1>Swap VGA</h1> */}
      <Row>
        <Col lg={7}>
          <div style={{ height: "400px", width: "400px", backgroundColor: "#1c1f27", color: "white" }}>
            <Form.Group className="mb-3">
              <h1>Swap</h1>

              <div style={{ backgroundColor: "rgb(19,20,25)", borderRadius: "10px", height: "120px", width: "200px" }}>
                <input
                  type="text"
                  value={token0Input}
                  onChange={handleChange}
                  className=""
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
                <span style={{ marginLeft: "10px", fontSize: "22px" }}>BNB</span>

                <br />

                <div style={{ marginLeft: "30px", marginTop: "10px" }}>
                  <span style={{ marginLeft: "3px", width: "100px", fontSize: "22px", color: "white" }}>
                    {token1Input}
                  </span>

                  <span style={{ marginLeft: "90px", textAlign: "right", fontSize: "22px" }}>VGA</span>
                </div>
              </div>
            </Form.Group>

            <Button variant="primary" onClick={() => swapIn()} style={{ width: "180px", fontSize: "20pt" }}>
              Swap
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PageSwap;
