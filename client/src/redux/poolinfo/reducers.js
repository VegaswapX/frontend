// @flow
import PoolInfoActionTypes from './constants';

import DefaultAmounts from "../../constants/poolinfo";

export const INIT_STATE = {
    stakeAmount: DefaultAmounts.DEFAULT_STAKE_AMOUNT,
    allowance: DefaultAmounts.DEFAULT_ALLOWANCE
};


const PoolInfo = (state = INIT_STATE, action): any => {
    switch (action.type) {
        case PoolInfoActionTypes.STAKE_AMOUNT:
            return {
                ...state,
                stakeAmount: action.payload,
            };
        case PoolInfoActionTypes.APPROVE_ALLOWANCE:
            return {
                ...state,
                allowance: action.payload
            }
        default:
            return state;
    }
};

export default PoolInfo;
