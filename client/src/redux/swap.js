import {TokenList} from "../chain/tokens";

const initialState = {
  slippage: 0.5 / 100,
  tokenPath: [
    TokenList.BSC.WBNB,
    TokenList.BSC.VGA,
  ],
};

// TODO: Magic number all over the places
export default function swapReducer(state = initialState, action) {
  switch (action.type) {
    case "swap/setToken":
      // DEBUG
      // console.log(`[swap/setToken] tokenIndex: ${tokenIndex}`);
      const { tokenIndex, symbol } = action.payload;
      const otherTokenIndex = tokenIndex === 0 ? 1 : 0;

      // if set the token which is the same with other token, swap their direction
      const selectedToken = TokenList.BSC[symbol];
      if (selectedToken === state.tokenPath[otherTokenIndex]) {
        const tokenPath_ = state.tokenPath.slice().reverse();
        return { ...state, tokenPath: tokenPath_ };
      }
      
      const tokenPath_ = state.tokenPath.slice();
      tokenPath_[tokenIndex] = selectedToken; // TODO: chainId as variable
      return { ...state, tokenPath: tokenPath_ };

    case "swap/setSlippage":
      return { ...state, slippage: action.payload };
    default:
      return state;
  }
}