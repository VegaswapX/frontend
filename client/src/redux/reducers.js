// @flow
import { combineReducers } from 'redux';

import Layout from './layout/reducers';
import slippageReducer from './slippage';
import tokenReducer from './token';

export default (combineReducers({
    slippageReducer,
    tokenReducer,
    Layout,
}));
