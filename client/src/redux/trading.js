const defaultSlippage = 0.5 / 100;

const initialState = {
  slippage: defaultSlippage,
};

// TODO: Magic number all over the places
export default function tradingReducer(state = initialState, action) {
  console.log(`action.payload`, action.payload);
  switch (action.type) {
    case "swap/setSlippage":
      return { ...state, slippage: action.payload };
    default:
      // If the reducer doesn't care about this action type,
      // return the existing state unchanged
      return state;
  }
}
