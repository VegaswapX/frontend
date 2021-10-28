import {TokenList} from "../chain/tokens";

const initialState = {
  slippage: 0.5 / 100,
  tokenPath: [
    TokenList.BSC.VGA,
    TokenList.BSC.WBNB,
  ],
};

// TODO: Magic number all over the places
export default function swapReducer(state = initialState, action) {
  switch (action.type) {
    // TODO: From and to token should be different
    case "swap/setToken":
      const { tokenIndex, symbol } = action.payload;
      console.log(`tokenIndex: ${tokenIndex}`);
      const tokenPath_ = state.tokenPath.slice();
      tokenPath_[tokenIndex] = TokenList.BSC[symbol]; // TODO: chainId as variable
      return { ...state, tokenPath: tokenPath_ };

    case "swap/setSlippage":
      return { ...state, slippage: action.payload };
    default:
      return state;
  }
}