// @flow
import { combineReducers } from "redux";

import Layout from "./layout/reducers";
import swapReducer from "./swap";
import tokenReducer from "./token";
import uiReducer from "./ui";

export default combineReducers({
  swapReducer,
  tokenReducer,
  uiReducer,
  Layout,
});
