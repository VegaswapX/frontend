const initialState = {
  value: 0.003,
};

// TODO: Magic number all over the places
export default function slippageReducer(state = initialState, action) {
  switch (action.type) {
    case "slippage/set3":
      return { ...state, value: 0.003 };
    case "slippage/set5":
      return { ...state, value: 0.005 };
    case "slippage/set10":
      return { ...state, value: 0.01 };
    default:
      // If the reducer doesn't care about this action type,
      // return the existing state unchanged
      return state;
  }
}
