// utils
import { BigNumber, ethers } from "ethers";

const GAS_PRICE = {
  default: "5",
  fast: "6",
};

const GAS_PRICE_GWEI = {
  default: ethers.utils.parseUnits(GAS_PRICE.default, "gwei").toString(),
  fas: ethers.utils.parseUnits(GAS_PRICE.fast, "gwei").toString(),
};

// TODO: Return user set gasPrice
function getGasPrice() {
  return GAS_PRICE_GWEI.default;
}

export function toUint256(amount, token) {
  return BigNumber.from(Math.round(amount * 1000000)).mul(
    BigNumber.from(10).pow(token.decimals - 6),
  );
}

export function toFloatNumber(amount, token) {
  // check token decimals
  const y = amount.div(BigNumber.from(10).pow(12));
  return y.toNumber() / Math.pow(10, 6);
}

export function convertTextToUnint256(s, token) {
  let amount;
  try {
    amount = parseFloat(s); // why parseInt
  } catch (e) {
    console.log("Cannot parse float", s);
  }

  if (isNaN(amount) || amount <= 0) {
    return null;
  }

  return toUint256(amount, token);
}

function defaultDeadline() {
  return Math.floor(Date.now() / 1000) + 60 * 10; // 1 minutes
}

const defaultOptions = {};

// check native token here
export async function swap(
  routerContract,
  amountIn,
  amountOutMin,
  tokenPath,
  to,
  deadline = defaultDeadline(),
) {
  const [token0, token1] = tokenPath;
  const addressPath = [token0.address, token1.address];

  if (!!token0.isNative) {
    return await swapExactETHForTokens(routerContract, amountIn, amountOutMin, addressPath, to, deadline);
  }

  // swap from Tokens to tokens
}

// TODO: update this function
// Dealing with float number
async function swapExactETHForTokens(
  routerContract,
  amountIn,
  amountOutMin,
  addressPath,
  to,
  deadline,
) {
  const gasPrice = getGasPrice();

  const tx = await routerContract.swapExactETHForTokens(
    amountOutMin,
    addressPath,
    to,
    deadline,
    { ...defaultOptions, value: amountIn, gasPrice },
  );
  console.log("Transaction Submitted. txhash " + tx.hash);
  let receipt = await tx.wait();
  console.log(receipt);
  return receipt;
}

const failedGetAmountsOutReturn = null;
export async function getAmountsOut(routerContract, amount, path) {
  if (amount <= 0) {
    return failedGetAmountsOutReturn;
  }

  const addressPath = [path[0].address, path[1].address];

  let x = await routerContract.callStatic
    .getAmountsOut(amount, addressPath)
    .catch((e) => {
      console.log("Failed to run getAmountsOut", e);
      return failedGetAmountsOutReturn;
    });
  return x[1];
}

// function swapTokensForExactTokens(amountOut,amountInMax,path,to,deadline)
// async function swapTokens(amountOutMin, to, deadline){

// }

// function addLiquidity(VGA, BNB){
// const tx = await routerContract.addLiquidity(
// [WBNB, VGA],
// }
