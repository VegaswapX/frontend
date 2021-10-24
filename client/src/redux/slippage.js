const initialState = {
    value: 0
  }

function slippage(state = [], action) {
  switch (action.type) {
    case 'SET':
      return state.concat([action.text])
    default:
      return state
  }
}

export default function slippageReducer(state = initialState, action) {
    switch (action.type) {
      case 'counter/incremented':
        return { ...state, value: state.value + 1 }
      case 'counter/decremented':
        return { ...state, value: state.value - 1 }
      default:
        // If the reducer doesn't care about this action type,
        // return the existing state unchanged
        return state
    }
  }