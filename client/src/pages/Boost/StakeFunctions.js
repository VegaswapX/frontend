import { ethers } from "ethers";
import BigNumber from "bignumber.js";
import ERC20_ABI from "../../abis/erc20.json";
import { multiCall } from "../Swap/trade";
import { toFloatNumberN } from "../Swap/trade";
export const BIG_ZERO = new BigNumber(0);
export const BIG_ONE = new BigNumber(1);
export const BIG_NINE = new BigNumber(9);
export const BIG_TEN = new BigNumber(10);

export function toUint256(amount) {
  return BigNumber.from(Math.round(amount * 1000000)).mul(
    BigNumber.from(10).pow(18 - 6)
  );
}

export const getDecimalAmount = (amount, decimals = 18) => {
  return new BigNumber(amount).times(BIG_TEN.pow(decimals));
};

export const getDecAmount = (amount, decimals = 18) => {
  return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals));
};

export async function hasEnoughAllowance(
  multicallContract,
  tokenAddress,
  ownerAddress,
  spenderAddress
) {
  console.log("spenderAddress >>> " + spenderAddress);

  const calls = [
    {
      address: tokenAddress,
      name: "allowance",
      params: [ownerAddress, spenderAddress],
    },
  ];

  console.log(">> " + calls[0].address);
  const { returnData } = await multiCall(multicallContract, ERC20_ABI, calls);
  // DEBUG
  let x = getDecAmount(returnData[0]).toNumber();
  if (x > 0) {
    return true;
  } else {
    return false;
  }
  //let x = BigNumber.from(returnData[0]);

  // const allowance0 = BigNumber.from(returnData[0]);

  // if (allowance0.toString() === "0") {
  //   return false;
  // }

  // return true;

  // check amount to return true
}
