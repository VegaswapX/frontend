import { clientPCS } from "../../apollo/client";
import {
  // GLOBAL_DATA,
  // ETH_PRICE,
  // ALL_TOKENS, FACTORY_PAIRS
  FACTORY_PAIRS,
} from "../../apollo/queries";

export async function someData() {
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
    }
    return tokens;
  } catch (e) {
    console.log(e);
  }
}

// async function getAllTokensOnUniswap() {
// 	try {
// 		let allFound = false
// 		let skipCount = 0
// 		let tokens = []
// 		while (!allFound) {
// 			let result = await client.query({
// 				query: ALL_TOKENS,
// 				variables: {
// 					skip: skipCount,
// 				},
// 				fetchPolicy: 'cache-first',
// 			})
// 			tokens = tokens.concat(result?.data?.tokens)
//       allFound = true;
// 			// if (result?.data?.tokens?.length < TOKENS_TO_FETCH || tokens.length > TOKENS_TO_FETCH) {
// 			// 	allFound = true
// 			// }
// 			// skipCount = skipCount += TOKENS_TO_FETCH
// 		}
// 		return tokens
// 	} catch (e) {
// 		console.log(e)
// 	}
// }
