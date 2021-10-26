const initialState = {
  slippage: 0.5 / 100,
  tokenPath: [null, null],
};

// TODO: Magic number all over the places
export default function swapReducer(state = initialState, action) {
  console.log(`action.payload`, action.payload);
  switch (action.type) {
    case "swap/setSlippage":
      return { ...state, slippage: action.payload };
    default:
      return state;
  }
}