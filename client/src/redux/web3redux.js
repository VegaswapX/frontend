const initialState = {
  connected: false,
  account: ""
};

// TODO: Magic number all over the places
export default function web3Reducer(state = initialState, action) {
  console.log("zzzzzz " + action);
  console.log("zzzzzz " + state.account);
  console.log("zzzzzz " + action.type);

  //return state;

  switch (action.type) {

    case "web3/switchConnected":
        // DEBUG        
        return { ...state, account: "AAA" };

    default:
      return state;
  }
}