// const tokenContractIn = useContract(currencyIn.contract, VEGA_CONTRACT_ABI, true);
// const tokenContractOut = useContract(currencyOut.contract, VEGA_CONTRACT_ABI, true);
import { useWeb3React } from "@web3-react/core";
import { React, useCallback } from "react";
import VEGA_CONTRACT_ABI from "../abis/erc20.json";
import {
  BSC_USDT,
  LP_TOKEN_ADDRESS,
  VEGA_TOKEN_ADDRESS,
} from "../chain/Contracts.js";
import { useContract } from "../chain/eth.js";

//  export function getBalance(token){
export const useTokenBalance = () => {
  const { account, library, chainId } = useWeb3React();
  // const contract = useERC20Token(false)
  // const contract = useERC20Token(false)
  const tokencontract = useContract(BSC_USDT, VEGA_CONTRACT_ABI, true);
  return useCallback(() => {
    // return await evaluateTransaction(tokencontract, 'balanceOf', [address])
    return tokencontract.callStatic.balanceOf(account);
  }, []);
};

// export function getBalance(token){

//     const { account, library, chainId } = useWeb3React();

//     const tokencontract = useContract(token.address, VEGA_CONTRACT_ABI, true);

//     return useMemo(() =>
//         tokencontract.callStatic
//         .balanceOf(account)
//         .then((x) => {
//             return x;
//         }))
// }
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
