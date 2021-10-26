// @flow
import { combineReducers } from "redux";

import Layout from "./layout/reducers";
import tradingReducer from "./trading";
import tokenReducer from "./token";
import uiReducer from "./ui";

export default combineReducers({
  tradingReducer,
  tokenReducer,
  uiReducer,
  Layout,
});
