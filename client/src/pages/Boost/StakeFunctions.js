import { BigNumber, ethers } from "ethers";
import ERC20_ABI from "../../abis/erc20.json";
import {multiCall} from "../Swap/trade"
import { toFloatNumberN } from "../Swap/trade";

export function toUint256(amount) {
    return BigNumber.from(Math.round(amount * 1000000)).mul(
      BigNumber.from(10).pow(18 - 6)
    );
  }

  
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
    let x = BigNumber.from(returnData[0]);
    // x = x.div(10**12);
    // console.log(x.toString());
    // x = x.div(10**6);
    // console.log(x.toString());

    
    // const allowance0 = BigNumber.from(returnData[0]);
  
    // if (allowance0.toString() === "0") {
    //   return false;
    // }
  
    // return true;
  
    // check amount to return true
  }