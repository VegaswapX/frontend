// @flow
import { combineReducers } from "redux";

import Layout from "./layout/reducers";
import swapReducer from "./swap";
import tokenReducer from "./token";
import uiReducer from "./ui";
import web3Reducer from "./web3redux";

export default combineReducers({
  swapReducer,
  tokenReducer,
  uiReducer,
  web3Reducer,
  Layout,
});
