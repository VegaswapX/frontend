const initialState = {
  isTokenSelectorModalOpened: false,
  currentModalTokenIndex: null,
  modalTokenIn: false,
  modalTokenOut: false,
  tokenSelect: "",
  poolInfo: false
};

export default function uiReducer(state = initialState, action) {
  console.log("uiReducer " + action.type);
  switch (action.type) {
    // case "ui/showmodal":
    case "ui/hideTokenSelector":
      return { ...state, isTokenSelectorModalOpened: false };

    case "ui/toggleTokenSelector":
      console.log(`action?.payload`, action);
      const tokenIndex = action?.payload?.tokenIndex;

      return { ...state,
        isTokenSelectorModalOpened: !state.isTokenSelectorModalOpened,
        currentModalTokenIndex: tokenIndex,
      };

    case "ui/togglemodalTokenIn":
      return { ...state, modalTokenIn: !state.modalTokenIn };     
    case "ui/togglemodalTokenOut":
      return { ...state, modalTokenOut: !state.modalTokenOut };     
    case "ui/tokenselectIn":
        return { ...state, tokenSelect: "tokenIn" };          
    case "ui/tokenselectOut":
        return { ...state, tokenSelect: "tokenOut" };          
    case "ui/showpoolinfo":
        return { ...state, poolInfo: !state.poolInfo };
    default:
      return state;
  }
}
