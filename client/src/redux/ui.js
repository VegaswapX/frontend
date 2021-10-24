const initialState = {
  modal: false,
  tokenSelect: ""
};

export default function uiReducer(state = initialState, action) {
  console.log("uiReducer " + action.type);
  switch (action.type) {
    case "ui/showmodal":
      return { ...state, modal: true };
    case "ui/hidemodal":
      return { ...state, modal: false };
    case "ui/togglemodal":
      return { ...state, modal: !state.modal };     
    case "ui/tokenselectIn":
        return { ...state, tokenSelect: "tokenIn" };          
    case "ui/tokenselectOut":
        return { ...state, tokenSelect: "tokenOut" };          
    default:
      return state;
  }
}
