import { ethers } from "ethers";
import BigNumber from "bignumber.js";
import ERC20_ABI from "../../abis/erc20.json";
import { multiCall } from "../Swap/trade";
import { toFloatNumberN } from "../Swap/trade";
import { getContract } from "../../chain/eth";
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
  let x = getDecAmount(returnData[0]).toNumber();
  return x;
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

export async function stakeF(stakeAmount, poolContract) {
  var stakeAmountDEC = ethers.BigNumber.from(stakeAmount).pow(18);
  console.log("stake " + stakeAmountDEC);
  //   let minAmount = 1 * 10 ** 18;
  try {
    //TODO check maximum
    if (stakeAmountDEC >= 0) {
      const tx = await poolContract.stake(stakeAmountDEC);
      let receipt = await tx.wait();
      console.log("receipt " + receipt);
      console.log("receipt " + receipt.status);

      //dispatch(changeStakeAmount(stakeAmountDEC));
      // toast("Staking successful", {
      //   className: "success",
      //   bodyClassName: "grow-font-size",
      //   progressClassName: "fancy-progress-bar",
      // });
    } else {
      // toast("Minimum amount is " + minAmount, {
      //   className: "success",
      //   bodyClassName: "grow-font-size",
      //   progressClassName: "fancy-progress-bar",
      // });
    }
  } catch (error) {
    // toast("Staking error " + error.message, {
    //   className: "success",
    //   bodyClassName: "grow-font-size",
    //   progressClassName: "fancy-progress-bar",
    // });
    // addToast({ title: 'Deposit Token error!', description: error.message, type: 'TOAST_ERROR' });
  } finally {
    //setLoading(false);
    console.log("stake done");
  }
}

export async function approveF(account, library, tokenAddress,spenderAddress)
{
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

// export async function approveFF(poolContract, tokenContract) {
//   console.log("approve " + poolContract.address);
//   try {
//     let approveAmount = 10000 * 10**18;
//     //console.log(vegaContract, "vegaContract");
//     const tx = await tokenContract.approve(pool.address, approveAmount);
//     let receipt = await tx.wait();
//     console.log(">> " + receipt);
//     return [receipt.status, receipt];
//     // console.log(tx);
//     //dispatch(changeAllowanceAmount(approveAmount));
//     // toast("approve successful", {
//     //   className: "success",
//     //   bodyClassName: "grow-font-size",
//     //   progressClassName: "fancy-progress-bar",
//     // });
//   } catch (error) {
//     console.log({ error });
//     //toast("approve failed", {
//   } finally {
//     //TODO reload amount
//     //check allowance
//     console.log("approve done");
//   }
// }
