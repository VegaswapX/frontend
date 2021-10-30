//TODO WBNB, VGA init
import { TokenList } from "../chain/tokens";

const initialState = {
  tokenIn: TokenList.BSC.WBNB,
  tokenOut: TokenList.BSC.VGA,
};

export default function tokenReducer(state = initialState, action) {
  //map to tokens
  try {
    let token = TokenList[action.value];
    switch (action.type) {
      case "tokenIn/set":
        return { ...state, tokenIn: token };
      case "tokenOut/set":
        return { ...state, tokenOut: token };
      default:
        // If the reducer doesn't care about this action type,
        // return the existing state unchanged
        return state;
    }
  } catch {
    return state;
  }
}
