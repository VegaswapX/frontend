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
