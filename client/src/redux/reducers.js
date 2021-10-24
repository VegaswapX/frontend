// @flow
import { combineReducers } from "redux";

import Layout from "./layout/reducers";
import slippageReducer from "./slippage";
import tokenReducer from "./token";
import uiReducer from "./ui";

export default combineReducers({
  slippageReducer,
  tokenReducer,
  uiReducer,
  Layout,
});
