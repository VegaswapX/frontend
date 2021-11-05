// utils
import { BigNumber, ethers } from "ethers";
import ERC20_ABI from "../abis/erc20.json";
import { PCS_ROUTER_ADDRESS } from "./Contracts";
import { getContract } from "./eth";
import simpleRpcProvider from "./providers";

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

export async function approve(
  account,
  library,
  token,
  spenderAddress = PCS_ROUTER_ADDRESS,
) {
  try {
    const erc20Contract = getContract(
      token.address,
      ERC20_ABI,
      library,
      account,
    );
    const res = await erc20Contract
      .approve(spenderAddress, ethers.constants.MaxUint256)
      .catch((e) => {
        console.log(`Cannot approve token: ${token.symbol}`, e);
        return { error: e };
      });
    if (res.error) {
      return res;
    }

    return { data: true };
  } catch {
    console.log("error approve");
  }
}

export async function multiCall(multiCallContract, abi, calls) {
  try {
    const itf = new ethers.utils.Interface(abi);
    const callData = calls.map((call) => [
      call.address.toLowerCase(),
      itf.encodeFunctionData(call.name, call.params),
    ]);
    return await multiCallContract.callStatic.aggregate(callData);
  } catch (error) {
    console.log("error multiCall " + error);
  }
}

export async function fetchAccountBalances(
  multicallContract,
  [token0, token1],
  ownerAddress,
) {
  try {
    let token0NativeBalance, token1NativeBalance;
    let nativeTokenPosition;
    if (token0.isNative) {
      token0NativeBalance = await simpleRpcProvider.getBalance(ownerAddress);
      nativeTokenPosition = 0;
    } else if (token1.isNative) {
      token1NativeBalance = await simpleRpcProvider.getBalance(ownerAddress);
      nativeTokenPosition = 1;
    }

    let calls = [];
    if (nativeTokenPosition !== undefined) {
      if (nativeTokenPosition === 0) {
        calls = [
          {
            address: token1.address,
            name: "balanceOf",
            params: [ownerAddress],
          },
        ];
      } else {
        calls = [
          {
            address: token0.address,
            name: "balanceOf",
            params: [ownerAddress],
          },
        ];
      }
    } else {
      calls = [
        {
          address: token0.address,
          name: "balanceOf",
          params: [ownerAddress],
        },
        {
          address: token1.address,
          name: "balanceOf",
          params: [ownerAddress],
        },
      ];
    }

    const res = await multiCall(multicallContract, ERC20_ABI, calls).catch(
      (e) => {
        return { error: e };
      },
    );

    if (!!res.e) {
      return res;
    }

    const { returnData } = res;
    if (returnData === undefined) {
      return {
        data: undefined,
      };
    }

    // DEBUG
    // console.log(`returnData fetch user balances`, returnData);

    let data;
    if (nativeTokenPosition === undefined) {
      data = [
        toFloatNumber(BigNumber.from(returnData[0]), token0),
        toFloatNumber(BigNumber.from(returnData[1]), token1),
      ];
    } else if (nativeTokenPosition === 0) {
      data = [
        toFloatNumber(BigNumber.from(token0NativeBalance), token0),
        toFloatNumber(BigNumber.from(returnData[0]), token1),
      ];
    } else {
      data = [
        toFloatNumber(BigNumber.from(returnData[0]), token0),
        toFloatNumber(BigNumber.from(token1NativeBalance), token1),
      ];
    }

    return {
      data,
    };
  } catch {
    console.log("error multiCall");
  }
}

// TODO: Update this to use getContract and multicall
export async function hasEnoughAllowance(
  multicallContract,
  token,
  ownerAddress,
  spenderAddress = PCS_ROUTER_ADDRESS,
  amount = ethers.constants.MaxUint256,
) {
  if (token.isNative) {
    return true;
  }

  const calls = [
    {
      address: token.address,
      name: "allowance",
      params: [ownerAddress, spenderAddress],
    },
  ];

  const res = await multiCall(multicallContract, ERC20_ABI, calls).catch(
    (e) => {
      console.log(`Error while getting balance`, e);
      return { error: e };
    },
  );
  if (!!res.error) {
    return res;
  }

  const { returnData } = res;
  // DEBUG
  // console.log(`returnData`, returnData);
  const allowance0 = BigNumber.from(returnData[0]);
  // console.log(`allowance0`, allowance0);

  if (allowance0.toString() === "0") {
    return { data: false, error: null };
  }

  return { data: true, error: null };
}

export function toUint256(amount, decimals) {
  const r = 6;
  return BigNumber.from(Math.round(amount * 10 ** r)).mul(
    BigNumber.from(10).pow(decimals - r),
  );
}


export function toUint256Dec(amount, token) {
  return toUint256(amount, token.decimals);
}


export function toFloatNumber(amount, token) {
  const y = amount.div(BigNumber.from(10).pow(12));
  return y.toNumber() / Math.pow(10, 6);
}

export function convertTextToUnint256(s, token) {
  const amount = parseFloat(s); // why parseInt

  if (isNaN(amount) || amount <= 0) {
    return null;
  }

  return toUint256Dec(amount, token);
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
  const addressPath = [tokenPath[0].address, tokenPath[1].address];

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

export async function getAmountsOut(routerContract, amount, tokenPath) {
  if (amount <= 0) {
    return {data: null, error: "Amount below zero"};
  }

  const addressPath = [tokenPath[0].address, tokenPath[1].address];

  try {
    let x = await routerContract.callStatic
      .getAmountsOut(amount, addressPath)
      .catch((e) => {
        console.log("Failed to run getAmountsOut", e);
        return { data: null, error: e };
      });

    if (x.error !== false && x.error !== undefined) {
      return x;
    }

    return { data: x[1], error: false };
  } catch (e) {
    console.log("Failed to run getAmountsOut ", e);
    return { data: null, error: e };
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
