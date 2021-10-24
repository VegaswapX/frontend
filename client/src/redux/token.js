//TODO WBNB, VGA init

const initialState = {
    tokenIn: "",
    tokenOut: ""
}


export default function tokenReducer(state = initialState, action) {
    console.log(action.type + " " + action.value)
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