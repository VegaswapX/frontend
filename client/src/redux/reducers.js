// @flow
import { combineReducers } from 'redux';

import Layout from './layout/reducers';
import slippageReducer from './slippage';

export default (combineReducers({
    //Auth,
    slippageReducer,
    Layout,
}));
