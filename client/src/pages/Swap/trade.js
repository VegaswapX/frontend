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
  console.log("token " + token.decimals);
  return BigNumber.from(Math.round(amount * 1000000)).mul(
    BigNumber.from(10).pow(token.decimals - 6),
  );
}

export function toFloatNumber(amount, token) {
  console.log(`amount`, amount.toString());
  // check token decimals
  const y = amount.div(BigNumber.from(10).pow(12));
  console.log(`y`, y);
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

export async function approve() {
  // check allowance
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
  const addressPath = [tokenPath[0].contract, tokenPath[1].contract];

  // TODO deal with isNative
  if (!!tokenPath[0].isNative) {
    return await swapExactETHForTokens(
      routerContract,
      amountIn,
      amountOutMin,
      addressPath,
      to,
      deadline,
    );
  }
  if (!!tokenPath[1].isNative) {
    // needs approve?
    return await swapExactTokensForETH(
      routerContract,
      amountIn,
      amountOutMin,
      addressPath,
      to,
      deadline,
    );
  }

  return await swapExactTokensForTokens(
    routerContract,
    amountIn,
    amountOutMin,
    addressPath,
    to,
    deadline,
  );
}

// TODO: update this function
// Dealing with float number
// const failedTxReturned = [false, null];
async function swapExactETHForTokens(
  routerContract,
  amountIn,
  amountOutMin,
  addressPath,
  to,
  deadline,
) {
  const gasPrice = getGasPrice();
  console.log("swapExactETHForTokens");

  try {
    const args = [amountOutMin, addressPath, to, deadline];
    console.log("calling router with " + args);
    const tx = await routerContract.swapExactETHForTokens(
      amountOutMin,
      addressPath,
      to,
      deadline,
      { ...defaultOptions, value: amountIn, gasPrice },
    );
    let receipt = await tx.wait();
    return [receipt.status, receipt];
  } catch (e) {
    console.log("Error: swapExactETHForTokens:", e);
    return [false, e];
  }
}

// TODO: Double check
async function swapExactTokensForETH(
  routerContract,
  amountIn,
  amountOutMin,
  addressPath,
  to,
  deadline,
) {
  const gasPrice = getGasPrice();
  console.log("swapExactTokensForETH...");

  const minBNB = 0.001 * 10 ** 18;
  // const minBNB = ethers.utils.parseUnits(10000, "wei")
  // const minBNB = toUint256_18(0.001); // should be removed in production code

  console.log("..." + minBNB);

  try {
    const args = [amountOutMin, addressPath, to, deadline];
    console.log("calling router with " + args);
    const tx = await routerContract.swapExactTokensForETH(
      amountIn,
      amountOutMin,
      addressPath,
      to,
      deadline,
      { ...defaultOptions, gasPrice },
    );
    let receipt = await tx.wait();
    console.log(">> " + receipt);
    return [receipt.status, receipt];
  } catch (e) {
    console.log("Error: swapExactETHForTokens:", e);
    return [false, e];
  }
}

const failedGetAmountsOutReturn = { data: null, error: true };
export async function getAmountsOut(routerContract, amount, tokenPath) {
  if (amount <= 0) {
    return failedGetAmountsOutReturn;
  }
  const addressPath = [tokenPath[0].address, tokenPath[1].address];
  console.log(`addressPath`, addressPath);

  try {
    let x = await routerContract.callStatic
      .getAmountsOut(amount, addressPath)
      .catch((e) => {
        console.log("Failed to run getAmountsOut", e);
        return failedGetAmountsOutReturn;
      });
    return { data: x[1], error: false };
  } catch {
    console.log("Failed to run getAmountsOut ", addressPath);
    return failedGetAmountsOutReturn;
  }
}

// TODO: Double check
async function swapExactTokensForTokens(
  routerContract,
  amountIn,
  amountOutMin,
  addressPath,
  to,
  deadline,
) {
  const gasPrice = getGasPrice();
  console.log("swapTokensForExactTokens...");
  const args = [amountIn, amountOutMin, addressPath, to, deadline];
  console.log("calling router with " + args);

  try {
    const tx = await routerContract.swapExactTokensForTokens(
      amountIn,
      amountOutMin,
      addressPath,
      to,
      deadline,
      { ...defaultOptions, gasPrice },
    );
    let receipt = await tx.wait();
    console.log(">> " + receipt);
    return [receipt.status, receipt];
  } catch (e) {
    console.log("Error: swapTokensForExactTokens:", e);
    return [false, e];
  }
}
