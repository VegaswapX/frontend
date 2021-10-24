//TODO WBNB, VGA init
import {TokenMap} from "../chain/tokens";

const initialState = {
    tokenIn: TokenMap.BNB,
    tokenOut: TokenMap.VGA
}


export default function tokenReducer(state = initialState, action) {
    console.log(action.type + " " + action.value)

    //map to tokens
    
    switch (action.type) {
      case 'tokenIn/set':
        //console.log(state.value)
        return { ...state, tokenIn: action.value }      
        case 'tokenOut/set':
            //console.log(state.value)
            return { ...state, tokenOut: action.value }
      default:
        // If the reducer doesn't care about this action type,
        // return the existing state unchanged
        return state
    }
  }