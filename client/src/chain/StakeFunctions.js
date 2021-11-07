import { BigNumber, ethers } from "ethers";
//import { ethers } from "ethers";
import ERC20_ABI from "../abis/erc20.json";
import { getContract } from "./eth";
import { multiCall } from "./trade";

export function getDecimalAmount(amount) {
  const r = 6;
  return BigNumber.from(Math.round(amount * 10 ** 6)).mul(
    BigNumber.from(10).pow(18 - r)
  );
}

export function getDecimalAmountA(amount) {

  return BigNumber.from(Math.round(amount)).mul(
    BigNumber.from(10).pow(18)
  );
}

export const getBNAmount = (amount) => {
  // return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals));
  return new BigNumber(amount); // .dividedBy(BIG_TEN.pow(1));;
};

export async function getAllowance(
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
  let x = getBNAmount(returnData[0]).toNumber();
  return x;
}

export async function stake(stakeAmount, poolContract) {
  console.log("!stakeAmount " + stakeAmount);
  let stakeAmountDEC = getDecimalAmountA(stakeAmount);
    
  console.log("!stake " + stakeAmountDEC);
  console.log("!poolContract " + poolContract);
  
  try {
    // TODO check maximum

    
    const tx = await poolContract.stake(stakeAmountDEC.toString());
    let receipt = await tx.wait();
    console.log("receipt " + receipt);
    console.log("receipt status " + receipt.status);
    return [receipt, receipt.status];
    
  } catch (error) {
    console.log("catch " + error);
    console.log("catch " + error.message + " " + error.data.message);    
    return [false, error];
  } finally {
    // setLoading(false);
    console.log("stake done");
  }
}

export async function unstake(poolContract) {
  console.log("unstake " + poolContract);

  try {
    const tx = await poolContract.unstake();
    let receipt = await tx.wait();
    console.log("unstake receipt " + receipt);
    console.log("unstake receipt status: " + receipt.status);
  } catch (error) {
    console.log("unstake catch " + error);
    console.log("unstake catch " + error.message + " " + error.data.message);
    // toast("Staking error " + error.message, {
    //   className: "success",
    //   bodyClassName: "grow-font-size",
    //   progressClassName: "fancy-progress-bar",
    // });
    // addToast({ title: 'Deposit Token error!', description: error.message, type: 'TOAST_ERROR' });
    return [false, error];
  } finally {
    // setLoading(false);
    console.log("stake done");
  }
  //   let minAmount = 1 * 10 ** 18;

  // try {
  //   //TODO check maximum
  //   if (stakeAmountDEC >= 0) {
  //     const tx = await poolContract.callStatic.stake(stakeAmountDEC);
  //     let receipt = await tx.wait();
  //     console.log("receipt " + receipt.status);
  //     console.log(`receipt`, receipt);
  //     return [receipt, receipt.status];

  //   } else {
  //     return [false, null]

  //   }
  // } catch (error) {

  //   return [false, error];
  // } finally {
  //   //setLoading(false);
  //   console.log("stake done");
  // }
}

export async function getAllowanceX(
  account,
  library,
  tokenAddress,
  froma,
  toa
) {
  const erc20Contract = getContract(tokenAddress, ERC20_ABI, library, account);
  try {
    let a = await erc20Contract.allowance(froma, toa);
    return a;
  } catch (e) {}
}

export async function approve(account, library, tokenAddress, spenderAddress) {
  const erc20Contract = getContract(tokenAddress, ERC20_ABI, library, account);
  try {
    const tx = await erc20Contract.approve(
      spenderAddress,
      ethers.constants.MaxUint256
    );
    const receipt = await tx.wait();
    console.log(`receipt`, receipt);
    return [receipt, receipt.status];
  } catch (e) {
    console.log(`Cannot approve token: ${tokenAddress}`, e);
    return [false, e];
  }
}

export function poolStakeable(startTime, endTime) {
  let n = Date.now() / 1000;

  return n > startTime && n < endTime;
}

export function poolHarvestable(endTime) {
  let n = Date.now() / 1000;

  return n > endTime;
}

export function statusPool(startTime, endTime) {
  let n = Date.now() / 1000;
  //console.log(">>>> statusPool: " + startTime + " N: " + n);

  if (n < startTime) {
    return "Not started yet";
  } else {
    if (n > endTime) {
      return "Ended";
    } else {
      return "Open";
    }
  }
}

// export async function StakeAmount(
//   poolContract,
//   stakerAddress,
// ) {
//   console.log("spenderAddress >>> " + spenderAddress);

//   const calls = [
//     {
//       address: tokenAddress,
//       name: "allowance",
//       params: [ownerAddress, spenderAddress],
//     },
//   ];

//   console.log(">> " + calls[0].address);
//   const { returnData } = await multiCall(multicallContract, ERC20_ABI, calls);
//   // DEBUG
//   let x = getDecAmount(returnData[0]).toNumber();
//   if (x > 0) {
//     return true;
//   } else {
//     return false;
//   }

// }
